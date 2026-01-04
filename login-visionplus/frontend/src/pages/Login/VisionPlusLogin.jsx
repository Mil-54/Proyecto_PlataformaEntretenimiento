
import React from "react";
import { useNavigate } from "react-router-dom";
import "./VisionPlusLogin.css";

export default function VisionPlusLogin({ backgroundUrl = "fondo.jpg" }) {

  const navigate = useNavigate();

  function goDetail(e) {
    e.preventDefault();
    navigate("/inicio");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Guardar token
        localStorage.setItem("token", result.access_token);
        if (result.user) {
          localStorage.setItem("user", JSON.stringify(result.user));
        }
        navigate("/inicio");
      } else {
        alert("Error de inicio de sesión: " + (result.message || "Credenciales inválidas"));
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error de conexión al servidor");
    }
  };

  function goRegister(e) {
    e.preventDefault();
    navigate("/register");
  }

  function goChangePassword(e) {
    e.preventDefault();
    navigate("/changepassword");
  }

  return (
    <div className="login-page">

      <header className="header">
        <div className="brand">VISIONPLUS</div>
      </header>

      <main
        className="hero"
        style={{ "--hero-image": `url('${backgroundUrl}')` }}
      >
        <div className="card">

          <div className="title">
            <div className="icon"></div>
            <h1>Iniciar sesión</h1>
          </div>

          <form className="form" onSubmit={handleSubmit}>

            <div className="field">
              <label htmlFor="email">Correo electrónico o usuario</label>
              <input
                className="input"
                id="email"
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="field">
              <label htmlFor="password">Contraseña</label>
              <input
                className="input"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <div className="actions">
              <button className="btn btn-primary" type="submit">
                Iniciar sesión
              </button>

              { }
              <a className="link" href="#" onClick={goChangePassword}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <div className="bottom">
              <span className="muted" onClick={goRegister} style={{ cursor: "pointer", textDecoration: "underline" }}>
                ¿No tienes cuenta? Regístrate aquí
              </span>

              <label className="checkbox">
                <input type="checkbox" />
                <span>Recordar sesión</span>
              </label>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
