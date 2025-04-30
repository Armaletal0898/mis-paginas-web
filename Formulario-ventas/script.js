
// Variables globales
let salesData = {
    labels: [],
    values: []
};

let myChart;

// Tasas de conversión
const conversionRates = {
    'USD': 1,
    'EUR': 0.91834,
    'DOP': 58.85
};

function convertCurrency(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount;
    
    // Convertir a USD primero si la moneda origen no es USD
    let amountInUSD = fromCurrency === 'USD' ? amount : amount / conversionRates[fromCurrency];
    
    // Convertir de USD a la moneda destino
    return toCurrency === 'USD' ? amountInUSD : amountInUSD * conversionRates[toCurrency];
}

// Agregar evento listener para el cambio de moneda
document.getElementById('currencySelect').addEventListener('change', () => {
    if (salesData.values.length > 0) {
        updateChart();
        actualizarResultados();
    }
});

function getFormatter() {
    const currency = document.getElementById('currencySelect').value;
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function addSalesData() {
    const sales = parseFloat(document.getElementById('salesInput').value);
    const selectedMonth = document.getElementById('monthSelect').value;
    const year = document.getElementById('yearSelect').value;
    const selectedCurrency = document.getElementById('currencySelect').value;

    if (isNaN(sales) || sales <= 0) {
        alert('Por favor ingrese un monto válido');
        return;
    }

    if (!selectedMonth) {
        alert('Por favor seleccione un mes');
        return;
    }

    if (selectedMonth === 'todos') {
        generateAllMonths();
        return;
    }

    // Convertir a USD para almacenamiento
    const salesInUSD = convertCurrency(sales, selectedCurrency, 'USD');
    const monthLabel = `${selectedMonth} ${year}`;

    // Buscar si el mes ya existe
    const existingIndex = salesData.labels.indexOf(monthLabel);
    
    if (existingIndex !== -1) {
        // Actualizar el valor existente
        salesData.values[existingIndex] = salesInUSD;
    } else {
        // Agregar nuevo mes
        salesData.labels.push(monthLabel);
        salesData.values.push(salesInUSD);
    }

    // Ordenar los datos por mes
    const monthOrder = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Ordenar arrays basado en el orden de los meses
    const indices = salesData.labels.map((_, index) => index);
    indices.sort((a, b) => {
        const monthA = salesData.labels[a].split(' ')[0];
        const monthB = salesData.labels[b].split(' ')[0];
        return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
    });

    // Aplicar el orden
    salesData.labels = indices.map(i => salesData.labels[i]);
    salesData.values = indices.map(i => salesData.values[i]);

    // Limpiar campos
    document.getElementById('salesInput').value = '';
    monthSelect.value = '';

    // Actualizar visualizaciones 
    updateChart();
    actualizarResultados();
}

function generateAllMonths() {
    const year = document.getElementById('yearSelect').value;
    // Remove company name check
    const sales = parseFloat(document.getElementById('salesInput').value);
    const selectedCurrency = document.getElementById('currencySelect').value;

    if (isNaN(sales) || sales <= 0) {
        alert('Por favor ingrese un monto válido');
        return;
    }

    // Convertir el valor ingresado a USD
    const salesInUSD = convertCurrency(sales, selectedCurrency, 'USD');

    // Generar datos para todos los meses
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Limpiar datos existentes
    salesData.labels = [];
    salesData.values = [];

    months.forEach(month => {
        salesData.labels.push(`${month} ${year}`);
        salesData.values.push(salesInUSD);
    });

    // Limpiar campos
    document.getElementById('salesInput').value = '';
    document.getElementById('monthSelect').value = '';

    // Actualizar visualizaciones 
    updateChart();
    actualizarResultados();
}
// creacion del grafico con la biblioteca chart.js
function updateChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    const formatter = getFormatter();
    const selectedCurrency = document.getElementById('currencySelect').value;

    if (myChart) {
        myChart.destroy();
    }

    const convertedValues = salesData.values.map(value => 
        convertCurrency(value, 'USD', selectedCurrency)
    );

    // Simplificar las etiquetas para mostrar solo el mes y año
    const simplifiedLabels = salesData.labels.map(label => {
        const [month, year] = label.split(' ');
        return `${month} ${year}`;
    });

    // Definir colores para cada mes
    const monthColors = {
        'Enero': 'rgba(54, 162, 235, 0.8)',
        'Febrero': 'rgba(75, 192, 192, 0.8)',
        'Marzo': 'rgba(153, 102, 255, 0.8)',
        'Abril': 'rgba(255, 99, 132, 0.8)',
        'Mayo': 'rgba(255, 206, 86, 0.8)',
        'Junio': 'rgba(255, 159, 64, 0.8)',
        'Julio': 'rgba(54, 162, 235, 0.8)',
        'Agosto': 'rgba(75, 192, 192, 0.8)',
        'Septiembre': 'rgba(153, 102, 255, 0.8)',
        'Octubre': 'rgba(255, 99, 132, 0.8)',
        'Noviembre': 'rgba(255, 206, 86, 0.8)',
        'Diciembre': 'rgba(255, 159, 64, 0.8)'
    };

    const backgroundColor = salesData.labels.map(label => {
        const month = label.split(' ')[0];
        return monthColors[month];
    });

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: simplifiedLabels,
            datasets: [{
                label: 'Ventas por mes',
                data: convertedValues,
                backgroundColor: backgroundColor,
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Ventas: ${formatter.format(context.raw)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatter.format(value);
                        }
                    }
                }
            }
        }
    });
}


