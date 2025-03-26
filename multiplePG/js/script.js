// Variables globales
let currentPage = 1;
const totalPages = 5;
let registros = JSON.parse(localStorage.getItem('registros')) || [];
let editingIndex = -1;
let currentData = {
    datosPersonales: {},
    familiares: [],
    condiciones: [],
    internamientos: []
};

// Elementos DOM
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const saveBtn = document.getElementById('saveBtn');
const progressBar = document.querySelector('.progress-bar');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Configurar botones de navegación
    prevBtn.addEventListener('click', goToPreviousPage);
    nextBtn.addEventListener('click', goToNextPage);
    saveBtn.addEventListener('click', saveData);

    // Configurar botones para agregar elementos
    document.getElementById('agregar-familiar').addEventListener('click', agregarFamiliar);
    document.getElementById('agregar-condicion').addEventListener('click', agregarCondicion);
    document.getElementById('agregar-internamiento').addEventListener('click', agregarInternamiento);

    // Cargar registros guardados
    cargarRegistros();
});

// Funciones de navegación
function goToPreviousPage() {
    if (currentPage > 1) {
        document.getElementById(`page${currentPage}`).style.display = 'none';
        currentPage--;
        document.getElementById(`page${currentPage}`).style.display = 'block';
        updateNavButtons();
    }
}

function goToNextPage() {
    if (currentPage < totalPages) {
        // Validar datos antes de avanzar
        if (currentPage === 1 && !validarDatosPersonales()) {
            return;
        }

        // Guardar datos de la página actual
        guardarDatosPagina();

        // Si vamos a la página de resumen, generarla
        if (currentPage === 4) {
            generarResumen();
        }

        document.getElementById(`page${currentPage}`).style.display = 'none';
        currentPage++;
        document.getElementById(`page${currentPage}`).style.display = 'block';
        updateNavButtons();
    }
}

function updateNavButtons() {
    // Actualizar barra de progreso
    const progress = (currentPage / totalPages) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `Página ${currentPage} de ${totalPages}`;

    // Mostrar/ocultar botones según la página actual
    prevBtn.style.display = currentPage > 1 ? 'block' : 'none';
    
    if (currentPage === totalPages) {
        nextBtn.style.display = 'none';
        saveBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        saveBtn.style.display = 'none';
    }
}

// Validación de datos
function validarDatosPersonales() {
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;

    if (!nombre || !edad || !direccion || !telefono || !email) {
        alert('Por favor complete todos los campos de datos personales');
        return false;
    }
    return true;
}

// Guardar datos de cada página
function guardarDatosPagina() {
    switch (currentPage) {
        case 1:
            currentData.datosPersonales = {
                nombre: document.getElementById('nombre').value,
                edad: document.getElementById('edad').value,
                direccion: document.getElementById('direccion').value,
                telefono: document.getElementById('telefono').value,
                email: document.getElementById('email').value
            };
            break;
        // Las otras páginas se guardan dinámicamente al agregar elementos
    }
}

// Funciones para agregar elementos
function agregarFamiliar() {
    const nombre = document.getElementById('familiar-nombre').value;
    const parentesco = document.getElementById('familiar-parentesco').value;
    const edad = document.getElementById('familiar-edad').value;

    if (!nombre || !parentesco || !edad) {
        alert('Por favor complete todos los campos del familiar');
        return;
    }

    const familiar = { nombre, parentesco, edad };
    currentData.familiares.push(familiar);

    // Limpiar campos
    document.getElementById('familiar-nombre').value = '';
    document.getElementById('familiar-parentesco').value = '';
    document.getElementById('familiar-edad').value = '';

    // Actualizar la lista de familiares
    actualizarListaFamiliares();
}

function actualizarListaFamiliares() {
    const container = document.getElementById('familiares-container');
    container.innerHTML = '';

    currentData.familiares.forEach((familiar, index) => {
        const familiarDiv = document.createElement('div');
        familiarDiv.className = 'familiar-item';
        familiarDiv.innerHTML = `
            <strong>${familiar.nombre}</strong> - ${familiar.parentesco}, ${familiar.edad} años
            <span class="delete-btn" onclick="eliminarFamiliar(${index})">❌</span>
            <span class="edit-btn" onclick="editarFamiliar(${index})">✏️</span>
        `;
        container.appendChild(familiarDiv);
    });
}

function eliminarFamiliar(index) {
    currentData.familiares.splice(index, 1);
    actualizarListaFamiliares();
}

function editarFamiliar(index) {
    const familiar = currentData.familiares[index];
    document.getElementById('familiar-nombre').value = familiar.nombre;
    document.getElementById('familiar-parentesco').value = familiar.parentesco;
    document.getElementById('familiar-edad').value = familiar.edad;
    
    // Eliminar el familiar para evitar duplicados
    eliminarFamiliar(index);
}

