
// Definir la API key correctamente
const API_KEY = 'AIzaSyAVKXSPq5VzXwLviEg9sJ4cQqJN6MV1xu8';

async function analyzeWebsite() {
    const url = document.getElementById('urlInput').value;
    
    // Mejorar la validación de URL
    try {
        new URL(url); // Validar si es una URL válida
    } catch (e) {
        alert('Por favor, ingrese una URL válida (ejemplo: https://www.example.com)');
        return;
    }

    try {
        setLoadingState(true);
        const pagespeedData = await fetchPageSpeedData(url);
        
        if (pagespeedData.error) {
            throw new Error(pagespeedData.error.message || 'Error al analizar el sitio');
        }
        
        if (!pagespeedData.lighthouseResult) {
            throw new Error('No se pudieron obtener los resultados del análisis');
        }
        
        updatePageSpeedMetrics(pagespeedData);
        
    } catch (error) {
        console.error('Error al analizar el sitio web:', error);
        alert(`Error: ${error.message || 'No se pudo analizar el sitio. Intente con otro sitio web.'}`);
    } finally {
        setLoadingState(false);
    }
}

async function fetchPageSpeedData(url) {
    try {
        const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${API_KEY}&strategy=desktop&category=performance&category=accessibility&category=best-practices&category=seo`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en fetchPageSpeedData:', error);
        throw new Error('No se pudo conectar con el servicio de análisis. Por favor, intente nuevamente.');
    }
}

function updatePageSpeedMetrics(data) {
    const scores = {
        performance: Math.round(data.lighthouseResult.categories.performance.score * 100),
        accessibility: Math.round(data.lighthouseResult.categories.accessibility.score * 100),
        bestPractices: Math.round(data.lighthouseResult.categories['best-practices'].score * 100),
        seo: Math.round(data.lighthouseResult.categories.seo.score * 100)
    };

    // Actualizar los scores en la UI
    document.getElementById('performanceScore').textContent = scores.performance;
    document.getElementById('accessibilityScore').textContent = scores.accessibility;
    document.getElementById('bestPracticesScore').textContent = scores.bestPractices;
    document.getElementById('seoScore').textContent = scores.seo;

    // Crear el gráfico
    createPerformanceChart(scores);
    
    // Agregar explicaciones
    updateExplanations(scores);
}

function updateExplanations(scores) {
    const explanations = {
        performance: {
            element: document.getElementById('performanceExplanation'),
            title: 'Rendimiento',
            getExplanation: (score) => {
                if (score >= 90) return 'Excelente rendimiento. La página carga rápidamente y responde bien a las interacciones del usuario.';
                if (score >= 50) return 'Rendimiento moderado. Hay espacio para mejoras en la velocidad de carga y respuesta.';
                return 'Rendimiento bajo. Se recomienda optimizar imágenes, reducir código JavaScript y CSS no utilizado.';
            }
        },
        accessibility: {
            element: document.getElementById('accessibilityExplanation'),
            title: 'Accesibilidad',
            getExplanation: (score) => {
                if (score >= 90) return 'Excelente accesibilidad. La página es accesible para usuarios con diferentes capacidades.';
                if (score >= 50) return 'Accesibilidad moderada. Considere mejorar el contraste de colores y etiquetas ARIA.';
                return 'Baja accesibilidad. Es necesario implementar mejoras significativas para usuarios con discapacidades.';
            }
        },
        bestPractices: {
            element: document.getElementById('bestPracticesExplanation'),
            title: 'Mejores Prácticas',
            getExplanation: (score) => {
                if (score >= 90) return 'Excelente implementación de mejores prácticas web.';
                if (score >= 50) return 'Implementación moderada de mejores prácticas. Revise la seguridad HTTPS y bibliotecas desactualizadas.';
                return 'Pocas mejores prácticas implementadas. Actualice las dependencias y mejore la seguridad.';
            }
        },
        seo: {
            element: document.getElementById('seoExplanation'),
            title: 'SEO',
            getExplanation: (score) => {
                if (score >= 90) return 'Excelente optimización para motores de búsqueda.';
                if (score >= 50) return 'SEO moderado. Mejore las meta descripciones y títulos de página.';
                return 'SEO deficiente. Implemente mejoras en etiquetas meta, títulos y contenido.';
            }
        }
    };

    // Actualizar cada explicación
    Object.entries(explanations).forEach(([key, info]) => {
        const score = scores[key];
        const className = score >= 90 ? 'good' : score >= 50 ? 'warning' : 'poor';
        
        info.element.className = `explanation-card ${className}`;
        info.element.innerHTML = `
            <h3>${info.title}: ${score}%</h3>
            <p>${info.getExplanation(score)}</p>
        `;
    });
}

function createPerformanceChart(scores) {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    // Destruir el gráfico existente si hay uno
    if (window.performanceChart instanceof Chart) {
        window.performanceChart.destroy();
    }

    // Configurar el tamaño del canvas explícitamente
    ctx.canvas.style.width = '100%';
    ctx.canvas.style.height = '100%';
    ctx.canvas.width = ctx.canvas.offsetWidth;
    ctx.canvas.height = ctx.canvas.offsetHeight;

    window.performanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Rendimiento', 'Accesibilidad', 'Mejores Prácticas', 'SEO'],
            datasets: [{
                label: 'Puntuación (%)',
                data: [
                    scores.performance,
                    scores.accessibility,
                    scores.bestPractices,
                    scores.seo
                ],
                backgroundColor: [
                    '#FF6384',  // Rojo para Rendimiento
                    '#36A2EB',  // Azul para Accesibilidad
                    '#FFCE56',  // Amarillo para Mejores Prácticas
                    '#4BC0C0'   // Verde para SEO
                ],
                borderColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function setLoadingState(isLoading) {
    const button = document.querySelector('button');
    button.disabled = isLoading;
    button.textContent = isLoading ? 'Analizando...' : 'Analizar';
}
