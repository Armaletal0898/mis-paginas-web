
/* ===================================
   MENU SIDEBAR RESPONSIVE
=================================== */

const menuToggle =
    document.querySelector(".menu-toggle");

const nav =
    document.querySelector("nav");

const overlay =
    document.getElementById(
        "menu-overlay"
    );

if (menuToggle && nav) {

    menuToggle.addEventListener(
        "click",
        () => {

            nav.classList.toggle(
                "active"
            );

            if (overlay) {

                overlay.classList.toggle(
                    "active"
                );
            }
        }
    );
}

/* ===================================
   CERRAR MENU CON OVERLAY
=================================== */

if (overlay) {

    overlay.addEventListener(
        "click",
        () => {

            nav.classList.remove(
                "active"
            );

            overlay.classList.remove(
                "active"
            );
        }
    );
}

/* ===================================
   CERRAR MENU AL NAVEGAR
=================================== */

document
.querySelectorAll("nav a")
.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            if (
                window.innerWidth <= 768
            ) {

                nav.classList.remove(
                    "active"
                );

                if (overlay) {

                    overlay.classList.remove(
                        "active"
                    );
                }
            }
        }
    );
});

/* ===================================
   CONTADORES ANIMADOS
=================================== */

const counters =
    document.querySelectorAll(".counter");

counters.forEach(counter => {

    const target =
        Number(
            counter.getAttribute(
                "data-target"
            )
        );

    let current = 0;

    const increment =
        target / 100;

    const updateCounter = () => {

        if (current < target) {

            current += increment;

            counter.innerText =
                Math.ceil(current);

            requestAnimationFrame(
                updateCounter
            );

        } else {

            counter.innerText =
                target;
        }
    };

    updateCounter();
});

/* ===================================
   TERMINAL INTERACTIVA
=================================== */

const commandInput =
    document.getElementById(
        "commandInput"
    );

const terminalOutput =
    document.getElementById(
        "terminal-output"
    );

if (
    commandInput &&
    terminalOutput
) {

    commandInput.addEventListener(
        "keydown",
        function (e) {

            if (e.key !== "Enter") {
                return;
            }

            const command =
                commandInput.value
                    .trim()
                    .toLowerCase();

            let response = "";

            switch (command) {

                case "help":

                    response = `
Comandos disponibles:<br><br>

help - Mostrar ayuda<br>
whoami - Información del usuario<br>
clear - Limpiar terminal<br>
nmap - Simular escaneo<br>
linux - Temas Linux<br>
redes - Temas Redes<br>
cyber - Temas Ciberseguridad<br>
security+ - Certificación Security+
                    `;
                    break;

                case "whoami":

                    response =
                        "Estudiante de Cyber Academy";
                    break;

                case "nmap":

                    response = `
Starting Nmap 7.95<br><br>

22/tcp open ssh<br>
80/tcp open http<br>
443/tcp open https<br><br>

Scan completed.
                    `;
                    break;

                case "linux":

                    response = `
Temas Linux:<br><br>

- Bash<br>
- Usuarios<br>
- Permisos<br>
- Networking<br>
- Systemd
                    `;
                    break;

                case "redes":

                    response = `
Temas Redes:<br><br>

- OSI<br>
- TCP/IP<br>
- DNS<br>
- DHCP<br>
- VLANs
                    `;
                    break;

                case "cyber":

                    response = `
Temas Ciberseguridad:<br><br>

- Reconocimiento<br>
- Enumeración<br>
- Escaneo<br>
- Criptografía<br>
- Pentesting
                    `;
                    break;

                case "security+":

                    response = `
CompTIA Security+ SY0-701<br><br>

Dominio 1 - Conceptos Generales<br>
Dominio 2 - Amenazas<br>
Dominio 3 - Arquitectura<br>
Dominio 4 - Operaciones<br>
Dominio 5 - Programa de Seguridad
                    `;
                    break;

                case "clear":

                    terminalOutput.innerHTML = "";

                    commandInput.value = "";

                    return;

                case "":

                    return;

                default:

                    response =
                        `Comando no reconocido: ${command}`;
            }

            terminalOutput.innerHTML += `
                <p>
                    <span style="color:#ff0000">
                    root@cyberacademy:~$
                    </span>
                    ${command}
                </p>

                <p>
                    ${response}
                </p>
                <br>
            `;

            terminalOutput.scrollTop =
                terminalOutput.scrollHeight;

            commandInput.value = "";
        }
    );
}

/* ===================================
   REVELAR ELEMENTOS
=================================== */

const revealCards =
    document.querySelectorAll(
        ".card, .stat-box, .roadmap-card, .module-card"
    );

revealCards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(30px)";

    card.style.transition =
        "all 0.6s ease";
});

function revealElements() {

    revealCards.forEach(card => {

        const position =
            card.getBoundingClientRect().top;

        const visible =
            window.innerHeight - 100;

        if (position < visible) {

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0)";
        }
    });
}

window.addEventListener(
    "scroll",
    revealElements
);

revealElements();

/* ===================================
   BOTON VOLVER ARRIBA
=================================== */

const backToTop =
    document.getElementById(
        "backToTop"
    );

