// Variables globales
let menuData = { menu: [] };//Almacena los datos del menu en un formato JSON
let editMode = false;// indica si estamos en modo edicion o de creacion de un nuevo item

// Función para cargar los datos del menú desde el archivo JSON
async function loadMenuData() {
    try {
        const response = await fetch('/api/menu');// Realiza una solicitud GET al endpoint del servidor
        if (!response.ok) {// Si la respuesta no es exitosa, lanzar un error de lo contrario guarda los datos en menuData y actualiza la inferfaz.
            throw new Error('No se pudo cargar el archivo JSON');
        }
        menuData = await response.json();
        renderMenu();
        renderMenuItems();
    } catch (error) {
        console.error('Error al cargar los datos del menú:', error);
        // Si hay un error al cargar, inicializar con un menú vacío
        menuData = { menu: [] };
    }
}

// Guarda los datos del menú en el archivo JSON
async function saveMenuData() {
    try {
        const response = await fetch('/api/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menuData)
        });
        
        if (!response.ok) {
            throw new Error('Error al guardar los datos del menú');
        }
        
        const result = await response.json();
        console.log('Menú guardado exitosamente:', result);
        
        // También guardamos en localStorage como respaldo
        localStorage.setItem('menuData', JSON.stringify(menuData));
    } catch (error) {
        console.error('Error al guardar los datos del menú:', error);
        alert('Error al guardar los cambios: ' + error.message);
    }
}

// Función para renderizar el menú en la interfaz
function renderMenu() {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '';
    
    menuData.menu.forEach(item => {
        const menuItem = document.createElement('a');
        menuItem.href = item.enlace;
        menuItem.className = 'menu-item';
        menuItem.textContent = item.nombre;
        menuContainer.appendChild(menuItem);
    });
}

// Función para renderizar la lista de opciones del menú para administración
function renderMenuItems() {
    const menuItemsList = document.getElementById('menu-items-list');
    menuItemsList.innerHTML = '';
    
    menuData.menu.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'menu-item-card';
        
        const itemInfo = document.createElement('div');
        itemInfo.className = 'menu-item-info';
        itemInfo.innerHTML = `
            <h3>${item.nombre}</h3>
            <p>Enlace: ${item.enlace}</p>
        `;
        
        const itemActions = document.createElement('div');
        itemActions.className = 'menu-item-actions';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Editar';
        editBtn.onclick = () => editMenuItem(item.id);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Eliminar';
        deleteBtn.onclick = () => deleteMenuItem(item.id);
        
        itemActions.appendChild(editBtn);
        itemActions.appendChild(deleteBtn);
        
        itemCard.appendChild(itemInfo);
        itemCard.appendChild(itemActions);
        
        menuItemsList.appendChild(itemCard);
    });
}

// Función para agregar una nueva opción al menú
function addMenuItem(nombre, enlace) {
    // Generar un nuevo ID (el máximo ID actual + 1)
    const newId = menuData.menu.length > 0 
        ? Math.max(...menuData.menu.map(item => item.id)) + 1 
        : 1;
    
    // Crear el nuevo ítem
    const newItem = {
        id: newId,
        nombre: nombre,
        enlace: enlace
    };
    
    // Agregar al array de menú
    menuData.menu.push(newItem);
    
    // Guardar y actualizar la interfaz
    saveMenuData();
    renderMenu();
    renderMenuItems();
}

// Función para editar una opción del menú
function editMenuItem(id) {
    const item = menuData.menu.find(item => item.id === id);
    if (!item) return;
    
    // Llenar el formulario con los datos del ítem
    document.getElementById('item-id').value = item.id;
    document.getElementById('item-nombre').value = item.nombre;
    document.getElementById('item-enlace').value = item.enlace;
    
    // Cambiar a modo edición
    document.getElementById('add-button').style.display = 'none';
    document.getElementById('update-button').style.display = 'inline-block';
    document.getElementById('cancel-button').style.display = 'inline-block';
    
    editMode = true;
}

