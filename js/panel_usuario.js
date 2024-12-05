document.addEventListener("DOMContentLoaded", function() {
    // Función para obtener el perfil del usuario
    function obtenerPerfil() {
        fetch('http://localhost:8080/api/personas/perfil', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // Se incluyen las credenciales (como la sesión activa)
            credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('No se pudo obtener el perfil');
            }
        })
        .then(data => {
            // Asignamos los datos a los campos del formulario
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
        });
    }

    // Llamamos a la función para cargar el perfil cuando la página se carga
    obtenerPerfil();
});
