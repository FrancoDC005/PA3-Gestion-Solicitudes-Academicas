import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
  const notificaciones = useSelector((state) => state.solicitudes.notificaciones);

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>ISIL<span>+</span></h2>
        <p>Gestión Académica · PA3</p>
      </div>

      <nav className="sidebar-menu">
        <p className="menu-label">NAVEGACIÓN SPA (REACT ROUTER)</p>

        <NavLink to="/" end className="menu-link">
          <span>▦</span> Dashboard
        </NavLink>

        <NavLink to="/solicitudes" end className="menu-link">
          <span>▤</span> Solicitudes
        </NavLink>

        <NavLink to="/solicitudes/nueva" className="menu-link">
          <span>＋</span> Nueva Solicitud
        </NavLink>

        <NavLink to="/comparacion" className="menu-link">
          <span>⚖</span> Context vs Redux
        </NavLink>
      </nav>

      <div className="sidebar-notification-box">
        <span className="notif-label">Redux Toolkit State</span>
        <div className="notif-stat">
          <span>Eventos / Alertas:</span>
          <span className="badge-redux">{notificaciones}</span>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="avatar">PA3</div>
        <div>
          <strong>Equipo Estudiantil</strong>
          <p>Prog. Web II · Sesión 10</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
