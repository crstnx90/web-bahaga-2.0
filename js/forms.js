// OBtiene el formulario
const formulario = document.querySelector('form');

// Captura el evento de envío del formulario
formulario.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    // Obtener los valores de los campos del formulario
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
    const tipo_documento = document.getElementById('tipo_documento').value;
    const numero_id = document.getElementById('numero_id').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const pais = document.getElementById('pais').value;
    const ciudad = document.getElementById('ciudad').value;
    const sexo = document.querySelector('input[name="sexo"]:checked') ? document.querySelector('input[name="sexo"]:checked').value : '';

    // Obtener los valores de los campos de contraseñas
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const passwordMismatchMessage = document.getElementById('passwordMismatch');

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        passwordMismatchMessage.style.display = 'block'; // Mostrar mensaje de error
        return; // Detener la ejecución si las contraseñas no coinciden
    } else {
        passwordMismatchMessage.style.display = 'none'; // Ocultar mensaje si las contraseñas coinciden
    }

    // Crea el objeto con los datos del usuario (incluyendo la contraseña)
    const personaDTO = {
        nombres: nombres,
        apellidos: apellidos,
        fechaNacimiento: fecha_nacimiento,
        tipoDocumento: tipo_documento,
        numeroId: numero_id,
        correo: email,
        telefono: telefono,
        pais: pais,
        ciudad: ciudad,
        sexo: sexo,
        password: password
    };

    try {
        // Hacer una solicitud POST al backend
        const response = await fetch('http://localhost:8080/api/personas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(personaDTO) // Enviar personaDTO al backend
        });

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            const data = await response.json();
            alert('Persona registrada con éxito');
            window.location.href = 'index.html';  // Cambia 'index.html'
        } else {
            alert('Error al registrar la persona');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    }
});
