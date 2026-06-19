// Importación de las bases de datos externas
import { CYBER_DATA } from './data/linux/cyberdata.js';
import { NETWORKING_DATA } from './data/linux/networkingdata.js';
import { OS_DATA } from './data/linux/osdata.js';

import { CYBER_WINDOWS } from './data/windows/cyberwindows.js';
import { NETWORKING_WINDOWS } from './data/windows/networkingwindows.js';
import { OS_DATAWINDOWS } from './data/windows/oswindows.js';

const DICCIONARIO_TERMINOS = [
    ...CYBER_DATA, 
    ...NETWORKING_DATA, 
    ...OS_DATA,
    ...CYBER_WINDOWS,
    ...NETWORKING_WINDOWS,
    ...OS_DATAWINDOWS
];

console.log("🛠️ UNDERCODE: Base de datos cargada. Total ítems:", DICCIONARIO_TERMINOS.length);

document.addEventListener("DOMContentLoaded", () => {
    const librarySearch = document.getElementById("librarySearch");
    const libraryResults = document.getElementById("libraryResults");
    const filterButtons = document.querySelectorAll(".filter-btn");
    
    let categoriaSeleccionada = "all"; 

    if (libraryResults) {
        procesarYFiltrar();
        
        // DELEGACIÓN DE EVENTOS PARA CAPTURAR CLICS EN TARJETAS INTERACTIVAS
        libraryResults.addEventListener("click", (e) => {
            const cardInteractiva = e.target.closest(".def-card.interactiva");
            if (!cardInteractiva) return;

            const indexData = cardInteractiva.getAttribute("data-index");

            if (indexData !== null) {
                const itemDefinido = DICCIONARIO_TERMINOS.find(term => term.en === indexData);

                if (itemDefinido) {
                    desvelarModalEjemplos(itemDefinido);
                } else {
                    console.error("❌ ERROR: El 'data-index' no coincide con ningún término de la BD.");
                }
            }
        });
    }

    if (librarySearch) {
        librarySearch.addEventListener("input", () => procesarYFiltrar());
    }

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            categoriaSeleccionada = btn.getAttribute("data-filter");
            procesarYFiltrar();
        });
    });

    function procesarYFiltrar() {
        if (!libraryResults) return;
        const rawQuery = librarySearch ? librarySearch.value.trim() : "";
        let listaFiltrada = DICCIONARIO_TERMINOS;

        if (categoriaSeleccionada !== "all") {
            if (["linux", "windows", "macos"].includes(categoriaSeleccionada)) {
                listaFiltrada = DICCIONARIO_TERMINOS.filter(item => 
                    item.os === categoriaSeleccionada || 
                    (item.category === "os" && 
                     (item.en.toLowerCase().includes(categoriaSeleccionada) || 
                      item.desc.toLowerCase().includes(categoriaSeleccionada)))
                );
            } else {
                listaFiltrada = DICCIONARIO_TERMINOS.filter(item => item.category === "cyber");
            }
        }

        if (rawQuery !== "") {
            if (rawQuery.includes(":")) {
                const segmentos = rawQuery.split(":").map(s => s.trim().toLowerCase());
                let requiereComandos = false;
                let sistemaOperativoTarget = "";
                let conceptoTarget = "";
                let indexInicio = 0;

                if (segmentos[0] === "comando" || segmentos[0] === "comandos") {
                    requiereComandos = true;
                    indexInicio = 1; 
                }

                for (let i = indexInicio; i < segmentos.length; i++) {
                    const seg = segmentos[i];
                    if (["linux", "windows", "macos"].includes(seg)) {
                        sistemaOperativoTarget = seg;
                    } else if (seg !== "") {
                        conceptoTarget = seg;
                    }
                }

                if (requiereComandos) {
                    listaFiltrada = listaFiltrada.filter(item => item.type === "comando");
                } else {
                    listaFiltrada = listaFiltrada.filter(item => item.type === "teoria");
                }

                if (sistemaOperativoTarget !== "") {
                    listaFiltrada = listaFiltrada.filter(item => 
                        item.os === sistemaOperativoTarget || 
                        (item.category === "os" &&
                         (item.en.toLowerCase().includes(sistemaOperativoTarget) || item.desc.toLowerCase().includes(sistemaOperativoTarget)))
                    );
                }

                if (conceptoTarget !== "") {
                    listaFiltrada = listaFiltrada.filter(item => {
                        const enText = item.en.toLowerCase();
                        const esText = item.es.toLowerCase();
                        const descText = item.desc.toLowerCase();

                        if (["networking", "redes", "red"].includes(conceptoTarget)) {
                            return descText.includes("red") || descText.includes("networking") || item.category === "networking";
                        }
                        if (["cyber", "ciberseguridad", "seguridad", "hardening"].includes(conceptoTarget)) {
                            return descText.includes("seguridad") || descText.includes("cyber") || descText.includes("hardening") || item.category === "cyber";
                        }
                        return enText.includes(conceptoTarget) || esText.includes(conceptoTarget) || descText.includes(conceptoTarget);
                    });
                }
            } else {
                const queryNormal = rawQuery.toLowerCase();
                listaFiltrada = listaFiltrada.filter(item => 
                    item.en.toLowerCase().includes(queryNormal) ||
                    item.es.toLowerCase().includes(queryNormal) ||
                    item.desc.toLowerCase().includes(queryNormal)
                );
            }
        }
        mostrarTerminos(listaFiltrada);
    }

    function mostrarTerminos(lista) {
        libraryResults.innerHTML = "";
        if (lista.length === 0) {
            libraryResults.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #444444; font-family: monospace; padding: 50px 0;"><p style="color:#ffffff; font-size:1.1rem;">ERROR: NO_MATCHES_FOUND</p></div>`;
            return;
        }

        lista.forEach((item, index) => {
            const card = document.createElement("div");
            let claseEstilo = item.category;
            
            if (item.category === "os" || item.os) {
                const osIdentificado = item.os || (item.en.toLowerCase().includes("windows") ? "windows" : item.en.toLowerCase().includes("mac") ? "macos" : "linux");
                if (osIdentificado === "windows") claseEstilo = "os windows-card";
                else if (osIdentificado === "macos") claseEstilo = "os macos-card";
                else claseEstilo = "os linux-card";
            }

            const tieneEjemplos = item.examples && item.examples.length > 0;
            card.className = `def-card ${claseEstilo} ${tieneEjemplos ? 'interactiva' : ''}`;
            card.style.animationDelay = `${index * 0.04}s`;
            
            if (tieneEjemplos) {
                card.setAttribute("data-index", item.en);
                card.setAttribute("title", "Haz clic para ver laboratorios");
            }

            let tagMostrado = item.category;
            if (item.category === "os" || item.os) {
                tagMostrado = item.os || (item.en.toLowerCase().includes("windows") ? "windows" : item.en.toLowerCase().includes("mac") ? "macOS" : "linux");
            }

            card.innerHTML = `
                <h3>${item.en} <span class="def-tag">${tagMostrado}</span></h3>
                <div class="es-title">${item.es}</div>
                <p>${item.desc}</p>
                ${tieneEjemplos ? '<div class="click-prompt"><i class="fas fa-eye"></i> Ver ejemplos</div>' : ''}
            `;
            libraryResults.appendChild(card);
        });
    }

    // GENERADOR DINÁMICO DEL MODAL FLOTANTE (SISTEMA DE ASIGNACIÓN GLOBAL)
    function desvelarModalEjemplos(item) {
        // 1. Limpiar cualquier instancia huérfana previa en el DOM global
        const modalPrevio = document.getElementById("uc-modal-contextual");
        if (modalPrevio) modalPrevio.remove();

        // 2. Instanciar el contenedor raíz del overlay
        const modalOverlay = document.createElement("div");
        modalOverlay.id = "uc-modal-contextual";
        modalOverlay.className = "uc-modal-overlay";

        // 3. Estructurar la UI interna del modal terminal
        modalOverlay.innerHTML = `
            <div class="uc-modal-card animate-modal">
                <div class="uc-modal-header">
                    <h2><i class="fas fa-terminal"></i> Ejemplos Practicos: ${item.en}</h2>
                    <span class="uc-modal-close">&times;</span>
                </div>
                <div class="uc-modal-body">
                    <p class="uc-modal-target-desc"><strong>Definición:</strong> ${item.desc}</p>
                    <h3><i class="fas fa-code-branch"></i> Despliegue de Casos de Uso:</h3>
                    <div class="uc-modal-examples-list" id="uc-modal-entries"></div>
                </div>
            </div>
        `;

        // 4. Inyectar los nodos de ejemplo
        const listaContenedora = modalOverlay.querySelector("#uc-modal-entries");
        item.examples.forEach(ej => {
            const itemEjemplo = document.createElement("div");
            itemEjemplo.className = "uc-modal-example-item";
            itemEjemplo.innerHTML = ej; 
            listaContenedora.appendChild(itemEjemplo);
        });

        // 5. Manejador de cierre con desvanecimiento controlado
        const cerrarModal = () => {
            modalOverlay.classList.add("fade-out");
            setTimeout(() => modalOverlay.remove(), 200);
        };

        modalOverlay.querySelector(".uc-modal-close").addEventListener("click", cerrarModal);
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) cerrarModal();
        });

        // 6. Inyección directa en la raíz del Body (Bypassea contextos heredados o bloqueos de contenedores)
        document.body.appendChild(modalOverlay);
    }
});

