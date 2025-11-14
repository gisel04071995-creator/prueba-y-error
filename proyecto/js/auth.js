document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.accessToken) {
      sessionStorage.setItem('accessToken', data.accessToken);
      window.location.href = 'dashboard.html';
    } else {
      alert('Credenciales inválidas. Usa usuarios de https://dummyjson.com/users');
    }
  } catch (err) {
    console.error(err);
    alert('Error al conectar con el servidor de autenticación.');
  }
});