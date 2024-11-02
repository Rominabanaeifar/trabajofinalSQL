// scripts.js

$(document).ready(function () {
    // Inicializar el carrusel si lo tienes
    $('#carouselExample').carousel({
        interval: 2000 // Cambia a 1000 ms para 1 segundo
    });

    // Inicializar el mapa de OpenStreetMap
    initMap();

    // Validación del formulario en contacto.html
    const form = $('#contactForm'); // Seleccionamos el formulario por su ID
    const successMessage = $('<div class="alert alert-success mt-3" style="display: none;">¡Mensaje enviado con éxito!</div>');
    form.after(successMessage); // Insertar el mensaje después del formulario

    form.on('submit', function (event) {
        let isValid = true;
        const nombre = $('#nombre').val();
        const apellidos = $('#apellidos').val();
        const telefono = $('#telefono').val();
        const email = $('#email').val();

        // Validar nombre
        if (!/^[A-Za-z\s]{3,40}$/.test(nombre)) {
            alert('El nombre debe tener entre 3 y 40 caracteres y solo contener letras.');
            isValid = false;
        }

        // Validar apellidos
        if (!/^[A-Za-z\s]{4,60}$/.test(apellidos)) {
            alert('Los apellidos deben tener entre 4 y 60 caracteres y solo contener letras.');
            isValid = false;
        }

        // Validar teléfono
        if (!/^\d{9}$/.test(telefono)) {
            alert('El teléfono debe tener exactamente 9 dígitos.');
            isValid = false;
        }

        // Validar email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('El correo electrónico no es válido.');
            isValid = false;
        }

        // Si alguna validación falla, prevenir el envío del formulario
        if (!isValid) {
            event.preventDefault(); // Detener el envío
        } else {
            // Si todo es válido, mostrar mensaje de éxito
            event.preventDefault(); // Prevenir envío real
            successMessage.show(); // Mostrar mensaje
            form[0].reset(); // Reiniciar el formulario
        }
    });
});

// Inicializar el mapa de OpenStreetMap
function initMap() {
    // Coordenadas de tu dirección
    var map = L.map('map').setView([39.4673, -0.3735], 13); // Ajusta las coordenadas para tu dirección específica
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);
    
    // Añadir un marcador en la ubicación específica
    var marker = L.marker([39.4673, -0.3735]).addTo(map);
    marker.bindPopup('<b>Estamos aquí!</b>').openPopup();
}
