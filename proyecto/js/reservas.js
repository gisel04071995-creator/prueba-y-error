// js/reservas.js

// === Función principal que se llama al cargar la página ===
function cargarDatosFormulario() {
  const medicos = JSON.parse(localStorage.getItem('medicos')) || [];
  const obrasSociales = JSON.parse(localStorage.getItem('obrasSociales')) || [];
  const turnos = JSON.parse(localStorage.getItem('turnos')) || [];

  // Obtener parámetro de URL
  const urlParams = new URLSearchParams(window.location.search);
  const medicoId = urlParams.get('medico');

  // Cargar médicos
  const selectMedico = document.getElementById('medico');
  selectMedico.innerHTML = '<option value="">Seleccionar...</option>';
  medicos.forEach(m => {
    const option = document.createElement('option');
    option.value = m.id;
    option.textContent = `${m.nombre} ${m.apellido}`;
    selectMedico.appendChild(option);
  });

  // Si hay un médico en la URL, precargarlo
  if (medicoId) {
    selectMedico.value = medicoId;
    cargarObrasSociales(parseInt(medicoId));
    cargarTurnos(parseInt(medicoId));
    actualizarValorTotal(parseInt(medicoId));
  }

  // Evento para cambiar médico
  selectMedico.addEventListener('change', function() {
    const selectedMedicoId = parseInt(this.value);
    if (selectedMedicoId) {
      cargarObrasSociales(selectedMedicoId);
      cargarTurnos(selectedMedicoId);
      actualizarValorTotal(selectedMedicoId);
    } else {
      document.getElementById('obraSocial').innerHTML = '<option value="">Seleccionar...</option>';
      document.getElementById('turno').innerHTML = '<option value="">Seleccionar...</option>';
      document.getElementById('valor-total').textContent = '0.00';
    }
  });
}
function renderizarTablaReservas() {
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  const medicos = JSON.parse(localStorage.getItem('medicos')) || [];
  const obras = JSON.parse(localStorage.getItem('obrasSociales')) || [];

  const tbody = document.getElementById('tablaReservas');
  if (!tbody) return;

  tbody.innerHTML = '';

  reservas.forEach(r => {
    // Buscar médico asociado al turno
    const medico = medicos.find(m => m.id === r.turno) || { nombre: 'Desconocido', apellido: '' };
    // Buscar obra social
    const obra = obras.find(o => o.id === r.obraSocial) || { nombre: 'Desconocida', descuento: 0 };

    // Calcular valores
    const valorReal = parseFloat(medico.valorConsulta) || 0;
    const descuento = obra.descuento || 0;
    const valorFinal = valorReal - (valorReal * (descuento / 100));

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.id}</td>
      <td>${r.nombrePaciente}</td>
      <td>${r.documento}</td>
      <td>${medico.nombre} ${medico.apellido}</td>
      <td>${obra.nombre}</td>
      <td>$${valorReal.toFixed(2)}</td>
      <td>${descuento}%</td>
      <td>$${valorFinal.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });
}
// === Funciones auxiliares ===

function cargarObrasSociales(medicoId) {
  const medico = JSON.parse(localStorage.getItem('medicos')).find(m => m.id === medicoId);
  const selectObra = document.getElementById('obraSocial');
  selectObra.innerHTML = '<option value="">Seleccionar...</option>';
  if (medico) {
    medico.obrasSociales.forEach(id => {
      const obra = JSON.parse(localStorage.getItem('obrasSociales')).find(o => o.id === id);
      if (obra) {
        const option = document.createElement('option');
        option.value = obra.id;
        option.textContent = obra.nombre;
        selectObra.appendChild(option);
      }
    });
  }
}

function cargarTurnos(medicoId) {
  const selectTurno = document.getElementById('turno');
  selectTurno.innerHTML = '<option value="">Seleccionar...</option>';
  const turnosDisponibles = JSON.parse(localStorage.getItem('turnos'))
    .filter(t => t.medicoId === medicoId && t.disponible);
  turnosDisponibles.forEach(t => {
    const option = document.createElement('option');
    option.value = t.id;
    option.textContent = t.fechaHora;
    selectTurno.appendChild(option);
  });
}

function actualizarValorTotal(medicoId) {
  const medico = JSON.parse(localStorage.getItem('medicos')).find(m => m.id === medicoId);
  const span = document.getElementById('valor-total');
  span.textContent = medico ? parseFloat(medico.valorConsulta).toFixed(2) : '0.00';
}

// === Validación y envío del formulario ===
document.getElementById('form-reserva')?.addEventListener('submit', function(e) {
  e.preventDefault();

  if (!this.checkValidity()) {
    e.stopPropagation();
    this.classList.add('was-validated');
    return;
  }

  const reserva = {
    id: Date.now(),
    documento: document.getElementById('documento').value,
    nombrePaciente: document.getElementById('nombrePaciente').value,
    turno: parseInt(document.getElementById('turno').value),
    especialidad: JSON.parse(localStorage.getItem('medicos')).find(m => m.id == document.getElementById('medico').value)?.especialidad,
    obraSocial: parseInt(document.getElementById('obraSocial').value),
    valorTotal: parseFloat(document.getElementById('valor-total').textContent)
  };

  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  reservas.push(reserva);
  localStorage.setItem('reservas', JSON.stringify(reservas));

  alert('¡Reserva realizada con éxito!');
  this.reset();
  document.getElementById('valor-total').textContent = '0.00';
  this.classList.remove('was-validated');
});