function agregarCondicion() {
    const enfermedad = document.getElementById('condicion-enfermedad').value;
    const tiempo = document.getElementById('condicion-tiempo').value;

    if (!enfermedad || !tiempo) {
        alert('Por favor complete todos los campos de la condición');
        return;
    }

    const condicion = { enfermedad, tiempo };
    currentData.condiciones.push(condicion);

    // Limpiar campos
    document.getElementById('condicion-enfermedad').value = '';
    document.getElementById('condicion-tiempo').value = '';

    // Actualizar la lista de condiciones
    actualizarListaCondiciones();
}

function actualizarListaCondiciones() {
    const container = document.getElementById('condiciones-container');
    container.innerHTML = '';

    currentData.condiciones.forEach((condicion, index) => {
        const condicionDiv = document.createElement('div');
        condicionDiv.className = 'condicion-item';
        condicionDiv.innerHTML = `
            <strong>${condicion.enfermedad}</strong> - ${condicion.tiempo} años
            <span class="delete-btn" onclick="eliminarCondicion(${index})">❌</span>
            <span class="edit-btn" onclick="editarCondicion(${index})">✏️</span>
        `;
        container.appendChild(condicionDiv);
    });
}

function eliminarCondicion(index) {
    currentData.condiciones.splice(index, 1);
    actualizarListaCondiciones();
}

function editarCondicion(index) {
    const condicion = currentData.condiciones[index];
    document.getElementById('condicion-enfermedad').value = condicion.enfermedad;
    document.getElementById('condicion-tiempo').value = condicion.tiempo;
    
    // Eliminar la condición para evitar duplicados
    eliminarCondicion(index);
}

function agregarInternamiento() {
    const fecha = document.getElementById('internamiento-fecha').value;
    const centro = document.getElementById('internamiento-centro').value;
    const diagnostico = document.getElementById('internamiento-diagnostico').value;

    if (!fecha || !centro || !diagnostico) {
        alert('Por favor complete todos los campos del internamiento');
        return;
    }

    const internamiento = { fecha, centro, diagnostico };
    currentData.internamientos.push(internamiento);

    // Limpiar campos
    document.getElementById('internamiento-fecha').value = '';
    document.getElementById('internamiento-centro').value = '';
    document.getElementById('internamiento-diagnostico').value = '';

    // Actualizar la lista de internamientos
    actualizarListaInternamientos();
}

function actualizarListaInternamientos() {
    const container = document.getElementById('internamientos-container');
    container.innerHTML = '';

    currentData.internamientos.forEach((internamiento, index) => {
        const internamientoDiv = document.createElement('div');
        internamientoDiv.className = 'internamiento-item';
        internamientoDiv.innerHTML = `
            <strong>Fecha:</strong> ${formatDate(internamiento.fecha)}<br>
            <strong>Centro:</strong> ${internamiento.centro}<br>
            <strong>Diagnóstico:</strong> ${internamiento.diagnostico}
            <span class="delete-btn" onclick="eliminarInternamiento(${index})">❌</span>
            <span class="edit-btn" onclick="editarInternamiento(${index})">✏️</span>
        `;
        container.appendChild(internamientoDiv);
    });
}

function eliminarInternamiento(index) {
    currentData.internamientos.splice(index, 1);
    actualizarListaInternamientos();
}

function editarInternamiento(index) {
    const internamiento = currentData.internamientos[index];
    document.getElementById('internamiento-fecha').value = internamiento.fecha;
    document.getElementById('internamiento-centro').value = internamiento.centro;
    document.getElementById('internamiento-diagnostico').value = internamiento.diagnostico;
    
    // Eliminar el internamiento para evitar duplicados
    eliminarInternamiento(index);
}

