import React, { useState, useEffect } from "react";

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M135.2 17.7C140.6 7.2 151.6 0 163.8 0h120.4c12.2 0 23.2 7.2 28.6 17.7L328 32H432c8.8 0 16 7.2 16 16s-7.2 
        16-16 16h-16l-21.2 403.2c-1.3 24.3-21.3 44.8-45.6 44.8H99.8c-24.3 0-44.3-20.5-45.6-44.8L33 64H16C7.2 64 0 
        56.8 0 48s7.2-16 16-16H120l15.2-14.3zM128 128v320c0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16V128H128z" />
  </svg>
);


const defaultItems = [
  {
    nombre: "TUA",
    img: "tua.webp",
    tipo: "serie",
    categoria: "Serie",
    descripcion:
      "La Academia Umbrella es un equipo de individuos con superpoderes, adoptado y entrenado por Sir Reginald Hargreeves para proteger la Tierra de una amenaza cósmica desconocida.",
    temporadas: 3,
  },
  {
    nombre: "Dark",
    img: "images.jpeg",
    tipo: "serie",
    categoria: "Serie",
    descripcion:
      "Cuatro familias de un pequeño pueblo alemán se ven envueltas en un misterio que abarca varias generaciones y viajes en el tiempo.",
    temporadas: 3,
  },
  {
    nombre: "Stranger Things",
    img: "st.jpg",
    tipo: "serie",
    categoria: "Serie",
    descripcion:
      "En la ciudad de Hawkins, un grupo de amigos descubre experimentos secretos, criaturas sobrenaturales y una niña con poderes especiales.",
    temporadas: 4,
  },
];
const defaultsByName = Object.fromEntries(
  defaultItems.map((item) => [item.nombre, item])
);

