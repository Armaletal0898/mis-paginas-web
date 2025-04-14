
// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    // Agrega un evento de clic al botón de generar código QR 
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // obten los valores de los campos del formulario
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        // Crear el vCard para el formato de contacto
        const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phone}
EMAIL:${email}
ADR:;;${address};;;
END:VCARD`;

        // limpiar el contenedor del código QR
        const qrcodeContainer = document.getElementById('qrcode');
        qrcodeContainer.innerHTML = '';

        // Generar el código QR
        try {
            new QRCode(qrcodeContainer, {
                text: vCard,
                width: 256,
                height: 256,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        } catch (error) {
            console.error('Error al generar codigo QR:', error);
            qrcodeContainer.innerHTML = 'Error al generar codigo QR. Por favor intente de nuevo.';
        }
    });
});