// Recuperar entidades desde localStorage
const medicos = JSON.parse(localStorage.getItem('medicos')) || [];
const obrasSociales = [
  { id: 'OSDE', nombre: 'OSDE (20% desc.)' },
  { id: 'IOMA', nombre: 'IOMA (15% desc.)' },
  { id: 'Swiss Medical', nombre: 'Swiss Medical (25% desc.)' },
  { id: 'Particular', nombre: 'Particular (0% desc.)' }
];
const turnos = JSON.parse(localStorage.getItem('turnos')) || [];

// Obtener parámetro de URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Cargar médicos en el select
function cargarSelectMedicos() {
  const select = document.getElementById('medico');
  select.innerHTML = '<option value="">Seleccionar...</option>';
  
  medicos.forEach(m => {
    const option = document.createElement('option');
    option.value = m.id;
    option.textContent = `${m.nombre} - ${m.especialidad}`;
    select.appendChild(option);
  });

  // Si hay un parámetro "medico" en la URL, seleccionarlo
  const medicoId = getQueryParam('medico');
  if (medicoId) {
    select.value = medicoId;
    cargarObrasSociales(parseInt(medicoId));
    cargarTurnos(parseInt(medicoId));
    actualizarValorTotal(parseInt(medicoId));
  }
}

// Cargar obras sociales del médico seleccionado
function cargarObrasSociales(medicoId) {
  const medico = medicos.find(m => m.id === medicoId);
  const select = document.getElementById('obraSocial');
  select.innerHTML = '<option value="">Seleccionar...</option>';
  
  if (medico) {
    medico.obrasSociales.forEach(id => {
      const obra = obrasSociales.find(o => o.id === id);
      if (obra) {
        const option = document.createElement('option');
        option.value = obra.id;
        option.textContent = obra.nombre;
        select.appendChild(option);
      }
    });
  }
}

// Cargar turnos disponibles para el médico
function cargarTurnos(medicoId) {
  const select = document.getElementById('turno');
  select.innerHTML = '<option value="">Seleccionar...</option>';
  
  turnos
    .filter(t => t.medicoId === medicoId && t.disponible)
    .forEach(t => {
      const option = document.createElement('option');
      option.value = t.id;
      option.textContent = `${t.fecha} ${t.hora}`;
      select.appendChild(option);
    });
}

// Actualizar valor total según el médico y la obra social
function actualizarValorTotal(medicoId) {
  const medico = medicos.find(m => m.id === medicoId);
  const span = document.getElementById('valor-total');
  
  if (medico) {
    let valorBase = medico.valorConsulta;
    let descuento = 0;
    
    const obraSocial = document.getElementById('obraSocial').value;
    switch (obraSocial) {
      case 'OSDE':
        descuento = 20;
        break;
      case 'IOMA':
        descuento = 15;
        break;
      case 'Swiss Medical':
        descuento = 25;
        break;
      case 'Particular':
      default:
        descuento = 0;
        break;
    }
    
    const costoFinal = valorBase * (1 - descuento / 100);
    span.textContent = costoFinal.toFixed(2);
  } else {
    span.textContent = '0.00';
  }
}

// Eventos
document.getElementById('medico').addEventListener('change', function() {
  const medicoId = parseInt(this.value);
  if (medicoId) {
    cargarObrasSociales(medicoId);
    cargarTurnos(medicoId);
    actualizarValorTotal(medicoId);
  } else {
    document.getElementById('obraSocial').innerHTML = '<option value="">Seleccionar...</option>';
    document.getElementById('turno').innerHTML = '<option value="">Seleccionar...</option>';
    document.getElementById('valor-total').textContent = '0.00';
  }
});

document.getElementById('obraSocial').addEventListener('change', actualizarValorTotal);

document.getElementById('form-reserva').addEventListener('submit', function(event) {
  event.preventDefault();
  
  if (!this.checkValidity()) {
    this.classList.add('was-validated');
    return;
  }
  
  const reserva = {
    id: Date.now(),
    documento: document.getElementById('documento').value,
    nombrePaciente: document.getElementById('nombrePaciente').value,
    medicoId: parseInt(document.getElementById('medico').value),
    obraSocial: document.getElementById('obraSocial').value,
    turnoId: parseInt(document.getElementById('turno').value),
    valorTotal: parseFloat(document.getElementById('valor-total').textContent),
    fecha: new Date().toLocaleDateString()
  };
  
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  reservas.push(reserva);
  localStorage.setItem('reservas', JSON.stringify(reservas));
  
  alert('¡Reserva realizada con éxito!');
  
  // Resetear formulario
  this.reset();
  document.getElementById('valor-total').textContent = '0.00';
  document.getElementById('medico').focus();
  
  this.classList.remove('was-validated');
});

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarSelectMedicos);