// panel-administrativo.js

function getMedicos() {
  return JSON.parse(localStorage.getItem('medicos')) || [];
}

function getReservas() {
  return JSON.parse(localStorage.getItem('reservas')) || [];
}

function getTurnos() {
  return JSON.parse(localStorage.getItem('turnos')) || [];
}

function getObrasSociales() {
  return JSON.parse(localStorage.getItem('obrasSociales')) || [];
}