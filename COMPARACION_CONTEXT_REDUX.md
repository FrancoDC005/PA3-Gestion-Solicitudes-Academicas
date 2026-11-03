# Comparación Técnica: Context API vs Redux Toolkit

## 1. Introducción y Propósito

En el marco del **Proceso de Aprendizaje 3 (PA3)** del curso **Programación Web II** (Código 30690 - ISIL), se desarrolló la aplicación de una sola página (SPA) **"Plataforma de Gestión de Solicitudes Académicas"**.

Uno de los principales desafíos arquitectónicos en aplicaciones modernas de React consiste en administrar el estado de forma eficiente, evitando el problema del *prop drilling* (pasar datos manualmente a través de múltiples niveles jerárquicos de componentes). Para responder a esta problemática y satisfacer los requerimientos de las **Actividades 3 y 4**, se implementaron y contrastaron dos alternativas de gestión de estado global:

1. **Context API** (solución nativa del núcleo de React).
2. **Redux Toolkit** (librería externa de arquitectura de estado predecible).

---

## 2. Implementación de Context API

### Justificación de uso
Context API se seleccionó para gobernar el **dominio central del negocio**: las *Solicitudes Académicas*. 

Dado que las operaciones principales (registrar trámite, consultar catálogo, filtrar registros y actualizar estado a Aprobada/Rechazada) ocurren entre vistas directamente relacionadas (Dashboard, Catálogo, Detalle y Formulario), Context API ofrece una solución limpia, directa y sin sobrecarga de librerías externas.

### Arquitectura técnica
- **Archivo:** `src/context/SolicitudContext.jsx`
- **Componente Provider:** `SolicitudProvider` envuelve a toda la aplicación (`<BrowserRouter>` y `<Routes>`) en `App.jsx`.
- **Custom Hook:** `useSolicitudes()`, el cual encapsula el llamado a `useContext(SolicitudContext)` y previene consumos fuera del Provider.
- **Persistencia:** Integración reactiva mediante Hooks `useState` y `useEffect` sincronizados con `localStorage` (`solicitudes_academicas`), asegurando que las solicitudes creadas por el usuario permanezcan al recargar la página.
- **Datos locales simulados:** Se incluyeron trámites precargados en `src/data/solicitudes.js` con el fin de cumplir estrictamente con el corte curricular de la Sesión 10 (sin adelantar consumo asíncrono con Axios previsto para la Sesión 11).

---

## 3. Implementación de Redux Toolkit

### Justificación de uso
Redux Toolkit (`@reduxjs/toolkit` y `react-redux`) se implementó de forma acotada y deliberada para resolver una necesidad transversal y desacoplada del caso práctico: el **sistema de notificaciones y alertas de eventos en tiempo real**.

Esta necesidad modela con exactitud el escenario donde Redux destaca: un contador y registro histórico global que se ve afectado desde diversas pantallas (al crear una solicitud en `NuevaSolicitud.jsx` o al modificar su estado en `DetalleSolicitud.jsx`) y que debe consumirse de manera persistente en componentes periféricos como la barra de navegación superior (`Navbar.jsx`), el panel lateral (`Sidebar.jsx`) y el panel analítico del `Dashboard.jsx`.

### Arquitectura técnica
- **Slice:** `src/redux/solicitudSlice.js` creado mediante `createSlice`.
  - **Estado inicial:** `{ notificaciones: 0, historialNotificaciones: [], ultimoEvento: null }`.
  - **Reducers y Actions generadas:**
    - `incrementarNotificaciones`: incrementa el contador y agrega un registro con marca de tiempo al historial.
    - `limpiarNotificaciones`: restablece las notificaciones y vacía el registro.
    - `notificarCambioEstado`: registra eventos específicos cuando una solicitud cambia a Aprobada, Rechazada o Pendiente.
