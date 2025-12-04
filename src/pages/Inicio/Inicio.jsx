import React from "react";
import { useNavigate } from "react-router-dom";
import "./Inicio.css";

export default function Inicio() {

  const navigate = useNavigate();


  function goToPlayer() {
    navigate("/ver/strangerthings");
  }

  function goToDetail() {
    navigate("/detail/strangerthings");
  }

  function goToMiLista() {
    navigate("/milista");
  }

  function goToBusqueda() {
    navigate("/busqueda");
  }


  function goToPerfil() {
    navigate("/perfil");
  }

  function goToNotifications() {
    navigate("/notificaciones");
  }

  return (
    <div className="inicio-page">

      { }
      <header className="inicio-navbar">
        <div className="inicio-logo">
          VISIONPLUS
        </div>

        <nav className="inicio-nav">
          <a className="active">Inicio</a>
          <a onClick={goToMiLista} style={{ cursor: "pointer" }}>Mi lista</a>
        </nav>

        { }
        <div className="inicio-search-box" onClick={goToBusqueda}>
          <input
            type="text"
            placeholder="Buscar..."
            onFocus={goToBusqueda}
            readOnly
          />
          <button className="inicio-search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <div className="inicio-user">
          <div onClick={goToPerfil} style={{ cursor: "pointer" }}>
            Perfil
          </div>
          <div onClick={goToNotifications} style={{ cursor: "pointer" }}>
            Notificaciones
          </div>
        </div>
      </header>

      { }
      <section className="inicio-hero">
        <div className="inicio-hero-bg"></div>

        <div className="inicio-hero-content">
          <h1>Stranger Things</h1>
          <p>
            Cuando un niño desaparece, sus amigos, la familia y la policía
            se ven envueltos en un misterio con fuerzas sobrenaturales.
          </p>

          <div className="inicio-buttons">
            <button
              className="inicio-btn inicio-btn-primary"
              onClick={goToPlayer}
            >
              Ver ahora
            </button>

            <button
              className="inicio-btn inicio-btn-secondary"
              onClick={goToDetail}
            >
              Más info
            </button>
          </div>
        </div>
      </section>

      { }
      <section className="inicio-section">
        <h2>Tendencias...</h2>

        <div className="inicio-list">
          {[
            "Venom", "Monsters of War", "E.T.", "Cazador de Monstruos",
            "Jupiter Ascending", "Troll", "TUA", "The Strangers"
          ].map((title, index) => (
            <div className="inicio-movie" key={index}>
              <img
                src="https://placehold.co/300x420/111111/FFFFFF?text=Poster"
                alt={title}
              />
              <div className="inicio-movie-title">{title}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
