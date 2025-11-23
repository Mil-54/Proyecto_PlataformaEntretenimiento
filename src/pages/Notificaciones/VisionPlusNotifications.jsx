// src/components/VisionPlusNotifications.jsx
import React from "react";
import "./VisionPlusNotifications.css";

export default function VisionPlusNotifications() {
  const onSearch = (e) => e.preventDefault();

  return (
    <div className="vpnotif-page">

      {/* HEADER */}
      <header className="vpnotif-header">
        <div className="vpnotif-brand">VISIONPLUS</div>

        <nav className="vpnotif-nav">
          <a className="vpnotif-link">Inicio</a>
          <a className="vpnotif-link active">Notificaciones</a>
        </nav>

        <div className="vpnotif-actions">
          <a className="vpnotif-link-icon">
            <svg width="20" height="20" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4"/>
              <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
            </svg>
            <span>Perfil</span>
          </a>

          <a className="vpnotif-link-icon">
            <svg width="20" height="20" stroke="currentColor" strokeWidth="2">
              <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <span>Notificaciones</span>
          </a>
        </div>
      </header>

      {/* BUSCADOR */}
      <form
        className="vpnotif-search"
        onSubmit={onSearch}
        role="search"
        style={{ position:"absolute", left:"50%", top:20, transform:"translateX(-50%)" }}
      >
        <input type="search" placeholder="Buscar..." />
        <button className="vpnotif-btn" type="submit">
          <svg stroke="#fff" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/>
            <path d="M20 20L16.65 16.65"/>
          </svg>
        </button>
      </form>

      {/* CONTENIDO */}
      <main className="vpnotif-wrap">
        <div className="vpnotif-section-head">
          <h2>Notificaciones</h2>
          <div className="vpnotif-hr"></div>
        </div>

        <section className="vpnotif-timeline">

          {/* GRUPO 1 */}
          <div className="vpnotif-group">
            <div className="vpnotif-date">15 de Septiembre 2025</div>

            <div className="vpnotif-item">
              <div className="vpnotif-msg">Su plan fue realizado exitosamente</div>
              <div className="vpnotif-time">11:20 a.m</div>
            </div>

            <div className="vpnotif-item">
              <div className="vpnotif-msg">Stranger Things se ha agregado a “Mi lista”</div>
              <div className="vpnotif-time">7:25 p.m</div>
            </div>
          </div>

          {/* GRUPO 2 */}
          <div className="vpnotif-group">
            <div className="vpnotif-date">10 de Octubre 2025</div>

            <div className="vpnotif-item">
              <div className="vpnotif-msg">Su plan está a punto de vencer</div>
              <div className="vpnotif-time">11:00 a.m</div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
