function validarCedula() {
    // Obtener el valor de la cédula
    const cedulaInput = document.getElementById("cedula");
    let cedula = cedulaInput.value;

    // Limpiar caracteres no numéricos
    cedula = cedula.replace(/\D/g, '');

    // Verificar longitud de la cédula
    if (cedula.length !== 11) {
        mostrarResultado("CÉDULA ES INCORRECTA");
        return;
    }

    // Calcular el dígito verificador
    const suma = calcularSuma(cedula);
    const digitoVerificadorCalculado = calcularDigitoVerificador(suma);
    const digitoVerificadorReal = parseInt(cedula[10]);

    // Comparar el dígito verificador calculado con el real
    if (digitoVerificadorCalculado === digitoVerificadorReal) {
        mostrarResultado("CÉDULA ES CORRECTA");
    } else {
        mostrarResultado("CÉDULA ES INCORRECTA");
    }
}

// Función para calcular la suma de los dígitos
function calcularSuma(cedula) {
    let suma = 0;
    for (let i = 0; i < 10; i++) {
        let digito = parseInt(cedula[i]);
        if (i % 2 === 1) { // Dígitos impares en la secuencia (pares en la posición)
            digito *= 2;
            if (digito > 9) digito -= 9;
        }
        suma += digito;
    }
    return suma;
}

// Función para calcular el dígito verificador
function calcularDigitoVerificador(suma) {
    return (10 - (suma % 10)) % 10;
}

// Función para mostrar el resultado
function mostrarResultado(mensaje) {
    document.getElementById("resultado").innerText = mensaje;
}
