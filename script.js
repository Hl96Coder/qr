document.addEventListener('DOMContentLoaded', () => {
    const scannerContainer = document.getElementById('scanner-container');
    const resultText = document.getElementById('result-text');
    const startCameraButton = document.getElementById('start-camera');
    const fileInput = document.getElementById('file-input');

    let html5QrCode;

    // Function to start the camera and scan QR codes
    const startCamera = () => {
        html5QrCode = new Html5Qrcode("scanner-container");
        html5QrCode.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: 250
            },
            (decodedText) => {
                resultText.textContent = decodedText;
                html5QrCode.stop();
            },
            (errorMessage) => {
                console.warn(`QR Code no longer in front of camera: ${errorMessage}`);
            }
        ).catch((err) => {
            console.error(`Unable to start scanning: ${err}`);
        });
    };

    // Event listener for the start camera button
    startCameraButton.addEventListener('click', startCamera);

    // Function to read QR code from uploaded file
    const readQrCodeFromFile = (file) => {
        const html5QrCode = new Html5Qrcode("scanner-container");
        html5QrCode.scanFile(file, true)
            .then(decodedText => {
                resultText.textContent = decodedText;
            })
            .catch(err => {
                console.error(`Unable to read QR code from file: ${err}`);
            });
    };

    // Event listener for file input
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            readQrCodeFromFile(file);
        }
    });
});
