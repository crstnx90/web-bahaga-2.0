document.addEventListener("DOMContentLoaded", function () {
    const recoverForm = document.getElementById("recoverForm");
    const recoverButton = document.getElementById("recoverButton");
    const notification = document.getElementById("notification");

    recoverButton.addEventListener("click", async (event) => {
        event.preventDefault();

        // Obtener el correo del formulario
        const email = document.getElementById("email").value;

        if (!email) {
            alert("Por favor, ingrese un correo válido.");
            return;
        }

        try {
            // Enviar correo al backend
            const response = await fetch("http://localhost:8080/api/personas/recuperar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo: email }),
            });

            if (response.ok) {
                // Mostrar notificación de éxito
                notification.textContent = "¡Correo de recuperación enviado! Revise su bandeja de entrada.";
                notification.classList.remove("d-none");
                notification.classList.add("alert-success");

                // Limpiar el formulario
                recoverForm.reset();
            } else {
                // Mostrar mensaje de error
                notification.textContent = "El correo ingresado no está registrado.";
                notification.classList.remove("d-none");
                notification.classList.add("alert-danger");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al procesar la solicitud. Intente nuevamente.");
        }
    });
});
