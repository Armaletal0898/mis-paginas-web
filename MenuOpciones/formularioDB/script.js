// Cuando el documento esté completamente cargado, se llama a la función para cargar los registros existentes
document.addEventListener('DOMContentLoaded', cargarRegistros);

// Función para obtener y mostrar los registros desde el backend
function cargarRegistros() {
    fetch('/backend/api.php')
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector('#registrosTable tbody');
            tbody.innerHTML = '';
            data.forEach(reg => {
                // Escapar comillas y saltos de línea para los data-attributes
                const safe = str => (str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\r?\n/g, ' ');
                tbody.innerHTML += `
                    <tr 
                        data-id="${reg.id}" 
                        data-nombre="${safe(reg.nombre)}" 
                        data-apellido="${safe(reg.apellido)}" 
                        data-email="${safe(reg.email)}" 
                        data-contacto="${safe(reg.contacto)}"
                        data-fecha_nacimiento="${safe(reg.fecha_nacimiento)}"
                        data-direccion="${safe(reg.direccion)}"
                        data-genero="${safe(reg.genero)}"
                        data-comentarios="${safe(reg.comentarios)}"
                    >
                        <td>${reg.id}</td>
                        <td>${reg.nombre}</td>
                        <td>${reg.apellido}</td>
                        <td>${reg.email}</td>
                        <td>${reg.contacto || ''}</td>
                        <td>${reg.fecha_nacimiento || ''}</td>
                        <td>${reg.direccion || ''}</td>
                        <td>${reg.genero || ''}</td>
                        <td>${reg.comentarios || ''}</td>
                        <td>
                            <button class="editar-btn" type="button">Editar</button>
                            <button class="borrar-btn" type="button">Borrar</button>
                        </td>
                    </tr>
                `;
            });

            // Asigna eventos a los botones de editar
            tbody.querySelectorAll('.editar-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const tr = this.closest('tr');
                    document.getElementById('id').value = tr.dataset.id;
                    document.getElementById('nombre').value = tr.dataset.nombre;
                    document.getElementById('apellido').value = tr.dataset.apellido;
                    document.getElementById('email').value = tr.dataset.email;
                    document.getElementById('contacto').value = tr.dataset.contacto;
                    document.getElementById('fecha_nacimiento').value = tr.dataset.fecha_nacimiento; 
                    document.getElementById('direccion').value = tr.dataset.direccion;
                    document.getElementById('genero').value = tr.dataset.genero;
                    document.getElementById('comentarios').value = tr.dataset.comentarios;
                });
            });

            // Asigna eventos a los botones de borrar
            tbody.querySelectorAll('.borrar-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const tr = this.closest('tr');
                    const id = tr.dataset.id;
                    if (confirm('¿Seguro que deseas borrar este registro?')) {
                        const formData = new FormData();
                        formData.append('id', id);
                        formData.append('action', 'delete');
                        fetch('/backend/api.php', {
                            method: 'POST',
                            body: formData
                        })
                        .then(res => res.json())
                        .then(data => {
                            cargarRegistros();
                        });
                    }
                });
            });
        });
}

// Maneja el evento de envío del formulario para guardar o actualizar un registro
document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Validar que la fecha no esté vacía
    const fecha = document.getElementById('fecha_nacimiento').value;
    if (!fecha) {
        document.getElementById('mensaje').textContent = 'Por favor, selecciona una fecha de nacimiento.';
        return;
    }
    const formData = new FormData(this);
    fetch('/backend/api.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success === false && data.error) {
            document.getElementById('mensaje').textContent = data.error; // Muestra el mensaje de error en el formulario
            return; // ¡No limpiar el formulario!
        }
        document.getElementById('mensaje').textContent = ''; // Limpia el mensaje si todo salió bien
        this.reset();
        document.getElementById('id').value = ''; // Limpia el campo id
        cargarRegistros();
    })
    .catch(error => {
        document.getElementById('mensaje').textContent = 'Error de conexión o del servidor.';
        // No limpiar el formulario en caso de error
    });
});

// Función para borrar un registro por su ID (usa POST, nunca DELETE)
window.borrarRegistro = function(id) {
    if (confirm('¿Seguro que deseas borrar este registro?')) {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('action', 'delete');
        fetch('/backend/api.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            cargarRegistros();
        });
    }
};

// Función para llenar el formulario con los datos de un registro seleccionado para editar
window.editarRegistro = function(id, nombre, apellido, email, contacto, fecha_nacimiento, direccion, genero, comentarios) {
    document.getElementById('id').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('email').value = email;
    document.getElementById('contacto').value = contacto;
    document.getElementById('fecha_nacimiento').value = fecha_nacimiento;
    document.getElementById('direccion').value = direccion;
    document.getElementById('genero').value = genero;
    document.getElementById('comentarios').value = comentarios;
};

// Maneja el evento del botón "Cancelar" para limpiar el formulario
document.getElementById('cancelarBtn').addEventListener('click', function() {
    document.getElementById('registroForm').reset();
    document.getElementById('id').value = '';
});


