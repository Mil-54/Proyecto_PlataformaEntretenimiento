import React from "react";
import "./VisionPlusPlan.css";

export default function VisionPlusPlan() {
  const handleSelect = (plan) => {
    console.log("Seleccionaste:", plan);
  };

  return (
    <div className="vpp-body">

      {/* HEADER */}
      <header className="vpp-header">
        <div className="vpp-brand">VISIONPLUS</div>

        <nav className="vpp-nav">
          <a>Inicio</a>
          <a aria-current="page">Mi Plan</a>
        </nav>

        <div className="vpp-actions">
          <a>
            <span>👤</span> Perfil
          </a>
          <a>
            <span>🔔</span> Notificaciones
          </a>
        </div>
      </header>

      {/* BUSCADOR */}
      <form className="vpp-search" onSubmit={(e)=>e.preventDefault()}>
        <input type="search" placeholder="Buscar" />
        <button className="vpp-btn">🔍</button>
      </form>

      {/* CONTENIDO */}
      <main className="vpp-wrap">

        <div className="vpp-section-head">
          <h2>Mi Plan</h2>
          <div className="vpp-hr"></div>
        </div>

        <section className="vpp-pricing">

          {/* FREE */}
          <article className="vpp-card">
            <header>
              <div className="icon">📱</div>
              <h3>Plan FREE</h3>
            </header>

            <ul className="vpp-features">
              <li>1 dispositivo</li>
              <li>Catálogo limitado</li>
              <li>Publicidad</li>
              <li>Calidad HD</li>
              <li>Soporte estándar</li>
            </ul>

            <div className="vpp-actions">
              <button className="vpp-btn-select" onClick={() => handleSelect("FREE")}>
                Seleccionar Plan
              </button>
            </div>
          </article>

          {/* PREMIUM */}
          <article className="vpp-card">
            <header>
              <div className="icon">📱</div>
              <h3>Plan PREMIUM</h3>
            </header>

            <ul className="vpp-features">
              <li>2 dispositivos</li>
              <li>Todo el catálogo</li>
              <li>Sin publicidad</li>
              <li>Full HD / 4K</li>
              <li>Descargas offline</li>
            </ul>

            <div className="vpp-actions">
              <button className="vpp-btn-select" onClick={() => handleSelect("PREMIUM")}>
                Seleccionar Plan
              </button>
            </div>
          </article>

          {/* FAMILY */}
          <article className="vpp-card">
            <header>
              <div className="icon">📱</div>
              <h3>Plan FAMILY</h3>
            </header>

            <ul className="vpp-features">
              <li>Hasta 4 dispositivos</li>
              <li>Todo el catálogo</li>
              <li>Perfiles infantiles</li>
              <li>4K / HDR</li>
              <li>Soporte prioritario</li>
            </ul>

            <div className="vpp-actions">
              <button className="vpp-btn-select" onClick={() => handleSelect("FAMILY")}>
                Seleccionar Plan
              </button>
            </div>
          </article>

        </section>

        <p className="vpp-note">Su plan reciente es de ….</p>

      </main>
    </div>
  );
}
