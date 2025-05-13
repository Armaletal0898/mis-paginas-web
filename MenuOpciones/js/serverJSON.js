// importacion de los modulos a trabajar

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');


//configurar el servidor con app creo la instancia de express y con port indico el puerto del servidor
const app = express();
const PORT = 3001;

// configurar express para que use body-parser para parsear los datos de las peticiones o Middleware
app.use(bodyParser.json()); // Para analizar el cuerpo del JSON
app.use(express.static(__dirname)); //Para servir archivos estáticos com CSS y JS o HTML en la carpeta actual

// GET endpoint para obetener datos del menu
app.get('/api/menu', (req, res) => {
    try {
        const menuData = fs.readFileSync(path.join(__dirname, 'menu.json'), 'utf8');
        res.json(JSON.parse(menuData));
    } catch (error) {
        console.error('Error reading menu file:', error);
        res.status(500).json({ error: 'Failed to read menu data' });
    }
});

// POST endpoint para actualizar el menu
app.post('/api/menu', (req, res) => {
    try {
        const menuData = req.body;
        
        // Basic validation
        if (!menuData || !menuData.menu || !Array.isArray(menuData.menu)) {
            return res.status(400).json({ error: 'Invalid menu data format' });
        }
        
        // Para escribir en el archivo
        fs.writeFileSync(
            path.join(__dirname, 'menu.json'),
            JSON.stringify(menuData, null, 2),
            'utf8'
        );
        
        res.json({ success: true, message: 'Menu updated successfully' });
    } catch (error) {
        console.error('Error writing menu file:', error);
        res.status(500).json({ error: 'Failed to update menu data' });
    }
});

// Inicializacion del servidor y manejo de errores
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Try a different port.`);
    } else {
        console.error('Server error:', err);
    }
});