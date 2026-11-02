
# COMPARACIÓN ENTRE CONTEXT API Y REDUX TOOLKIT

## 1. Introducción

En el proyecto Plataforma de Gestión de Solicitudes Académicas se implementaron dos alternativas para administrar el estado global de la aplicación: Context API y Redux Toolkit.

Ambas herramientas permiten compartir información entre diferentes componentes de React, evitando pasar propiedades manualmente por múltiples niveles.

## 2. Implementación de Context API

Context API se utilizó para administrar las solicitudes académicas.

Se implementó un proveedor denominado SolicitudProvider, encargado de compartir la información de las solicitudes con los diferentes componentes.

Sus principales funciones son:

- Registrar nuevas solicitudes.
- Consultar las solicitudes registradas.
- Compartir información entre el Dashboard y la sección de solicitudes.
- Mantener los registros utilizando localStorage.

## 3. Implementación de Redux Toolkit

Redux Toolkit se utilizó para administrar las notificaciones de nuevas solicitudes.

Se implementaron las siguientes funcionalidades:

- Incrementar el contador cuando se registra una solicitud.
- Consultar el número de notificaciones desde el Dashboard.
- Limpiar las notificaciones mediante una acción específica.

Para ello se utilizaron createSlice, configureStore, useDispatch y useSelector.

## 4. Comparación técnica

| Característica | Context API | Redux Toolkit |
|---|---|---|
| Configuración | Sencilla | Requiere configurar un Store |
| Estado global | Sí | Sí |
| Actualización | Mediante Provider | Mediante Actions y Reducers |
| Consumo | useContext | useSelector |
| Actualización de datos | Funciones del Provider | useDispatch |
| Uso en el proyecto | Solicitudes académicas | Notificaciones |

## 5. Justificación de uso

Se eligió Context API para gestionar las solicitudes académicas porque permite compartir información entre diferentes vistas sin necesitar una configuración adicional compleja.

Por otro lado, Redux Toolkit se utilizó para gestionar las notificaciones, permitiendo centralizar sus actualizaciones mediante acciones y reducers.

La combinación de ambas alternativas permitió comprender sus diferencias y aplicar cada una en una necesidad específica del proyecto.

## 6. Conclusiones

Context API y Redux Toolkit permiten administrar estados compartidos en aplicaciones React.

Context API resulta apropiado para compartir información entre componentes cuando la gestión del estado es relativamente sencilla.

Redux Toolkit ofrece una estructura centralizada mediante un Store, acciones y reducers, facilitando la organización de actualizaciones del estado.

En conclusión, ambas herramientas pueden complementarse dentro de una misma aplicación, dependiendo de las necesidades del proyecto. 
