/* ========================================================
   UNDERCODE - MOTOR DE LA BIBLIOTECA TÉCNICA (UNIFICADO)
   Base de Datos de Infraestructura & Buscador Híbrido Avanzado
======================================================== */

const DICCIONARIO_TERMINOS = [
    // ==========================================
    // 🛡️ CIBERSEGURIDAD (cyber)
    // ==========================================
    // Básico
    { en: "Phishing", es: "Suplantación de Identidad", category: "cyber", desc: "Método de ingeniería social que utiliza correos electrónicos, mensajes o páginas web falsas para engañar a los usuarios y robar credenciales o datos financieros." },
    { en: "Malware", es: "Software Malicioso", category: "cyber", desc: "Término genérico para cualquier tipo de código o programa informático diseñado intencionalmente para dañar, infiltrarse o realizar acciones no autorizadas en un sistema." },
    { en: "Brute Force Attack", es: "Ataque de Fuerza Bruta", category: "cyber", desc: "Método iterativo que consiste en probar sistemáticamente todas las combinaciones posibles de caracteres hasta encontrar la contraseña o clave criptográfica correcta." },
    { en: "Social Engineering", es: "Ingeniería Social", category: "cyber", desc: "Técnica de manipulación psicológica utilizada por atacantes para inducir a las personas a ejecutar acciones específicas o revelar información confidencial." },
    { en: "Ransomware", es: "Secuestro de Datos", category: "cyber", desc: "Tipo de malware que cifra los archivos de la víctima y exige el pago de un rescate financiero a cambio de proporcionar la clave de descifrado." },
    
    // Intermedio
    { en: "Port Scanning", es: "Escaneo de Puertos", category: "cyber", desc: "Técnica utilizada para identificar qué puertos de comunicación están abiertos en un dispositivo de red, permitiendo descubrir servicios activos y posibles vulnerabilidades." },
    { en: "Man-in-the-Middle (MitM)", es: "Hombre en el Medio", category: "cyber", desc: "Tipo de ataque donde el atacante intercepta y altera en secreto la comunicación entre dos partes que creen que se están comunicando directamente entre sí." },
    { en: "Hardening", es: "Endurecimiento de Sistemas", category: "cyber", desc: "Proceso de asegurar un sistema operativo o aplicación mediante la reducción de su superficie de ataque, eliminando software, servicios y privilegios innecesarios." },
    { en: "Privilege Escalation", es: "Escalación de Privilegios", category: "cyber", desc: "Acto de explotar un error, falla de diseño o supervisión de configuración en un sistema operativo para obtener acceso elevado a recursos protegidos." },
    { en: "OSINT (Open Source Intelligence)", es: "Inteligencia de Fuentes Abiertas", category: "cyber", desc: "Metodología de recolección y análisis de información obtenida de fuentes de acceso público para ser utilizada en un contexto de inteligencia o reconocimiento." },
    { en: "SQL Injection (SQLi)", es: "Inyección SQL", category: "cyber", desc: "Vulnerabilidad que permite a un atacante interferir en las consultas que una aplicación realiza a su base de datos, inyectando código SQL malicioso a través de campos de entrada." },
    { en: "Cross-Site Scripting (XSS)", es: "Secuestro de Scripts en Sitios Cruzados", category: "cyber", desc: "Vulnerabilidad web que permite a un atacante inyectar scripts maliciosos (normalmente JavaScript) en páginas web vistas por otros usuarios." },

    // Avanzado
    { en: "Zero-Day Vulnerability", es: "Vulnerabilidad de Día Cero", category: "cyber", desc: "Falla de seguridad en el software que es desconocida para el fabricante. Se llama así porque el desarrollador tiene 'cero días' para repararla antes de que sea explotada." },
    { en: "Reverse Shell", es: "Consola Inversa", category: "cyber", desc: "Técnica de ataque donde la máquina de la víctima inicia una conexión de terminal saliente hacia el equipo del atacante, evadiendo las reglas restrictivas de los firewalls entrantes." },
    { en: "Buffer Overflow", es: "Desbordamiento de Búfer", category: "cyber", desc: "Anomalía de software donde un programa escribe más datos en un bloque de memoria de los que este puede contener, sobrescribiendo direcciones adyacentes y permitiendo la ejecución de código." },
    { en: "SIEM (Security Information and Event Management)", es: "Gestión de Eventos e Información de Seguridad", category: "cyber", desc: "Solución tecnológica corporativa que centraliza, analiza y correlaciona registros de auditoría (logs) de toda la infraestructura para detectar amenazas en tiempo real." },
    { en: "Honeypot", es: "Sinfín / Sistema Trampa", category: "cyber", desc: "Recurso de seguridad diseñado para parecer un objetivo valioso y vulnerable con el fin de atraer, desviar, analizar y bloquear los intentos de intrusión de atacantes." },

    // ==========================================
    // 🌐 REDES (networking)
    // ==========================================
    // Básico
    { en: "IP Address", es: "Dirección IP", category: "networking", desc: "Etiqueta numérica asignada de forma lógica a cada dispositivo conectado a una red informática que utiliza el protocolo IP para comunicarse." },
    { en: "MAC Address", es: "Dirección MAC", category: "networking", desc: "Identificador físico único asignado por el fabricante a una tarjeta de interfaz de red (NIC) que opera en la capa de enlace de datos." },
    { en: "Gateway", es: "Puerta de Enlace", category: "networking", desc: "Dispositivo de red (normalmente un router) que actúa como punto de salida para que los equipos locales envíen tráfico hacia redes externas o internet." },
    { en: "Router", es: "Enrutador", category: "networking", desc: "Dispositivo de capa de red encargado de interconectar diferentes segmentos de red y determinar la mejor ruta para enviar paquetes de datos." },
    
    // Intermedio
    { en: "Three-Way Handshake", es: "Apretón de Manos de Tres Vías", category: "networking", desc: "Proceso de sincronización de tres pasos (SYN, SYN-ACK, ACK) utilizado por el protocolo TCP para establecer una conexión confiable entre un cliente y un servidor." },
    { en: "VLAN (Virtual Local Area Network)", es: "Red de Área Local Virtual", category: "networking", desc: "Método para crear redes lógicas independientes dentro de una misma infraestructura física de switches, ideal para segmentar tráfico de infraestructura corporativa." },
    { en: "Subnetting", es: "Subneteado / Subredes", category: "networking", desc: "Práctica de dividir una red física grande en varias redes lógicas más pequeñas para mejorar el rendimiento, la eficiencia IP y la seguridad." },
    { en: "DNS Spoofing", es: "Suplantación de DNS", category: "networking", desc: "Ataque en el que se introducen datos falsos en la caché de un servidor de nombres DNS, haciendo que devuelva direcciones IP incorrectas y redirija el tráfico." },
    { en: "DHCP Starvation", es: "Agotamiento de DHCP", category: "networking", desc: "Ataque de denegación de servicio donde un intruso inunda el servidor DHCP con peticiones MAC falsas para agotar el pool de direcciones IP disponibles." },
    { en: "NAT (Network Address Translation)", es: "Traducción de Direcciones de Red", category: "networking", desc: "Mecanismo que modifica las direcciones IP en el encabezado de los paquetes en tránsito, permitiendo que múltiples equipos locales compartan una única IP pública." },

    // Avanzado
    { en: "CIDR (Classless Inter-Domain Routing)", es: "Enrutamiento Interdominio Sin Clases", category: "networking", desc: "Método de asignación de direcciones IP y enrutamiento que reemplaza la arquitectura de clases rígida, permitiendo una división de subredes mucho más eficiente mediante máscaras de longitud variable." },
    { en: "OSPF (Open Shortest Path First)", es: "Abrir Primero el Camino Más Corto", category: "networking", desc: "Protocolo de enrutamiento dinámico de estado de enlace diseñado para redes de topología interna (IGP), basado en el algoritmo de Dijkstra para calcular rutas óptimas." },
    { en: "BGP (Border Gateway Protocol)", es: "Protocolo de Pasarela de Frontera", category: "networking", desc: "Protocolo de enrutamiento externo básico de internet que intercambia información de ruteo entre diferentes Sistemas Autónomos (AS)." },
    { en: "VLAN Trunking (802.1Q)", es: "Enlace Troncal de VLAN", category: "networking", desc: "Estándar de encapsulación de red que etiqueta tramas Ethernet para permitir el transporte de tráfico de múltiples VLANs a través de un único cable físico entre switches." },

    // ==========================================
    // 🐧 SISTEMAS OPERATIVOS - LINUX (os)
    // ==========================================
    // Básico
    { en: "Bash (Bourne Again Shell)", es: "Consola Bash", category: "os", desc: "Intérprete de comandos y lenguaje de script compatible con Unix estándar, por defecto en la mayoría de distribuciones Linux." },
    { en: "Root", es: "Superusuario", category: "os", desc: "Nombre unconventional de la cuenta de usuario en sistemas Unix/Linux que posee todos los derechos y privilegios de acceso y modificación sobre el sistema." },
    { en: "File Permissions", es: "Permisos de Archivos", category: "os", desc: "Atributos que controlan la capacidad de lectura (r), escritura (w) y ejecución (x) asignados de forma jerárquica a Usuarios, Grupos y Otros." },
    
    // Intermedio
    { en: "SUID (Set User ID)", es: "Asignar ID de Usuario", category: "os", desc: "Permiso especial que permite a un usuario de bajo nivel ejecutar un archivo binario con los privilegios del propietario del archivo (usualmente root) temporalmente." },
    { en: "Systemd", es: "Administrador de Sistema y Servicios", category: "os", desc: "Administrador del sistema y de servicios para Linux que inicializa los componentes en el espacio de usuario y gestiona los demonios de forma paralela." },
    { en: "Inodes", es: "Nodos de Índice", category: "os", desc: "Estructura de datos interna de un sistema de archivos en Linux que almacena los metadatos de un objeto (tamaño, dueño, permisos) pero no su nombre ni su contenido físico." },
    { en: "Crontab", es: "Tabla de Cron", category: "os", desc: "Archivo de configuración del sistema de tareas programadas que define comandos y scripts que deben ejecutarse de forma automática en intervalos de tiempo regulares." },

    // Avanzado
    { en: "PAM (Pluggable Authentication Modules)", es: "Módulos de Autenticación Enchufables", category: "os", desc: "Mecanismo flexible utilizado en Linux para desvincular las aplicaciones de los métodos de autenticación concretos, permitiendo cambiar políticas sin recompilar el software." },
    { en: "FHS (Filesystem Hierarchy Standard)", es: "Estándar de Jerarquía del Sistema de Archivos", category: "os", desc: "Directriz oficial que define la estructura de directorios y la ubicación de archivos en sistemas operativos de tipo Linux." },

    // ==========================================
    // 🪟 SISTEMAS OPERATIVOS - WINDOWS (os)
    // ==========================================
    // Básico
    { en: "Windows Registry", es: "Registro de Windows", category: "os", desc: "Base de datos jerárquica centralizada que almacena configuraciones, ajustes de hardware, preferencias de usuario y parámetros del sistema operativo Windows." },
    { en: "PowerShell", es: "Consola PowerShell", category: "os", desc: "Motor de automatización y lenguaje de scripting multiplataforma orientado a objetos integrado por Microsoft para la administración profunda del sistema Windows." },
    
    // Intermedio
    { en: "Active Directory", es: "Directorio Activo", category: "os", desc: "Servicio de directorio estructurado para la gestión centralizada de identidades, permisos, políticas de grupo (GPOs) y equipos en una red empresarial Windows." },
    { en: "Group Policy Objects (GPO)", es: "Objetos de Directiva de Grupo", category: "os", desc: "Colección de configuraciones aplicadas a Active Directory que definen el comportamiento de seguridad y del entorno operativo de usuarios y computadoras en Windows." },
    { en: "LSASS (Local Security Authority Subsystem Service)", es: "Servicio del Subsistema de Autoridad de Seguridad Local", category: "os", desc: "Proceso del sistema crítico en Windows encargado de verificar la autenticación de usuarios, manejar cambios de contraseñas y crear tokens de acceso." },
    { en: "SAM (Security Accounts Manager)", es: "Administrador de Cuentas de Seguridad", category: "os", desc: "Base de datos de registro en Windows que almacena de forma segura las contraseñas cifradas y hashes de los usuarios locales." },

    // Avanzado
    { en: "Sysmon (System Monitor)", es: "Monitor de Sistema", category: "os", desc: "Herramienta avanzada de supervisión del ecosistema Sysinternals que registra la actividad detallada (creación de procesos, conexiones de red) en el Visor de Eventos de Windows." },
    { en: "PowerShell Remoting (WinRM)", es: "Administración Remota de PowerShell", category: "os", desc: "Protocolo de administración que permite ejecutar comandos de PowerShell en máquinas Windows remotas utilizando transmisiones seguras HTTPS/HTTP." },

    // ==========================================
    // 🍏 SISTEMAS OPERATIVOS - macOS (os)
    // ==========================================
    // Básico
    { en: "Darwin Kernel", es: "Núcleo Darwin", category: "os", desc: "Subsistema de código abierto central en el que se basa macOS, compuesto por componentes de NeXTSTEP, BSD y el micronúcleo Mach." },
    { en: "Keychain Access", es: "Acceso a Llaveros", category: "os", desc: "Aplicación y API nativa de macOS que almacena de forma cifrada contraseñas, certificados de seguridad, claves y notas confidenciales del usuario." },
    
    // Intermedio
    { en: "System Integrity Protection (SIP)", es: "Protección de Integridad del Sistema", category: "os", desc: "Característica de seguridad de macOS que restringe la capacidad del usuario root para modificar carpetas y archivos críticos del núcleo del sistema Apple." },
    { en: "Gatekeeper", es: "Guardián de Acceso", category: "os", desc: "Mecanismo tecnológico de macOS que impone la verificación de firmas digitales y notarización de aplicaciones antes de permitir su ejecución, mitigando código malicioso en Apple." },
    { en: "APFS (Apple File System)", es: "Sistema de Archivos de Apple", category: "os", desc: "Sistema de almacenamiento moderno de macOS optimizado para unidades flash y de estado sólido (SSD), con cifrado fuerte, compartición de espacio y clones rápidos." },

    // Avanzado
    { en: "Launchd", es: "Demonio de Inicialización y Gestión", category: "os", desc: "Framework de código abierto utilizado por macOS para iniciar, detener y gestionar demonios, aplicaciones y scripts del sistema en espacio de usuario Apple." },
    { en: "TCC (Transparency, Consent, and Control)", es: "Transparencia, Consentimiento y Control", category: "os", desc: "Subsistema de seguridad interno de macOS que regula los permisos de las aplicaciones para acceder a recursos de privacidad (Cámara, Micrófono, Disco Completo)." }
];

