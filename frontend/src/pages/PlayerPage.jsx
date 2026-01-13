import { useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "/src/pages/Inicio/Inicio.css"; 

function getVideoById(id) {
  const catalog = {
    strangers2: {
      title: "Strangers: Capítulo 2 (2025)",
      poster:
        "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2025/06/strangers-capitulo-2-4338497.jpg?tf=3840x",
      sources: [{ src: "/videos/strangers2-1080.mp4", type: "video/mp4" }],
    },
    strangerthings: {
      title: "Stranger Things",
      poster:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
      sources: [{ src: "/videos/strangerthings.mp4", type: "video/mp4" }],
    },
  };
  return catalog[id] ?? { title: id, sources: [] };
}

export default function PlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useMemo(() => getVideoById(id), [id]);
  const videoRef = useRef(null);
  const storageKey = `vp-progress:${id}`;

  // Restaurar progreso
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const t = Number(localStorage.getItem(storageKey) || 0);
    const onLoaded = () => {
      if (t && v.duration && t < v.duration - 3) v.currentTime = t;
    };
    v.addEventListener("loadedmetadata", onLoaded);
    return () => v.removeEventListener("loadedmetadata", onLoaded);
  }, [storageKey]);

  // Guardar progreso
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () =>
      localStorage.setItem(storageKey, String(v.currentTime));
    const onEnded = () => localStorage.removeItem(storageKey);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnded);
    };
  }, [storageKey]);

  // Navegaciones
  function goToInicio() { navigate("/"); }
  function goToMiLista() { navigate("/milista"); }
  function goToBusqueda() { navigate("/busqueda"); }
  function goToPerfil() { navigate("/perfil"); }
  function goToNotifications() { navigate("/notificaciones"); }

  return (
    <div className="inicio-page">
      {/* Estilos extra solo para el video, para no dañar el CSS general */}
      <style>{`
        .watch-main { padding: 40px 50px; }
        .watch-title { font-size: 32px; font-weight: 800; margin-bottom: 20px; }
        .watch__panel { 
          background: var(--i-panel2); 
          border-radius: 16px; 
          padding: 12px; 
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 12px 28px rgba(0,0,0,.55);
        }
        .video-el { width: 100%; border-radius: 12px; background: #000; aspect-ratio: 16/9; }
      `}</style>

      {/* === Barra superior (Ahora usa las clases de inicio.css) === */}
      <header className="inicio-navbar">
        <div className="inicio-logo brand">VISIONPLUS</div>

        <nav className="inicio-nav">
          <a onClick={goToInicio}>Inicio</a>
          <a onClick={goToMiLista}>Mi lista</a>
        </nav>

        <div className="inicio-search-box" onClick={goToBusqueda}>
          <input type="text" placeholder="Buscar..." readOnly />
          <button>🔍</button>
        </div>

        <div className="inicio-user">
          <div onClick={goToPerfil}>Perfil</div>
          <div onClick={goToNotifications}>Notificaciones</div>
        </div>
      </header>

      {/* === Contenido del reproductor === */}
      <main className="watch-main">
        <h1 className="watch-title">{data.title}</h1>
        <div className="watch__panel">
          <video
            ref={videoRef}
            className="video-el"
            controls
            preload="metadata"
            poster={data.poster}
            playsInline
          >
            {data.sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
            Tu navegador no soporta video HTML5.
          </video>
        </div>
      </main>
      <button
              className="inicio-btn inicio-btn-primary"
              onClick={goToInicio}
            >
              Regresar
            </button>
    </div>
  );
}