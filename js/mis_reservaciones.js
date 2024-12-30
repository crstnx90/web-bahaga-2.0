document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token);
    const tableBody = document.querySelector('#reservacionesTable tbody');
    const editarButton = document.getElementById('editarButton');
    const eliminarButton = document.getElementById('eliminarButton');
    let selectedReservaciones = [];

    // Función para cargar las reservaciones desde la API
    function loadReservaciones() {
        fetch('http://localhost:8080/api/reservacion/reservaciones', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(reservaciones => {
            console.log('Reservaciones recibidas:', reservaciones);
            tableBody.innerHTML = '';  // Limpiar la tabla antes de agregar las filas

            if (reservaciones && reservaciones.length > 0) {
                reservaciones.forEach(reservacion => {
                    const row = document.createElement('tr');

                    // Agregar checkbox para seleccionar la reservación
                    const checkboxCell = document.createElement('td');
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.classList.add('select-reservacion');
                    checkbox.value = reservacion.reservacionId;
                    checkbox.addEventListener('change', handleSelection);
                    checkboxCell.appendChild(checkbox);

                    // Agregar datos a las columnas
                    row.innerHTML = `
                        <td>${checkboxCell.outerHTML}</td>
                        <td>${reservacion.fechaEvento}</td>
                        <td>${reservacion.hora}</td>
                        <td>${reservacion.tipoEvento}</td>
                        <td>${reservacion.salon ? reservacion.salon.descripcion : ''}</td>
                        <td>${reservacion.salon ? reservacion.salon.capacidad : ''}</td>
                        <td>${reservacion.cantidadPersonas}</td>
                        <td>${reservacion.observaciones}</td>
                    `;

                    tableBody.appendChild(row);
                });
            } else {
                const noDataRow = document.createElement('tr');
                noDataRow.innerHTML = `<td colspan="8" class="text-center">No se encontraron reservaciones.</td>`;
                tableBody.appendChild(noDataRow);
            }
        })
        .catch(error => {
            console.error('Error al obtener las reservaciones:', error);
        });
    }

    // Manejar la selección de las reservaciones
    function handleSelection(event) {
        const checkbox = event.target;
        const reservacionId = checkbox.value;

        // Añadir o eliminar de la lista de seleccionados
        if (checkbox.checked) {
            selectedReservaciones.push(reservacionId);
        } else {
            selectedReservaciones = selectedReservaciones.filter(id => id !== reservacionId);
        }

        // Activar o desactivar los botones de editar y eliminar
        editarButton.disabled = selectedReservaciones.length !== 1;
        eliminarButton.disabled = selectedReservaciones.length === 0;
    }

    // Cargar las reservaciones al inicio
    loadReservaciones();
});