- **Store:** `src/redux/store.js` configurado mediante `configureStore`.
- **Integración:** El `Provider` de `react-redux` envuelve la raíz del árbol de renderizado en `src/main.jsx`.
- **Consumo y Despacho:**
  - `useSelector((state) => state.solicitudes.notificaciones)` para suscripciones reactivas de solo lectura.
  - `const dispatch = useDispatch()` para despachar acciones inmutables sin acoplamiento.

---

## 4. Cuadro Comparativo Técnico Detallado

| Criterio Evaluado | Context API (React Core) | Redux Toolkit (@reduxjs/toolkit) |
|---|---|---|
| **Naturaleza / Origen** | Mecanismo nativo de React para inyección de dependencias y compartir datos. | Librería externa de terceros que implementa el patrón Flux / Redux de forma estandarizada. |
| **Complejidad y Curva de Aprendizaje** | Muy baja. Requiere únicamente familiaridad con `createContext`, `useContext` y `useState`. | Media. Introduce conceptos específicos: store, slices, actions, dispatch, reducers inmutables y selectores. |
| **Instalación y Boilerplate** | Cero dependencias adicionales. Código directo y conciso. | Requiere instalar `@reduxjs/toolkit` y `react-redux`. Configura un Store centralizado. |
| **Flujo de Mutación de Estado** | Las funciones expuestas por el Provider invocan setters de estado (`setState`). | Flujo unidireccional estricto: vista dispara `dispatch(action)` → reducer procesa mutación segura (Immer) → store actualiza suscriptores. |
| **Optimización de Renderizado** | Cuando el valor provisto cambia, todos los componentes consumidores se re-renderizan (a menos que se dividan contextos o use memoización). | Altamente optimizado: `useSelector` realiza comparaciones de igualdad referencial y solo re-renderiza cuando la porción seleccionada cambia. |
| **Herramientas de Depuración** | React Developer Tools estándar (inspección de árbol de componentes). | Redux DevTools: inspección de cada acción disparada, registro de estados previo y posterior, y soporte de Time-Travel Debugging. |
| **Manejo de Operaciones Asíncronas** | Manual, requiriendo lógica personalizada dentro de `useEffect` o funciones auxiliares. | Estandarizado mediante middleware (`createAsyncThunk` o RTK Query). |
| **Aplicación en el Proyecto PA3** | **Colección de Solicitudes Académicas:** Creación, filtrado, búsqueda y actualización de estados en memoria. | **Notificaciones y Registro de Eventos:** Contador global en Navbar, historial de eventos y alertas transversales. |

---

## 5. Justificación y Criterios de Selección

A partir del caso desarrollado, el equipo sintetiza las siguientes reglas de decisión técnica:

1. **¿Cuándo utilizar Context API?**
   - Para aplicaciones pequeñas a medianas donde el flujo de datos no requiera trazabilidad compleja.
   - Para estados globales de baja frecuencia de actualización: temas de interfaz (Dark/Light Mode), idioma o preferencias de usuario.
   - Cuando se desea mantener el proyecto ligero sin añadir dependencias npm adicionales.

2. **¿Cuándo utilizar Redux Toolkit?**
   - Para aplicaciones empresariales de mediana a gran escala con múltiples equipos de desarrollo trabajando en paralelo.
   - Cuando el estado de la aplicación cambia con alta frecuencia o involucra flujos de datos complejos y concurrentes.
   - Cuando es indispensable contar con herramientas avanzadas de monitoreo, pruebas y trazabilidad de acciones.

---

## 6. Conclusiones

1. **Complementariedad sobre competencia:** Context API y Redux Toolkit no son excluyentes. En este proyecto se demostró cómo pueden coexistir armónicamente en una misma SPA: Context API resolviendo la gestión de entidades académicas con simplicidad, y Redux Toolkit ofreciendo un canal desacoplado para notificaciones globales.
2. **Cumplimiento curricular:** Se demostró la implementación práctica de ambos modelos sin incurrir en dependencias de backend (Axios/JWT), respetando el corte de la Sesión 10 y fortaleciendo la comprensión de los fundamentos de estado en React.