// Función para actualizar una opción del menú
function updateMenuItem(id, nombre, enlace) {
    const index = menuData.menu.findIndex(item => item.id === parseInt(id));
    if (index === -1) return;
    
    // Actualizar el ítem
    menuData.menu[index] = {
        id: parseInt(id),
        nombre: nombre,
        enlace: enlace
    };
    
    // Guardar y actualizar la interfaz
    saveMenuData();
    renderMenu();
    renderMenuItems();
    
    // Resetear el formulario
    resetForm();
}

// Función para eliminar una opción del menú
function deleteMenuItem(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta opción del menú?')) {
        menuData.menu = menuData.menu.filter(item => item.id !== id);
        
        // Guardar y actualizar la interfaz
        saveMenuData();
        renderMenu();
        renderMenuItems();
    }
}

// Función para guardar los datos del menú
function saveMenuData() {
   
    // Guardar en localStorage y convierte el archivo JSON a una cadena.
    localStorage.setItem('menuData', JSON.stringify(menuData));
    
  //convierte los datos a string y mejorar la legibilidad del JSON
    console.log('Guardando datos del menú:', JSON.stringify(menuData, null, 2));
    
  
}

// Función para resetear el formulario
function resetForm() {
    document.getElementById('menu-form').reset();
    document.getElementById('item-id').value = '';
    document.getElementById('add-button').style.display = 'inline-block';
    document.getElementById('update-button').style.display = 'none';
    document.getElementById('cancel-button').style.display = 'none';
    editMode = false;
}

// verifica si se a guardado los datos en el localStorage y tambien configura el evento de envio del formulario

document.addEventListener('DOMContentLoaded', () => {
    
    const savedData = localStorage.getItem('menuData');
    
    if (savedData) {
      
        menuData = JSON.parse(savedData);
        renderMenu();
        renderMenuItems();
    } else {
       
        loadMenuData();
    }
    

    // Manejar envío del formulario
    document.getElementById('menu-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('item-nombre').value.trim();
        const enlace = document.getElementById('item-enlace').value.trim();
        
        // Validar entradas
        if (!nombre || !enlace) {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        // Validar formato del enlace
        if (!isValidUrl(enlace)) {
            alert('Por favor, ingresa un enlace válido (debe comenzar con / o http:// o https://)');
            return;
        }
        
        if (editMode) {
            const id = document.getElementById('item-id').value;
            updateMenuItem(id, nombre, enlace);
        } else {
            addMenuItem(nombre, enlace);
        }
        
        // Limpiar el formulario
        resetForm();
    });
    
    // Manejar botón de actualización
    document.getElementById('update-button').addEventListener('click', () => {
        const id = document.getElementById('item-id').value;
        const nombre = document.getElementById('item-nombre').value.trim();
        const enlace = document.getElementById('item-enlace').value.trim();
        
        if (!nombre || !enlace) {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        if (!isValidUrl(enlace)) {
            alert('Por favor, ingresa un enlace válido (debe comenzar con / o http:// o https://)');
            return;
        }
        
        updateMenuItem(id, nombre, enlace);
    });
    
    // Manejar botón de cancelar
    document.getElementById('cancel-button').addEventListener('click', resetForm);
});

// Función para validar URL
function isValidUrl(url) {
    // Acepta URLs relativas que comienzan con / o URLs absolutas con http:// o https://
    return url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://');
}

//Botón de exportación
document.getElementById('export-button').addEventListener('click', () => {
    const dataStr = JSON.stringify(menuData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'menu.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
});

// Boton de importacion
document.getElementById('import-input').addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            try {
                const importedData = JSON.parse(event.target.result);
                
                // Validate the JSON structure
                if (!importedData.menu || !Array.isArray(importedData.menu)) {
                    throw new Error('El archivo JSON no tiene el formato correcto');
                }
                
                //Actualizar los datos del menu
                menuData = importedData;
                
                // Guardado y actualizado de la interfaz
                localStorage.setItem('menuData', JSON.stringify(menuData));
                renderMenu();
                renderMenuItems();
                
                alert('Menú importado correctamente');
            } catch (error) {
                console.error('Error al importar el menú:', error);
                alert('Error al importar el menú: ' + error.message);
            }
        };
        
        reader.readAsText(file);
    }
});