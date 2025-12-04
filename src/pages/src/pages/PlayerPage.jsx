import { useEffect, useMemo, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function getVideoById(id) {
  const catalog = {
    strangers2: {
      title: "Strangers: Capítulo 2 (2025)",
      poster:
        "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2025/06/strangers-capitulo-2-4338497.jpg?tf=3840x",
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

  return (
    <div className="watch">
      {/* ESTILOS con misma paleta que INICIO */}
      <style>{`
        /* ================================
           PALETA GLOBAL TIPO INICIO
           ================================ */
        :root{
          --i-bg:#0b0d13;
          --i-panel:#141925;
          --i-panel2:#1a2030;
          --i-purple:#9d4edd;
          --i-purple2:#7b2cbf;
          --i-glow:#c77dff;
          --i-text:#e8eaf0;
          --i-muted:#aeb3c2;
        }

        .watch{
          min-height:100vh;
          background:
            radial-gradient(1000px 600px at 50% -10%, rgba(199,125,255,.12), transparent 70%),
            var(--i-bg);
          color:var(--i-text);
          font-family:"Nunito Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          display:flex;
          flex-direction:column;
        }

        /* HEADER parecido al de INICIO */
        .watch__header{
          position:sticky;
          top:0;
          z-index:40;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:16px;
          padding:10px 26px;
          background:var(--i-panel);
          border-bottom:1px solid rgba(199,125,255,.25);
          box-shadow:0 0 20px rgba(157,78,221,.15);
        }

        .watch__logo{
          font-weight:900;
          font-size:1.1rem;
          display:flex;
          align-items:center;
          gap:8px;
          color:var(--i-glow);
        }

        .watch__actions{
          display:flex;
          align-items:center;
          gap:10px;
          flex-wrap:wrap;
        }

        .btn-primary,
        .btn-secondary{
          border:none;
          cursor:pointer;
          border-radius:8px;
          padding:8px 16px;
          font-weight:800;
          font-size:.9rem;
          transition:.2s transform,.2s box-shadow,.2s filter,.2s background;
        }

        .btn-primary{
          background:linear-gradient(90deg,var(--i-purple),var(--i-purple2));
          color:#fff;
          box-shadow:0 6px 16px rgba(0,0,0,.45);
          text-decoration:none;
          display:inline-flex;
          align-items:center;
          justify-content:center;
        }
        .btn-primary:hover{
          transform:translateY(-1px);
          box-shadow:0 10px 22px rgba(0,0,0,.6);
        }

        .btn-secondary{
          background:var(--i-panel2);
          color:var(--i-text);
          border:1px solid rgba(199,125,255,.35);
        }
        .btn-secondary:hover{
          background:rgba(199,125,255,.12);
        }

        .link{
          color:var(--i-muted);
          text-decoration:none;
          font-weight:700;
          font-size:.9rem;
        }
        .link:hover{
          color:var(--i-text);
        }

        /* CONTENIDO */
        .watch-main{
          padding:32px 50px 48px;
        }

        .watch-title{
          margin:0 0 16px;
          font-size:clamp(20px,2.4vw,28px);
          font-weight:800;
        }

        .watch__panel{
          background:var(--i-panel2);
          border-radius:16px;
          border:1px solid rgba(255,255,255,.08);
          box-shadow:0 12px 28px rgba(0,0,0,.55);
          padding:12px;
        }

        .video-el{
          width:100%;
          height:auto;
          aspect-ratio:16/9;
          display:block;
          border-radius:12px;
          background:#000;
        }

        /* Responsive */
        @media (max-width: 900px){
          .watch-main{
            padding:20px 18px 32px;
          }
        }

        @media (max-width: 720px){
          .watch__header{
            padding:10px 14px;
            flex-wrap:wrap;
          }
          .watch__actions{
            justify-content:flex-end;
          }
        }
      `}</style>

      {/* HEADER */}
      <header className="watch__header">
        <div className="watch__logo">
          <span>VISIONPLUS</span>
        </div>

        <div className="watch__actions">
          <button className="btn-secondary" onClick={() => navigate(-1)}>
            Volver
          </button>
          <Link to="/" className="btn-primary">
            Salir
          </Link>
          <Link to="/perfil" className="link">
            Perfil
          </Link>
          <Link to="/notificaciones" className="link">
            Notificaciones
          </Link>
        </div>
      </header>

      {/* CONTENIDO */}
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
    </div>
  );
}
