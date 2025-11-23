// src/pages/Inicio/Inicio.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Inicio.css";

export default function Inicio() {

  const navigate = useNavigate();

  // ▶ IR AL REPRODUCTOR (PlayerPage.jsx)
  function goToPlayer() {
    navigate("/ver/strangerthings");
  }

  // ℹ IR A DETALLES (VisionPlusDetail.jsx)
  function goToDetail() {
    navigate("/detail/strangerthings");
  }

  // 👤 IR A PERFIL (VisionPlusPerfil.jsx)
  function goToPerfil() {
    navigate("/perfil");
  }

  // 🔔 IR A NOTIFICACIONES (VisionPlusNotifications.jsx)
  function goToNotifications() {
    navigate("/notificaciones");
  }

  return (
    <div className="inicio-page">

      {/* NAVBAR */}
      <header className="inicio-navbar">
        <div className="inicio-logo">
          <span></span> VISIONPLUS
        </div>

        <nav className="inicio-nav">
          <a className="active">Inicio</a>
          <a>Mi lista</a>
        </nav>

        <div className="inicio-search-box">
          <input type="text" placeholder="Buscar..." />
          <button>🔍</button>
        </div>

        <div className="inicio-user">
          {/* 🔥 SE AGREGARON LOS EVENTOS */}
          <div onClick={goToPerfil} style={{ cursor: "pointer" }}>
            Perfil
          </div>
          <div onClick={goToNotifications} style={{ cursor: "pointer" }}>
            Notificaciones
          </div>
        </div>
      </header>

      {/* HERO */}
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

      {/* TENDENCIAS */}
      <section className="inicio-section">
        <h2>Tendencias...</h2>

        <div className="inicio-list">
          {[
            "Venom","Monsters of War","E.T.","Cazador de Monstruos",
            "Jupiter Ascending","Troll","TUA","The Strangers"
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
