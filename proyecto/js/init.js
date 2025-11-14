/**
 * init.js
 * Archivo de inicialización del localStorage para el Trabajo Final Integrador.
 * Este archivo garantiza que todas las entidades necesarias existan en localStorage
 * la primera vez que se accede a la aplicación, SIN sobrescribir datos existentes.
 */

// --- DATOS POR DEFECTO ---

// Médicos
const DEFAULT_MEDICOS = [
  {
    id: 1,
    matricula: 12345,
    apellido: "López",
    nombre: "Ana",
    especialidad: 1,
    descripcion: "Médica general con 10 años de experiencia en atención primaria.",
    obrasSociales: [1],
    fotografia: "image/1000736535.jpg=",
    valorConsulta: 3500.50
  },
  {
    id: 2,
    matricula: 67890,
    apellido: "García",
    nombre: "Carlos",
    especialidad: 2,
    descripcion: "Pediatra especializado en primeros años de vida.",
    obrasSociales: [1, 2],
    fotografia: "image/1000736539==",
    valorConsulta: 4000.00
  }
];

// Especialidades
const DEFAULT_ESPECIALIDADES = [
  { id: 1, nombre: "Clínica médica" },
  { id: 2, nombre: "Pediatría" }
];

// Obras Sociales (incluye campo 'descuento' para la lógica de cálculo)
const DEFAULT_OBRAS_SOCIALES = [
  { id: 1, nombre: "OSDE", descuento: 30 },
  { id: 2, nombre: "IOMA", descuento: 0 }
];

// Turnos
const DEFAULT_TURNOS = [
  { id: 1, medicoId: 1, fechaHora: "2025-11-15T10:00", disponible: true },
  { id: 2, medicoId: 1, fechaHora: "2025-11-15T11:00", disponible: true },
  { id: 3, medicoId: 2, fechaHora: "2025-11-16T09:00", disponible: true }
];

// Reservas (vacío por defecto)
const DEFAULT_RESERVAS = [];

// --- FUNCIÓN DE INICIALIZACIÓN ---

/**
 * Inicializa el localStorage con datos por defecto,
 * pero SOLO si las claves aún no existen.
 * Esto evita sobrescribir los datos creados por el usuario.
 */
// js/init.js

// ... (tus constantes DEFAULT_MEDICOS, DEFAULT_OBRAS_SOCIALES, etc.)

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

// Ejecutar la inicialización
inicializarStorage();


// Ejecutar la inicialización al cargar este script
inicializarStorage();