const MiLista = ({ navigateToSearch }) => {
  const [items, setItems] = useState(() => {
    const savedList = localStorage.getItem("lista");

    if (savedList) {
      try {
        const parsed = JSON.parse(savedList);

        return parsed.map((item) => {
          const def = defaultsByName[item.nombre];

          if (def) {
            return {
              ...def,
              ...item,
              tipo: item.tipo || def.tipo || "serie",
              categoria: def.categoria || "Serie",
              descripcion: item.descripcion || def.descripcion,
              temporadas:
                item.tipo === "pelicula"
                  ? item.temporadas ?? def.temporadas
                  : item.temporadas || def.temporadas,
            };
          }

  
          return {
            ...item,
            tipo: item.tipo || "serie",
            categoria: "Serie",
            descripcion: item.descripcion || "Sin descripción",
            temporadas:
              item.tipo === "serie"
                ? item.temporadas || 1
                : item.temporadas ?? undefined,
          };
        });
      } catch (e) {
        console.error("Error leyendo lista de localStorage", e);
      }
    }

    return defaultItems;
  });

  const [filtro, setFiltro] = useState("serie");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("lista", JSON.stringify(items));
  }, [items]);

  const deleteItem = (indexToDelete) => {
    setItems((currentItems) => {
      const newItems = currentItems.filter(
        (_, index) => index !== indexToDelete
      );
      if (newItems.length === 0) setShowDeleteModal(false);
      return newItems;
    });
  };

  const filteredItems = items.filter((item) => {
    if (filtro === "descargada") return item.descargada;
    if (filtro === "pelicula") return item.tipo === "pelicula";
    if (filtro === "serie") return item.tipo === "serie";
    return true;
  });

  const tabs = [
    { id: "pelicula", label: "Películas" },
    { id: "serie", label: "Series" },
    { id: "descargada", label: "Descargadas" },
  ];

  return (
    <>
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

        body { 
          background:
            radial-gradient(1200px 500px at 60% -10%, rgba(199,125,255,.16), transparent 60%),
            radial-gradient(800px 380px at -10% 120%, rgba(123,44,191,.12), transparent 60%),
            var(--bg); 
          color: var(--text);
          font-family:"Nunito Sans",sans-serif;
          margin: 0;
          min-height: 100vh;
        }

        .topbar{
          position:sticky;
          top:0;
          z-index:50;
          display:grid;
          grid-template-columns:auto auto 1fr auto auto;
          gap:14px;
          align-items:center;
          padding:12px 18px;
          background:linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,0)) , var(--panel);
          border-bottom:1px solid rgba(199,125,255,.22);
          box-shadow:0 0 20px rgba(157,78,221,.15);
        }

        .brand{
          display:flex;
          align-items:center;
          gap:10px;
          font-weight:800;
          letter-spacing:.4px;
          font-size:1.05rem;
          color:var(--text);
        }

        .brand span{
          color:var(--glow);
        }

        nav{
          display:flex;
          gap:6px;
          align-items:center;
        }
        nav a{
          color:var(--text);
          text-decoration:none;
          padding:8px 10px;
          border-radius:10px;
          opacity:.9;
          font-weight:600;
        }
        nav a.active,
        nav a:hover{
          background:rgba(199,125,255,.10);
          outline:1px solid rgba(199,125,255,.28);
        }

        .search{
          display:flex;
          align-items:center;
          gap:8px;
          justify-self:center;
          background:var(--panel-2);
          border-radius:999px;
          padding:6px 10px;
          border:1px solid rgba(199,125,255,.25);
          box-shadow:0 0 10px rgba(157,78,221,.14) inset;
          width:min(40vw,460px);
          cursor:pointer;
        }
        .search input{
          flex:1;
          background:transparent;
          border:none;
          outline:none;
          color:var(--text);
          cursor:pointer;
        }
        .search .btn{
          width:28px;
          height:28px;
          border-radius:999px;
          border:none;
          cursor:pointer;
          background:linear-gradient(135deg,var(--purple),var(--purple-2));
          color:white;
          font-weight:700;
        }

        .right{
          display:flex;
          align-items:center;
          gap:16px;
          color:var(--muted);
          font-weight:600;
        }

        .right span{
          display:none;
        }

        main{
          padding:10px 70px 60px;
        }

        h1{
          font-size:2rem;
          font-weight:800;
          margin-bottom:6px;
        }

        .subtitle{
          color:var(--muted);
          margin-bottom:30px;
        }

        .tabs{
          display:flex;
          gap:30px;
          margin-bottom:40px;
        }
        .tabs button{
          background:transparent;
          border:none;
          color:var(--muted);
          font-weight:700;
          cursor:pointer;
          font-size:1rem;
          transition:0.3s;
          padding-bottom:4px;
        }
        .tabs button.active{
          color:var(--glow);
          border-bottom:2px solid var(--glow);
        }
        .tabs button:hover{
          color:var(--glow);
        }

        .cards{
          display:flex;
          gap:35px;
          flex-wrap:wrap;
        }

        .card{
          width:220px;
          background:var(--panel-2);
          border-radius:16px;
          overflow:hidden;
          box-shadow:0 0 15px rgba(0,0,0,0.4);
          transition:transform 0.3s, box-shadow 0.3s;
          cursor:pointer;
          position:relative;
        }
        .card:hover{
          transform:translateY(-6px);
          box-shadow:0 0 25px rgba(0,0,0,0.65);
        }
        .card img{
          width:100%;
          height:260px;
          object-fit:cover;
        }

        .card-info{
          padding:10px 12px 14px;
        }
        .card-title{
          margin:0 0 4px;
          font-weight:800;
          color:var(--text);
        }
        .card-meta{
          margin:0 0 4px;
          font-size:.85rem;
          color:var(--muted);
        }
        .card-desc{
          margin:0 0 4px;
          font-size:.8rem;
          color:var(--muted);
        }

        .trash{
          position:fixed;
          bottom:40px;
          right:60px;
          width:50px;
          height:50px;
          background:transparent;
          border:2px solid var(--glow);
          border-radius:10px;
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:0 0 15px rgba(199,125,255,0.3);
          transition:0.3s;
          cursor:pointer;
        }
        .trash:hover{
          background:var(--glow);
          color:#fff;
          box-shadow:0 0 25px var(--glow);
        }
        .trash svg{
          width:26px;
          height:26px;
          fill:var(--glow);
          transition:0.3s;
        }
        .trash:hover svg{
          fill:white;
        }

        .modal-bg{
          position:fixed;
          top:0;
          left:0;
          width:100%;
          height:100%;
          background:rgba(0,0,0,0.6);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:999;
        }
        .modal{
          background:var(--panel-2);
          padding:30px 40px;
          border-radius:16px;
          text-align:center;
          box-shadow:0 0 25px rgba(199,125,255,0.4);
        }
        .modal h2{
          margin-bottom:20px;
          color:var(--text);
        }
        .modal-buttons{
          display:flex;
          justify-content:center;
          gap:20px;
        }
        .modal button{
          padding:10px 18px;
          border:none;
          border-radius:10px;
          cursor:pointer;
          font-weight:700;
        }
        .modal .confirm{
          background:var(--purple);
          color:white;
        }
        .modal .cancel{
          background:transparent;
          color:var(--muted);
          border:1px solid var(--muted);
        }
      `}</style>

      <header className="topbar">
        <div className="brand">
          <span>VISIONPLUS</span>
        </div>

        <nav>
          <a href="#">Inicio</a>
          <a className="active" href="#">
            Mi lista
          </a>
        </nav>

        <div className="search" onClick={navigateToSearch}>
          <input placeholder="Buscar" readOnly />
          <button className="btn">🔍</button>
        </div>

        <div className="right">
          <div>Perfil</div>
          <div onClick={navigateToSearch} style={{ cursor: "pointer" }}>
            Categorías
          </div>
        </div>
      </header>

      <main>
        <h1>MI LISTA</h1>
        <p className="subtitle">Tus películas y series guardadas</p>

        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={filtro === tab.id ? "active" : ""}
              onClick={() => setFiltro(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="cards">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div key={index} className="card">
                <img src={item.img} alt={item.nombre} />
                <div className="card-info">
                  <p className="card-title">{item.nombre}</p>

                  <p className="card-meta">
                    Categoria:{" "}
                    {item.tipo === "pelicula" ? "Película" : "Serie"}
                  </p>

                  <p className="card-desc">
                    Descripcion: {item.descripcion || "Sin descripción"}
                  </p>

                  <p className="card-meta">
                    Temporada {item.temporadas || 1}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p
              style={{
                color: "var(--muted)",
                width: "100%",
                textAlign: "center",
              }}
            >
              No hay elementos guardados en esta categoría.
            </p>
          )}
        </div>
      </main>

      <div
        className="trash"
        title="Eliminar"
        onClick={() => setShowDeleteModal(true)}
      >
        <TrashIcon />
      </div>

      {showDeleteModal && (
        <div className="modal-bg">
          <div className="modal">
            <h2>Selecciona el elemento que deseas eliminar</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              {items.map((item, index) => (
                <button
                  key={item.nombre + index}
                  onClick={() => {
                    if (
                      window.confirm(
                        `¿Seguro que deseas eliminar "${item.nombre}"?`
                      )
                    ) {
                      deleteItem(index);
                    }
                  }}
                  style={{
                    padding: "10px",
                    background: "var(--panel)",
                    color: "var(--text)",
                    border: "1px solid var(--glow)",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  {item.nombre}
                </button>
              ))}
            </div>
            <div className="modal-buttons">
              <button
                className="cancel"
                onClick={() => setShowDeleteModal(false)}
              >
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
