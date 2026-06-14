/* ==========================================================================
   CONTROL DE CURSO: ACORDEÓN Y CAMBIO DINÁMICO DE CONTENIDO
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. INTERACCIÓN DEL ACORDEÓN (DESPLEGAR MÓDULOS) ---
    const moduleHeaders = document.querySelectorAll(".module-header");
    
    moduleHeaders.forEach(header => {
        header.addEventListener("click", () => {
            // Buscamos el contenedor padre (el módulo completo)
            const currentModule = header.parentElement;
            
            // OPCIONAL: Si quieres que al abrir un módulo se cierren los demás, deja estas líneas:
            document.querySelectorAll(".course-module").forEach(mod => {
                if (mod !== currentModule) {
                    mod.classList.remove("open");
                }
            });
            
            // Añade o quita la clase "open" para que el CSS cambie el max-height y rote la flecha
            currentModule.classList.toggle("open");
        });
    });

    // Abrir de manera automática el primer módulo ("Fundamentos") al cargar la página
    const firstModule = document.querySelector(".course-module");
    if (firstModule) {
        firstModule.classList.add("open");
    }

    // --- 2. CAMBIO DE PESTAÑAS (MOSTRAR CONTENIDO CENTRAL) ---
    const navLinks = document.querySelectorAll(".nav-target");
    const contentSections = document.querySelectorAll(".content-section");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Evita el salto brusco de página
            
            const targetId = link.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Desactivar todos los enlaces y secciones previas
                navLinks.forEach(item => item.classList.remove("active"));
                contentSections.forEach(section => section.classList.remove("active"));

                // Activar el nuevo enlace y su bloque de contenido
                link.classList.add("active");
                targetSection.classList.add("active");

                // Scroll suave si el usuario está en un dispositivo móvil
                if (window.innerWidth <= 1024) {
                    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });
});
