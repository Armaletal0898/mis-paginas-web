/* ========================================================
   UNDERCODE - BASE DE DATOS: SISTEMA OPERATIVO WINDOWS (os_win)
   Contiene comandos de gestión, auditoría y administración local
======================================================== */

export const OS_DATAWINDOWS = [
    { 
        en: "PowerShell (pwsh)", 
        es: "Entorno de Automatización", 
        category: "os_win", 
        type: "teoria", 
        desc: "Framework de automatización de tareas y gestión de configuración que incluye un shell de línea de comandos y un lenguaje de scripting basado en objetos." 
    },
    { 
        en: "Get-Process", 
        es: "Gestión de Procesos Activos", 
        category: "os_win", 
        os: "windows",
        type: "comando", 
        desc: "Cmdlet de PowerShell para listar, filtrar y manipular los procesos que se están ejecutando en el sistema local.",
        examples: [
            "<strong>Ejemplo 1: Buscar procesos específicos</strong><br><code>Get-Process | Where-Object {$_.CPU -gt 100}</code><br><small>Identifica procesos que están consumiendo alto uso de CPU.</small>",
            "<strong>Ejemplo 2: Matar un proceso por nombre</strong><br><code>Stop-Process -Name 'notepad' -Force</code>"
        ]
    },
    { 
        en: "icacls", 
        es: "Control de Listas de Acceso (ACL)", 
        category: "os_win", 
        os: "windows",
        type: "comando", 
        desc: "Utilidad de línea de comandos para mostrar o modificar listas de control de acceso discrecional (DACL) en archivos y directorios.",
        examples: [
            "<strong>Ejemplo 1: Ver permisos de un archivo</strong><br><code>icacls C:\\Windows\\System32\\config\\SAM</code>",
            "<strong>Ejemplo 2: Respaldo de permisos</strong><br><code>icacls C:\\Data /save acl_backup.txt /t /c</code>"
        ]
    },
    { 
        en: "Get-LocalUser", 
        es: "Enumeración de Usuarios Locales", 
        category: "os_win", 
        os: "windows",
        type: "comando", 
        desc: "Cmdlet para obtener información sobre cuentas de usuario locales. Crucial en auditorías de seguridad para identificar cuentas con privilegios elevados o innecesarios.",
        examples: [
            "<strong>Ejemplo 1: Listar todos los usuarios</strong><br><code>Get-LocalUser</code>",
            "<strong>Ejemplo 2: Identificar usuarios deshabilitados</strong><br><code>Get-LocalUser | Where-Object {$_.Enabled -eq $false}</code>"
        ]
    },
    { 
        en: "sfc /scannow", 
        es: "Comprobador de Archivos de Sistema", 
        category: "os_win", 
        os: "windows",
        type: "comando", 
        desc: "Herramienta que escanea y repara archivos corruptos del sistema operativo Windows, restaurando versiones correctas de archivos protegidos.",
        examples: [
            "<strong>Uso de reparación:</strong><br><code>sfc /scannow</code><br><small>Ejecutar siempre como Administrador. Analiza la integridad de los binarios esenciales de Windows.</small>"
        ]
    },
    { 
        en: "Registry (reg.exe)", 
        es: "Editor del Registro", 
        category: "os_win", 
        type: "teoria", 
        desc: "Base de datos jerárquica que almacena configuraciones de bajo nivel para el sistema operativo, controladores, servicios y aplicaciones de usuario." 
    },
    { 
        en: "schtasks", 
        es: "Gestión de Tareas Programadas", 
        category: "os_win", 
        os: "windows",
        type: "comando", 
        desc: "Comando para crear, eliminar, consultar y modificar tareas programadas en el sistema. Es un vector común para la persistencia de malware.",
        examples: [
            "<strong>Ejemplo 1: Listar todas las tareas</strong><br><code>schtasks /query /fo LIST</code>",
            "<strong>Ejemplo 2: Crear tarea de persistencia</strong><br><code>schtasks /create /tn 'Backdoor' /tr 'C:\\tmp\\evil.exe' /sc onlogon</code>"
        ]
    }
];
