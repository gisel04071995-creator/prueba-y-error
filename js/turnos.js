

function getTurnos() {
  return JSON.parse(localStorage.getItem('turnos')) || [];
}

function guardarTurnos(turnos) {
  localStorage.setItem('turnos', JSON.stringify(turnos));
}

function getMedicos() {
  return JSON.parse(localStorage.getItem('medicos')) || [];
}

function renderizarTablaTurnos() {
  const turnos = getTurnos();
  const medicos = getMedicos();
  const tbody = document.querySelector('#tablaTurnos');
  if (!tbody) return;
  tbody.innerHTML = '';
  turnos.forEach(t => {
    const medico = medicos.find(m => m.id === t.medicoId) || { nombre: 'Desconocido', apellido: '' };
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${t.id}</td>
      <td>${medico.nombre} ${medico.apellido}</td>
      <td>${t.fechaHora}</td>
      <td>${t.disponible ? 'Sí' : 'No'}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary" onclick="window.editarTurno(${t.id})">Editar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="window.eliminarTurno(${t.id})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function guardarTurno(e) {
  e.preventDefault();
  const id = document.getElementById('turno-id').value || null;
  const medicoId = parseInt(document.getElementById('medicoId').value);
  const fechaHora = document.getElementById('fechaHora').value;
  const disponible = document.getElementById('disponible').checked;

  if (!medicoId || !fechaHora) return alert('Médico y fecha/hora son obligatorios');

  let turnos = getTurnos();
  const turno = {
    id: id ? parseInt(id) : generarId(turnos),
    medicoId,
    fechaHora,
    disponible
  };

  if (id) {
    const index = turnos.findIndex(t => t.id == id);
    turnos[index] = turno;
  } else {
    turnos.push(turno);
  }

  guardarTurnos(turnos);
  renderizarTablaTurnos();
  limpiarFormTurno();
}

function editarTurno(id) {
  const turnos = getTurnos();
  const t = turnos.find(turno => turno.id == id);
  document.getElementById('turno-id').value = t.id;
  document.getElementById('medicoId').value = t.medicoId;
  document.getElementById('fechaHora').value = t.fechaHora;
  document.getElementById('disponible').checked = t.disponible;
}

function eliminarTurno(id) {
  if (!confirm('¿Eliminar turno?')) return;
  const turnos = getTurnos().filter(t => t.id !== id);
  guardarTurnos(turnos);
  renderizarTablaTurnos();
}

function limpiarFormTurno() {
  document.getElementById('formTurno').reset();
  document.getElementById('turno-id').value = '';
}

function cargarSelectMedicosTurno() {
  const medicos = getMedicos();
  const select = document.getElementById('medicoId');
  if (!select) return;
  select.innerHTML = '<option value="">Seleccionar...</option>';
  medicos.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.id;
    opt.textContent = `${m.nombre} ${m.apellido}`;
    select.appendChild(opt);
  });
}


window.editarTurno = editarTurno;
window.eliminarTurno = eliminarTurno;
window.limpiarFormTurno = limpiarFormTurno;
window.guardarTurno = guardarTurno;
window.cargarSelectMedicosTurno = cargarSelectMedicosTurno;
window.renderizarTablaTurnos = renderizarTablaTurnos;