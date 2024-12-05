

window.addEventListener('DOMContentLoaded', event => {

    // Funcion de encoger el navbar(Shrink)
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Encoger el navbar 
    navbarShrink();

    // Encoger el navbar cuando se scrollea la pagina
    document.addEventListener('scroll', navbarShrink);

    // Activar el scrollspy de Bootstrap en el elemento de navegación principal
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Colapsar la barra de navegación responsiva cuando el cambiador (toggler) es visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activar el complemento SimpleLightbox para los elementos del portafolio
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

    // Validar el formulario y habilitar el botón de enviar
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const requiredInputs = Array.from(contactForm.querySelectorAll('[required]'));

    contactForm.addEventListener('input', function() {
        const allFilled = requiredInputs.every(input => input.value.trim() !== '');
        submitButton.disabled = !allFilled;
    });

});
