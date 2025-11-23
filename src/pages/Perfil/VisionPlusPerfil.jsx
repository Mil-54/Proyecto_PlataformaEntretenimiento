import React from "react";

// Componente React que replica el diseño y estilos del archivo HTML original.
// No requiere dependencias externas; los estilos se inyectan con una etiqueta <style>.
// Inserta este componente en tu app y renderízalo donde lo necesites.

export default function VisionPlusPerfil() {
  return (
    <div>
      <style>{`
:root{
 --bg-dark:#0b0f16;
 --bg-card:#1a1e26;
 --text-light:#e5e7eb;
 --neon-purple:#9d4edd; /* base sólido */
 --neon-violet:#7b2cbf; /* más oscuro para hover */
 --line:#4b5563;
}

*{box-sizing:border-box}
html,body{height:100%; width:100%}
body{
 margin:0;
 background:var(--bg-dark);
 color:var(--text-light);
 font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
 /* --- CAMBIOS PARA CENTRAR EL CONTENIDO --- */
 display: flex;
 justify-content: center; /* Centra el contenido horizontalmente */
 min-height: 100vh; /* Ocupa el 100% de la altura de la ventana */
 flex-direction: column; 
 /* ----------------------------------------- */
}

/* Header */
.header{
 height:72px; display:grid; grid-template-columns: 220px 1fr 220px;
 align-items:center; gap:16px; padding:0 24px;
 background:linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,0));
 position:sticky; top:0; z-index:10;
}
.brand{
 font-weight:900; letter-spacing:.8px; font-size:1.5rem; white-space:nowrap;
 color:var(--neon-purple);
}
.nav{
 display:flex; align-items:center; gap:20px; font-weight:700;
}
.nav a{
 color:#c9cbd1; text-decoration:none; padding:.4rem .6rem; border-radius:10px; transition:.2s;
}
.nav a:hover{
 color:var(--text-light);
 background:rgba(157,78,221,.15); /* mate */
}

/* Search */
.search{
 justify-self:center; display:flex; align-items:center; gap:8px;
 background:#0e131c; padding:6px 10px; border-radius:999px;
 border:1.6px solid #2a3344;
 width:min(480px, 90%);
}
.search input{
 flex:1; border:0; background:transparent; outline:none; color:var(--text-light);
 padding:.35rem .25rem; font-weight:600;
}
.search .icon{
 width:26px; height:26px; color:var(--neon-purple);
}

/* Actions */
.actions{
 justify-self:end; display:flex; align-items:center; gap:18px;
}
.actions a{
 color:var(--neon-purple); text-decoration:none; font-weight:700;
 display:flex; align-items:center; gap:8px;
}
.actions a:hover{ color:var(--neon-violet); }

/* Layout principal */
.container{
 width:min(1120px, 92%);
 /* margin:24px auto 64px auto;  <-- SE ELIMINÓ */
  margin-top: 24px; /* <--- SE AÑADIÓ */
  margin-bottom: 64px; /* <--- SE AÑADIÓ */
 border:1px solid #3b4454; border-radius:12px;
 padding:18px 18px 32px 18px;
}

/* Título de sección */
.section-title{ font-weight:800; letter-spacing:.2px; margin:6px 8px 0 8px; }
.hr{ height:1px; background:#9ca3af44; margin:10px 0 16px 0 }

/* Panel de perfil */
.profile-grid{
 display:grid; grid-template-columns: 1.1fr 1.4fr; gap:28px;
}
@media (max-width: 880px){ .profile-grid{ grid-template-columns:1fr; } }

.card{
 border:1px solid #5a6476; border-radius:10px; padding:24px;
 background:rgba(26,30,38,.55);
 backdrop-filter: blur(2px);
}

/* Avatar */
.avatar{
 height:260px; border:1px solid #5a6476; border-radius:10px;
 display:grid; place-items:center; position:relative;
}
.avatar .svg{
 width:160px; height:160px; color:var(--neon-purple);
}
.edit-fab{
 position:absolute; bottom:18px; left:50%; transform:translateX(-50%);
 width:38px; height:38px; border-radius:10px; display:grid; place-items:center;
 background:#0f1420; border:1.5px solid #cfd3db88;
}
.edit-fab svg{ width:20px; height:20px; color:#e5e7eb }

/* Form */
.form .group{ margin-bottom:18px }
.label{ color:#cbd5e1; font-weight:700; margin:0 0 8px 4px; display:block; }
.input{
 width:100%; padding:.9rem 1rem; border-radius:12px;
 background:#3a4252cc; border:2px solid #555e70; color:var(--text-light);
 outline:none; transition:.2s;
}
.input:focus{
 border-color:var(--neon-purple);
}
.inline-edit{
 position:absolute; right:14px; top:50%; transform:translateY(-50%);
 width:28px; height:28px; display:grid; place-items:center;
}
.input-wrap{ position:relative }

/* Links */
.links{
 margin-top:12px; display:grid; gap:10px;
}
.links a{ color:var(--neon-purple); text-decoration:none; font-weight:700; }
.links a:hover{ color:var(--neon-violet); }
.danger{ color:#f87171 }

/* Utilidades */
.hide-sm{ display:initial }
@media (max-width: 480px){ .hide-sm{ display:none } }
      `}</style>

      <header className="header">
        <div className="brand">VISIONPLUS</div>

        <form className="search" role="search" aria-label="Buscar" onSubmit={(e) => e.preventDefault()}>
          <input type="search" placeholder="Buscar" aria-label="Buscar" />
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7"/>
            <path d="M20 20 L16.65 16.65"/>
          </svg>
        </form>

        <nav className="actions" aria-label="Acciones">
          <a href="#" aria-label="Perfil">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>
            <span className="hide-sm">Perfil</span>
          </a>
          <a href="#" aria-label="Notificaciones">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            <span className="hide-sm">Notificaciones</span>
          </a>
        </nav>
      </header>

      <main className="container">
        <div className="section-title">Mi Perfil</div>
        <div className="hr" role="separator" aria-hidden="true" />

        <div className="profile-grid">
          <section className="card avatar" aria-label="Avatar">
            <svg className="svg" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="8" aria-hidden="true">
              <circle cx="60" cy="42" r="20" />
              <path d="M22,98 Q60,72 98,98" strokeLinecap="round"/>
            </svg>
            <button className="edit-fab" aria-label="Editar avatar" title="Editar avatar" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5l4 4L7 21l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </button>
          </section>

          <section className="card form" aria-label="Formulario de perfil">
            <div className="group">
              <label className="label" htmlFor="nombre">Nombre</label>
              <div className="input-wrap">
                <input className="input" id="nombre" type="text" placeholder="Tu nombre" />
                <span className="inline-edit" title="Editar" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e5e7eb" strokeWidth="2">
                    <path d="M12 20h9"/><path d="M16.5 3.5l4 4L7 21l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </span>
              </div>
            </div>

            <div className="group">
              <label className="label" htmlFor="apellido">Apellido</label>
              <div className="input-wrap">
                <input className="input" id="apellido" type="text" placeholder="Tu apellido" />
                <span className="inline-edit" title="Editar" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e5e7eb" strokeWidth="2">
                    <path d="M12 20h9"/><path d="M16.5 3.5l4 4L7 21l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </span>
              </div>
            </div>

            <div className="group">
              <label className="label" htmlFor="email">Correo Electrónico</label>
              <div className="input-wrap">
                <input className="input" id="email" type="email" placeholder="correo@ejemplo.com" />
              </div>
            </div>

            <div className="links">
              <a href="#">Mi Plan</a>
              <a href="#">Cambiar Contraseña</a>
              <a className="danger" href="#">Eliminar cuenta</a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