// ========================================================
// CONTROLADOR DE INTERFAZ Y FILTRADO COMBINADO HÍBRIDO
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
    const librarySearch = document.getElementById("librarySearch");
    const libraryResults = document.getElementById("libraryResults");
    const filterButtons = document.querySelectorAll(".filter-btn");
    
    let categoriaSeleccionada = "all"; // Estado global de la tarjeta de filtro activa

    // Carga inicial del glosario completo
    procesarYFiltrar();

    // 1. EVENTO DE ENTRADA DEL BUSCADOR CENTRAL (INPUT)
    if (librarySearch) {
        librarySearch.addEventListener("input", () => {
            procesarYFiltrar();
        });
    }

    // 2. EVENTO DE CLIC EN LAS TARJETAS / BOTONES DE FILTRO RÁPIDO
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Manejo de estado visual activo
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            // Sincronizar el estado de la categoría
            categoriaSeleccionada = btn.getAttribute("data-filter");
            
            // Re-filtrar manteniendo consistencia con lo que esté en el input
            procesarYFiltrar();
        });
    });

    // 3. MOTOR LOGICO CENTRAL DE FILTRADO COMBINADO
    function procesarYFiltrar() {
        const rawQuery = librarySearch ? librarySearch.value.trim() : "";
        let listaFiltrada = DICCIONARIO_TERMINOS;

        // --- PASO A: Filtrar por tarjeta táctil seleccionada ---
        if (categoriaSeleccionada !== "all") {
            // Sub-segmentación inteligente para la macro-categoría 'os'
            if (["linux", "windows", "macos"].includes(categoriaSeleccionada)) {
                listaFiltrada = DICCIONARIO_TERMINOS.filter(item => 
                    item.category === "os" && 
                    (item.en.toLowerCase().includes(categoriaSeleccionada) || 
                     item.desc.toLowerCase().includes(categoriaSeleccionada))
                );
            } else {
                // Filtrado nativo para 'cyber' y 'networking'
                listaFiltrada = DICCIONARIO_TERMINOS.filter(item => item.category === categoriaSeleccionada);
            }
        }

        // --- PASO B: Cruzar y combinar con el input de búsqueda ---
        if (rawQuery !== "") {
            // Verificar si el usuario utilizó la sintaxis CLI avanzada (ej. "windows: registry")
            if (rawQuery.includes(":")) {
                const partes = rawQuery.split(":");
                const prefijo = partes[0].trim().toLowerCase();
                const palabraClave = partes[1].trim().toLowerCase();

                let categoriaPrefijo = "";
                if (["cyber", "ciberseguridad", "seguridad"].includes(prefijo)) categoriaPrefijo = "cyber";
                if (["redes", "networking", "red"].includes(prefijo)) categoriaPrefijo = "networking";
                if (["linux", "windows", "macos", "os"].includes(prefijo)) categoriaPrefijo = "os";

                if (categoriaPrefijo !== "") {
                    // El prefijo manual en consola tiene prioridad de sobreescritura sobre el botón táctil
                    listaFiltrada = DICCIONARIO_TERMINOS.filter(item => item.category === categoriaPrefijo);
                    
                    // Si el prefijo apunta a un SO específico, reducimos el grupo antes del string match
                    if (["linux", "windows", "macos"].includes(prefijo)) {
                        listaFiltrada = listaFiltrada.filter(item => 
                            item.en.toLowerCase().includes(prefijo) || item.desc.toLowerCase().includes(prefijo)
                        );
                    }

                    if (palabraClave !== "") {
                        listaFiltrada = listaFiltrada.filter(item => 
                            item.en.toLowerCase().includes(palabraClave) ||
                            item.es.toLowerCase().includes(palabraClave) ||
                            item.desc.toLowerCase().includes(palabraClave)
                        );
                    }
                }
            } else {
                // Búsqueda de texto regular estándar (Aplica sobre el sub-conjunto de la tarjeta activa)
                const queryNormal = rawQuery.toLowerCase();
                listaFiltrada = listaFiltrada.filter(item => 
                    item.en.toLowerCase().includes(queryNormal) ||
                    item.es.toLowerCase().includes(queryNormal) ||
                    item.desc.toLowerCase().includes(queryNormal)
                );
            }
        }

        // Renderizar el arreglo final refinado
        mostrarTerminos(listaFiltrada);
    }

    // 4. MOTOR DE RENDERIZADO DINÁMICO Y ASIGNACIÓN DE CLASES VISUALES
    function mostrarTerminos(lista) {
        libraryResults.innerHTML = "";

        // UI en caso de no encontrar ningún match lógico
        if (lista.length === 0) {
            libraryResults.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; color: #444444; font-family: monospace; padding: 50px 0;">
                    <i class="fas fa-terminal" style="font-size: 2.5rem; margin-bottom: 15px; color: #ff0000; text-shadow: 0 0 10px rgba(255,0,0,0.4);"></i>
                    <p style="color:#ffffff; font-size:1.1rem; margin-bottom:5px;">ERROR: NO_MATCHES_FOUND</p>
                    <p style="color:#555555; font-size:0.9rem;">No se encontraron coincidencias bajo los criterios seleccionados.</p>
                </div>`;
            return;
        }

        // Creación e inyección iterativa de las tarjetas con retraso progresivo (Staggered Animation)
        lista.forEach((item, index) => {
            const card = document.createElement("div");
            
            // Calcular subtipo visual de clase para matizar bordes y subtítulos en la categoría 'os'
            let claseEstilo = item.category;
            if (item.category === "os") {
                if (item.en.toLowerCase().includes("windows") || item.desc.toLowerCase().includes("windows")) claseEstilo = "os windows-card";
                else if (item.en.toLowerCase().includes("mac") || item.desc.toLowerCase().includes("apple") || item.desc.toLowerCase().includes("macos")) claseEstilo = "os macos-card";
                else claseEstilo = "os linux-card";
            }

            card.className = `def-card ${claseEstilo}`;
            
            // Delay dinámico basado en el índice para que fluyan hacia arriba consecutivamente
            card.style.animationDelay = `${index * 0.04}s`;

            // Formatear el string visual exacto del Tag descriptivo de la tarjeta
            let tagMostrado = item.category;
            if (item.category === "os") {
                if (item.en.toLowerCase().includes("windows") || item.desc.toLowerCase().includes("windows")) tagMostrado = "windows";
                else if (item.en.toLowerCase().includes("mac") || item.desc.toLowerCase().includes("apple") || item.desc.toLowerCase().includes("macos")) tagMostrado = "macOS";
                else tagMostrado = "linux";
            }

            card.innerHTML = `
                <h3>${item.en} <span class="def-tag">${tagMostrado}</span></h3>
                <div class="es-title">${item.es}</div>
                <p>${item.desc}</p>
            `;

            libraryResults.appendChild(card);
        });
    }
});
