# Plataforma de Gestión de Solicitudes Académicas

## 1. Descripción del proyecto

Aplicación web desarrollada con React.js que permite gestionar solicitudes académicas mediante una interfaz intuitiva y organizada.

El proyecto forma parte del Proceso de Aprendizaje 3 (PA3) del curso Programación Web II.

## 2. Objetivos

- Construir una aplicación SPA utilizando React.js y JSX.
- Implementar componentes reutilizables.
- Gestionar estados mediante Hooks.
- Configurar navegación con React Router.
- Implementar Context API para compartir solicitudes académicas.
- Aplicar Redux Toolkit para gestionar notificaciones.

    ## 3. Tecnologías utilizadas

    - React.js
    - JavaScript
    - JSX
    - Vite
    - React Router DOM
    - Context API
    - Redux Toolkit
    - HTML5
    - CSS3
    - LocalStorage

    ## 4. Funcionalidades

    ### Dashboard
    - Visualización del total de solicitudes.
    - Contador de solicitudes pendientes.
    - Contador de solicitudes aprobadas.
    - Contador de solicitudes rechazadas.
    - Visualización de solicitudes recientes.

    ### Gestión de solicitudes
    - Registro de nuevas solicitudes académicas.
    - Consulta de solicitudes registradas.
    - Visualización del estado de cada solicitud.

    ### Gestión del estado global
    - Context API para compartir y administrar las solicitudes.
    - Redux Toolkit para gestionar las notificaciones.
    - Persistencia local de solicitudes mediante LocalStorage.

    ## 5. Estructura del proyecto

    ```text
    pa3-pwa/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── context/
    │   │   └── SolicitudContext.jsx
    │   ├── data/
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── DetalleSolicitud.jsx
    │   │   ├── NuevaSolicitud.jsx
    │   │   └── Solicitudes.jsx
    │   ├── redux/
    │   │   ├── solicitudSlice.js
    │   │   └── store.js
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── COMPARACION_CONTEXT_REDUX.md
    ├── package.json
    └── README.md
    ```

    ## 6. Instalación y ejecución

    Clonar el repositorio:

    ```bash
    git clone URL_DEL_REPOSITORIO
    ```

    Ingresar a la carpeta:

    ```bash
    cd pa3-pwa
    ```

    Instalar dependencias:

    ```bash
    npm install
    ```

    Ejecutar el proyecto:

    ```bash
    npm run dev
    ```

    Abrir en el navegador la dirección local indicada por Vite.

    ## 7. Integrantes del equipo

    - Integrante 1: [Nombre completo]
    - Integrante 2: [Nombre completo]
    - Integrante 3: [Nombre completo]

    ## 8. Repositorio GitHub

    [Colocar aquí el enlace del repositorio]

    ## 9. Video de exposición

    [Colocar aquí el enlace público del video de YouTube]

    En el video se presentará el funcionamiento de la aplicación, las tecnologías utilizadas y la explicación de las implementaciones realizadas por cada integrante.

    ## 10. Conclusión

    El desarrollo de esta aplicación permitió aplicar los fundamentos de React.js, la construcción de componentes, el uso de Hooks, la navegación mediante React Router y la gestión global del estado con Context API y Redux Toolkit.