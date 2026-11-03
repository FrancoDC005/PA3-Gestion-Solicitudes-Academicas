import { useDispatch } from "react-redux";
import { incrementarNotificaciones } from "../redux/solicitudSlice";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSolicitudes } from "../context/SolicitudContext";
import Navbar from "../components/Navbar";

function NuevaSolicitud() {
  const { agregarSolicitud } = useSolicitudes();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formulario, setFormulario] = useState({
    estudiante: "Angel Fernando Reyes Moreno",
    codigoEstudiante: "ISIL-2026-ARM",
    carrera: "Desarrollo de Software",
    tipo: "",
    prioridad: "Media",
    descripcion: ""
  });

  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formulario.tipo) nuevosErrores.tipo = "Debe seleccionar un tipo de solicitud.";
    if (!formulario.descripcion.trim()) {
      nuevosErrores.descripcion = "Debe describir el motivo del trámite.";
    } else if (formulario.descripcion.trim().length < 10) {
      nuevosErrores.descripcion = "La descripción debe tener al menos 10 caracteres.";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    // 1. Agregar a Context API (estado global persistente)
    const creada = agregarSolicitud(formulario);

    // 2. Despachar acción a Redux Toolkit (contador y log de notificaciones)
    dispatch(
      incrementarNotificaciones({
        mensaje: `Nueva solicitud creada: ${formulario.tipo} (#${creada.id})`
      })
    );

    // 3. Navegar con React Router a la lista de solicitudes
    navigate("/solicitudes");
  };

  return (
    <main className="dashboard">
      <Navbar titulo="Registro de Solicitud Académica" />

      <section className="form-card-container">
        <div className="form-info-header">
          <h2>Formulario Único de Trámite Académico</h2>
          <p>
            Complete los campos solicitados para enviar su requerimiento a coordinación académica de ISIL.
          </p>
        </div>

        <form onSubmit={manejarEnvio} className="request-form-full">
          <div className="form-row">
            <div className="form-group">
              <label>Estudiante Solicitante</label>
              <input
                type="text"
                name="estudiante"
                value={formulario.estudiante}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="form-group">
              <label>Código de Estudiante</label>
              <input
                type="text"
                name="codigoEstudiante"
                value={formulario.codigoEstudiante}
                onChange={manejarCambio}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Carrera / Programa Académico</label>
              <select
                name="carrera"
                value={formulario.carrera}
                onChange={manejarCambio}
                required
              >
                <option value="Desarrollo de Software">Desarrollo de Software</option>
                <option value="Diseño y Gestión de Marcas">Diseño y Gestión de Marcas</option>
                <option value="Redes y Comunicaciones">Redes y Comunicaciones</option>
                <option value="Administración y Gestión Comercial">Administración y Gestión Comercial</option>
              </select>
            </div>

            <div className="form-group">
              <label>Nivel de Prioridad</label>
              <select
                name="prioridad"
                value={formulario.prioridad}
                onChange={manejarCambio}
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta (Urgente)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Tipo de Trámite / Solicitud *</label>
            <select
              name="tipo"
              value={formulario.tipo}
              onChange={manejarCambio}
              className={errores.tipo ? "input-error" : ""}
            >
              <option value="">-- Selecciona el tipo de solicitud --</option>
              <option value="Constancia de estudios">Constancia de estudios</option>
              <option value="Certificado académico">Certificado académico</option>
              <option value="Récord de notas">Récord de notas</option>
              <option value="Retiro de curso">Retiro de curso</option>
              <option value="Rectificación de matrícula">Rectificación de matrícula</option>
              <option value="Otros">Otros trámites generales</option>
            </select>
            {errores.tipo && <span className="error-msg">{errores.tipo}</span>}
          </div>

          <div className="form-group">
            <label>Motivo y Fundamentación de la Solicitud *</label>
            <textarea
              name="descripcion"
              value={formulario.descripcion}
              onChange={manejarCambio}
              placeholder="Explique detalladamente el motivo de su requerimiento académico..."
              className={errores.descripcion ? "input-error" : ""}
            />
            {errores.descripcion && <span className="error-msg">{errores.descripcion}</span>}
          </div>

          <div className="form-buttons-bar">
            <button type="submit" className="submit-button primary">
              ✓ Enviar Solicitud a Evaluación
            </button>
            <Link to="/solicitudes" className="btn-secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default NuevaSolicitud;
