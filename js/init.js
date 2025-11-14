

const DEFAULT_MEDICOS = [
  {
    id: 1,
    matricula: 72356,
    apellido: "López",
    nombre: "Ana",
    especialidad: 1,
    descripcion: "Médica general con 10 años de experiencia.",
    obrasSociales: [1, 2, 3],
    fotografia: "image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2QwZDBkMCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1zaXplPSIxOCIgZm9udC1mYW1pbHk9IkFyaWFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzA3MDcwIj5EcmEuIEFuaWEgTMOwcGV6PC90ZXh0Pjwvc3ZnPg==",
    valorConsulta: 3500.50
  },
  {
    id: 2,
    matricula: 45506,
    apellido: "Gómez",
    nombre: "Valentina",
    especialidad: 2,
    descripcion: "Pediatra especializada en primeros años de vida.",
    obrasSociales: [1, 2, 4],
    fotografia: "image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2QwZDBkMCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1zaXplPSIxOCIgZm9udC1mYW1pbHk9IkFyaWFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzA3MDcwIj5EcmEuIFZhbGVudGluYSBHT23DqXogPC90ZXh0Pjwvc3ZnPg==",
    valorConsulta: 4000.00
  },
  {
    id: 3,
    matricula: 28507,
    apellido: "Fernández",
    nombre: "Agustina",
    especialidad: 3,
    descripcion: "Neuróloga con enfoque en trastornos del sueño.",
    obrasSociales: [1, 5, 6],
    fotografia: "image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2QwZDBkMCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1zaXplPSIxOCIgZm9udC1mYW1pbHk9IkFyaWFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzA3MDcwIj5EcmEuIEFndXN0aW5hIEZlcm7DqW5kZXo8L3RleHQ+PC9zdmc+",
    valorConsulta: 4500.00
  },
  {
    id: 4,
    matricula: 20954,
    apellido: "Castro",
    nombre: "Sofía",
    especialidad: 4,
    descripcion: "Oftalmóloga con tecnología de vanguardia.",
    obrasSociales: [1, 7, 8],
    fotografia: "image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2QwZDBkMCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1zaXplPSIxOCIgZm9udC1mYW1pbHk9IkFyaWFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzA3MDcwIj5EcmEuIFNvZsOtYSBDYXN0cm88L3RleHQ+PC9zdmc+",
    valorConsulta: 3800.00
  },
  {
    id: 5,
    matricula: 34657,
    apellido: "Ortega",
    nombre: "Alex",
    especialidad: 5,
    descripcion: "Traumatólogo especializado en deporte.",
    obrasSociales: [1, 2, 3],
    fotografia: "image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2QwZDBkMCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1zaXplPSIxOCIgZm9udC1mYW1pbHk9IkFyaWFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzA3MDcwIj5Eci4gQWxleCBPcnRlZ2E8L3RleHQ+PC9zdmc+",
    valorConsulta: 5000.00
  }
];

const DEFAULT_ESPECIALIDADES = [
  { id: 1, nombre: "Cardiología" },
  { id: 2, nombre: "Pediatría" },
  { id: 3, nombre: "Neurología" },
  { id: 4, nombre: "Oftalmología" },
  { id: 5, nombre: "Traumatología" }
];

const DEFAULT_OBRAS_SOCIALES = [
  { id: 1, nombre: "OSDE", descuento: 30 },
  { id: 2, nombre: "OSPENFER", descuento: 25 },
  { id: 3, nombre: "OSPEP", descuento: 20 },
  { id: 4, nombre: "OSPLA", descuento: 15 },
  { id: 5, nombre: "CSIG", descuento: 10 },
  { id: 6, nombre: "OSPENA", descuento: 5 },
  { id: 7, nombre: "CIG", descuento: 25 },
  { id: 8, nombre: "OSPEFE", descuento: 20 }
];

const DEFAULT_TURNOS = [
  { id: 1, medicoId: 1, fechaHora: "2025-11-13T08:00", disponible: true },
  { id: 2, medicoId: 1, fechaHora: "2025-11-19T08:00", disponible: true },
  { id: 3, medicoId: 2, fechaHora: "2025-11-20T08:00", disponible: false },
  { id: 4, medicoId: 3, fechaHora: "2025-11-21T08:00", disponible: true },
  { id: 5, medicoId: 4, fechaHora: "2025-11-18T08:00", disponible: true }
];

const DEFAULT_RESERVAS = [];

function inicializarStorage() {
  if (!localStorage.getItem('medicos')) {
    localStorage.setItem('medicos', JSON.stringify(DEFAULT_MEDICOS));
  }
  if (!localStorage.getItem('especialidades')) {
    localStorage.setItem('especialidades', JSON.stringify(DEFAULT_ESPECIALIDADES));
  }
  if (!localStorage.getItem('obrasSociales')) {
    localStorage.setItem('obrasSociales', JSON.stringify(DEFAULT_OBRAS_SOCIALES));
  }
  if (!localStorage.getItem('turnos')) {
    localStorage.setItem('turnos', JSON.stringify(DEFAULT_TURNOS));
  }
  if (!localStorage.getItem('reservas')) {
    localStorage.setItem('reservas', JSON.stringify(DEFAULT_RESERVAS));
  }
}

inicializarStorage();