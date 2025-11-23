
import { useEffect, useMemo, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function getVideoById(id) {
  const catalog = {
    strangers2: {
      title: "Strangers: Capítulo 2 (2025)",
      poster: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2025/06/strangers-capitulo-2-4338497.jpg?tf=3840x",
      sources: [{ src: "/videos/strangers2-1080.mp4", type: "video/mp4" }],
      subtitles: [],
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
    const onTime = () => localStorage.setItem(storageKey, String(v.currentTime));
    const onEnded = () => localStorage.removeItem(storageKey);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnded);
    };
  }, [storageKey]);

  return (
    <div className="watch">
      {/* ESTILOS Godzilla-like (autónomos) */}
      <style>{`
        :root{
          --watch-bg:#0e1118;           /* azul-negruzco */
          --watch-bg-deep:#0a0c13;
          --watch-grad-1:#151a25;      /* capa superior */
          --watch-grad-2:#0f131d;
          --watch-purple:#8b4dff;
          --watch-purple-2:#c057ff;
          --watch-text:#e9e9f1;
          --watch-muted:#b6b9c8;
          --watch-border:rgba(255,255,255,.08);
        }
        .watch{
          min-height:100vh;
          background:
            radial-gradient(120% 70% at 50% -10%, rgba(139,77,255,.18) 0%, transparent 60%),
            linear-gradient(180deg, var(--watch-grad-1) 0%, var(--watch-bg) 45%, var(--watch-bg-deep) 100%);
          color:var(--watch-text);
          display:flex; flex-direction:column;
        }
        .watch__header{
          position:sticky; top:0; z-index:10;
          display:flex; align-items:center; justify-content:space-between;
          gap:16px;
          padding:14px clamp(12px, 2vw, 28px);
          background: linear-gradient(90deg, rgba(26,30,44,.85), rgba(18,21,33,.85));
          backdrop-filter: blur(6px);
          border-bottom:1px solid var(--watch-border);
          box-shadow: 0 8px 28px rgba(0,0,0,.35);
        }
        .watch__logo{
          display:flex; align-items:center; gap:10px; font-weight:800; letter-spacing:.4px;
          color:#d3b5ff; text-shadow:0 0 12px rgba(192,87,255,.35);
        }
        .watch__dot{
          width:12px; height:12px; border-radius:999px;
          background: radial-gradient(circle at 45% 40%, #fff 0%, var(--watch-purple-2) 35%, var(--watch-purple) 70%, #4a2a9f 100%);
          box-shadow:0 0 18px rgba(192,87,255,.9), 0 0 40px rgba(48,20,120,.6) inset;
        }
        .watch__actions{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
        .btn-primary, .btn-secondary{
          border:none; cursor:pointer; border-radius:12px; padding:9px 16px; font-weight:700;
          transition:.22s transform, .22s box-shadow, .22s filter;
        }
        .btn-primary{
          color:#fff;
          background: linear-gradient(90deg, var(--watch-purple) 0%, var(--watch-purple-2) 100%);
          box-shadow: 0 8px 24px rgba(192,87,255,.35);
        }
        .btn-primary:hover{ transform: translateY(-1px); box-shadow:0 10px 28px rgba(192,87,255,.5); }
        .btn-secondary{
          color:#f2eaff; background: rgba(139,77,255,.12);
          border:1px solid rgba(139,77,255,.35);
        }
        .btn-secondary:hover{ filter: brightness(1.08); }
        .link{ color:var(--watch-muted); text-decoration:none; font-weight:600; }
        .link:hover{ color:#f3e8ff; }

        .wrap{ padding: clamp(10px, 2.2vw, 28px); }
        .watch__panel{
          background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.0)), #121620;
          border:1px solid var(--watch-border);
          border-radius:18px;
          box-shadow: 0 14px 30px rgba(0,0,0,.5);
          padding: clamp(8px, 1vw, 14px);
        }
        .video-el{
          width:100%; height:auto; aspect-ratio:16/9; display:block; border-radius:14px;
          background:#000;
        }

        /* Responsive */
        @media (max-width: 720px){
          .watch__header{ padding:12px 14px; }
          .btn-primary, .btn-secondary{ padding:8px 12px; }
        }
      `}</style>

      {/* Header Godzilla-like */}
      <header className="watch__header">
        <div className="watch__logo">
          <span className="watch__dot" />
          <span>VISIONPLUS</span>
        </div>

        <div className="watch__actions">
          <button className="btn-secondary" onClick={() => navigate(-1)}>Volver</button>
          <Link to="/" className="btn-primary">Salir</Link>
          <Link to="/perfil" className="link">Perfil</Link>
          <Link to="/notificaciones" className="link">Notificaciones</Link>
        </div>
      </header>

      {/* Contenido */}
      <main className="wrap">
        <h1 style={{margin: "6px 0 12px 4px", fontSize: "clamp(18px,2.2vw,28px)"}}>
          {data.title}
        </h1>

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
    </div>
  );
}
