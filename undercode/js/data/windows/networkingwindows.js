/* ========================================================
   UNDERCODE - BASE DE DATOS: NETWORKING EN WINDOWS (networking_win)
   Contiene términos, protocolos y herramientas de red nativas
======================================================== */

export const NETWORKING_WINDOWS = [
    { 
        en: "SMB (Server Message Block)", 
        es: "Bloque de Mensajes del Servidor", 
        category: "networking_win", 
        type: "teoria", 
        desc: "Protocolo de red utilizado en Windows para compartir archivos, impresoras y servicios entre nodos. Es el pilar de la comunicación en Active Directory." 
    },
    { 
        en: "PowerShell Remoting (WinRM)", 
        es: "Remoting de PowerShell", 
        category: "networking_win", 
        type: "teoria", 
        desc: "Servicio de Windows que permite ejecutar comandos de PowerShell en equipos remotos de forma cifrada sobre el protocolo HTTP/HTTPS." 
    },
    { 
        en: "ipconfig /flushdns", 
        es: "Limpiar Caché DNS", 
        category: "networking_win", 
        os: "windows",
        type: "comando", 
        desc: "Comando fundamental para purgar la caché de resolución DNS local en Windows, útil cuando un equipo no resuelve correctamente nombres de dominio tras cambios de red.",
        examples: [
            "<strong>Ejemplo de uso:</strong><br><code>ipconfig /flushdns</code><br><small>Elimina las entradas obsoletas de la caché para forzar una nueva consulta al servidor DNS configurado.</small>"
        ]
    },
    { 
        en: "Test-NetConnection", 
        es: "Prueba de Conexión de Red", 
        category: "networking_win", 
        os: "windows",
        type: "comando", 
        desc: "Cmdlet moderno de PowerShell para diagnosticar conectividad de red, similar a ping pero mucho más potente, permitiendo verificar puertos TCP específicos.",
        examples: [
            "<strong>Ejemplo 1: Verificar conectividad básica</strong><br><code>Test-NetConnection -ComputerName 192.168.1.1</code>",
            "<strong>Ejemplo 2: Comprobar si un puerto está abierto (ej. puerto 445 SMB)</strong><br><code>Test-NetConnection -ComputerName 192.168.1.50 -Port 445</code>"
        ]
    },
    { 
        en: "netstat -ano", 
        es: "Estadísticas de Red", 
        category: "networking_win", 
        os: "windows",
        type: "comando", 
        desc: "Comando clásico de diagnóstico que muestra todas las conexiones activas, puertos en escucha y el PID (ID de proceso) asociado a cada conexión.",
        examples: [
            "<strong>Uso común:</strong><br><code>netstat -ano | findstr :445</code><br><small>Filtra conexiones que están utilizando el puerto 445 (SMB) para identificar qué proceso lo está gestionando.</small>"
        ]
    },
    { 
        en: "Get-NetNeighbor", 
        es: "Tabla de Vecinos de Red", 
        category: "networking_win", 
        os: "windows",
        type: "comando", 
        desc: "Cmdlet de PowerShell para visualizar y gestionar la tabla de vecinos (ARP/NDP), mostrando las direcciones MAC de los dispositivos en la subred local.",
        examples: [
            "<strong>Uso de auditoría:</strong><br><code>Get-NetNeighbor -InterfaceAlias 'Ethernet'</code><br><small>Lista los dispositivos detectados en la interfaz especificada y sus correspondientes estados de enlace.</small>"
        ]
    },
    { 
        en: "DNS Cache Poisoning (Windows Host)", 
        es: "Envenenamiento de Caché DNS", 
        category: "networking_win", 
        type: "teoria", 
        desc: "Ataque que consiste en insertar entradas DNS falsas en la caché del resolvedor de Windows, redirigiendo tráfico legítimo hacia servidores maliciosos controlados por un atacante." 
    }
];
