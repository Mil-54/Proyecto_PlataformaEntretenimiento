
import { useNavigate } from "react-router-dom";

export default function VisionPlusDetail() { const navigate = useNavigate();
  return (

    <>

      <style>{`
:root{
  --bg:#0b0d13;              
  --panel:#141925;
  --panel-2:#1a2030;
  --purple:#9d4edd;
  --purple-2:#7b2cbf;
  --glow:#c77dff;
  --text:#e8eaf0;
  --muted:#aeb3c2;
  --ok:#18c964;
  --warn:#ffc300;
}
*{ box-sizing:border-box; }

html, body, #root {
  min-height: 100%;
  height: auto;
}

html, body{ background-color:#0b0d13; }
body{
  margin:0; color:var(--text);
  font-family:"Nunito Sans",system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
  background:
    radial-gradient(1200px 500px at 60% -10%, rgba(199,125,255,.14), transparent 60%),
    radial-gradient(800px 380px at -10% 120%, rgba(123,44,191,.10), transparent 60%),
    #0b0d13;
  background-attachment: fixed;
}


.navbar{
  position:sticky; top:0; z-index:100;
  display:flex; align-items:center; gap:18px;
  padding:10px 18px;
  background:linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,0)), var(--panel);
  border-bottom:1px solid rgba(199,125,255,.22);
  box-shadow:0 0 20px rgba(157,78,221,.15);
}
.logo{
  display:flex; align-items:center; gap:10px; font-weight:900; letter-spacing:.3px;
  color:var(--glow); font-size:18px;
}

.menu{ display:flex; gap:12px; }
.menu a{
  color:var(--text); text-decoration:none; font-weight:800; font-size:.95rem;
  padding:6px 8px; border-radius:10px;
}
.menu a:hover{ background:rgba(199,125,255,.10); outline:1px solid rgba(199,125,255,.28); }


.nav-search{ flex:1; display:flex; justify-content:center; }
.nav-search .input{
  display:flex; align-items:center; gap:8px; width:min(520px, 60vw);
  background:var(--panel-2); border:1px solid rgba(199,125,255,.25); border-radius:999px;
  padding:6px 10px; box-shadow:0 0 8px rgba(157,78,221,.14) inset;
}
.nav-search input{
  flex:1; background:transparent; border:none; outline:none; color:var(--text); font-size:.95rem;
}
.nav-search button{
  width:30px; height:30px; border:none; border-radius:999px; cursor:pointer;
  color:#fff; background:linear-gradient(135deg,var(--purple),var(--purple-2));
}
.user-menu{ display:flex; gap:16px; font-weight:800; }
.user-menu a{ color:var(--text); text-decoration:none; }


.wrap{
  padding: clamp(12px,2.4vw,20px) 0;
  background: transparent !important;
}

.grid{
  display:grid;
  grid-template-columns: 220px 1fr 340px;
  gap:22px;
  align-items:start;
  max-width:1200px;

  margin: 0 auto;    /* ✔ centra */
  padding: 0 20px;   /* ✔ pequeño espacio lateral */
}


.panel{
  background:linear-gradient(180deg, rgba(255,255,255,.02), transparent 40%), var(--panel);
  border:1px solid rgba(199,125,255,.16);
  border-radius:14px;
  width:100%;
  box-shadow:0 8px 22px rgba(0,0,0,.45), 0 0 20px rgba(157,78,221,.08);
}
.left{
  position:sticky; top:86px; align-self:start; z-index:1;
  margin-left:0;
}
.poster{                    /* <figure> por defecto tiene margin, ¡quítalo! */
  margin:0;                 /* CLAVE para pegar el póster */
  width:100%; max-width:220px; aspect-ratio:3/4;
  border-radius:10px; overflow:hidden;
  background:var(--panel-2);
  border:1px solid rgba(199,125,255,.18);
  box-shadow:0 10px 24px rgba(0,0,0,.6);
}
.poster img{ width:100%; height:100%; object-fit:cover; display:block; }
.actions{ margin-top:12px; padding:10px; background:var(--panel); border:1px solid rgba(199,125,255,.12); border-radius:10px; }
.act-btn{
  width:100%; display:flex; align-items:center; justify-content:space-between; gap:10px;
  background:var(--panel-2); border:1px solid rgba(199,125,255,.16);
  border-radius:10px; padding:10px 12px; font-weight:800; color:var(--text);
}
.act-btn small{ color:var(--muted); font-weight:700; }

/* En pantallas grandes, si quieres aún más a la izquierda, usa este microajuste */
@media (min-width: 1000px){
  .left{ margin-left:-14px; }               /* ajústalo a -18px o -20px si deseas */
}

.detail-hero{
  position:relative; overflow:hidden; border-radius:14px; padding:18px 16px;
  min-height:clamp(320px, 50vh, 560px);
  display:flex; flex-direction:column; justify-content:flex-end;
}
.detail-hero .bg{ position:absolute; inset:0; background:center/cover no-repeat; filter:saturate(1) brightness(.90); transform:scale(1.02); }
.detail-hero::after{ content:""; position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.86)); }
.detail-hero>*{ position:relative; }
.title{ display:flex; align-items:baseline; gap:8px; }
.title h1{ margin:0; font-size:clamp(24px,5vw,42px); }
.title .year{ opacity:.85; }
.meta-row{ display:flex; gap:12px; flex-wrap:wrap; align-items:center; margin-top:8px; }
.pill{
  display:inline-flex; align-items:center; gap:6px; padding:4px 8px; border-radius:999px;
  background:rgba(199,125,255,.10); border:1px solid rgba(199,125,255,.26); font-weight:800; font-size:.78rem; color:var(--glow);
}
.rating{
  font-weight:800;
  color:var(--text);
}


.syn{ margin:10px 0 0; color:#d9dbe4; font-style:italic; max-width:90ch; }

.bar{ margin-top:14px; padding:12px; border-radius:12px; background:var(--panel-2); border:1px solid rgba(199,125,255,.16); }
.bar .row{ display:flex; gap:10px; flex-wrap:wrap; }
.tag{
  display:inline-flex;
  align-items:center;
  background:#0f131c;
  border:1px solid rgba(199,125,255,.18);
  padding:10px 12px;
  border-radius:12px;
  font-weight:800;
  color:var(--text);
}


.player{
  margin-top:18px;
  border-radius:14px;
                        /* fondo rojo grande */
  border:1px solid rgba(255,255,255,.08);
  padding:28px 12px;                        /* lienzo rojo */
  display:grid; place-items:center;
}
.player .ph{
  width:min(560px, 85%);
  aspect-ratio:16/9;
  background:center / cover no-repeat url("https://images.unsplash.com/photo-1520975922211-01f9710a4a02?w=1200");
  position:relative;
  border-radius:10px;
  box-shadow:0 8px 22px rgba(0,0,0,.45);
}
.player .ph::after{
  content:"▶";
  position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
  width:84px; height:84px; display:grid; place-items:center;
  border-radius:999px; background:rgba(0,0,0,.55);
  border:2px solid rgba(255,255,255,.85);
  font-size:36px; color:#fff;
}


.aside{ display:flex; flex-direction:column; gap:12px; }
.list{ padding:10px; }
.tabs{ display:flex; gap:8px; margin-bottom:10px; }
.tab{
  padding:6px 10px; border-radius:999px; border:1px solid rgba(199,125,255,.22);
  background:rgba(199,125,255,.06); font-weight:800; font-size:.85rem; color:var(--muted); cursor:pointer;
}
.tab.active,.tab:hover{ color:var(--text); background:rgba(199,125,255,.14); }
.item{
  display:grid; grid-template-columns:56px 1fr auto; gap:10px; align-items:center;
  padding:8px; border-radius:10px; background:var(--panel-2); border:1px solid rgba(199,125,255,.12);
}
.thumb{ width:56px; height:78px; border-radius:8px; overflow:hidden; }
.thumb img{ width:100%; height:100%; object-fit:cover; display:block; }
.it-title{ font-weight:800; font-size:.95rem; margin:0; }
.badge{ font-size:.8rem; font-weight:900; color:#111; background:var(--warn); border-radius:8px; padding:4px 6px; }

.section{ margin-top:18px; }
.section h3{ margin:10px 0; font-size:clamp(14px,2.4vw,18px); }
.grid-posters{ display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); gap:16px; }
.tile{ background:var(--panel); border:1px solid rgba(199,125,255,.12); border-radius:14px; padding:10px; }
.tile .ph{ width:100%; aspect-ratio:3/4; border-radius:10px; background:center/cover no-repeat; }
.tile p{ margin:6px 0 0; font-weight:700; font-size:.95rem; }


@media (max-width:1200px){
  .grid{ grid-template-columns:200px 1fr 300px; }
  .grid-posters{ grid-template-columns:repeat(4,1fr); }
}
@media (max-width:1000px){
  .grid{ grid-template-columns:1fr; margin:0 auto; } /* vuelve a centrarse en móvil */
  .wrap{ padding: clamp(12px,2.4vw,20px); }         /* recupera padding lateral */
  .left{ position:static; margin-left:0; }
  .grid-posters{ grid-template-columns:repeat(3,1fr); }
}
@media (max-width:640px){
  .grid-posters{ grid-template-columns:repeat(2,1fr); }
  .player{ padding:18px 8px; }
  .player .ph{ width:92%; }
}
*{
  box-shadow:none !important;
}

.dot{
  display:none !important;
}


      `}</style>

      {  }
      <header className="navbar">
        <div className="logo">VISIONPLUS</div>

        <nav className="menu">
           <a href="#" className="active" onClick={(e)=>e.preventDefault()}>Inicio</a>
           <a href="#" onClick={(e) => { 
               e.preventDefault(); 
               navigate("/MiLista");
           }}>Mi lista</a>
        </nav>

        <div className="nav-search">
          <div className="input">
            <input type="text" placeholder="Buscar…" />
            <button title="Buscar" aria-label="Buscar">🔍</button>
          </div>
        </div>

        <div className="user-menu">
          <a href="#" onClick={(e)=>e.preventDefault()}>Perfil</a>
          <a href="#" onClick={(e)=>e.preventDefault()}>Notificaciones</a>
        </div>
      </header>

      <main className="wrap">
        <div className="grid">
          {}
          <aside className="left">
            <figure className="poster">
              <img src="https://m.media-amazon.com/images/M/MV5BMTY1OTIwODgzMV5BMl5BanBnXkFtZTgwMzUyMDgzNDM@._V1_.jpg" alt="Poster" />
            </figure>
            <div className="actions">
              <button className="act-btn">➕ Agregar a… <small>Mi lista</small></button>
            </div>
          </aside>

          {}
          <section>
            <header className="panel detail-hero">
              <div className="bg" style={{backgroundImage:"url('https://images.justwatch.com/backdrop/318995289/s640/the-strangers')"}}></div>
              <div className="title">
                <h1>Strangers: Capítulo 2</h1><span className="year">(2025)</span>
              </div>
              <div className="meta-row">
                <span className="rating"><span className="dot"></span> 56% • 98 min • HD</span>
                <span className="pill">Terror</span>
                <span className="pill">Suspense</span>
                <span className="pill">EN / LAT</span>
              </div>
              <p className="syn">De camino a su luna de miel, el vehículo de una pareja se avería y terminan en un remoto Airbnb. Al caer la noche, tres enmascarados los aterrorizarán hasta el amanecer.</p>
            </header>

            <div className="bar">
              <div className="row">
                <div className="tag"><span className="dot"></span> Latino <small style={{opacity:.7}}>CALIDAD HD</small></div>
                <div className="tag"><span className="dot"></span> Descargar <small style={{opacity:.7}}>CALIDAD HD</small></div>
              </div>
            </div>

            <div className="player" onClick={() => navigate("/ver/strangers2")}>
              <div className="ph"></div>
            </div>

            <section className="features">
              <div className="box">
                <h3>Ficha técnica</h3>
                <div className="kv">
                  <div><strong>Año:</strong> 2025</div>
                  <div><strong>Director:</strong> Renny Harlin</div>
                </div>
              </div>
            </section>

            <section className="section">
              <h3>Otras películas</h3>
              <div className="grid-posters">
                <article className="tile">
                  <div className="ph" style={{backgroundImage:"url('https://es.web.img3.acsta.net/img/62/46/6246aaf188733c9de0368b2a6f4424ef.jpg')"}}></div>
                  <p>Sin rastro (2025)</p>
                </article>
                <article className="tile">
                  <div className="ph" style={{backgroundImage:"url('https://es.web.img3.acsta.net/img/85/17/8517490cd4d157b767398338fd8869ff.jpg')"}}></div>
                  <p>Vengador tóxico (2025)</p>
                </article>
                <article className="tile">
                  <div className="ph" style={{backgroundImage:"url('https://m.media-amazon.com/images/M/MV5BMTVjMzNmZGYtOWU5NS00NDYzLThhZTktZGNlODIwYWVhMDRmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg')"}}></div>
                  <p>Black Phone 2 (2025)</p>
                </article>
                <article className="tile">
                  <div className="ph" style={{backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTD0ADDvUIHuYfYeD6xADEeVqS0_bWtCtgw&s')"}}></div>
                  <p>Las guerreras k-pop (2025)</p>
                </article>
                <article className="tile">
                  <div className="ph" style={{backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAEIzdbcDS5zLtqrEQAMnlQElQO43rNqgRPA&s')"}}></div>
                  <p>Oppenheimer (2023)</p>
                </article>
              </div>
            </section>
          </section>

          {}
          <aside className="aside">
            <div className="panel list">
              <div className="tabs">
                <button className="tab active">Actualizado</button>
                <button className="tab">Últimas</button>
              </div>

              <div className="item">
                <div className="thumb"><img src="https://es.web.img3.acsta.net/c_300_300/img/05/7f/057fcbe68a0d4aa02fc0c5736531aa4c.jpeg" alt="" /></div>
                <div>
                  <p className="it-title">Culpa nuestra (2025)</p>
                  <small style={{color:"var(--muted)"}}>Drama • 1h 58m</small>
                </div>
                <span className="badge">7.8/10</span>
              </div>

              <div className="item" style={{marginTop:8}}>
                <div className="thumb"><img src="https://m.media-amazon.com/images/M/MV5BNTcwYWE1NTYtOWNiYy00NzY3LWIwY2MtNjJmZDkxNDNmOWE1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" alt="" /></div>
                <div>
                  <p className="it-title">Furioza 2 (2025)</p>
                  <small style={{color:"var(--muted)"}}>Acción • 2h 10m</small>
                </div>
                <span className="badge">6.5/10</span>
              </div>

              <div className="item" style={{marginTop:8}}>
                <div className="thumb"><img src="https://pics.filmaffinity.com/the_conjuring_last_rites-547210494-large.jpg" alt="" /></div>
                <div>
                  <p className="it-title">Expediente Warren: Último rito</p>
                  <small style={{color:"var(--muted)"}}>Terror • 1h 54m</small>
                </div>
                <span className="badge">6.9/10</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

