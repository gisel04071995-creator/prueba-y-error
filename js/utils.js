// utils.js

/**
 * Verifica si el usuario está autenticado.
 * Si no lo está, redirige al login.
 */
function verificarAutenticacion() {
  if (!sessionStorage.getItem('accessToken')) {
    alert('Debes iniciar sesión para acceder al panel de administración.');
    window.location.href = 'login.html';
  }
}

/**
 * Cierra la sesión del usuario y redirige al login.
 */
function cerrarSesion() {
  if (confirm('¿Desea cerrar la sesión?')) {
    sessionStorage.removeItem('accessToken');
    window.location.href = 'login.html';
  }
}

/**
 * Genera un nuevo ID único para una entidad.
 * @param {Array} array - El array de entidades existentes.
 * @returns {number} - El nuevo ID.
 */
function generarId(array) {
  if (array.length === 0) return 1;
  return Math.max(...array.map(item => item.id)) + 1;
}