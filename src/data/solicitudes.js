// Datos simulados iniciales para la Plataforma de Gestión de Solicitudes Académicas (ISIL)
// Permite evaluar la SPA sin requerir conexión a backend con Axios (previsto para sesión 11)

export const solicitudesIniciales = [
  {
    id: 1001,
    codigoEstudiante: "ISIL202401",
    estudiante: "Carlos Mendoza",
    carrera: "Desarrollo de Software",
    tipo: "Constancia de estudios",
    descripcion: "Solicitud de constancia de estudios para trámite de prácticas preprofesionales en empresa de telecomunicaciones.",
    fecha: "28/10/2026",
    estado: "Aprobada",
    prioridad: "Media",
    respuesta: "Constancia emitida y enviada al correo institucional del estudiante."
  },
  {
    id: 1002,
    codigoEstudiante: "ISIL202402",
    estudiante: "Ana Lucía Paredes",
    carrera: "Diseño y Gestión de Marcas",
    tipo: "Récord de notas",
    descripcion: "Récord histórico de notas consolidado para convalidación de créditos académicos en intercambio estudiantil.",
    fecha: "30/10/2026",
    estado: "Pendiente",
    prioridad: "Alta",
    respuesta: "En proceso de revisión por la coordinación académica."
  },
  {
    id: 1003,
    codigoEstudiante: "ISIL202403",
    estudiante: "Jorge Luis Huamán",
    carrera: "Redes y Comunicaciones",
    tipo: "Certificado académico",
    descripcion: "Certificado modular de competencias técnicas del ciclo IV para acreditación laboral.",
    fecha: "01/11/2026",
    estado: "Pendiente",
    prioridad: "Media",
    respuesta: "Pendiente de validación de requisitos documentarios."
  },
  {
    id: 1004,
    codigoEstudiante: "ISIL202404",
    estudiante: "Mariana Silva",
    carrera: "Desarrollo de Software",
    tipo: "Retiro de curso",
    descripcion: "Retiro extemporáneo del curso electivo por cruce de horario laboral imprevisto.",
    fecha: "02/11/2026",
    estado: "Rechazada",
    prioridad: "Baja",
    respuesta: "La fecha límite para retiro de cursos del periodo venció según el calendario institucional."
  }
];
