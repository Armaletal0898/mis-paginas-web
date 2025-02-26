function validarCedula() {
    const cedula = document.getElementById('cedula').value.trim();
    const resultadoElement = document.getElementById('resultado');

    if (!cedula || cedula.length !== 11) {
        resultadoElement.textContent = "Por favor, ingrese una cédula válida de 11 dígitos.";
        resultadoElement.classList.remove('incorrecto');
        return;
    }

    let sumaPar = 0;
    let sumaImpar = 0;

    for (let i = 0; i < cedula.length; i++) {
        let digito = parseInt(cedula[i]);

        if ((i % 2) === 0) { // Dígitos impares en la secuencia (pares en la posición)
            let digitoImpar = digito * 2;
            if (digitoImpar > 9) {
                digitoImpar -= 9;
            }
            sumaImpar += digitoImpar;
        } else { // Dígitos pares en la secuencia (impares en la posición)
            sumaPar += digito;
        }
    }

    let verificador = (10 - ((sumaPar + sumaImpar) % 10)) % 10;

    if (verificador === parseInt(cedula[cedula.length - 1])) {
        resultadoElement.textContent = "CÉDULA ES CORRECTA";
        resultadoElement.classList.remove('incorrecto');
    } else {
        resultadoElement.textContent = "CÉDULA ES INCORRECTA";
        resultadoElement.classList.add('incorrecto');
    }
}
