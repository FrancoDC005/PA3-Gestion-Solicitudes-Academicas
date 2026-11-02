import { useDispatch } from "react-redux";
import { incrementarNotificaciones } from "../redux/solicitudSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSolicitudes } from "../context/SolicitudContext";

function NuevaSolicitud() {
  const { agregarSolicitud } = useSolicitudes();
  const navigate = useNavigate();
  const dispatch = useDispatch();   

  const [formulario, setFormulario] = useState({
    tipo: "",
    descripcion: ""
  });

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    agregarSolicitud(formulario);
    dispatch(incrementarNotificaciones());

    alert("Solicitud registrada correctamente");

    navigate("/solicitudes");
  };

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Nueva solicitud</h1>
          <p>Completa los datos para registrar tu solicitud académica.</p>
        </div>
      </header>

      <section className="requests-section">
        <form onSubmit={manejarEnvio} className="request-form">
          <label>Tipo de solicitud</label>

          <select
            name="tipo"
            value={formulario.tipo}
            onChange={manejarCambio}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="Constancia de estudios">Constancia de estudios</option>
            <option value="Certificado académico">Certificado académico</option>
            <option value="Récord de notas">Récord de notas</option>
            <option value="Otros">Otros</option>
          </select>

          <label>Descripción</label>

          <textarea
            name="descripcion"
            value={formulario.descripcion}
            onChange={manejarCambio}
            placeholder="Describe el motivo de tu solicitud..."
            required
          />

          <button type="submit" className="submit-button">
            Registrar solicitud
          </button>
        </form>
      </section>
    </main>
  );
}

export default NuevaSolicitud;
