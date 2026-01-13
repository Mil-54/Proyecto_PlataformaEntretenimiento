import { useNavigate } from "react-router-dom";
import "./VisionPlusDetail.css";

export default function VisionPlusDetail() {
  const navigate = useNavigate();

  return (
    <>

      <header className="inicio-navbar header">
        <div className="inicio-logo brand">
          VISIONPLUS
        </div>

        <nav className="inicio-nav">
          <a className="active">Inicio</a>
          <a onClick={() => navigate("/MiLista")} style={{ cursor: "pointer" }}>Mi lista</a>
        </nav>

        <div className="inicio-search-box" onClick={() => navigate("/busqueda")}>
          <input
            type="text"
            placeholder="Buscar..."
            onFocus={() => navigate("/busqueda")}
            readOnly
          />
          <button>🔍</button>
        </div>

        <div className="inicio-user">
          <div onClick={() => navigate("/perfil")} style={{ cursor: "pointer" }}>
            Perfil
          </div>
          <div onClick={() => navigate("/notificaciones")} style={{ cursor: "pointer" }}>
            Notificaciones
          </div>
        </div>
      </header>

      <main className="wrap">
        <div className="grid">
          { }
          <aside className="left">
            <figure className="poster">
              <img src="https://m.media-amazon.com/images/M/MV5BMTY1OTIwODgzMV5BMl5BanBnXkFtZTgwMzUyMDgzNDM@._V1_.jpg" alt="Poster" />
            </figure>
            <div className="actions">
              <button className="act-btn">➕ Agregar a… <small>Mi lista</small></button>
            </div>
          </aside>


          <section>
            <header className="panel detail-hero">
              <div className="bg" style={{ backgroundImage: "url('https://images.justwatch.com/backdrop/318995289/s640/the-strangers')" }}></div>
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
                <div className="tag"><span className="dot"></span> Latino <small style={{ opacity: .7 }}>CALIDAD HD</small></div>
                <div className="tag"><span className="dot"></span> Descargar <small style={{ opacity: .7 }}>CALIDAD HD</small></div>
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
              <h3>Otras películas</h3><p></p>
              <div className="grid-posters">
                <article className="tile">
                  <div className="ph" style={{ backgroundImage: "url('https://es.web.img3.acsta.net/img/62/46/6246aaf188733c9de0368b2a6f4424ef.jpg')" }}></div>
                  <p>Sin rastro (2025)</p>
                </article>
                <article className="tile">
                  <div className="ph" style={{ backgroundImage: "url('https://es.web.img3.acsta.net/img/85/17/8517490cd4d157b767398338fd8869ff.jpg')" }}></div>
                  <p>Vengador tóxico (2025)</p>
                </article>
                <article className="tile">
                  <div className="ph" style={{ backgroundImage: "url('https://m.media-amazon.com/images/M/MV5BMTVjMzNmZGYtOWU5NS00NDYzLThhZTktZGNlODIwYWVhMDRmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg')" }}></div>
                  <p>Black Phone 2 (2025)</p>
                </article>
                <article className="tile">
                  <div className="ph" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTD0ADDvUIHuYfYeD6xADEeVqS0_bWtCtgw&s')" }}></div>
                  <p>Las guerreras k-pop (2025)</p>
                </article>
                <article className="tile">
                  <div className="ph" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAEIzdbcDS5zLtqrEQAMnlQElQO43rNqgRPA&s')" }}></div>
                  <p>Oppenheimer (2023)</p>
                </article>
              </div>
            </section>
          </section>

          { }
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
                  <small style={{ color: "var(--muted)" }}>Drama • 1h 58m</small>
                </div>
                <span className="badge">7.8/10</span>
              </div>

              <div className="item" style={{ marginTop: 8 }}>
                <div className="thumb"><img src="https://m.media-amazon.com/images/M/MV5BNTcwYWE1NTYtOWNiYy00NzY3LWIwY2MtNjJmZDkxNDNmOWE1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" alt="" /></div>
                <div>
                  <p className="it-title">Furioza 2 (2025)</p>
                  <small style={{ color: "var(--muted)" }}>Acción • 2h 10m</small>
                </div>
                <span className="badge">6.5/10</span>
              </div>

              <div className="item" style={{ marginTop: 8 }}>
                <div className="thumb"><img src="https://pics.filmaffinity.com/the_conjuring_last_rites-547210494-large.jpg" alt="" /></div>
                <div>
                  <p className="it-title">Expediente Warren: Último rito</p>
                  <small style={{ color: "var(--muted)" }}>Terror • 1h 54m</small>
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