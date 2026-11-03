import { Link } from "react-router-dom";

function SolicitudCard({ solicitud, onEliminar, onCambiarEstado }) {
  const estadoClass = solicitud.estado.toLowerCase();

  return (
    <article className="solicitud-card">
      <div className="card-top">
        <span className="card-id">#{solicitud.id}</span>
        <span className={`status ${estadoClass}`}>{solicitud.estado}</span>
      </div>

      <h3 className="card-tipo">{solicitud.tipo}</h3>
      <p className="card-estudiante">
        <strong>Estudiante:</strong> {solicitud.estudiante || "No especificado"} ({solicitud.carrera || "ISIL"})
      </p>
      <p className="card-desc">{solicitud.descripcion}</p>

      <div className="card-meta">
        <span>📅 {solicitud.fecha}</span>
        <span>⚡ Prioridad: <strong>{solicitud.prioridad || "Media"}</strong></span>
      </div>

      <div className="card-actions">
        <Link to={`/solicitudes/${solicitud.id}`} className="btn-action view">
          Ver detalle
        </Link>

        {onCambiarEstado && solicitud.estado === "Pendiente" && (
          <div className="state-buttons">
            <button
              onClick={() => onCambiarEstado(solicitud.id, "Aprobada")}
              className="btn-status approve"
              title="Aprobar solicitud"
            >
              ✓ Aprobar
            </button>
            <button
              onClick={() => onCambiarEstado(solicitud.id, "Rechazada")}
              className="btn-status reject"
              title="Rechazar solicitud"
            >
              ✕ Rechazar
            </button>
          </div>
        )}

        {onEliminar && (
          <button
            onClick={() => onEliminar(solicitud.id)}
            className="btn-action delete"
            title="Eliminar registro"
          >
            🗑
          </button>
        )}
      </div>
    </article>
  );
}

export default SolicitudCard;
