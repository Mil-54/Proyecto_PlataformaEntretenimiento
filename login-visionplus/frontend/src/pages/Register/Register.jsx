
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("¡Cuenta creada con éxito!");
        navigate("/login");
      } else {
        alert(`Error: ${data.message || "No se pudo registrar"}`);
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="register-page-body">
      <header>
        <div className="logo">
          <div className="logo-icon"></div>
          <div className="logo-text">VISIONPLUS</div>
        </div>

        <a className="regresar" onClick={() => navigate("/login")}>
          Regresar
        </a>
      </header>

      <div className="contenedor">
        <div className="card">
          <h1>Crear cuenta</h1>

          <form onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Correo electrónico" required />
            <input name="password" type="password" placeholder="Contraseña (min 8 car, 1 May, 1 min, 1 num)" required />
            <input name="confirmPassword" type="password" placeholder="Confirmar contraseña" required />

            <button type="submit">Crear Cuenta</button>
          </form>
        </div>
      </div>
    </div>
  );
}