// Cuando el documento esté completamente cargado, se llama a la función para cargar los registros existentes
document.addEventListener('DOMContentLoaded', cargarRegistros);

// Función para obtener y mostrar los registros desde el backend
function cargarRegistros() {
    fetch('/backend/api.php')
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector('#registrosTable tbody');
            tbody.innerHTML = '';
            data.forEach(reg => {
                // Escapar comillas y saltos de línea para los data-attributes
                const safe = str => (str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\r?\n/g, ' ');
                tbody.innerHTML += `
                    <tr 
                        data-id="${reg.id}" 
                        data-nombre="${safe(reg.nombre)}" 
                        data-apellido="${safe(reg.apellido)}" 
                        data-email="${safe(reg.email)}" 
                        data-contacto="${safe(reg.contacto)}"
                        data-fecha_nacimiento="${safe(reg.fecha_nacimiento)}"
                        data-direccion="${safe(reg.direccion)}"
                        data-genero="${safe(reg.genero)}"
                        data-comentarios="${safe(reg.comentarios)}"
                    >
                        <td>${reg.id}</td>
                        <td>${reg.nombre}</td>
                        <td>${reg.apellido}</td>
                        <td>${reg.email}</td>
                        <td>${reg.contacto || ''}</td>
                        <td>${reg.fecha_nacimiento || ''}</td>
                        <td>${reg.direccion || ''}</td>
                        <td>${reg.genero || ''}</td>
                        <td>${reg.comentarios || ''}</td>
                        <td>
                            <button class="editar-btn" type="button">Editar</button>
                            <button class="borrar-btn" type="button">Borrar</button>
                        </td>
                    </tr>
                `;
            });

            // Asigna eventos a los botones de editar
            tbody.querySelectorAll('.editar-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const tr = this.closest('tr');
                    document.getElementById('id').value = tr.dataset.id;
                    document.getElementById('nombre').value = tr.dataset.nombre;
                    document.getElementById('apellido').value = tr.dataset.apellido;
                    document.getElementById('email').value = tr.dataset.email;
                    document.getElementById('contacto').value = tr.dataset.contacto;
                    document.getElementById('fecha_nacimiento').value = tr.dataset.fecha_nacimiento; 
                    document.getElementById('direccion').value = tr.dataset.direccion;
                    document.getElementById('genero').value = tr.dataset.genero;
                    document.getElementById('comentarios').value = tr.dataset.comentarios;
                });
            });

            // Asigna eventos a los botones de borrar
            tbody.querySelectorAll('.borrar-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const tr = this.closest('tr');
                    const id = tr.dataset.id;
                    if (confirm('¿Seguro que deseas borrar este registro?')) {
                        const formData = new FormData();
                        formData.append('id', id);
                        formData.append('action', 'delete');
                        fetch('/backend/api.php', {
                            method: 'POST',
                            body: formData
                        })
                        .then(res => res.json())
                        .then(data => {
                            cargarRegistros();
                        });
                    }
                });
            });
        });
}

// Maneja el evento de envío del formulario para guardar o actualizar un registro
document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Validar que la fecha no esté vacía
    const fecha = document.getElementById('fecha_nacimiento').value;
    if (!fecha) {
        document.getElementById('mensaje').textContent = 'Por favor, selecciona una fecha de nacimiento.';
        return;
    }
    const formData = new FormData(this);
    fetch('/backend/api.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success === false && data.error) {
            document.getElementById('mensaje').textContent = data.error; // Muestra el mensaje de error en el formulario
            return; // ¡No limpiar el formulario!
        }
        document.getElementById('mensaje').textContent = ''; // Limpia el mensaje si todo salió bien
        this.reset();
        document.getElementById('id').value = ''; // Limpia el campo id
        cargarRegistros();
    })
    .catch(error => {
        document.getElementById('mensaje').textContent = 'Error de conexión o del servidor.';
        // No limpiar el formulario en caso de error
    });
});

// Función para borrar un registro por su ID (usa POST, nunca DELETE)
window.borrarRegistro = function(id) {
    if (confirm('¿Seguro que deseas borrar este registro?')) {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('action', 'delete');
        fetch('/backend/api.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            cargarRegistros();
        });
    }
};

// Función para llenar el formulario con los datos de un registro seleccionado para editar
window.editarRegistro = function(id, nombre, apellido, email, contacto, fecha_nacimiento, direccion, genero, comentarios) {
    document.getElementById('id').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('email').value = email;
    document.getElementById('contacto').value = contacto;
    document.getElementById('fecha_nacimiento').value = fecha_nacimiento;
    document.getElementById('direccion').value = direccion;
    document.getElementById('genero').value = genero;
    document.getElementById('comentarios').value = comentarios;
};

// Maneja el evento del botón "Cancelar" para limpiar el formulario
document.getElementById('cancelarBtn').addEventListener('click', function() {
    document.getElementById('registroForm').reset();
    document.getElementById('id').value = '';
});


