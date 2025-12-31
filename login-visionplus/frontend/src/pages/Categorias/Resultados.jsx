import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Resultados = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [peliculas, setPeliculas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ejemploPeliculas = [
      { titulo: "Película A", img: "https://placehold.co/300x200/9d4edd/FFFFFF?text=Película+A", id: "a" },
      { titulo: "Película B", img: "https://placehold.co/300x200/9d4edd/FFFFFF?text=Película+B", id: "b" },
      { titulo: "Película C", img: "https://placehold.co/300x200/9d4edd/FFFFFF?text=Película+C", id: "c" },
      { titulo: "Película D", img: "https://placehold.co/300x200/9d4edd/FFFFFF?text=Película+D", id: "d" },
      { titulo: "Película E", img: "https://placehold.co/300x200/9d4edd/FFFFFF?text=Película+E", id: "e" },
    ];
    setPeliculas(ejemploPeliculas);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const closeResultados = () => {
    setIsOpen(false);
    setTimeout(() => window.history.back(), 300);
  };
  const handleCardClick = (peliculaID) => {
    navigate(`/detail/${peliculaID}`);
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

        html, body {
          margin: 0;
          background: var(--bg);
          font-family: "Nunito Sans", system-ui, sans-serif;
          color: var(--text);
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(3px);
          z-index: 10;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .overlay.active {
          opacity: 1;
          pointer-events: all;
        }

        .modal-wrapper {
          width: min(900px, 90%);
          padding: 40px;
          background: var(--panel);
          border-radius: 18px;
          border: 2px solid var(--purple);
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          text-align: center;
          box-shadow: 0 0 25px rgba(157, 78, 221, 0.4);
        }

        .close-x {
          position: absolute;
          right: 18px;
          top: 18px;
          border: none;
          background: transparent;
          color: var(--purple);
          cursor: pointer;
          font-size: 20px;
        }

        .modal-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 25px;
          color: var(--purple);
        }

        .photos-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 20px;
        }

        .photo-box {
          border-radius: 12px;
          overflow: hidden;
          background: var(--panel-2);
          border: 2px solid var(--purple);
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .photo-box:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(157, 78, 221, 0.6);
        }

        .photo-box img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .photo-box p {
          margin: 10px 0;
          font-size: 1rem;
          font-weight: 700;
        }
          *{
  box-shadow:none !important;
}

.dot{
  display:none !important;
}
      `}</style>

      <div
        className={`overlay ${isOpen ? "active" : ""}`}
        onClick={closeResultados}
      ></div>

      <div className="modal-wrapper">
        <button className="close-x" onClick={closeResultados}>✕</button>

        <div className="modal-title">Resultados de tu búsqueda</div>

        <div className="photos-container">
          {peliculas.map((p, i) => (
            <div
              key={i}
              className="photo-box"
              onClick={() => handleCardClick(p.id)}
            >
              <img src={p.img} alt={p.titulo} />
              <p>{p.titulo}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Resultados;
