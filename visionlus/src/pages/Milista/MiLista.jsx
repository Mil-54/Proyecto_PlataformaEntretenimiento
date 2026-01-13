import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MiLista.css";

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M135.2 17.7C140.6 7.2 151.6 0 163.8 0h120.4c12.2 0 23.2 7.2 28.6 17.7L328 32H432c8.8 0 16 7.2 16 16s-7.2 16-16 16h-16l-21.2 403.2c-1.3 24.3-21.3 44.8-45.6 44.8H99.8c-24.3 0-44.3-20.5-45.6-44.8L33 64H16C7.2 64 0 56.8 0 48s7.2-16 16-16H120l15.2-14.3zM128 128v320c0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16V128H128z" />
  </svg>
);

const defaultItems = [
  {
    nombre: "TUA",
    img: "tua.webp",
    tipo: "serie",
    categoria: "Serie",
    descripcion:
      "La Academia Umbrella es un equipo de individuos con superpoderes, adoptado y entrenado por Sir Reginald Hargreeves para proteger la Tierra de una amenaza cósmica desconocida.",
    temporadas: 3,
  },
  {
    nombre: "Dark",
    img: "images.jpeg",
    tipo: "serie",
    categoria: "Serie",
    descripcion:
      "Cuatro familias de un pequeño pueblo alemán se ven envueltas en un misterio que abarca varias generaciones y viajes en el tiempo.",
    temporadas: 3,
  },
  {
    nombre: "Stranger Things",
    img: "st.jpg",
    tipo: "serie",
    categoria: "Serie",
    descripcion:
      "En la ciudad de Hawkins, un grupo de amigos descubre experimentos secretos, criaturas sobrenaturales y una niña con poderes especiales.",
    temporadas: 4,
  },
];

const defaultsByName = Object.fromEntries(
  defaultItems.map((item) => [item.nombre, item])
);

const MiLista = () => {
  const navigate = useNavigate();

  function goToBusqueda() {
    navigate("/busqueda");
  }
  function goToPerfil() {
    navigate("/perfil");
  }
  function goToNotifications() {
    navigate("/notificaciones");
  }
  function goToInicio() {
    navigate("/inicio");
  }

  const [items, setItems] = useState(() => {
    const savedList = localStorage.getItem("lista");

    if (savedList) {
      try {
        const parsed = JSON.parse(savedList);

        return parsed.map((item) => {
          const def = defaultsByName[item.nombre];

          if (def) {
            return {
              ...def,
              ...item,
              tipo: item.tipo || def.tipo || "serie",
              categoria: def.categoria || "Serie",
              descripcion: item.descripcion || def.descripcion,
              temporadas:
                item.tipo === "pelicula"
                  ? item.temporadas ?? def.temporadas
                  : item.temporadas || def.temporadas,
            };
          }

          return {
            ...item,
            tipo: item.tipo || "serie",
            categoria: "Serie",
            descripcion: item.descripcion || "Sin descripción",
            temporadas:
              item.tipo === "serie"
                ? item.temporadas || 1
                : item.temporadas ?? undefined,
          };
        });
      } catch (e) {
        console.error("Error leyendo lista de localStorage", e);
      }
    }

    return defaultItems;
  });

  const [filtro, setFiltro] = useState("serie");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("lista", JSON.stringify(items));
  }, [items]);

  const deleteItem = (indexToDelete) => {
    setItems((currentItems) => {
      const newItems = currentItems.filter(
        (_, index) => index !== indexToDelete
      );
      if (newItems.length === 0) setShowDeleteModal(false);
      return newItems;
    });
  };

  const filteredItems = items.filter((item) => {
    if (filtro === "descargada") return item.descargada;
    if (filtro === "pelicula") return item.tipo === "pelicula";
    if (filtro === "serie") return item.tipo === "serie";
    return true;
  });

  const tabs = [
    { id: "pelicula", label: "Películas" },
    { id: "serie", label: "Series" },
    { id: "descargada", label: "Descargadas" },
  ];

  return (
    <div className="milista-page">
      <header className="milista-topbar">
        <div className="milista-brand brand">VISIONPLUS</div>

        <nav className="milista-nav">
          <a onClick={goToInicio} style={{ cursor: "pointer" }}>
            Inicio
          </a>
          <a className="active" href="#">
            Mi lista
          </a>
        </nav>

        <div className="milista-search-box" onClick={goToBusqueda}>
          <input
            type="text"
            placeholder="Buscar..."
            onFocus={goToBusqueda}
            readOnly
          />
          <button>🔍</button>
        </div>

        <div className="milista-user right">
          <div onClick={goToPerfil} style={{ cursor: "pointer" }}>
            Perfil
          </div>
          <div onClick={goToNotifications} style={{ cursor: "pointer" }}>
            Notificaciones
          </div>
        </div>
      </header>

      <main className="milista-main">
        <h1>MI LISTA</h1>
        <p className="milista-subtitle subtitle">
          Tus películas y series guardadas
        </p>

        <div className="milista-tabs tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={filtro === tab.id ? "active" : ""}
              onClick={() => setFiltro(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="milista-cards cards">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div key={index} className="milista-card card">
                <img src={item.img} alt={item.nombre} />
                <div className="milista-card-info card-info">
                  <p className="milista-card-title card-title">
                    {item.nombre}
                  </p>

                  <p className="milista-card-meta card-meta">
                    Categoria: {item.tipo === "pelicula" ? "Película" : "Serie"}
                  </p>

                  <p className="milista-card-desc card-desc">
                    Descripcion: {item.descripcion || "Sin descripción"}
                  </p>

                  <p className="milista-card-meta card-meta">
                    Temporada {item.temporadas || 1}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="milista-empty-message">
              No hay elementos guardados en esta categoría.
            </p>
          )}
        </div>
      </main>

      <div
        className="milista-trash trash"
        title="Eliminar"
        onClick={() => setShowDeleteModal(true)}
      >
        <TrashIcon />
      </div>

      {showDeleteModal && (
        <div className="milista-modal-bg modal-bg">
          <div className="milista-modal modal">
            <h2>Selecciona el elemento que deseas eliminar</h2>

            <div className="milista-modal-list">
              {items.map((item, index) => (
                <button
                  key={item.nombre + index}
                  onClick={() => {
                    if (
                      window.confirm(
                        `¿Seguro que deseas eliminar "${item.nombre}"?`
                      )
                    ) {
                      deleteItem(index);
                    }
                  }}
                >
                  {item.nombre}
                </button>
              ))}
            </div>

            <div className="milista-modal-buttons modal-buttons">
              <button
                className="cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiLista;
