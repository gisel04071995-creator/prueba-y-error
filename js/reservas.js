// Función para renderizar la tabla de reservas
function renderizarTablaReservas() {
  const reservas = getReservas();
  const medicos = getMedicos();
  const obras = getObrasSociales();
  const turnos = getTurnos();
  const tbody = document.getElementById('tablaReservas');
  if (!tbody) return; // ✅ Seguridad: si no existe la tabla, salir.
  tbody.innerHTML = '';

  reservas.forEach(r => {
    // Obtener datos relacionados
    const medico = medicos.find(m => m.id === r.turno) ? medicos.find(m => m.id === r.turno) : { nombre: 'Desconocido', apellido: '' };
    const obra = obras.find(o => o.id === r.obraSocial) ? obras.find(o => o.id === r.obraSocial) : { nombre: 'Desconocida', descuento: 0 };

    // Calcular valor real y con descuento
    const valorReal = parseFloat(medico.valorConsulta);
    const descuentoPorcentaje = obra.descuento || 0;
    const valorConDescuento = valorReal - (valorReal * (descuentoPorcentaje / 100));

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.id}</td>
      <td>${r.nombrePaciente}</td>
      <td>${r.documento}</td>
      <td>${medico.nombre} ${medico.apellido}</td>
      <td>${obra.nombre}</td>
      <td>$${valorReal.toFixed(2)}</td>
      <td>${descuentoPorcentaje}%</td>
      <td>$${valorConDescuento.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// --- Funciones auxiliares ---
function getReservas() {
  return JSON.parse(localStorage.getItem('reservas')) || [];
}

function getMedicos() {
  return JSON.parse(localStorage.getItem('medicos')) || [];
}

function getObrasSociales() {
  return JSON.parse(localStorage.getItem('obrasSociales')) || [];
}

function getTurnos() {
  return JSON.parse(localStorage.getItem('turnos')) || [];
}

// --- Inicialización ---
// Verificar autenticación (asegúrate de que utils.js esté cargado)
if (typeof verificarAutenticacion === 'function') {
  verificarAutenticacion();
}

// Cargar la tabla al cargar la página
window.addEventListener('DOMContentLoaded', function() {
  renderizarTablaReservas();
});