document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        // Create vCard format
        const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phone}
EMAIL:${email}
ADR:;;${address};;;
END:VCARD`;

        // Clear previous QR code
        const qrcodeContainer = document.getElementById('qrcode');
        qrcodeContainer.innerHTML = '';

        // Generate new QR code
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
            console.error('Error generating QR code:', error);
            qrcodeContainer.innerHTML = 'Error generating QR code. Please try again.';
        }
    });
});