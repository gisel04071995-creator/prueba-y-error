

function getObrasSociales() {
  return JSON.parse(localStorage.getItem('obrasSociales')) || [];
}

function guardarObrasSociales(obras) {
  localStorage.setItem('obrasSociales', JSON.stringify(obras));
}

function renderizarTablaObrasSociales() {
  const obras = getObrasSociales();
  const tbody = document.querySelector('#tablaObrasSociales');
  if (!tbody) return;
  tbody.innerHTML = '';
  obras.forEach(o => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${o.id}</td>
      <td>${o.nombre}</td>
      <td>${o.descuento ? o.descuento + '%' : '-'}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary" onclick="window.editarObraSocial(${o.id})">Editar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="window.eliminarObraSocial(${o.id})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function guardarObraSocial(e) {
  e.preventDefault();
  const id = document.getElementById('obra-id').value || null;
  const nombre = document.getElementById('nombre').value.trim();
  const descuentoStr = document.getElementById('descuento').value;
  let descuento = null;
  if (descuentoStr) {
    descuento = parseFloat(descuentoStr);
    if (isNaN(descuento) || descuento < 0 || descuento > 100) {
      alert('El descuento debe ser un número entre 0 y 100.');
      return;
    }
  }
  if (!nombre) return alert('El nombre es obligatorio.');

  let obras = getObrasSociales();
  const obra = {
    id: id ? parseInt(id) : generarId(obras),
    nombre,
    descuento
  };

  if (id) {
    const index = obras.findIndex(o => o.id == id);
    obras[index] = obra;
  } else {
    obras.push(obra);
  }

  guardarObrasSociales(obras);
  renderizarTablaObrasSociales();
  limpiarFormObraSocial();
}

function editarObraSocial(id) {
  const obras = getObrasSociales();
  const o = obras.find(obra => obra.id == id);
  document.getElementById('obra-id').value = o.id;
  document.getElementById('nombre').value = o.nombre;
  document.getElementById('descuento').value = o.descuento !== null && o.descuento !== undefined ? o.descuento : '';
}

function eliminarObraSocial(id) {
  if (!confirm('¿Eliminar obra social?')) return;
  const obras = getObrasSociales().filter(o => o.id !== id);
  guardarObrasSociales(obras);
  renderizarTablaObrasSociales();
}

function limpiarFormObraSocial() {
  document.getElementById('formObraSocial').reset();
  document.getElementById('obra-id').value = '';
}


window.editarObraSocial = editarObraSocial;
window.eliminarObraSocial = eliminarObraSocial;
window.limpiarFormObraSocial = limpiarFormObraSocial;
window.guardarObraSocial = guardarObraSocial;
window.renderizarTablaObrasSociales = renderizarTablaObrasSociales;