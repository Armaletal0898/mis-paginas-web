/* ========================================================
   UNDERCODE - BASE DE DATOS: CIBERSEGURIDAD EN WINDOWS (cyber_win)
   Categorizado por Niveles: Básico, Intermedio y Avanzado
   Incluye laboratorios interactivos y ejemplos prácticos
======================================================== */

export const CYBER_WINDOWS = [
    // ==========================================
    // 🟢 NIVEL BÁSICO (Fundamentos y Conceptos)
    // ==========================================
    { 
        en: "Active Directory", 
        es: "Directorio Activo", 
        category: "cyber_win", 
        type: "teoria", 
        level: "basico",
        desc: "Servicio de directorio desarrollado por Microsoft para la gestión de identidades y recursos en redes corporativas, centralizando usuarios, equipos y políticas de seguridad (GPO).",
        examples: [
            "<strong>Caso de Uso Corporativo:</strong><br>Permite a los administradores de TI revocar el acceso de un empleado a toda la infraestructura de la empresa de forma simultánea con un solo clic, o forzar directivas de contraseñas complejas.",
            "<strong>Superficie de Ataque:</strong><br>Es el objetivo principal de los atacantes en entornos empresariales; comprometer el Controlador de Dominio (DC) significa tomar el control absoluto de toda la red."
        ]
    },
    { 
        en: "Ransomware (Volume Shadow Copies)", 
        es: "Secuestro de Datos y Copias de Sombra", 
        category: "cyber_win", 
        type: "teoria", 
        level: "basico",
        desc: "Tipo de malware que cifra los archivos del usuario en Windows y exige un rescate económico. Habitualmente busca destruir el servicio VSS para evitar que la víctima restaure sus datos.",
        examples: [
            "<strong>Mecánica del Ataque Común:</strong><br>Antes de comenzar el cifrado destructivo de los archivos locales, los binarios de Ransomware modernos ejecutan silenciosamente instrucciones nativas para purgar cualquier punto de restauración previo.",
            "<strong>Mitigación en Windows:</strong><br>Implementación de respaldos aislados bajo arquitecturas inmutables o fuera de línea (Offline), que no dependan del almacenamiento nativo del sistema operativo comprometido."
        ]
    },
    { 
        en: "User Account Control (UAC)", 
        es: "Control de Cuentas de Usuario", 
        category: "cyber_win", 
        type: "teoria", 
        level: "basico",
        desc: "Característica de seguridad de Windows que impide que aplicaciones realicen cambios no autorizados en el sistema de forma silenciosa, solicitando confirmación explícita o credenciales de administrador.",
       
    },
    { 
        en: "whoami /priv", 
        es: "Verificar Privilegios del Usuario Actual", 
        category: "cyber_win", 
        os: "windows",
        type: "comando", 
        level: "basico",
        desc: "Comando básico ejecutado en CMD o PowerShell que enumera los privilegios de seguridad asignados al token de acceso del usuario de la sesión actual.",
        examples: [
            "<strong>Ejemplo 1: Enumeración tras acceso inicial</strong><br><code>whoami /priv</code><br><small>Muestra el estado de privilegios críticos como 'SeDebugPrivilege' o 'SeImpersonatePrivilege' (clave para escalación).</small>",
            "<strong>Ejemplo 2: Obtener contexto completo del host</strong><br><code>whoami /all</code><br><small>Muestra simultáneamente el nombre de usuario, los SID del sistema y la pertenencia a grupos de seguridad.</small>"
        ]
    },

    // ==========================================
    // 🟡 NIVEL INTERMEDIO (Herramientas y Hardening)
    // ==========================================
    { 
        en: "Windows Defender (AMSI)", 
        es: "Interfaz de Proveedor de Antimalware", 
        category: "cyber_win", 
        type: "teoria", 
        level: "intermedio",
        desc: "Estándar de interfaz interactiva que permite a las aplicaciones de seguridad integrarse con el núcleo de Windows, analizando scripts ejecutados en PowerShell, VBScript y macros en tiempo de ejecución antes de ser procesados.",
       
    },
    { 
        en: "Get-NetIPConfiguration", 
        es: "Auditoría de Interfaces de Red", 
        category: "cyber_win", 
        os: "windows",
        type: "comando", 
        level: "intermedio",
        desc: "Cmdlet nativo de PowerShell avanzado diseñado para recopilar información detallada sobre la configuración IP de las interfaces de red de la máquina, incluyendo servidores DNS y puertas de enlace.",
        examples: [
            "<strong>Ejemplo 1: Obtener mapeo rápido de red</strong><br><code>Get-NetIPConfiguration</code><br><small>Alternativa moderna en PowerShell al clásico comando 'ipconfig' de CMD.</small>",
            "<strong>Ejemplo 2: Filtrar interfaces con IPs activas</strong><br><code>Get-NetIPAddress | Where-Object {$_.AddressState -eq 'Preferred'} | Select-Object IPAddress, InterfaceAlias</code>"
        ]
    },
    { 
        en: "Sysmon (System Monitor)", 
        es: "Monitoreo Avanzado del Sistema", 
        category: "cyber_win", 
        type: "teoria", 
        level: "intermedio",
        desc: "Servicio del sistema y controlador de dispositivo perteneciente a la suite Sysinternals que permanece residente para registrar de forma detallada la actividad en el visor de eventos (creación de procesos, conexiones de red, manipulación de memoria).",
       
    },
    { 
        en: "Get-Service | Where-Object", 
        es: "Auditoría y Mapeo de Servicios Activos", 
        category: "cyber_win", 
        os: "windows",
        type: "comando", 
        level: "intermedio",
        desc: "Comando de filtrado de canalización (pipeline) en PowerShell que permite listar y auditar de forma selectiva el estado de los servicios del sistema operativo para identificar software desactualizado o backdoors.",
        examples: [
            "<strong>Ejemplo 1: Buscar servicios vulnerables en ejecución</strong><br><code>Get-Service | Where-Object {$_.Status -eq 'Running'}</code>",
            "<strong>Ejemplo 2: Identificar servicios específicos de seguridad o antivirus</strong><br><code>Get-Service -Name *Windefend*,*sysmon*</code><br><small>Verifica rápidamente si las defensas nativas o de telemetría están activas en el equipo.</small>"
        ]
    },

    // ==========================================
    // 🔴 NIVEL AVANZADO (Auditoría, Exploits y Post-Explotación)
    // ==========================================
    { 
        en: "LSASS Memory Dumping", 
        es: "Vuelco de Memoria del Proceso LSASS", 
        category: "cyber_win", 
        type: "teoria", 
        level: "avanzado",
        desc: "Técnica de post-explotación crítica enfocada en extraer el volcado de memoria del proceso Servicio de Subsistema de Autoridad de Seguridad Local (lsass.exe), con la finalidad de extraer hashes NLM o credenciales en texto claro de usuarios logueados.",
       
    },
    { 
        en: "rundll32.exe comsvcs.dll", 
        es: "Extracción Silenciosa de Memoria de Procesos", 
        category: "cyber_win", 
        os: "windows",
        type: "comando", 
        level: "avanzado",
        desc: "Comando avanzado utilizado por atacantes y auditores de seguridad para realizar un volcado de memoria en disco de un proceso específico (frecuentemente LSASS), camuflando la acción bajo ejecutables legítimos del sistema.",
        examples: [
            "<strong>Ejemplo 1: Ejecución del volcado nativo (Requiere PID)</strong><br><code>rundll32.exe C:\\windows\\System32\\comsvcs.dll, MiniDump [PID_LSASS] C:\\Windows\\Tasks\\lsass.dmp full</code><br><small>Aprovecha la función 'MiniDump' exportada por la librería legítima comsvcs.dll para evadir firmas básicas de herramientas de hacking como Mimikatz.</small>",
            "<strong>Mitigación vía Telemetría:</strong><br>Monitorear reglas de comportamiento EDR que bloqueen cualquier intento de acceso directo de lectura sobre lsass.exe cuyo origen sea rundll32.exe."
        ]
    },
    { 
        en: "Kerberoasting", 
        es: "Ataque a Tickets de Servicio Kerberos", 
        category: "cyber_win", 
        type: "teoria", 
        level: "avanzado",
        desc: "Técnica de ciberseguridad ofensiva en entornos de Active Directory que permite a un usuario autenticado con privilegios mínimos solicitar tickets de servicio (TGS) para cualquier cuenta que tenga un Nombre de Principal de Servicio (SPN) registrado, con el fin de descifrarlos fuera de línea (Offline).",
      
    },
    { 
        en: "wevtutil cl", 
        es: "Limpieza del Visor de Eventos de Windows", 
        category: "cyber_win", 
        os: "windows",
        type: "comando", 
        level: "avanzado",
        desc: "Comando nativo de administración en Windows utilizado para borrar los registros (logs) de auditoría del sistema de manera selectiva o total. Utilizado en fases de ocultación de huellas (Anti-forensics).",
        examples: [
            "<strong>Ejemplo 1: Borrado absoluto del registro de Seguridad</strong><br><code>wevtutil cl Security</code><br><small>Elimina inmediatamente todas las alertas de inicios de sesión fallidos, ejecuciones y modificaciones previas.</small>",
            "<strong>Ejemplo 2: Borrado del registro de Sistema y PowerShell</strong><br><code>wevtutil cl System</code> y <code>wevtutil cl \"Windows PowerShell\"</code><br><small>Intento de cegar al analista SOC impidiendo la reconstrucción de la línea de tiempo de comandos lanzados.</small>"
        ]
    }
];
