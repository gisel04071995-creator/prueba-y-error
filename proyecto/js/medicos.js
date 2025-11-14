// medicos.js

function getMedicos() {
  return JSON.parse(localStorage.getItem('medicos')) || [];
}

function guardarMedicos(medicos) {
  localStorage.setItem('medicos', JSON.stringify(medicos));
}

function renderizarTablaMedicos() {
  const medicos = getMedicos();
  const tbody = document.querySelector('#tablaMedicos');
  if (!tbody) return;
  tbody.innerHTML = '';
  medicos.forEach(m => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${m.id}</td>
      <td>${m.nombre} ${m.apellido}</td>
      <td>${m.matricula}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary" onclick="window.editarMedico(${m.id})">Editar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="window.eliminarMedico(${m.id})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function guardarMedico(e) {
  e.preventDefault();
  const id = document.getElementById('medico-id').value || null;
  const medicos = getMedicos();
  const especialidad = parseInt(document.getElementById('especialidad').value);
  const obrasSociales = Array.from(document.querySelectorAll('#obras-check input:checked')).map(cb => parseInt(cb.value));

  // Leer la foto si se cargó
  let fotografia = "image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  const fotoInput = document.getElementById('fotoInput');
  if (fotoInput.files && fotoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(event) {
      fotografia = event.target.result;
      guardarMedicoConFoto(id, medicos, especialidad, obrasSociales, fotografia);
    };
    reader.readAsDataURL(fotoInput.files[0]);
    return; // Detener aquí, la función se llama desde el callback del FileReader
  }

  // Si no se cargó una foto, usar la existente o la por defecto
  const medicoExistente = medicos.find(m => m.id == id);
  if (medicoExistente) {
    fotografia = medicoExistente.fotografia;
  }

  guardarMedicoConFoto(id, medicos, especialidad, obrasSociales, fotografia);
}

function guardarMedicoConFoto(id, medicos, especialidad, obrasSociales, fotografia) {
  const medico = {
    id: id ? parseInt(id) : generarId(medicos),
    matricula: parseInt(document.getElementById('matricula').value),
    apellido: document.getElementById('apellido').value,
    nombre: document.getElementById('nombre').value,
    especialidad,
    descripcion: document.getElementById('descripcion').value,
    obrasSociales,
    fotografia,
    valorConsulta: parseFloat(document.getElementById('valorConsulta').value)
  };

  if (id) {
    const index = medicos.findIndex(m => m.id == id);
    medicos[index] = medico;
  } else {
    medicos.push(medico);
  }
  guardarMedicos(medicos);
  renderizarTablaMedicos();
  limpiarFormMedico();
}

function editarMedico(id) {
  const medicos = getMedicos();
  const m = medicos.find(m => m.id == id);
  document.getElementById('medico-id').value = m.id;
  document.getElementById('matricula').value = m.matricula;
  document.getElementById('apellido').value = m.apellido;
  document.getElementById('nombre').value = m.nombre;
  document.getElementById('especialidad').value = m.especialidad;
  document.getElementById('descripcion').value = m.descripcion;
  document.getElementById('valorConsulta').value = m.valorConsulta;

  // Mostrar la foto existente
  const previewImg = document.getElementById('previewImg');
  previewImg.src = m.fotografia;
  previewImg.style.display = 'block';

  // Marcar las obras sociales
  document.querySelectorAll('#obras-check input').forEach(cb => {
    cb.checked = m.obrasSociales.includes(parseInt(cb.value));
  });
}

function eliminarMedico(id) {
  if (!confirm('¿Eliminar médico?')) return;
  const medicos = getMedicos().filter(m => m.id !== id);
  guardarMedicos(medicos);
  renderizarTablaMedicos();
}

function limpiarFormMedico() {
  document.getElementById('formMedico').reset();
  document.getElementById('medico-id').value = '';
  document.getElementById('previewImg').style.display = 'none';
}

// Cargar select de especialidades
function cargarSelectEspecialidades(idSelect) {
  const especialidades = JSON.parse(localStorage.getItem('especialidades')) || [];
  const select = document.getElementById(idSelect);
  if (!select) return;
  select.innerHTML = '';
  especialidades.forEach(e => {
    const opt = document.createElement('option');
    opt.value = e.id;
    opt.textContent = e.nombre;
    select.appendChild(opt);
  });
}

// Cargar checkboxes de obras sociales
function cargarObrasCheck() {
  const obras = JSON.parse(localStorage.getItem('obrasSociales')) || [];
  const div = document.getElementById('obras-check');
  if (!div) return;
  div.innerHTML = '';
  obras.forEach(o => {
    const label = document.createElement('label');
    label.className = 'd-block';
    label.innerHTML = `<input type="checkbox" value="${o.id}" class="me-2"> ${o.nombre}`;
    div.appendChild(label);
  });
}

// --- Exportar funciones al ámbito global ---
window.editarMedico = editarMedico;
window.eliminarMedico = eliminarMedico;
window.limpiarFormMedico = limpiarFormMedico;
window.guardarMedico = guardarMedico;
window.cargarSelectEspecialidades = cargarSelectEspecialidades;
window.cargarObrasCheck = cargarObrasCheck;
window.renderizarTablaMedicos = renderizarTablaMedicos;