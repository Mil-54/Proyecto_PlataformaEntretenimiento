import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TipoContenido = () => {
  const navigate = useNavigate();

  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    setOverlayVisible(true);
  }, []);

  const closeModals = () => {
    setOverlayVisible(false);
  };
  const handleTipoClick = (tipo) => {
    navigate(`/resultados?tipo=${tipo}`);
  };


  return (
    <>
      <style>{`
        /* ... Estilos omitidos para brevedad, son los mismos que tenías ... */
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

        /* Nota: El overflow del body/html se controlará ahora en el useEffect */
        html, body {
          /* height: 100%; (puede causar problemas con overflow: hidden) */
          margin: 0;
          font-family: "Nunito Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          color: var(--text);
          background: var(--bg);
        }
        
        /* ... el resto de tus estilos CSS (overlay, modal-wrapper, etc.) ... */

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(3px);
          z-index: 5;
          display: none;
        }

        .overlay.active {
          display: block;
        }

        .modal-wrapper {
          width: min(700px, 90%);
          border-radius: 18px;
          padding: 40px;
          background: var(--panel);
          border: 2px solid var(--purple);
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          text-align: center;
          box-shadow: 0 0 25px rgba(157, 78, 221, 0.4);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.96); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
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
          background: var(--purple);
          color: #fff;
        }

        .modal-title {
          font-size: 2rem;
          font-weight: 800;
          margin: 4px 0 30px;
          color: var(--purple);
        }

        .options-grid {
          display: flex;
          gap: 30px;
          justify-content: center;
          margin-top: 10px;
        }

        .option-box {
          flex: 1;
          padding: 40px 0;
          border-radius: 12px;
          background: var(--panel-2);
          border: 2px solid var(--purple);
          font-weight: 700;
          color: var(--text);
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          font-size: 1.2rem;
        }

        .option-box:hover {
          background: var(--purple);
          color: #fff;
        }

        .photos-container {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .photo-card {
          width: 140px;
          height: 200px;
          background: var(--panel-2);
          border: 2px solid var(--purple);
          border-radius: 12px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 8px;
          font-weight: 700;
          color: #fff;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .photo-card:hover {
          border-color: #c77dff;
          box-shadow: 0 0 15px #9d4edd;
        }

        .photo-card .title {
          width: 100%;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
          padding: 4px 0;
          font-size: 0.9rem;
          border-radius: 0 0 10px 10px;
        }

        @media (max-width: 700px) {
          .options-grid {
            flex-direction: column;
            gap: 20px;
          }
        }
          *{
  box-shadow:none !important;
}

.dot{
  display:none !important;
}
      `}</style>

      <div
        className={`overlay ${overlayVisible ? "active" : ""}`}
        onClick={closeModals}
      ></div>

      <div className="modal-wrapper">
        <button className="close-x" onClick={closeModals}>✕</button>

        <div className="modal-title">¿De qué tipo?</div>

        <div className="options-grid">
          <div className="option-box" onClick={() => handleTipoClick("peliculas")}>
            Películas
          </div>

          <div className="option-box" onClick={() => handleTipoClick("series")}>
            Series
          </div>
        </div>
      </div>
    </>
  );
};

export default TipoContenido;