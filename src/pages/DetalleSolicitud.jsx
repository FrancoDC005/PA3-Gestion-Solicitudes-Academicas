import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useSolicitudes } from "../context/SolicitudContext";
import { useDispatch } from "react-redux";
import { notificarCambioEstado } from "../redux/solicitudSlice";
import Navbar from "../components/Navbar";

function DetalleSolicitud() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { obtenerPorId, actualizarEstado, eliminarSolicitud } = useSolicitudes();

  const solicitud = obtenerPorId(id);

  const [respuestaAdmin, setRespuestaAdmin] = useState(
    solicitud ? (solicitud.respuesta || "") : ""
  );
  const [mensajeExito, setMensajeExito] = useState("");

  if (!solicitud) {
    return (
      <main className="dashboard">
        <Navbar titulo="Detalle de Solicitud" />
        <section className="requests-section empty-view">
          <h2>Solicitud no encontrada</h2>
          <p>El identificador #{id} no corresponde a ninguna solicitud registrada en el sistema.</p>
          <Link to="/solicitudes" className="submit-button" style={{ display: "inline-block", marginTop: "15px" }}>
            ← Volver al listado
          </Link>
        </section>
      </main>
    );
  }

  const handleCambiarEstado = (nuevoEstado) => {
    actualizarEstado(solicitud.id, nuevoEstado, respuestaAdmin);
    dispatch(notificarCambioEstado({ id: solicitud.id, estado: nuevoEstado }));
    setMensajeExito(`Estado actualizado a "${nuevoEstado}" correctamente y notificado a Redux.`);
    setTimeout(() => setMensajeExito(""), 4000);
  };

  const handleEliminar = () => {
    if (window.confirm(`¿Estás seguro de eliminar la solicitud #${solicitud.id}?`)) {
      eliminarSolicitud(solicitud.id);
      navigate("/solicitudes");
    }
  };

  return (
    <main className="dashboard">
      <Navbar titulo={`Detalle de Solicitud #${solicitud.id}`} />

      {mensajeExito && (
        <div className="alert-success">
          ✓ {mensajeExito}
        </div>
      )}

      <div className="detalle-container">
        <div className="detalle-header-card">
          <div className="header-meta">
            <span className="detalle-id">ID: #{solicitud.id}</span>
            <span className={`status ${solicitud.estado.toLowerCase()}`}>
              {solicitud.estado}
            </span>
            <span className="badge-prioridad">Prioridad: {solicitud.prioridad || "Media"}</span>
          </div>
          <h1>{solicitud.tipo}</h1>
          <p className="fecha-creacion">Registrado el: <strong>{solicitud.fecha}</strong></p>
        </div>

        <div className="detalle-grid">
          <div className="card-info">
            <h3>Información del Estudiante</h3>
            <p><strong>Nombre:</strong> {solicitud.estudiante || "No registrado"}</p>
            <p><strong>Código ISIL:</strong> {solicitud.codigoEstudiante || "ISIL-2024"}</p>
            <p><strong>Carrera:</strong> {solicitud.carrera || "Tecnología de la Información"}</p>
          </div>

          <div className="card-info">
            <h3>Detalle del Trámite</h3>
            <p><strong>Tipo de trámite:</strong> {solicitud.tipo}</p>
            <p><strong>Motivo / Justificación:</strong></p>
            <div className="detalle-desc-box">
              {solicitud.descripcion}
            </div>
          </div>
        </div>

        <section className="requests-section gestion-area">
          <h3>Gestión Administrativa del Estado (Context API + Redux)</h3>
          <p className="texto-ayuda">
            Al cambiar el estado, <strong>Context API</strong> actualiza el registro en la memoria global y localStorage,
            mientras que <strong>Redux Toolkit</strong> incrementa el contador de notificaciones de eventos en la barra superior.
          </p>

          <label className="label-campo">Observación o Respuesta institucional:</label>
          <textarea
            className="input-admin"
            value={respuestaAdmin}
            onChange={(e) => setRespuestaAdmin(e.target.value)}
            placeholder="Ingrese la resolución académica o motivo..."
            rows={3}
          />

          <div className="botones-control">
            <button
              onClick={() => handleCambiarEstado("Aprobada")}
              className="btn-status approve large"
            >
              ✓ Aprobar Solicitud
            </button>
            <button
              onClick={() => handleCambiarEstado("Rechazada")}
              className="btn-status reject large"
            >
              ✕ Rechazar Solicitud
            </button>
            <button
              onClick={() => handleCambiarEstado("Pendiente")}
              className="btn-status pending large"
            >
              ◷ Marcar como Pendiente
            </button>
          </div>

          <div className="detalle-footer-actions">
            <Link to="/solicitudes" className="btn-secondary">
              ← Regresar al listado
            </Link>
            <button onClick={handleEliminar} className="btn-danger-outline">
              Eliminar solicitud
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default DetalleSolicitud;
