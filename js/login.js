document.addEventListener("DOMContentLoaded", function () {
    // Obtén el formulario de login
    const loginForm = document.getElementById('loginForm');

    

    // Captura el evento de envío del formulario
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

        // Obtener los valores de los campos del formulario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Crear el objeto con los datos de login
        const loginData = {
            correo: email,
            password: password
        };

        try {
            // Hacer una solicitud POST al backend para intentar hacer login
            const response = await fetch('http://localhost:8080/api/personas/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData) // Enviar loginData al backend
            });

            // Verificar si la solicitud fue exitosa
            if (response.ok) {
                const data = await response.json();

                // Si la respuesta es exitosa, redirige al usuario
                if (data.success) {
                    alert(data.message);
                    window.location.replace('/prueba_info.html'); // Redirigir de informacion
                } else {
                    alert(data.message);
                }
            } else {
                alert('Error al iniciar sesión'+response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor');
        }
    });
});
