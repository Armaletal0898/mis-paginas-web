// Función para detectar acciones indebidas y mostrar pantalla de error
document.addEventListener('DOMContentLoaded', function() {
    // Crear elementos para la pantalla de error
    const errorScreen = document.createElement('div');
    errorScreen.className = 'error-screen';
    errorScreen.innerHTML = `
        <div class="error-content">
            <h2 class="glitch" data-text="ERROR DE SISTEMA">ERROR DE SISTEMA</h2>
            <p class="error-code">CÓDIGO: 0xF4T4L</p>
            <p class="error-message">Se ha detectado un intento de acceso no autorizado al codigo fuente.</p>
            <p class="error-details">Los sistemas de <span class="company-name">ALLSAFE</span> han registrado esta actividad.</p>
            <p class="recovery-message">Haga clic para intentar recuperar la sesión...</p>
        </div>
    `;
    
    // Estilos para la pantalla de error
    const errorStyle = document.createElement('style');
    errorStyle.textContent = `
        .error-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(35, 41, 49, 0.97);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            cursor: pointer;
            animation: glitchBackground 0.3s infinite;
            display: none;
        }
        
        .error-content {
            text-align: center;
            padding: 2rem;
            border: 1px solid var(--danger-color);
            background-color: var(--darker-bg);
            max-width: 80%;
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        .error-code {
            font-family: 'Courier New', monospace;
            color: var(--danger-color);
            font-size: 1.5rem;
            margin: 1rem 0;
        }
        
        .error-message, .error-details {
            margin: 1rem 0;
            line-height: 1.6;
        }
        
        .company-name {
            color: var(--primary-color);
            font-weight: bold;
        }
        
        .recovery-message {
            margin-top: 2rem;
            color: var(--accent-color);
            font-style: italic;
            animation: blink 1s infinite;
        }
        
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
        
        @keyframes glitchBackground {
            0% { background-color: rgba(35, 41, 49, 0.97); }
            50% { background-color: rgba(30, 35, 42, 0.97); }
            100% { background-color: rgba(35, 41, 49, 0.97); }
        }
        
        /* Estilos para el modal del código fuente */
        .source-code-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(26, 30, 36, 0.95);
            z-index: 10000;
            display: none;
            overflow: auto;
        }
        
        .source-code-container {
            padding: 2rem;
            margin: 2rem auto;
            max-width: 90%;
            background-color: var(--darker-bg);
            border: 1px solid var(--primary-color);
            box-shadow: 0 0 20px rgba(79, 193, 233, 0.4);
            position: relative;
        }
        
        .source-code-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--accent-color);
        }
        
        .source-code-title {
            color: var(--primary-color);
            font-size: 1.5rem;
        }
        
        .source-code-close {
            background: none;
            border: none;
            color: var(--accent-color);
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        .source-code-content {
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            background-color: rgba(0, 0, 0, 0.3);
            padding: 1rem;
            border-radius: 4px;
            overflow-x: auto;
            color: var(--text-color);
        }
        
        .source-code-line {
            display: flex;
        }
        
        .line-number {
            color: var(--accent-color);
            min-width: 3rem;
            text-align: right;
            padding-right: 1rem;
            user-select: none;
        }
        
        .line-content {
            flex: 1;
        }
    `;
    
    // Agregar elementos al DOM
    document.body.appendChild(errorStyle);
    document.body.appendChild(errorScreen);
    
    // Crear modal para mostrar el código fuente
    const sourceCodeModal = document.createElement('div');
    sourceCodeModal.className = 'source-code-modal';
    sourceCodeModal.innerHTML = `
        <div class="source-code-container">
            <div class="source-code-header">
                <h3 class="source-code-title">Código Fuente - Acceso Autorizado</h3>
                <button class="source-code-close">×</button>
            </div>
            <div class="source-code-content"></div>
        </div>
    `;
    document.body.appendChild(sourceCodeModal);
    
    // Cerrar el modal de código fuente
    document.querySelector('.source-code-close').addEventListener('click', function() {
        sourceCodeModal.style.display = 'none';
    });
    
    // Detectar intento de ver código fuente (Ctrl+U, F12, clic derecho)
    document.addEventListener('keydown', function(e) {
        // Ctrl+U (ver código fuente)
        if (e.ctrlKey && (e.key === 'u' || e.keyCode === 85)) {
            e.preventDefault();
            showErrorScreen();
        }
        
        // F12 (herramientas de desarrollador)
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            showErrorScreen();
        }
        
        // Easter Egg: Secuencia de teclas "hack" (h-a-c-k)
        if (easterEggSequence.length > 0 && e.key.toLowerCase() === easterEggSequence[0]) {
            easterEggSequence.shift();
            
            if (easterEggSequence.length === 0) {
                // Secuencia completada, mostrar código fuente
                showSourceCode();
                // Reiniciar secuencia
                easterEggSequence = ['h', 'a', 'c', 'k'];
            }
        } else {
            // Reiniciar secuencia si se presiona una tecla incorrecta
            easterEggSequence = ['h', 'a', 'c', 'k'];
        }
    });
    
    // Secuencia para el Easter Egg
    let easterEggSequence = ['h', 'a', 'c', 'k'];
    
    // Deshabilitar menú contextual (clic derecho)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showErrorScreen();
    });
    
    // Función para mostrar la pantalla de error
    function showErrorScreen() {
        errorScreen.style.display = 'flex';
        
        // Efecto de glitch en el texto
        setTimeout(() => {
            const glitchTexts = document.querySelectorAll('.error-screen .glitch');
            glitchTexts.forEach(text => {
                text.classList.add('active');
            });
        }, 100);
    }
    
    // Función para mostrar el código fuente
    function showSourceCode() {
        // Obtener el HTML de la página actual
        const htmlContent = document.documentElement.outerHTML;
        
        // Formatear el código con números de línea
        const lines = htmlContent.split('\n');
        let formattedCode = '';
        
        for (let i = 0; i < lines.length; i++) {
            formattedCode += `<div class="source-code-line">
                <span class="line-number">${i + 1}</span>
                <span class="line-content">${escapeHtml(lines[i])}</span>
            </div>`;
        }
        
        // Mostrar el código en el modal
        document.querySelector('.source-code-content').innerHTML = formattedCode;
        sourceCodeModal.style.display = 'block';
    }
    
    // Función para escapar caracteres HTML
    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    // Cerrar la pantalla de error al hacer clic
    errorScreen.addEventListener('click', function() {
        errorScreen.style.display = 'none';
    });
    
    // Detectar DevTools (otra forma)
    let devToolsOpen = false;
    
    function detectDevTools() {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        
        if (widthThreshold || heightThreshold) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                showErrorScreen();
            }
        } else {
            devToolsOpen = false;
        }
    }
    
    setInterval(detectDevTools, 1000);
});