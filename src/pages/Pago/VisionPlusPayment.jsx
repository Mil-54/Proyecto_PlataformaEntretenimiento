import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./VisionPlusPayment.css";

const PLAN_NAMES = {
  FREE: "Plan FREE",
  PREMIUM: "Plan PREMIUM",
  FAMILY: "Plan FAMILY",
};

const PLAN_PRICES = {
  FREE: 0,
  PREMIUM: 120,
  FAMILY: 180,
};

export default function VisionPlusPayment() {
  const { plan } = useParams();
  const navigate = useNavigate();
  const [method, setMethod] = useState("card");

  const nombrePlan = PLAN_NAMES[plan] || "Plan seleccionado";

  const precioPlan = PLAN_PRICES[plan] ?? 0;
  const precioFormateado = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(precioPlan);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (method === "card") {
      alert("Pago con tarjeta procesado correctamente (demo)");
    } else if (method === "paypal") {
      alert("Serías redirigido a PayPal para completar el pago (demo)");
    } else if (method === "code") {
      alert("Código aplicado correctamente (demo)");
    }

    navigate("/inicio");
  };

  return (
    <div className="vpay-page">
      {/* NAVBAR */}
      <header className="inicio-navbar">
        <div className="inicio-logo" onClick={() => navigate("/inicio")}>
          VISIONPLUS
        </div>

        <nav className="inicio-nav">
          <a onClick={() => navigate("/inicio")}>Inicio</a>
          <a className="active" onClick={() => navigate("/planes")}>
            Mi plan
          </a>
        </nav>

        <div className="inicio-search-box">
          <input type="text" placeholder="Buscar..." readOnly />
        </div>

        <div className="inicio-user">
          <div onClick={() => navigate("/perfil")} style={{ cursor: "pointer" }}>
            Perfil
          </div>
          <div
            onClick={() => navigate("/notificaciones")}
            style={{ cursor: "pointer" }}
          >
            Notificaciones
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="vpay-main">
        <section className="vpay-panel">
          <header className="vpay-header">
            <h2>Forma de pago</h2>
            <p>
              Estás a un paso de activar <strong>{nombrePlan}</strong>. Ingresa
              tus datos de pago de forma segura.
            </p>
          </header>

          <div className="vpay-layout">
            {/* Resumen del plan */}
            <aside className="vpay-summary">
              <h3>Resumen del plan</h3>
              <div className="vpay-summary-card">
                <div className="vpay-summary-title">{nombrePlan}</div>

                {/* Precio del plan */}
                <div className="vpay-summary-price">
                  {precioFormateado} / mes
                </div>

                <ul>
                  <li>Acceso completo al catálogo</li>
                  <li>Calidad HD / 4K según el plan</li>
                  <li>Cancelación cuando quieras</li>
                </ul>
              </div>

              <button
                type="button"
                className="vpay-back"
                onClick={() => navigate("/planes")}
              >
                ← Cambiar de plan
              </button>
            </aside>

            {/* Formulario de pago */}
            <section className="vpay-form-wrap">
              <form className="vpay-form" onSubmit={handleSubmit}>
                {/* Botones de método */}
                <div className="vpay-methods">
                  <button
                    type="button"
                    className={method === "card" ? "active" : ""}
                    onClick={() => setMethod("card")}
                  >
                    Tarjeta
                  </button>
                  <button
                    type="button"
                    className={method === "paypal" ? "active" : ""}
                    onClick={() => setMethod("paypal")}
                  >
                    PayPal
                  </button>
                  <button
                    type="button"
                    className={method === "code" ? "active" : ""}
                    onClick={() => setMethod("code")}
                  >
                    Código
                  </button>
                </div>

                {/* MÉTODO: TARJETA */}
                {method === "card" && (
                  <>
                    <div className="vpay-field">
                      <label>Nombre en la tarjeta</label>
                      <input
                        type="text"
                        placeholder="Como aparece en la tarjeta"
                        required
                      />
                    </div>

                    <div className="vpay-field">
                      <label>Número de tarjeta</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div className="vpay-row">
                      <div className="vpay-field">
                        <label>Vencimiento</label>
                        <input type="text" placeholder="MM/AA" required />
                      </div>
                      <div className="vpay-field">
                        <label>CVV</label>
                        <input type="password" placeholder="•••" required />
                      </div>
                    </div>

                    <div className="vpay-field">
                      <label>País / Región</label>
                      <select defaultValue="mx" required>
                        <option value="mx">México</option>
                        <option value="es">España</option>
                        <option value="ar">Argentina</option>
                        <option value="co">Colombia</option>
                      </select>
                    </div>
                  </>
                )}

                {/* MÉTODO: PAYPAL */}
                {method === "paypal" && (
                  <>
                    <div className="vpay-field">
                      <label>Correo asociado a PayPal</label>
                      <input
                        type="email"
                        placeholder="tu-correo@ejemplo.com"
                        required
                      />
                    </div>

                    <p className="vpay-safe-text">
                      Al continuar, te redirigiremos a PayPal para que inicies
                      sesión y confirmes el pago.
                    </p>
                  </>
                )}

                {/* MÉTODO: CÓDIGO */}
                {method === "code" && (
                  <>
                    <div className="vpay-field">
                      <label>Código de regalo / promoción</label>
                      <input
                        type="text"
                        placeholder="Ingresa tu código"
                        required
                      />
                    </div>

                    <p className="vpay-safe-text">
                      Si tu código es válido, se aplicará automáticamente al plan
                      seleccionado.
                    </p>
                  </>
                )}

                <button type="submit" className="vpay-submit">
                  {method === "card" && "Confirmar pago y continuar"}
                  {method === "paypal" && "Ir a PayPal y continuar"}
                  {method === "code" && "Canjear código y continuar"}
                </button>

                <p className="vpay-safe-text">
                  Tu información se procesa cifrada y de forma segura.
                </p>
              </form>
            </section>
          </div>
        </section>

        <footer className="vp-footer">
          © 2025 VisionPlus · Todos los derechos reservados
        </footer>
      </main>
    </div>
  );
}
