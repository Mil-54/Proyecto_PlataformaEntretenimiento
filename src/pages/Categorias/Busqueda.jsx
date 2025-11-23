import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";   // ← AGREGADO

const Busqueda = () => {

  const navigate = useNavigate();  // ← AGREGADO

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  const closeSearch = () => setIsOpen(false);

  // 🟣 FUNCIÓN QUE AHORA NAVEGA A TipoContenido.jsx
  const handleCategoryClick = (key) => {
    setSelectedCat(key);

    // Cerrar modal
    setIsOpen(false);

    // Navegar a la siguiente pantalla
    navigate(`/tipocontenido?cat=${key}`);
  };

  return (
    <>
      
      <style>{`
        :root {
          --bg: #0e1117;
          --panel: #141925;
          --panel-2: #1a2030;
          --purple: #9d4edd;
          --text: #e8eaf0;
          --muted: #aeb3c2;
        }

        * {
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          font-family: "Nunito Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }

        body {
          background: var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          color: var(--text);
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(14, 17, 23, 0.8);
          z-index: 10;
          display: none;
        }

        .overlay.active {
          display: block;
        }

        .modal-wrapper {
          width: min(920px, 92%);
          max-width: 1000px;
          border-radius: 18px;
          padding: 26px;
          background: var(--panel);
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          border: 2px solid var(--purple);
          z-index: 20;
          display: none;
        }

        .modal-wrapper.active {
          display: block;
        }

        .close-x {
          position: absolute;
          right: 18px;
          top: 18px;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          cursor: pointer;
          color: var(--purple);
          border: none;
          background: transparent;
          transition: all 0.2s ease;
        }

        .close-x:hover {
          background: rgba(157, 78, 221, 0.2);
        }

        .modal-title {
          font-size: 1.6rem;
          font-weight: 800;
          margin: 4px 0 12px;
          color: var(--purple);
        }

        .modal-sub {
          color: var(--muted);
          margin-bottom: 18px;
          font-size: 1rem;
        }

        .search-row {
          display: flex;
          gap: 14px;
          align-items: center;
          margin-bottom: 18px;
          justify-content: center;
        }

        .search-input {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--panel-2);
          padding: 12px 16px;
          border-radius: 999px;
          border: none;
        }

        .search-input input {
          background: transparent;
          border: 0;
          outline: 0;
          color: var(--text);
          width: 100%;
          font-size: 1rem;
        }

        .search-btn {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          border: none;
          background: var(--purple);
          display: grid;
          place-items: center;
          color: #fff;
          cursor: pointer;
        }

        .cat-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .cat {
          border-radius: 12px;
          padding: 18px 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--panel-2);
          cursor: pointer;
          transition: all 0.18s ease;
          min-height: 92px;
          font-weight: 700;
          color: var(--text);
          text-align: center;
          border: 2px solid var(--purple);
        }

        .cat:hover {
          transform: translateY(-4px);
          background: var(--purple);
          color: #fff;
        }

        .cat.selected {
          background: var(--purple);
          color: #fff;
        }

        @media (max-width: 720px) {
          .cat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .modal-wrapper {
            padding: 18px;
            width: min(92%, 640px);
          }
        }
      `}</style>

      <div
        className={`overlay ${isOpen ? "active" : ""}`}
        onClick={closeSearch}
      ></div>

      <div className={`modal-wrapper ${isOpen ? "active" : ""}`}>
        <button className="close-x" onClick={closeSearch}>✕</button>

        <div className="modal-title">¿Qué te apetece ver?</div>
        <div className="modal-sub">
          Elige una emoción o género y descubre nuevas recomendaciones.
        </div>

        {/* Barra de búsqueda */}
        <div className="search-row">
          <div className="search-input">
            <input type="text" placeholder="Buscar serie o película..." />
          </div>
          <button className="search-btn">🔍</button>
        </div>

        {/* BOTONES DE CATEGORÍA */}
        <div className="cat-grid">
          {[
            { key: "reir", label: "Reír" },
            { key: "pasar", label: "Pasar el rato" },
            { key: "fantasia", label: "Fantástico" },
            { key: "llorar", label: "Llorar" },
            { key: "miedo", label: "Miedo" },
            { key: "accion", label: "Acción" },
          ].map((cat) => (
            <div
              key={cat.key}
              className={`cat ${selectedCat === cat.key ? "selected" : ""}`}
              onClick={() => handleCategoryClick(cat.key)}   // ← AQUÍ SE NAVEGA
            >
              {cat.label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Busqueda;