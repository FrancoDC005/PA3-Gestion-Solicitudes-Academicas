# Plataforma de Gestión de Solicitudes Académicas (PA3)

> **Evaluación:** PA3 — Proceso de Aprendizaje 3  
> **Curso:** PROGRAMACIÓN WEB - II (Código: 30690)  
> **Institución:** ISIL  
> **Periodo Académico:** 2026-20  
> **Sesión de corte:** Sesión 10  
> **Unidad temática:** Construcción de Aplicaciones Frontend con React.js  
> **Repositorio Oficial:** [https://github.com/FrancoDC005/PA3-Gestion-Solicitudes-Academicas](https://github.com/FrancoDC005/PA3-Gestion-Solicitudes-Academicas)

---

## 1. Integrantes del Equipo

| N° | Nombre Completo | Rol Asignado | Participación (%) | Responsabilidad Principal |
|:--:|:---|:---|:---:|:---|
| 1 | **Angel Fernando Reyes Moreno** | Líder de Proyecto / Frontend Developer | 100% | Configuración de arquitectura, React Router, Context API y Redux Store |
| 2 | **Franco Andres Diaz Carreal** | Frontend Developer | 100% | Desarrollo de componentes reutilizables (Cards, Navbar, Sidebar) y diseño CSS |
| 3 | **Rodrigo Adrian Salas Sandoval** | Logic & State Developer | 100% | Implementación de Hooks (`useState`, `useEffect`), filtros dinámicos y localStorage |

---

## 2. Descripción del Proyecto

La **Plataforma de Gestión de Solicitudes Académicas** es una aplicación web de una sola página (Single Page Application - SPA) construida con **React.js 19** y **Vite**. Su propósito es ofrecer una interfaz moderna, fluida y reactiva para que estudiantes y coordinadores académicos puedan registrar, consultar, filtrar y gestionar el ciclo de vida de diversos trámites institucionales (tales como certificados de notas, constancias de estudio, retiros de asignaturas y rectificaciones de matrícula).

Siguiendo estrictamente las indicaciones de corte curricular de la **Sesión 10**, la solución opera con datos locales simulados persistidos en `localStorage`, garantizando un funcionamiento 100% interactivo y desacoplado, sin anticipar el consumo de APIs externas mediante Axios ni autenticación JWT (contenidos reservados para la Sesión 11).

---

## 3. Objetivos de Aprendizaje

- **SPA y Componentización:** Construir una interfaz dinámica y modular mediante componentes funcionales en React empleando sintaxis JSX moderna.
- **Manejo de Estado Local con Hooks:** Gestionar el comportamiento reactivo de formularios, búsquedas y filtros utilizando `useState` y efectos secundarios con `useEffect`.
- **Navegación SPA:** Implementar rutas dinámicas declarativas y navegación sin recarga de página mediante **React Router DOM v7**.
- **Gestión de Estado Global con Context API:** Crear un proveedor (`SolicitudProvider`) y un custom hook (`useSolicitudes`) para administrar el estado global del catálogo de solicitudes y evitar el *prop drilling*.
- **Introducción a Redux Toolkit:** Diseñar un flujo de datos unidireccional desacoplado con `@reduxjs/toolkit` y `react-redux` para el sistema global de notificaciones.
- **Análisis Comparativo:** Contrastar técnicamente las ventajas, limitaciones y escenarios de uso entre Context API y Redux Toolkit.

---

## 4. Solución Propuesta y Desarrollo Técnico

El proyecto se estructura en 4 actividades técnicas fundamentales que suman el puntaje completo de desarrollo:

### Actividad 1: SPA en React con JSX, Componentes y Hooks (3 Puntos)
- **Componentes Modulares:** Organización jerárquica con componentes reutilizables como `Navbar`, `Sidebar`, `SolicitudCard` y vistas de página dedicadas.
- **Hooks Fundamentales:**
  - `useState`: Empleado para el control de formularios reactivos en `NuevaSolicitud.jsx`, filtros de búsqueda en `Solicitudes.jsx`, y control de respuestas administrativas en `DetalleSolicitud.jsx`.
  - `useEffect`: Utilizado en `SolicitudContext.jsx` para sincronizar de manera persistente cualquier cambio de la colección en el almacenamiento local del navegador (`localStorage`).
- **Simulación de Datos:** Catálogo inicial tipificado en `src/data/solicitudes.js` que permite interactuar con el sistema inmediatamente sin dependencias de backend.

### Actividad 2: Navegación SPA con React Router (3 Puntos)
- Configuración en `src/App.jsx` mediante `<BrowserRouter>`, `<Routes>` y `<Route>`.
- Rutas funcionales implementadas:
  - `/`: **Dashboard** general con métricas, tarjetas estadísticas y acceso rápido.
  - `/solicitudes`: Catálogo interactivo de **Solicitudes** con buscador en tiempo real y filtrado por estado y tipo.
  - `/solicitudes/nueva`: Formulario de registro de **Nueva Solicitud** académica con validación en cliente.
  - `/solicitudes/:id`: **Detalle de Solicitud** con ruta parametrizada para visualizar la ficha completa y cambiar estados.
  - `/comparacion`: Página técnica interactiva que expone la fundamentación de **Context vs Redux**.
  - `*`: Redirección automática de fallback hacia la ruta principal.
- Uso de componentes de enlace activo como `<NavLink>` y redirección programática mediante `useNavigate()`.

### Actividad 3: Estado Global con Context API (2 Puntos)
- Se implementó `SolicitudContext` con su proveedor `SolicitudProvider` para centralizar la lógica de negocio de las solicitudes.
- Se exporta el hook personalizado `useSolicitudes()`, el cual proporciona acceso directo a:
  - `solicitudes`: Array de trámites activos.
  - `agregarSolicitud(datos)`: Inserción de nueva solicitud.
  - `actualizarEstado(id, nuevoEstado, respuesta)`: Transición de estado (Pendiente, Aprobada, Rechazada).
  - `eliminarSolicitud(id)`: Eliminación reactiva de registros.
  - `restablecerDatos()`: Función auxiliar para reiniciar el banco de pruebas.
  - Estados de filtros y término de búsqueda compartidos.

### Actividad 4: Introducción Práctica a Redux Toolkit y Comparación Técnica (2 Puntos)
- Implementación de un flujo desacoplado con `@reduxjs/toolkit` en `src/redux/solicitudSlice.js`.
- El Store gestiona el contador global de notificaciones y el historial de acciones despachadas.
- Cada vez que una solicitud es registrada o su estado es alterado, se dispara una acción (`incrementarNotificaciones` o `notificarCambioEstado`).
- La campana de notificación en la barra superior (`Navbar.jsx`) y el indicador en el `Sidebar.jsx` reflejan las mutaciones mediante `useSelector()`.
- Documento formal de fundamentación disponible en [`COMPARACION_CONTEXT_REDUX.md`](./COMPARACION_CONTEXT_REDUX.md) y visible desde la ruta `/comparacion`.

---

## 5. Estructura del Repositorio

```text
PA3-Gestion-Solicitudes-Academicas/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx               # Barra superior con monitor de notificaciones Redux
│   │   ├── Sidebar.jsx              # Navegación lateral con enlaces React Router
│   │   └── SolicitudCard.jsx        # Tarjeta modular para renderizar cada solicitud
│   ├── context/
│   │   ├── SolicitudContext.jsx     # Context API con Provider, persistencia y custom hook
│   │   └── solicitudContextDef.js   # Definición del contexto compatible con Fast Refresh
│   ├── data/
│   │   └── solicitudes.js           # Datos iniciales simulados del caso práctico
│   ├── pages/
│   │   ├── Dashboard.jsx            # Métricas dinámicas, contadores y solicitudes recientes
│   │   ├── Solicitudes.jsx          # Catálogo completo con búsqueda y filtros combinados
│   │   ├── NuevaSolicitud.jsx       # Formulario validado para registro de trámites
│   │   ├── DetalleSolicitud.jsx     # Vista de detalle con resolución de estados
│   │   └── Comparacion.jsx          # Vista explicativa de Context API vs Redux Toolkit
│   ├── redux/
│   │   ├── solicitudSlice.js        # Slice de Redux Toolkit para notificaciones y eventos
│   │   └── store.js                 # Configuración central del Store con configureStore
│   ├── App.jsx                      # Configuración de rutas y proveedores globales
│   ├── App.css                      # Reglas complementarias de estilo
│   ├── index.css                    # Hoja de estilos principal responsiva (Desktop / Mobile)
│   └── main.jsx                     # Punto de entrada raíz con Redux Provider
├── COMPARACION_CONTEXT_REDUX.md     # Documento técnico detallado exigido en la Actividad 4
├── package.json                     # Declaración de dependencias y scripts de construcción
├── vite.config.js                   # Configuración del bundler Vite
└── README.md                        # Documentación obligatoria del proyecto
```

---

## 6. Instrucciones de Instalación y Ejecución

Sigue estos pasos para clonar, instalar dependencias y levantar el proyecto en tu entorno local:

### Prerrequisitos
- Node.js (versión 18.x o superior recomendada)
- Gestor de paquetes npm o yarn

### Pasos de ejecución
```bash
# 1. Clonar el repositorio
git clone https://github.com/FrancoDC005/PA3-Gestion-Solicitudes-Academicas.git

# 2. Navegar a la carpeta del proyecto
cd PA3-Gestion-Solicitudes-Academicas

# 3. Instalar las dependencias de React, Router y Redux Toolkit
npm install

# 4. Iniciar el servidor de desarrollo en Vite
npm run dev
```

Una vez ejecutado, abre tu navegador en la URL local proporcionada por la consola (generalmente `http://localhost:5173`).

Para verificar la compilación de producción:
```bash
npm run build
```

---

## 7. Evidencias de Funcionamiento

- **Dashboard Dinámico:** Presenta indicadores cuantitativos sincronizados automáticamente (Total, Pendientes, Aprobadas y Rechazadas).
- **Flujo de Navegación SPA:** Transición instantánea entre vistas sin recarga del navegador.
- **Formulario Interactivo:** Registro de nuevas solicitudes con validación y asignación de identificador único.
- **Notificaciones en Redux:** Al despachar acciones, el badge del Navbar y el contador del Sidebar se actualizan en tiempo real.
- **Persistencia en LocalStorage:** Al recargar la página o reiniciar el navegador, los datos permanecen disponibles.

---

## 8. Video Público de Exposición

De acuerdo a las especificaciones obligatorias de la evaluación, el enlace correspondiente es:

**Video público de YouTube:** [PEGAR AQUÍ EL ENLACE]

*(En el video participan todos los integrantes del equipo con cámara encendida, explicando el problema, arquitectura técnica, código fuente y la comparación entre Context API y Redux).*

---

## 9. Conclusiones del Equipo

1. **Eficiencia en el desarrollo con React:** La separación de la interfaz en componentes funcionales reutilizables acelera el desarrollo y garantiza la mantenibilidad del código.
2. **Navegación fluida:** React Router proporciona una experiencia de usuario idéntica a la de una aplicación de escritorio nativa, eliminando los parpadeos por recarga completa de página.
3. **Selección fundamentada de herramientas de estado:** Context API es la opción ideal para compartir información estructurada del dominio sin añadir complejidad innecesaria, mientras que Redux Toolkit aporta robustez, trazabilidad y predictibilidad en flujos de eventos globales desacoplados.

