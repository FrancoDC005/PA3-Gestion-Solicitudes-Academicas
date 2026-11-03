import Navbar from "../components/Navbar";

function Comparacion() {
  return (
    <main className="dashboard">
      <Navbar titulo="Comparación Técnica: Context API vs Redux Toolkit" />

      <section className="welcome-card" style={{ background: "linear-gradient(120deg, #1e3a8a, #4338ca)" }}>
        <div>
          <h2>Actividad 4: Gestión de Estado Global en React</h2>
          <p>
            Análisis y fundamentación de las decisiones de arquitectura de estado tomadas en la SPA según el sílabo de ISIL.
          </p>
        </div>
        <span className="welcome-icon">⚖</span>
      </section>

      <section className="requests-section">
        <h3>1. Propósito y Arquitectura de Estado en el Proyecto</h3>
        <p style={{ marginTop: "10px", lineHeight: "1.6", color: "#334155" }}>
          En esta evaluación se implementaron y contrastaron ambas herramientas para resolver necesidades complementarias:
        </p>
        <ul style={{ marginLeft: "20px", marginTop: "10px", lineHeight: "1.8", color: "#475569" }}>
          <li>
            <strong>Context API (SolicitudContext):</strong> Administra la colección principal de <em>Solicitudes Académicas</em> (creación, edición de estados, listados y filtros). Al tratarse de un dominio con operaciones directas en componentes interconectados, Context evita el <em>prop drilling</em> con una implementación limpia y nativa.
          </li>
          <li>
            <strong>Redux Toolkit (solicitudSlice & store):</strong> Administra el subsistema desacoplado de <em>Notificaciones y Alertas Globales</em>. Demuestra el flujo unidireccional estricto (<code>dispatch(action) → reducer → store selector</code>), ideal para eventos transversales independientes de la vista actual.
          </li>
        </ul>
      </section>

      <section className="requests-section">
        <h3>2. Cuadro Comparativo Técnico</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Criterio</th>
                <th>Context API (React Nativo)</th>
                <th>Redux Toolkit (@reduxjs/toolkit)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Tipo de Solución</strong></td>
                <td>Mecanismo nativo de React para inyección de dependencias</td>
                <td>Librería externa para arquitectura de estado centralizado y predecible</td>
              </tr>
              <tr>
                <td><strong>Curva de Aprendizaje</strong></td>
                <td>Baja (usa <code>createContext</code> y <code>useContext</code>)</td>
                <td>Media (conceptos de store, slice, reducers, actions, dispatch)</td>
              </tr>
              <tr>
                <td><strong>Configuración</strong></td>
                <td>Mínima, sin librerías adicionales ni boilerplate</td>
                <td>Requiere configurar Store con <code>configureStore</code> y envolver con <code>&lt;Provider&gt;</code></td>
              </tr>
              <tr>
                <td><strong>Flujo de Actualización</strong></td>
                <td>Funciones expuestas por el Provider a través de <code>useState</code></td>
                <td>Despacho de acciones inmutables mediante <code>dispatch(action())</code> y reducers con Immer</td>
              </tr>
              <tr>
                <td><strong>Rendimiento en Escala</strong></td>
                <td>Re-renderiza a todos los consumidores suscritos si el valor del contexto cambia</td>
                <td>Altamente optimizado con selectores (<code>useSelector</code>) que previenen re-renders innecesarios</td>
              </tr>
              <tr>
                <td><strong>Herramientas de Depuración</strong></td>
                <td>React Developer Tools básica</td>
                <td>Redux DevTools con Time-Travel Debugging e inspección de cada acción disparada</td>
              </tr>
              <tr>
                <td><strong>Rol en el Caso Práctico</strong></td>
                <td>Gestión de datos del negocio (Solicitudes académicas y CRUD local)</td>
                <td>Gestión de eventos globales (Notificaciones de nuevas solicitudes y cambios de estado)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="requests-section">
        <h3>3. Justificación y Conclusiones del Equipo</h3>
        <p style={{ marginTop: "10px", lineHeight: "1.6", color: "#334155" }}>
          <strong>¿Cuándo usar Context API?</strong> Es la opción más eficiente para estados globales de complejidad baja a moderada, temas visuales (Dark/Light), datos de usuario autenticado o flujos locales donde no se justifique añadir dependencias externas.
        </p>
        <p style={{ marginTop: "10px", lineHeight: "1.6", color: "#334155" }}>
          <strong>¿Cuándo usar Redux Toolkit?</strong> Es la solución indicada en aplicaciones empresariales de gran escala con lógica de negocio compleja, múltiples fuentes de datos asíncronos y necesidad de trazabilidad rigurosa de cada mutación de estado.
        </p>
      </section>
    </main>
  );
}

export default Comparacion;
