/* ========================================================
   UNDERCODE - CORE ENGINE (FRONTEND)
======================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ===================================
    //  1. MENU SIDEBAR RESPONSIVE & OVERLAY
    // ===================================
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav");
    const menuOverlay = document.getElementById("menu-overlay");

    if (menuToggle && navMenu && menuOverlay) {
        
        const toggleMenu = () => {
            navMenu.classList.toggle("active");
            menuOverlay.classList.toggle("active");
            
            // Cambia el icono de la hamburguesa a una 'X'
            if (navMenu.classList.contains("active")) {
                menuToggle.textContent = "✕";
                menuToggle.style.color = "#ff0000";
            } else {
                menuToggle.textContent = "☰";
                menuToggle.style.color = ""; 
            }
        };

        // Eventos para abrir/cerrar
        menuToggle.addEventListener("click", toggleMenu);
        menuOverlay.addEventListener("click", toggleMenu);

        // Cerrar menú al hacer clic en un enlace (Móviles)
        const navLinks = document.querySelectorAll("nav a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove("active");
                    menuOverlay.classList.remove("active");
                    menuToggle.textContent = "☰";
                    menuToggle.style.color = "";
                }
            });
        });
    }

    // ===================================
    //  2. CONTADORES ANIMADOS (SECCIÓN STATS)
    // ===================================
    const counters = document.querySelectorAll(".counter");
    
    if (counters.length > 0) {
        counters.forEach(counter => {
            const target = Number(counter.getAttribute("data-target")) || 0;
            let current = 0;
            const increment = target / 100;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }

    // ===================================
    //  3. TERMINAL INTERACTIVA
    // ===================================
    const commandInput = document.getElementById("commandInput");
    const terminalOutput = document.getElementById("terminal-output");

    if (commandInput && terminalOutput) {
        commandInput.addEventListener("keydown", function (e) {
            if (e.key !== "Enter") return;

            const command = commandInput.value.trim().toLowerCase();
            let response = "";

            switch (command) {
                case "help":
                    response = "Comandos disponibles:<br><br>help - Mostrar ayuda<br>whoami - Información del usuario<br>clear - Limpiar terminal<br>nmap - Simular escaneo<br>linux - Temas Linux<br>redes - Temas Redes<br>cyber - Temas Ciberseguridad<br>security+ - Certificación Security+";
                    break;
                case "whoami":
                    response = "Estudiante de Cyber Academy";
                    break;
                case "nmap":
                    response = "Starting Nmap 7.95<br><br>22/tcp open ssh<br>80/tcp open http<br>443/tcp open https<br><br>Scan completed.";
                    break;
                case "linux":
                    response = "Temas Linux:<br><br>- Bash<br>- Usuarios<br>- Permisos<br>- Networking<br>- Systemd";
                    break;
                case "redes":
                    response = "Temas Redes:<br><br>- OSI<br>- TCP/IP<br>- DNS<br>- DHCP<br>- VLANs";
                    break;
                case "cyber":
                    response = "Temas Ciberseguridad:<br><br>- Reconocimiento<br>- Enumeración<br>- Escaneo<br>- Criptografía<br>- Pentesting";
                    break;
                case "security+":
                    response = "CompTIA Security+ SY0-701<br><br>Dominio 1 - Conceptos Generales<br>Dominio 2 - Amenazas<br>Dominio 3 - Arquitectura<br>Dominio 4 - Operaciones<br>Dominio 5 - Programa de Seguridad";
                    break;
                case "clear":
                    terminalOutput.innerHTML = "";
                    commandInput.value = "";
                    return;
                case "":
                    return;
                default:
                    response = `Comando no reconocido: ${command}`;
            }

            terminalOutput.innerHTML += `<p><span style="color:#ff0000">root@cyberacademy:~$</span> ${command}</p><p>${response}</p><br>`;
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            commandInput.value = "";
        });
    }

    // ===================================
    //  4. REVELAR ELEMENTOS (SCROLL)
    // ===================================
    const revealCards = document.querySelectorAll(".card, .stat-box, .roadmap-card, .module-card");

    if (revealCards.length > 0) {
        revealCards.forEach(card => {
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            card.style.transition = "all 0.6s ease";
        });

        const revealElements = () => {
            revealCards.forEach(card => {
                const position = card.getBoundingClientRect().top;
                const visible = window.innerHeight - 100;
                if (position < visible) {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }
            });
        };

        window.addEventListener("scroll", revealElements);
        revealElements(); // Ejecución inicial
    }

    // ===================================
    //  5. BOTON VOLVER ARRIBA
    // ===================================
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                backToTop.style.display = "flex";
            } else {
                backToTop.style.display = "none";
            }
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ===================================
    //  6. RESALTAR PAGINA ACTUAL
    // ===================================
    const currentPage = location.pathname.split("/").pop();
    const globalNavLinks = document.querySelectorAll("nav a");

    if (currentPage && globalNavLinks.length > 0) {
        globalNavLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (href && href.includes(currentPage)) {
                link.classList.add("active-link");
            }
        });
    }
});
