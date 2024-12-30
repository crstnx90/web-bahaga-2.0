// Obtener los datos del usuario desde el backend
/*fetch('http://localhost:8080/api/personas/perfil', {
    method: 'GET',
    credentials: 'same-origin'
    //credentials: 'include',
    /*headers: {
        'Authorization': token // Enviar el token en las cabeceras
    },*/
    
})
    .then(response => {
        if (!response.ok) {
            console.log('1')
            throw new Error('No autorizado o sesión expirada');
        }
        
        return response.json();
    })
    .then(data => {
        console.log('2')
        const datosUsuario = document.getElementById('datos-usuario');
        console.log(datosUsuario);
        // Crear elementos li para cada dato y agregarlos a la lista
        datosUsuario.innerHTML = `
            <li>Tipo de documento: ${data.tipoDocumento}</li>
            <li>Número de documento: ${data.numeroId}</li>
            <li>Nombres: ${data.nombres}</li>
            <li>Apellidos: ${data.apellidos}</li>
            <li>Pais: ${data.pais}</li>
            <li>Ciudad: ${data.ciudad}</li>
            <li>Correo: ${data.correo}</li>
            <li>Telefono: ${data.telefono}</li>
        `;
        
    })
    .catch(error => {
        console.error('Error al obtener los datos del usuario:', error);
        alert('Error al obtener el perfil del usuario. Por favor, inicia sesión nuevamente.');
        console.log('3')
    });
