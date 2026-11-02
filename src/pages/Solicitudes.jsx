
import { useSolicitudes } from "../context/SolicitudContext";

function Solicitudes() {
  const { solicitudes } = useSolicitudes();

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Mis solicitudes</h1>
          <p>Consulta todas tus solicitudes académicas.</p>
        </div>
      </header>

      <section className="requests-section">
        {solicitudes.length === 0 ? (
          <p>Aún no tienes solicitudes registradas.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>
                {solicitudes.map((solicitud) => (
                  <tr key={solicitud.id}>
                    <td>#{solicitud.id}</td>
                    <td>{solicitud.tipo}</td>
                    <td>{solicitud.fecha}</td>
                    <td>{solicitud.descripcion}</td>
                    <td>
                      <span className="status pendiente">
                        {solicitud.estado}
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

export default Solicitudes;