if (backToTop) {

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 500
            ) {

                backToTop.style.display =
                    "flex";

            } else {

                backToTop.style.display =
                    "none";
            }
        }
    );

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"
            });

        }
    );
}

/* ===================================
   RESALTAR PAGINA ACTUAL
=================================== */

const currentPage =
    location.pathname
        .split("/")
        .pop();

const navLinks =
    document.querySelectorAll(
        "nav a"
    );

navLinks.forEach(link => {

    const href =
        link.getAttribute("href");

    if (
        href &&
        href.includes(currentPage)
    ) {

        link.classList.add(
            "active-link"
        );
    }
});

/* ===================================
   BUSCADOR GLOBAL MEJORADO
=================================== */

const searchInput =
    document.getElementById(
        "globalSearch"
    );

const searchResults =
    document.getElementById(
        "searchResults"
    );

const pages = [

    {
        title: "Ciberseguridad",
        keywords: [
            "ciberseguridad",
            "seguridad",
            "osint",
            "pentesting",
            "criptografia",
            "nmap",
            "vulnerabilidades",
            "enumeracion",
            "reconocimiento"
        ],
        url: "pages/cybersecurity.html"
    },

    {
        title: "Redes",
        keywords: [
            "redes",
            "ccna",
            "tcp",
            "ip",
            "tcp/ip",
            "dns",
            "dhcp",
            "vlan",
            "vpn",
            "routing",
            "switching",
            "firewall"
        ],
        url: "pages/networking.html"
    },

    {
        title: "Linux",
        keywords: [
            "linux",
            "bash",
            "ubuntu",
            "debian",
            "arch",
            "kali",
            "shell",
            "systemd",
            "usuarios",
            "permisos"
        ],
        url: "pages/linux.html"
    },

    {
        title: "Windows",
        keywords: [
            "windows",
            "powershell",
            "active directory",
            "registro",
            "internals",
            "servicios",
            "usuarios"
        ],
        url: "pages/windows.html"
    },

    {
        title: "MacOS",
        keywords: [
            "macos",
            "apple",
            "apfs",
            "gatekeeper",
            "filevault",
            "launchd",
            "terminal"
        ],
        url: "pages/macos.html"
    },

    {
        title: "Laboratorios",
        keywords: [
            "labs",
            "laboratorios",
            "practicas"
        ],
        url: "pages/labs.html"
    },

    {
        title: "Security+",
        keywords: [
            "security+",
            "comptia",
            "sy0-701"
        ],
        url: "pages/securityplus/securityplus.html"
    }

];

if (
    searchInput &&
    searchResults
) {

    searchInput.addEventListener(
        "input",
        () => {

            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();

            searchResults.innerHTML = "";

            if (!query) {

                searchResults.style.display =
                    "none";

                return;
            }

            const matches =
                pages.filter(page =>

                    page.title
                        .toLowerCase()
                        .includes(query)

                    ||

                    page.keywords.some(
                        keyword =>
                            keyword.includes(query)
                    )
                );

            if (
                matches.length === 0
            ) {

                searchResults.style.display =
                    "none";

                return;
            }

            matches.forEach(page => {

                const item =
                    document.createElement(
                        "a"
                    );

                item.className =
                    "search-item";

                item.href =
                    page.url;

                item.textContent =
                    page.title;

                searchResults.appendChild(
                    item
                );
            });

            searchResults.style.display =
                "block";
        }
    );

    document.addEventListener(
        "click",
        event => {

            if (
                !searchInput.contains(
                    event.target
                )
                &&
                !searchResults.contains(
                    event.target
                )
            ) {

                searchResults.style.display =
                    "none";
            }
        }
    );
}


/* ===================================
               ANIMACIONES
=================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. CONTROL DEL MENÚ DESPLEGABLE (MÓVIL)
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("header nav");
    const menuOverlay = document.getElementById("menu-overlay");

    // Función para alternar el estado del menú
    const toggleMenu = () => {
        navMenu.classList.toggle("active");
        menuOverlay.classList.toggle("active");
        
        // Cambia el icono de la hamburguesa a una 'X' con una animación sutil
        if (navMenu.classList.contains("active")) {
            menuToggle.textContent = "✕";
            menuToggle.style.color = "#ff0000";
        } else {
            menuToggle.textContent = "☰";
            menuToggle.style.color = ""; // Vuelve al color original
        }
    };

    // Asignación de eventos para el menú móvil
    if (menuToggle && navMenu && menuOverlay) {
        menuToggle.addEventListener("click", toggleMenu);
        
        // Cerrar el menú si el usuario da un clic al overlay (fuera del menú)
        menuOverlay.addEventListener("click", toggleMenu);
    }

    // 2. ANIMACIÓN DE ENTRADA EN CASCADA PARA EL HERO
    try {
        const heroSection = document.querySelector(".hero");
        if (heroSection) {
            // Un retraso de 100ms garantiza que el DOM esté renderizado por completo
            setTimeout(() => {
                heroSection.classList.add("loaded");
            }, 100);
        }
    } catch (error) {
        console.error("UnderCode Debug [Hero Animation Error]:", error);
    }
});
