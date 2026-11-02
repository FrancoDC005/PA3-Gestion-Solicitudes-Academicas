
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>ISIL<span>+</span></h2>
        <p>Gestión Académica</p>
      </div>

      <nav className="sidebar-menu">
        <p className="menu-label">MENÚ PRINCIPAL</p>

        <NavLink to="/" end className="menu-link">
          <span>▦</span> Dashboard
        </NavLink>

        <NavLink to="/solicitudes" className="menu-link">
          <span>▤</span> Solicitudes
        </NavLink>

        <NavLink to="/solicitudes/nueva" className="menu-link">
          <span>＋</span> Nueva solicitud
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="avatar">ES</div>
        <div>
          <strong>Estudiante</strong>
          <p>Usuario académico</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
