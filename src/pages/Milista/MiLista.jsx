// src/components/MiLista.jsx
import React, { useState, useEffect } from 'react';

// SVG del Ícono de Basura (consolidado)
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M135.2 17.7C140.6 7.2 151.6 0 163.8 0h120.4c12.2 0 23.2 7.2 28.6 17.7L328 32H432c8.8 0 16 7.2 16 16s-7.2 
        16-16 16h-16l-21.2 403.2c-1.3 24.3-21.3 44.8-45.6 44.8H99.8c-24.3 0-44.3-20.5-45.6-44.8L33 64H16C7.2 64 0 
        56.8 0 48s7.2-16 16-16H120l15.2-14.3zM128 128v320c0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16V128H128z"/>
    </svg>
);

// Datos iniciales de ejemplo
const initialItems = [
  { nombre: 'TUA', img: 'tua.webp', categoria: 'serie' },
  { nombre: 'Dark', img: 'images.jpeg', categoria: 'serie' },
  { nombre: 'Stranger Things', img: 'st.jpg', categoria: 'serie' },
];

// Recibe la prop de navegación para el clic en la barra de búsqueda
const MiLista = ({ navigateToSearch }) => {
  const [items, setItems] = useState(() => {
    const savedList = localStorage.getItem('lista');
    return savedList ? JSON.parse(savedList) : initialItems;
  });

  const [filtro, setFiltro] = useState('todo');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('lista', JSON.stringify(items));
  }, [items]);

  const deleteItem = (indexToDelete) => {
    setItems(currentItems => {
      const newItems = currentItems.filter((_, index) => index !== indexToDelete);
      if (newItems.length === 0) setShowDeleteModal(false);
      return newItems;
    });
  };

  const filteredItems = items.filter(item => filtro === 'todo' || item.categoria === filtro);

  return (
    <>  
      {/* 🎨 Estilos consolidados */}
      <style>{`
        :root{
            --bg: #0e1117;
            --panel:#141925;
            --panel-2:#1a2030;
            --purple:#9d4edd;
            --purple-2:#7b2cbf;
            --glow:#c77dff;
            --text:#e8eaf0;
            --muted:#aeb3c2;
        }
        
        /* 💡 Aplicamos los estilos al cuerpo de la página */
        body { 
            background: radial-gradient(1200px 500px at 60% -10%, rgba(199,125,255,.16), transparent 60%), radial-gradient(800px 380px at -10% 120%, rgba(123,44,191,.12), transparent 60%), var(--bg); 
            color: var(--text);
            font-family:"Nunito Sans",sans-serif;
            margin: 0;
            min-height: 100vh;
        }

        /* Topbar */
        .topbar{position:sticky;top:0;z-index:50;display:grid;grid-template-columns:auto auto 1fr auto auto;gap:14px;align-items:center;padding:12px 18px;
            background:linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,0)) , var(--panel);
            border-bottom:1px solid rgba(199,125,255,.22);box-shadow:0 0 20px rgba(157,78,221,.15);}
        .brand{display:flex;align-items:center;gap:10px;font-weight:800;letter-spacing:.4px;font-size:1.05rem;color:var(--text);}
        .brand .logo{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,var(--purple),var(--purple-2));box-shadow:0 0 10px var(--glow);}
        .brand span{color:var(--glow);}
        nav{display:flex;gap:6px;align-items:center;}
        nav a{color:var(--text);text-decoration:none;padding:8px 10px;border-radius:10px;opacity:.9;font-weight:600;}
        nav a.active,nav a:hover{background:rgba(199,125,255,.10);outline:1px solid rgba(199,125,255,.28);}
        
        /* Barra de Búsqueda para la navegación */
        .search{display:flex;align-items:center;gap:8px;justify-self:center;background:var(--panel-2);border-radius:999px;padding:6px 10px;border:1px solid rgba(199,125,255,.25);
            box-shadow:0 0 10px rgba(157,78,221,.14) inset;width:min(40vw,460px);cursor:pointer;}
        .search input{flex:1;background:transparent;border:none;outline:none;color:var(--text);cursor:pointer;}
        .search .btn{width:28px;height:28px;border-radius:999px;border:none;cursor:pointer;background:linear-gradient(135deg,var(--purple),var(--purple-2));box-shadow:0 0 10px var(--glow);color:white;font-weight:700;}
        
        .right{display:flex;align-items:center;gap:16px;color:var(--muted);font-weight:600;}
        .right .i{width:9px;height:9px;border-radius:999px;background:linear-gradient(135deg,var(--purple),var(--purple-2));box-shadow:0 0 6px var(--glow);margin-right:8px;display:inline-block;}
        main{padding:10px 70px;}

        h1{font-size:2rem;font-weight:800;margin-bottom:6px;}
        .subtitle{color:var(--muted);margin-bottom:30px;}
        .tabs{display:flex;gap:30px;margin-bottom:40px;}
        .tabs button{background:transparent;border:none;color:var(--muted);font-weight:700;cursor:pointer;font-size:1rem;transition:0.3s;}
        .tabs button.active{color:var(--glow);border-bottom:3px solid var(--glow);padding-bottom:6px;}
        .tabs button:hover{color:var(--glow);}
        .cards{display:flex;gap:35px;flex-wrap:wrap;}
        .card{width:180px;background:var(--panel-2);border-radius:16px;overflow:hidden;box-shadow:0 0 15px rgba(157,78,221,0.2);transition:transform 0.3s,box-shadow 0.3s;cursor:pointer;position:relative;}
        .card:hover{transform:translateY(-6px);box-shadow:0 0 25px rgba(199,125,255,0.4);}
        .card img{width:100%;height:260px;object-fit:cover;}
        .card p{text-align:center;font-weight:700;color:var(--text);padding:10px 0;background:linear-gradient(to top, rgba(199,125,255,0.2), transparent);}
        .trash{position:fixed;bottom:40px;right:60px;width:50px;height:50px;background:transparent;border:2px solid var(--glow);border-radius:10px;display:flex;align-items:center;justify-content:center;
            box-shadow:0 0 15px rgba(199,125,255,0.3);transition:0.3s;cursor:pointer;}
        .trash:hover{background:var(--glow);color:#fff;box-shadow:0 0 25px var(--glow);}
        .trash svg{width:26px;height:26px;fill:var(--glow);transition:0.3s;}
        .trash:hover svg{fill:white;}
        .modal-bg{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:999;}
        .modal{background:var(--panel-2);padding:30px 40px;border-radius:16px;text-align:center;box-shadow:0 0 25px rgba(199,125,255,0.4);}
        .modal h2{margin-bottom:20px;color:var(--text);}
        .modal-buttons{display:flex;justify-content:center;gap:20px;}
        .modal button{padding:10px 18px;border:none;border-radius:10px;cursor:pointer;font-weight:700;}
        .modal .confirm{background:var(--purple);color:white;}
        .modal .cancel{background:transparent;color:var(--muted);border:1px solid var(--muted);}
    `}</style>
      
      
      <header className="topbar">
        <div className="brand"><div className="logo"></div><span>VISIONPLUS</span></div>
        <nav>
          <a href="#">Inicio</a>
          <a className="active" href="#">Mi lista</a>
        </nav>
        
        <div className="search" onClick={navigateToSearch}> 
          <input placeholder="Buscar" readOnly />
          <button className="btn">🔍</button>
        </div>
        
        <div className="right">
           <div><span className="i"></span>Perfil</div>
                <div onClick={navigateToSearch} style={{cursor: "pointer"}}>
               <span className="i"></span>Categorías
          </div>
        </div>

      </header>

      <main>
        <h1>MI LISTA</h1>
        <p className="subtitle">Tus películas y series guardadas</p>
        
        
        <div className="tabs">
          {['todo', 'pelicula', 'serie', 'descargada'].map(cat => (
            <button
              key={cat}
              data-category={cat}
              className={filtro === cat ? 'active' : ''}
              onClick={() => setFiltro(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1).replace('todo', 'Todo').replace('pelicula', 'Películas').replace('serie', 'Series').replace('descargada', 'Descargadas')}
            </button>
          ))}
        </div>

        <div className="cards">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div key={index} className="card">
                <img src={item.img} alt={item.nombre} />
                <p>{item.nombre}</p>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--muted)', width: '100%', textAlign: 'center' }}>
              No hay elementos guardados en esta categoría.
            </p>
          )}
        </div>
      </main>


      <div className="trash" title="Eliminar" onClick={() => setShowDeleteModal(true)}>
        <TrashIcon />
      </div>


      {showDeleteModal && (
        <div className="modal-bg">
          <div className="modal">
            <h2>Selecciona el elemento que deseas eliminar</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {items.map((item, index) => (
                <button 
                  key={item.nombre + index}
                  onClick={() => {
                    if (window.confirm(`¿Seguro que deseas eliminar "${item.nombre}"?`)) {
                      deleteItem(index);
                    }
                  }}
                  style={{ padding: '10px', background: 'var(--panel)', color: 'var(--text)', border: '1px solid var(--glow)', borderRadius: '10px', cursor: 'pointer' }}
                >
                  {item.nombre}
                </button>
              ))}
            </div>
            <div className="modal-buttons">
              <button className="cancel" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MiLista;