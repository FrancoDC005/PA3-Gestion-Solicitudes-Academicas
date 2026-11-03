import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { limpiarNotificaciones } from "../redux/solicitudSlice";

function Navbar({ titulo = "Plataforma Académica" }) {
  const notificaciones = useSelector((state) => state.solicitudes.notificaciones);
  const ultimoEvento = useSelector((state) => state.solicitudes.ultimoEvento);
  const dispatch = useDispatch();

  return (
    <header className="top-navbar">
      <div className="navbar-title">
        <h2>{titulo}</h2>
        <span className="navbar-subtitle">ISIL · Programación Web II (PA3)</span>
      </div>

      <div className="navbar-actions">
        <div className="redux-badge-wrapper" title="Estado gestionado con Redux Toolkit">
          <span className="redux-tag">Redux Store</span>
          <div className="bell-container">
            <span className="bell-icon">🔔</span>
            {notificaciones > 0 && (
              <span className="notification-bubble">{notificaciones}</span>
            )}
          </div>
          {notificaciones > 0 && (
            <button
              className="btn-clear-mini"
              onClick={() => dispatch(limpiarNotificaciones())}
              title="Limpiar contador en Redux"
            >
              ✕ Limpiar
            </button>
          )}
        </div>

        <Link to="/solicitudes/nueva" className="btn-nuevo-nav">
          ＋ Nueva Solicitud
        </Link>
      </div>

      {ultimoEvento && notificaciones > 0 && (
        <div className="navbar-banner-alert">
          <span>📢 <strong>Última novedad Redux:</strong> {ultimoEvento.mensaje} ({ultimoEvento.hora})</span>
        </div>
      )}
    </header>
  );
}

export default Navbar;
