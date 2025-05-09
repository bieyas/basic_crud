document.getElementById('loginForm').addEventListener('submit', async(e) => {
    e.preventDefault();

    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        alert('Login successful!');

        // Redirect to the dashboard or another page
        window.location.href = '/dashboard';

    } else {
        // Show error message
        alert(data.message || 'Login failed');
    }
})