// Generar resumen para la página 5
function generarResumen() {
    const container = document.getElementById('resumen-container');
    container.innerHTML = '';

    // Datos personales
    const datosPersonalesDiv = document.createElement('div');
    datosPersonalesDiv.className = 'resumen-seccion';
    datosPersonalesDiv.innerHTML = `
        <h4>Datos Personales</h4>
        <div class="resumen-item"><strong>Nombre:</strong> ${currentData.datosPersonales.nombre}</div>
        <div class="resumen-item"><strong>Edad:</strong> ${currentData.datosPersonales.edad}</div>
        <div class="resumen-item"><strong>Dirección:</strong> ${currentData.datosPersonales.direccion}</div>
        <div class="resumen-item"><strong>Teléfono:</strong> ${currentData.datosPersonales.telefono}</div>
        <div class="resumen-item"><strong>Email:</strong> ${currentData.datosPersonales.email}</div>
    `;
    container.appendChild(datosPersonalesDiv);

    // Familiares
    const familiaresDiv = document.createElement('div');
    familiaresDiv.className = 'resumen-seccion';
    let familiaresHTML = '<h4>Familiares</h4>';
    
    if (currentData.familiares.length === 0) {
        familiaresHTML += '<div class="resumen-item">No se han registrado familiares</div>';
    } else {
        currentData.familiares.forEach(familiar => {
            familiaresHTML += `
                <div class="resumen-item">
                    <strong>${familiar.nombre}</strong> - ${familiar.parentesco}, ${familiar.edad} años
                </div>
            `;
        });
    }
    
    familiaresDiv.innerHTML = familiaresHTML;
    container.appendChild(familiaresDiv);

    // Condiciones
    const condicionesDiv = document.createElement('div');
    condicionesDiv.className = 'resumen-seccion';
    let condicionesHTML = '<h4>Condiciones Pre-Existentes</h4>';
    
    if (currentData.condiciones.length === 0) {
        condicionesHTML += '<div class="resumen-item">No se han registrado condiciones pre-existentes</div>';
    } else {
        currentData.condiciones.forEach(condicion => {
            condicionesHTML += `
                <div class="resumen-item">
                    <strong>${condicion.enfermedad}</strong> - ${condicion.tiempo} años
                </div>
            `;
        });
    }
    
    condicionesDiv.innerHTML = condicionesHTML;
    container.appendChild(condicionesDiv);

    // Internamientos
    const internamientosDiv = document.createElement('div');
    internamientosDiv.className = 'resumen-seccion';
    let internamientosHTML = '<h4>Internamientos</h4>';
    
    if (currentData.internamientos.length === 0) {
        internamientosHTML += '<div class="resumen-item">No se han registrado internamientos</div>';
    } else {
        currentData.internamientos.forEach(internamiento => {
            internamientosHTML += `
                <div class="resumen-item">
                    <strong>Fecha:</strong> ${formatDate(internamiento.fecha)}<br>
                    <strong>Centro:</strong> ${internamiento.centro}<br>
                    <strong>Diagnóstico:</strong> ${internamiento.diagnostico}
                </div>
            `;
        });
    }
    
    internamientosDiv.innerHTML = internamientosHTML;
    container.appendChild(internamientosDiv);
}

// Guardar datos completos
function saveData() {
    if (editingIndex >= 0) {
        // Estamos editando un registro existente
        registros[editingIndex] = { ...currentData };
    } else {
        // Nuevo registro
        registros.push({ ...currentData });
    }
    
    // Guardar en localStorage
    localStorage.setItem('registros', JSON.stringify(registros));
    
    // Actualizar tabla de registros
    cargarRegistros();
    
    // Reiniciar formulario
    resetForm();
    
    alert('Datos guardados correctamente');
}

// Cargar registros guardados
function cargarRegistros() {
    const tbody = document.getElementById('registros-body');
    tbody.innerHTML = '';

    registros.forEach((registro, index) => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${registro.datosPersonales.nombre}</td>
            <td>${registro.datosPersonales.edad}</td>
            <td>${registro.familiares.length}</td>
            <td>${registro.condiciones.length}</td>
            <td>${registro.internamientos.length}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarRegistro(${index})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarRegistro(${index})">Eliminar</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Editar registro existente
function editarRegistro(index) {
    editingIndex = index;
    currentData = { ...registros[index] };
    
    // Cargar datos personales
    document.getElementById('nombre').value = currentData.datosPersonales.nombre;
    document.getElementById('edad').value = currentData.datosPersonales.edad;
    document.getElementById('direccion').value = currentData.datosPersonales.direccion;
    document.getElementById('telefono').value = currentData.datosPersonales.telefono;
    document.getElementById('email').value = currentData.datosPersonales.email;
    
    // Actualizar listas
    actualizarListaFamiliares();
    actualizarListaCondiciones();
    actualizarListaInternamientos();
    
    // Ir a la primera página
    document.getElementById(`page${currentPage}`).style.display = 'none';
    currentPage = 1;
    document.getElementById(`page${currentPage}`).style.display = 'block';
    updateNavButtons();
    
    alert('Editando registro. Complete los cambios y guarde al final.');
}

// Eliminar registro
function eliminarRegistro(index) {
    if (confirm('¿Está seguro de eliminar este registro?')) {
        registros.splice(index, 1);
        localStorage.setItem('registros', JSON.stringify(registros));
        cargarRegistros();
        alert('Registro eliminado correctamente');
    }
}

// Reiniciar formulario
function resetForm() {
    // Limpiar datos actuales
    currentData = {
        datosPersonales: {},
        familiares: [],
        condiciones: [],
        internamientos: []
    };
    
    // Limpiar campos de datos personales
    document.getElementById('nombre').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('email').value = '';
    
    // Limpiar listas
    document.getElementById('familiares-container').innerHTML = '';
    document.getElementById('condiciones-container').innerHTML = '';
    document.getElementById('internamientos-container').innerHTML = '';
    
    // Volver a la primera página
    document.getElementById(`page${currentPage}`).style.display = 'none';
    currentPage = 1;
    document.getElementById(`page${currentPage}`).style.display = 'block';
    updateNavButtons();
    
    // Reiniciar modo de edición
    editingIndex = -1;
}

// Función de utilidad para formatear fechas
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
}