$(document).ready(function () {
    // Obtener el token desde el almacenamiento local, sesión o cookies
    //const token = localStorage.getItem('token'); // o sessionStorage.getItem('token'), dependiendo de cómo guardes el token
    const token='53A4019D22B1801F9B755C6BB56814E7';
    console.log(token)
    const url= 'http://localhost:8080/api/personas/perfil'
    console.log(url)
    // Realizar solicitud GET para obtener el perfil del usuario
    $.ajax({
        url: "http://localhost:8080/api/personas/perfil",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token // Enviar el token en las cabeceras
        },
        
        success: function (response) {
            // Si la solicitud fue exitosa, se muestran los datos
            let perfilHTML = `
                <h3>Información de Perfil</h3>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Tipo de Documento:</strong> ${response.tipoDocumento}</li>
                    <li class="list-group-item"><strong>Número de ID:</strong> ${response.numeroId}</li>
                    <li class="list-group-item"><strong>Nombres:</strong> ${response.nombres}</li>
                    <li class="list-group-item"><strong>Apellidos:</strong> ${response.apellidos}</li>
                    <li class="list-group-item"><strong>País:</strong> ${response.pais}</li>
                    <li class="list-group-item"><strong>Ciudad:</strong> ${response.ciudad}</li>
                    <li class="list-group-item"><strong>Correo:</strong> ${response.correo}</li>
                    <li class="list-group-item"><strong>Teléfono:</strong> ${response.telefono}</li>
                </ul>
            `;
            $('#perfil-container').html(perfilHTML);
        },
        error: function () {
            // Si hay un error (como que no hay usuario logueado)
            $('#perfil-container').html('<p>No se pudo cargar el perfil. Asegúrate de estar logueado.</p>');
        }
    });
});
