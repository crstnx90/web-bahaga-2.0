document.addEventListener("DOMContentLoaded", function() {
    // Función para obtener el perfil del usuario
    function obtenerPerfil() {
        const token = localStorage.getItem('authToken'); // Obtener el token desde localStorage

        if (!token) {
            alert("No estás autenticado. Por favor inicia sesión.");
            window.location.replace('/index_personas.html'); // Redirigir al login si no hay token
            return;
        }

        fetch('http://localhost:8080/api/personas/perfil', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Enviar el token en las cabeceras
            },
            credentials: 'same-origin' // Se incluyen las credenciales (como la sesión activa)
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Convertir la respuesta en formato JSON si la solicitud fue exitosa
            } else {
                throw new Error('No se pudo obtener el perfil');
            }
        })
        .then(data => {
            // Asignamos los datos del perfil a los campos del formulario
            document.getElementById("tipoDocumento").value = data.tipoDocumento;
            document.getElementById("numeroId").value = data.numeroId;
            document.getElementById("nombres").value = data.nombres;
            document.getElementById("apellidos").value = data.apellidos;
            document.getElementById("pais").value = data.pais;
            document.getElementById("ciudad").value = data.ciudad;
            document.getElementById("correo").value = data.correo;
            document.getElementById("telefono").value = data.telefono;
        })
        .catch(error => {
            console.error('Error al obtener el perfil:', error);
            alert('Error al obtener el perfil. Intenta nuevamente.');
        });
    }

    // Llamamos a la función para cargar el perfil cuando la página se carga
    obtenerPerfil();
});
