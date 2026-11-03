import { useSolicitudes } from "../context/SolicitudContext";
import { useSelector, useDispatch } from "react-redux";
import { limpiarNotificaciones } from "../redux/solicitudSlice";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { solicitudes, restablecerDatos } = useSolicitudes();
  const notificaciones = useSelector((state) => state.solicitudes.notificaciones);
  const historial = useSelector((state) => state.solicitudes.historialNotificaciones);
  const dispatch = useDispatch();

  // Estadísticas calculadas en tiempo real mediante Context
  const total = solicitudes.length;
  const pendientes = solicitudes.filter((s) => s.estado === "Pendiente").length;
  const aprobadas = solicitudes.filter((s) => s.estado === "Aprobada").length;
  const rechazadas = solicitudes.filter((s) => s.estado === "Rechazada").length;

  const estadisticas = [
    { titulo: "Total Solicitudes", cantidad: total, icono: "📋", color: "#2563eb", bg: "#eff6ff" },
    { titulo: "En Evaluación (Pendientes)", cantidad: pendientes, icono: "⏳", color: "#d97706", bg: "#fffbeb" },
    { titulo: "Solicitudes Aprobadas", cantidad: aprobadas, icono: "✅", color: "#16a34a", bg: "#f0fdf4" },
    { titulo: "Solicitudes Rechazadas", cantidad: rechazadas, icono: "❌", color: "#dc2626", bg: "#fef2f2" }
  ];

  return (
    <main className="dashboard">
      <Navbar titulo="Dashboard General" />

      {/* Banner de Bienvenida */}
      <section className="welcome-card">
        <div>
          <h2>¡Bienvenido a la Plataforma ISIL+!</h2>
          <p>
            Sistema SPA de gestión y seguimiento de solicitudes y trámites académicos para estudiantes y coordinadores.
          </p>
          <div className="welcome-buttons">
            <Link to="/solicitudes/nueva" className="btn-welcome-primary">
              ＋ Registrar Nueva Solicitud
            </Link>
            <Link to="/solicitudes" className="btn-welcome-secondary">
              Ver Todas las Solicitudes
            </Link>
          </div>
        </div>
        <span className="welcome-icon">🎓</span>
      </section>

      {/* Tarjetas de Estadísticas Globales */}
      <section className="statistics">
        {estadisticas.map((item) => (
          <article className="stat-card" key={item.titulo}>
            <div className="stat-header">
              <span className="stat-icon-wrapper" style={{ background: item.bg, color: item.color }}>
                {item.icono}
              </span>
              <span className="stat-pill" style={{ color: item.color }}>Actualizado</span>
            </div>
            <p className="stat-title">{item.titulo}</p>
            <h2 className="stat-number">{item.cantidad}</h2>
          </article>
        ))}
      </section>

      {/* Panel de Redux Toolkit */}
      <section className="requests-section redux-panel">
        <div className="section-header">
          <div>
            <h2>Gestión de Notificaciones (Redux Toolkit)</h2>
            <span>Estado centralizado en Store desacoplado</span>
          </div>
          <div className="redux-controls">
            <span className="redux-counter-badge">
              Eventos activos: <strong>{notificaciones}</strong>
            </span>
            {notificaciones > 0 && (
              <button
                className="btn-clear-redux"
                onClick={() => dispatch(limpiarNotificaciones())}
              >
                Limpiar Notificaciones
              </button>
            )}
          </div>
        </div>

        {historial.length > 0 ? (
          <div className="historial-notificaciones">
            <p className="historial-title">Registro reciente de acciones despachadas al Store:</p>
            <ul className="notif-list">
              {historial.slice(0, 4).map((h) => (
                <li key={h.id} className="notif-item">
                  <span className="notif-dot">●</span>
                  <span className="notif-msg">{h.mensaje}</span>
                  <span className="notif-time">{h.hora}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-muted">
            No hay notificaciones pendientes. Cada vez que registres o actualices una solicitud, se despachará una acción a Redux.
          </p>
        )}
      </section>

      {/* Tabla de Solicitudes Recientes */}
      <section className="requests-section">
        <div className="section-header">
          <div>
            <h2>Solicitudes Recientes</h2>
            <span>Últimos trámites ingresados al sistema</span>
          </div>
          <div className="table-header-actions">
            <button
              onClick={restablecerDatos}
              className="btn-restablecer"
              title="Restablece las solicitudes a los datos de prueba iniciales"
            >
              🔄 Restablecer datos iniciales
            </button>
            <Link to="/solicitudes" className="link-ver-todo">
              Ver todas ({solicitudes.length}) →
            </Link>
          </div>
        </div>

        {solicitudes.length === 0 ? (
          <div className="empty-state">
            <p>No hay solicitudes registradas actualmente.</p>
            <Link to="/solicitudes/nueva" className="btn-nuevo-nav">
              Crear la primera solicitud
            </Link>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Estudiante</th>
                  <th>Tipo de Trámite</th>
                  <th>Fecha</th>
                  <th>Prioridad</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.slice(0, 5).map((s) => (
                  <tr key={s.id}>
                    <td><strong>#{s.id}</strong></td>
                    <td>{s.estudiante || "Estudiante ISIL"}</td>
                    <td>{s.tipo}</td>
                    <td>{s.fecha}</td>
                    <td>
                      <span className="prioridad-tag">{s.prioridad || "Media"}</span>
                    </td>
                    <td>
                      <span className={`status ${s.estado.toLowerCase()}`}>
                        {s.estado}
                      </span>
                    </td>
                    <td>
                      <Link to={`/solicitudes/${s.id}`} className="btn-table-view">
                        Detalle
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
