

function getEspecialidades() {
  return JSON.parse(localStorage.getItem('especialidades')) || [];
}

function guardarEspecialidades(especialidades) {
  localStorage.setItem('especialidades', JSON.stringify(especialidades));
}

function renderizarTablaEspecialidades() {
  const especialidades = getEspecialidades();
  const tbody = document.querySelector('#tablaEspecialidades');
  if (!tbody) return;
  tbody.innerHTML = '';
  especialidades.forEach(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${e.id}</td>
      <td>${e.nombre}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary" onclick="window.editarEspecialidad(${e.id})">Editar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="window.eliminarEspecialidad(${e.id})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function guardarEspecialidad(e) {
  e.preventDefault();
  const id = document.getElementById('especialidad-id').value || null;
  const nombre = document.getElementById('nombre').value.trim();
  if (!nombre) return alert('El nombre es obligatorio');

  let especialidades = getEspecialidades();
  const especialidad = {
    id: id ? parseInt(id) : generarId(especialidades),
    nombre
  };

  if (id) {
    const index = especialidades.findIndex(e => e.id == id);
    especialidades[index] = especialidad;
  } else {
    especialidades.push(especialidad);
  }

  guardarEspecialidades(especialidades);
  renderizarTablaEspecialidades();
  limpiarFormEspecialidad();
}

function editarEspecialidad(id) {
  const especialidades = getEspecialidades();
  const e = especialidades.find(esp => esp.id == id);
  document.getElementById('especialidad-id').value = e.id;
  document.getElementById('nombre').value = e.nombre;
}

function eliminarEspecialidad(id) {
  if (!confirm('¿Eliminar especialidad?')) return;
  const especialidades = getEspecialidades().filter(e => e.id !== id);
  guardarEspecialidades(especialidades);
  renderizarTablaEspecialidades();
}

function limpiarFormEspecialidad() {
  document.getElementById('formEspecialidad').reset();
  document.getElementById('especialidad-id').value = '';
}


window.editarEspecialidad = editarEspecialidad;
window.eliminarEspecialidad = eliminarEspecialidad;
window.limpiarFormEspecialidad = limpiarFormEspecialidad;
window.guardarEspecialidad = guardarEspecialidad;
window.renderizarTablaEspecialidades = renderizarTablaEspecialidades;