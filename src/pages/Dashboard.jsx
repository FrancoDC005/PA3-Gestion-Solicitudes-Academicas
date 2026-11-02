
import { useSolicitudes } from "../context/SolicitudContext";
import { useSelector, useDispatch } from "react-redux";
import { limpiarNotificaciones } from "../redux/solicitudSlice";

function Dashboard() {
  const { solicitudes } = useSolicitudes();

  const notificaciones = useSelector(
    (state) => state.solicitudes.notificaciones
  );

  const dispatch = useDispatch();

  // Estadísticas dinámicas
  const total = solicitudes.length;

  const pendientes = solicitudes.filter(
    (s) => s.estado === "Pendiente"
  ).length;

  const aprobadas = solicitudes.filter(
    (s) => s.estado === "Aprobada"
  ).length;

  const rechazadas = solicitudes.filter(
    (s) => s.estado === "Rechazada"
  ).length;

  const estadisticas = [
    { titulo: "Total solicitudes", cantidad: total, icono: "▤" },
    { titulo: "Pendientes", cantidad: pendientes, icono: "◷" },
    { titulo: "Aprobadas", cantidad: aprobadas, icono: "✓" },
    { titulo: "Rechazadas", cantidad: rechazadas, icono: "✕" }
  ];

  return (
    <main className="dashboard">

      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Bienvenido a tu plataforma de gestión académica.</p>
        </div>
        <span className="user-badge">Estudiante</span>
      </header>

      <section className="welcome-card">
        <div>
          <h2>¡Bienvenido a ISIL+!</h2>
          <p>
            Administra tus solicitudes académicas desde un solo lugar.
          </p>
        </div>
        <span className="welcome-icon">🎓</span>
      </section>

      <section className="statistics">
        {estadisticas.map((item) => (
          <article className="stat-card" key={item.titulo}>
            <span className="stat-icon">{item.icono}</span>
            <p>{item.titulo}</p>
            <h2>{item.cantidad}</h2>
          </article>
        ))}
      </section>

      <section className="requests-section">
        <div className="section-header">
          <h2>Notificaciones Redux</h2>
        </div>

        <p>Solicitudes nuevas registradas: {notificaciones}</p>

        <button
          className="submit-button"
          onClick={() => dispatch(limpiarNotificaciones())}
        >
          Limpiar notificaciones
        </button>
      </section>

      <section className="requests-section">
        <div className="section-header">
          <h2>Solicitudes recientes</h2>
          <span>Últimos registros</span>
        </div>

        {solicitudes.length === 0 ? (
          <p>No hay solicitudes registradas.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo de solicitud</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>
                {[...solicitudes].reverse().slice(0, 5).map((s) => (
                  <tr key={s.id}>
                    <td>#{s.id}</td>
                    <td>{s.tipo}</td>
                    <td>{s.fecha}</td>
                    <td>
                      <span className={`status ${s.estado.toLowerCase()}`}>
                        {s.estado}
                      </span>
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
