document.addEventListener("DOMContentLoaded", function() {
    // Obtener el token del localStorage
    const token = localStorage.getItem('authToken');
    console.log('Token:', token);

    // Verificar si el token existe, de lo contrario redirigir a la página de inicio de sesión
    if (!token) {
        alert('Por favor, inicia sesión para realizar una reservación.');
        window.location.href = 'index.html';  // Redirige a la página de inicio de sesión si no hay token
    }

    // Función para obtener los tipos de evento de la API y llenar el formulario
function cargarTiposDeEvento() {
    fetch('http://localhost:8080/api/tipo-evento') // Asegúrate de que la URL de la API esté correcta
        .then(response => response.json())
        .then(tipoEventos => {
            // Obtener el select del formulario
            const selectTipoEvento = document.getElementById('tipoEvento');

            // Limpiar las opciones previas
            selectTipoEvento.innerHTML = '';

            // Crear una opción por defecto (si deseas)
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Seleccione un tipo de evento';
            selectTipoEvento.appendChild(defaultOption);

            // Agregar las opciones de tipos de evento a partir de la respuesta de la API
            tipoEventos.forEach(tipoEvento => {
                const option = document.createElement('option');
                option.value = tipoEvento;  // Usamos el nombre del enum como valor
                option.textContent = tipoEvento.charAt(0).toUpperCase() + tipoEvento.slice(1).toLowerCase(); // Capitalizamos la primera letra
                selectTipoEvento.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener los tipos de evento:', error);
        });
}

// Llamar a la función para cargar los tipos de evento cuando cargue la página
window.onload = cargarTiposDeEvento;


// Obtener salones de la API
fetch('http://localhost:8080/api/salones')
    .then(response => response.json())
    .then(salones => {
        // Obtener el elemento select
        const selectSalon = document.getElementById('idSalon');

        // Limpiar las opciones previas
        selectSalon.innerHTML = '';

        // Crear una opción por defecto
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Seleccione un salón';
        selectSalon.appendChild(defaultOption);

        // Agregar opciones con los nombres de los salones obtenidos de la API
        salones.forEach(salon => {
            const option = document.createElement('option');
            option.value = salon.salonId;  // Usar el ID del salón como valor
            // Mostrar el nombre y la capacidad del salón
            option.textContent = `${salon.nombreSalon} - Capacidad: ${salon.capacidad} personas`;  
            selectSalon.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error al obtener los salones:', error);
    });

    // Capturar el formulario y manejar el evento de envío
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevenir el comportamiento por defecto del formulario

        // Obtener los valores de los campos del formulario
        const tipoEvento = document.getElementById('tipoEvento').value;
        const salonId = document.getElementById('idSalon').value;
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const cantidadPersonas = document.getElementById('cantidadPersonas').value;
        const observaciones = document.getElementById('contacto').value;

        // Validación de campos obligatorios
        if (!salonId || !fecha || !hora || !cantidadPersonas) {
            alert('Por favor, complete todos los campos requeridos.');
            return;
        }

        // Crear el objeto de la reservación
        const reservacionData = {
            fechaEvento: fecha,
            hora: hora,
            salonId: salonId,  // Cambié 'idSalon' a 'salonId' según el ejemplo proporcionado
            tipoEvento: tipoEvento,
            cantidadPersonas: cantidadPersonas,
            observaciones: observaciones,
        };

        // Enviar la reservación al backend
        fetch('http://localhost:8080/api/reservacion/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Enviar el token en la cabecera
            },
            body: JSON.stringify(reservacionData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'Error en el servidor');
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.reservacionId) {
                alert('Reservación realizada con éxito');
                console.log(data);  // Aquí puedes ver la respuesta completa, con la información de la reservación
                // Redirigir o mostrar la información de la reservación
            } else {
                alert('Error al realizar la reservación: ' + (data.message || 'Información incompleta'));
            }
        })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            alert('Hubo un problema al enviar la reservación. Asegúrate de estar autenticado correctamente.');
            if (error.message === 'Token inválido o expirado') {
                localStorage.removeItem('authToken');  // Eliminar el token inválido
                window.location.href = 'index.html';  // Redirigir a la página de inicio de sesión
            } else {
                alert(error.message);  // Mostrar mensaje de error más específico
            }
        });
    });
});
