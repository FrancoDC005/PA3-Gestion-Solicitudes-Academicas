import { useSolicitudes } from "../context/SolicitudContext";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notificarCambioEstado } from "../redux/solicitudSlice";
import SolicitudCard from "../components/SolicitudCard";
import Navbar from "../components/Navbar";

function Solicitudes() {
  const {
    solicitudes,
    filtroTipo,
    setFiltroTipo,
    filtroEstado,
    setFiltroEstado,
    terminoBusqueda,
    setTerminoBusqueda,
    actualizarEstado,
    eliminarSolicitud,
    restablecerDatos
  } = useSolicitudes();

  const dispatch = useDispatch();

  const handleCambiarEstado = (id, nuevoEstado) => {
    actualizarEstado(id, nuevoEstado);
    dispatch(notificarCambioEstado({ id, estado: nuevoEstado }));
  };

  const handleEliminar = (id) => {
    if (window.confirm(`¿Seguro que deseas eliminar la solicitud #${id}?`)) {
      eliminarSolicitud(id);
    }
  };

  // Filtrado reactivo en memoria
  const solicitudesFiltradas = solicitudes.filter((s) => {
    const coincideTipo = filtroTipo === "Todos" || s.tipo === filtroTipo;
    const coincideEstado = filtroEstado === "Todos" || s.estado === filtroEstado;
    const busqueda = terminoBusqueda.toLowerCase().trim();
    const coincideTexto =
      !busqueda ||
      s.tipo.toLowerCase().includes(busqueda) ||
      (s.descripcion && s.descripcion.toLowerCase().includes(busqueda)) ||
      (s.estudiante && s.estudiante.toLowerCase().includes(busqueda)) ||
      String(s.id).includes(busqueda);

    return coincideTipo && coincideEstado && coincideTexto;
  });

  return (
    <main className="dashboard">
      <Navbar titulo="Catálogo de Solicitudes Académicas" />

      {/* Barra de Filtros y Búsqueda */}
      <section className="filtros-section">
        <div className="filtros-grid">
          <div className="filtro-item busqueda">
            <label>Buscar Solicitud</label>
            <input
              type="text"
              placeholder="Buscar por ID, estudiante, tipo..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              className="input-filtro"
            />
          </div>

          <div className="filtro-item">
            <label>Filtrar por Tipo</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="select-filtro"
            >
              <option value="Todos">Todos los tipos</option>
              <option value="Constancia de estudios">Constancia de estudios</option>
              <option value="Certificado académico">Certificado académico</option>
              <option value="Récord de notas">Récord de notas</option>
              <option value="Retiro de curso">Retiro de curso</option>
              <option value="Rectificación de matrícula">Rectificación de matrícula</option>
              <option value="Otros">Otros</option>
            </select>
          </div>

          <div className="filtro-item">
            <label>Filtrar por Estado</label>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="select-filtro"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobada">Aprobada</option>
              <option value="Rechazada">Rechazada</option>
            </select>
          </div>

          <div className="filtro-item botones-accion">
            <button
              onClick={() => {
                setFiltroTipo("Todos");
                setFiltroEstado("Todos");
                setTerminoBusqueda("");
              }}
              className="btn-limpiar-filtros"
            >
              Limpiar Filtros
            </button>
            <Link to="/solicitudes/nueva" className="btn-nuevo-filtro">
              ＋ Nueva
            </Link>
          </div>
        </div>
      </section>

      {/* Grid de SolicitudCards */}
      <section className="solicitudes-grid-section">
        <div className="solicitudes-count-header">
          <span>Mostrando <strong>{solicitudesFiltradas.length}</strong> de {solicitudes.length} solicitudes</span>
          {solicitudes.length === 0 && (
            <button onClick={restablecerDatos} className="btn-restablecer">
              Cargar datos de ejemplo
            </button>
          )}
        </div>

        {solicitudesFiltradas.length === 0 ? (
          <div className="requests-section empty-results">
            <h3>No se encontraron solicitudes</h3>
            <p>No existen registros que coincidan con los filtros seleccionados.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {solicitudesFiltradas.map((solicitud) => (
              <SolicitudCard
                key={solicitud.id}
                solicitud={solicitud}
                onCambiarEstado={handleCambiarEstado}
                onEliminar={handleEliminar}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Solicitudes;
