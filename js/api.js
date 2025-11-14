// api.js

async function cargarUsuarios() {
  try {
    const res = await fetch('https://dummyjson.com/users');
    const data = await res.json();
    const tbody = document.querySelector('#tablaUsuarios');
    if (!tbody) return;
    tbody.innerHTML = '';

    data.users.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${u.id}</td>
        <td>${u.firstName}</td>
        <td>${u.lastName}</td>
        <td>${u.username}</td>
        <td>${u.email}</td>
        <td>
          <button class="btn btn-sm btn-outline-primary" onclick="editarUsuario(${u.id})">Editar</button>
          <button class="btn btn-sm btn-outline-danger" onclick="eliminarUsuario(${u.id})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('Error al cargar usuarios:', err);
    const tbody = document.querySelector('#tablaUsuarios');
    if (tbody) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center">Error al cargar datos. Por favor, intente más tarde.</td></tr>';
    }
  }
}

// Función para editar un usuario (simulada)
function editarUsuario(id) {
  alert(`Funcionalidad de edición simulada.\nID del usuario: ${id}\nEn una aplicación real, aquí se abriría un formulario para modificar los datos.`);
}

// Función para eliminar un usuario (simulada)
function eliminarUsuario(id) {
  if (!confirm(`¿Está seguro de que desea eliminar al usuario con ID ${id}?`)) return;
  alert(`Funcionalidad de eliminación simulada.\nID del usuario: ${id}\nEn una aplicación real, esto enviaría una solicitud DELETE a la API.`);
}

// --- Exportar funciones al ámbito global ---
window.editarUsuario = editarUsuario;
window.eliminarUsuario = eliminarUsuario;
window.cargarUsuarios = cargarUsuarios;