function actualizarResultados() {
    const monedaSeleccionada = document.getElementById('currencySelect').value;
    const formateador = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: monedaSeleccionada,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });

    if (salesData.values.length > 0) {
        // Convertir todos los valores a la moneda seleccionada
        const valoresConvertidos = salesData.values.map(valor => 
            convertCurrency(valor, 'USD', monedaSeleccionada)
        );

        // Calcular total y promedio
        const total = valoresConvertidos.reduce((a, b) => a + b, 0);
        const promedio = total / valoresConvertidos.length;

        // Encontrar mes con mayor y menor venta
        const maximo = Math.max(...valoresConvertidos);
        const minimo = Math.min(...valoresConvertidos);
        const indexMaximo = valoresConvertidos.indexOf(maximo);
        const indexMinimo = valoresConvertidos.indexOf(minimo);
        const mesMayor = salesData.labels[indexMaximo];
        const mesMenor = salesData.labels[indexMinimo];

        // Actualizar el DOM con los valores convertidos
        document.getElementById('totalSales').textContent = formateador.format(total);
        document.getElementById('averageSales').textContent = formateador.format(promedio);
        document.getElementById('highestMonth').textContent = `${mesMayor} (${formateador.format(maximo)})`;
        document.getElementById('lowestMonth').textContent = `${mesMenor} (${formateador.format(minimo)})`;
    } else {
        // Si no hay datos, mostrar valores en cero
        document.getElementById('totalSales').textContent = formateador.format(0);
        document.getElementById('averageSales').textContent = formateador.format(0);
        document.getElementById('highestMonth').textContent = '-';
        document.getElementById('lowestMonth').textContent = '-';
    }
}

// Mostrar el nombre de la empresa en el área de exportación
document.getElementById('companyNameInput').addEventListener('input', function() {
    document.getElementById('companyNameDisplay').textContent = this.value;
});

// Inicializar el nombre si ya hay valor
document.getElementById('companyNameDisplay').textContent = document.getElementById('companyNameInput').value;

// Botón para exportar a PDF
document.getElementById('exportPDFBtn').addEventListener('click', function() {
    // Asegurarse de que el nombre esté actualizado antes de exportar
    document.getElementById('companyNameDisplay').textContent = document.getElementById('companyNameInput').value;

    const exportSection = document.getElementById('exportSection');
    html2canvas(exportSection, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new window.jspdf.jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: 'a4'
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
        const imgX = (pageWidth - imgWidth * ratio) / 2;
        const imgY = 20;

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('reporte-ventas.pdf');
    });
});
