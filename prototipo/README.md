# ✈️ AeroG7 - Sistema de Gestión de Aerolínea

![Version](https://img.shields.io/badge/version-2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-Active-success.svg)

Sistema completo de gestión de aerolínea con funcionalidades de reservas, pagos, administración de vuelos y usuarios.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Funcionalidades](#funcionalidades)
- [Usuarios de Prueba](#usuarios-de-prueba)
- [Contribución](#contribución)

---

## ✨ Características

### Para Clientes
- 🔍 **Búsqueda de vuelos** en tiempo real
- 📅 **Reservas múltiples** con gestión de pasajeros
- 💳 **Sistema de pagos** seguro y simulado
- 📊 **Historial completo** de reservas (pendientes y pagadas)
- 💱 **Conversión de moneda** USD/DOP en tiempo real
- 📱 **Diseño responsive** para todos los dispositivos

### Para Administradores
- ✈️ **Gestión completa de vuelos** (CRUD)
- 👥 **Administración de usuarios** (bloquear/activar)
- 📈 **Dashboard con estadísticas** en tiempo real
- 📊 **Panel de análisis** con métricas avanzadas
- 🔐 **Control de accesos** y roles
- 📋 **Vista de todas las reservas** del sistema

---

## 🛠 Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS y animaciones
- **JavaScript (ES6+)** - Lógica del cliente
- **JSON** - Almacenamiento de datos
- **LocalStorage/SessionStorage** - Persistencia de datos en el navegador

---

## 📁 Estructura del Proyecto

```
aerog7/
├── index.html              # Página principal (landing)
├── login.html              # Página de inicio de sesión
├── register.html           # Página de registro
├── dashboard.html          # Panel de usuario/admin
├── css/
│   └── styles.css         # Estilos principales (completo)
├── js/
│   └── app.js             # JavaScript principal (completo)
├── data/
│   ├── flights.json       # Datos de vuelos
│   └── users.json         # Usuarios predeterminados
├── assets/
│   └── logo.png           # Logo de AeroG7 (opcional)
└── README.md              # Documentación
```

---

## 🚀 Instalación

### Opción 1: Servidor Local con Python (Recomendado)

```bash
# 1. Clona o descarga el proyecto
cd aerog7

# 2. Inicia un servidor local con Python
python -m http.server 8000

# 3. Abre en tu navegador
http://localhost:8000
```

### Opción 2: Node.js

```bash
# Instalar http-server globalmente (solo una vez)
npm install -g http-server

# Iniciar servidor
http-server

# Abrir en navegador
http://localhost:8080
```

### Opción 3: VS Code Live Server

1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

### Opción 4: PHP

```bash
php -S localhost:8000
```

---

## 📖 Uso

### Navegación Básica

1. **Página Principal (index.html)**
   - Ver vuelos disponibles
   - Buscar por origen/destino
   - Filtrar y ordenar vuelos
   - Cambiar moneda (USD/DOP)
   - Reservar vuelos

2. **Registro (register.html)**
   - Crear cuenta nueva
   - Seleccionar tipo de cuenta (Minorista/Corporativo)
   - Validación de formularios en tiempo real

3. **Login (login.html)**
   - Iniciar sesión con email/contraseña
   - Acceso a usuarios demo con un clic
   - Redirección automática según rol

4. **Dashboard (dashboard.html)**
   - **Clientes:** Ver y gestionar reservas, procesar pagos
   - **Admin:** Panel completo de administración con estadísticas

---

## 🎯 Funcionalidades

### Sistema de Reservas

```javascript
// Flujo de reserva
1. Seleccionar vuelo desde la landing page
2. Ingresar cantidad de pasajeros (1-10)
3. Completar datos de cada pasajero (nombre + pasaporte)
4. Ver resumen y total a pagar
5. Confirmar reserva → Estado: "Pendiente de pago"
6. Procesar pago con datos de tarjeta
7. Reserva confirmada ✅
```

### Gestión de Vuelos (Admin)

- ➕ **Crear vuelos** con todos los detalles (origen, destino, fecha, hora, precio, asientos, aeronave)
- ✏️ **Editar vuelos** existentes con formulario pre-llenado
- 🗑️ **Eliminar vuelos** con confirmación
- 🔍 **Búsqueda en tiempo real** por código, origen o destino
- 📊 **Ver estadísticas** de ocupación y disponibilidad

### Sistema de Pagos

El sistema incluye validaciones completas:

- ✅ Número de tarjeta (16 dígitos)
- ✅ Fecha de vencimiento (MM/YY) - valida que no esté vencida
- ✅ CVV (3-4 dígitos)
- ✅ Formato automático de campos durante escritura
- ✅ Simulación de procesamiento de pago

### Conversión de Moneda

- Tasa de cambio fija: **1 USD = 63 DOP**
- Cambio instantáneo en toda la aplicación
- Persistencia de preferencia del usuario en localStorage
- Botón visible en header para cambio rápido

---

## 👤 Usuarios de Prueba

| Rol | Email | Contraseña | Descripción |
|-----|-------|-----------|-------------|
| **Administrador** | admin@aerolinea.com | admin123 | Acceso completo al sistema |
| **Soporte** | soporte@aerolinea.com | soporte123 | Soporte técnico |
| **Cliente Minorista** | minorista@prueba.com | 12345 | Usuario individual |
| **Cliente Corporativo** | corporativo@prueba.com | 12345 | Usuario empresarial |

💡 **Tip:** En la página de login, puedes hacer clic en cualquier usuario demo para autocompletar los campos.

---

## 📊 Estadísticas del Dashboard Admin

El panel de administración muestra en tiempo real:

- ✈️ **Vuelos Activos** - Total de vuelos programados
- ✅ **Reservas Pagadas** - Reservas confirmadas y pagadas
- 💰 **Ingresos Totales** - Revenue generado (en USD o DOP)
- 👥 **Usuarios Activos** - Clientes registrados y activos

---

## 🎨 Características de Diseño

### Paleta de Colores

```css
--primary: #003366      /* Azul corporativo */
--secondary: #ffcc00    /* Amarillo distintivo G7 */
--accent: #007bff       /* Azul acento para acciones */
--success: #28a745      /* Verde confirmación */
--danger: #dc3545       /* Rojo alerta/cancelación */
```

### Animaciones y Transiciones

- ✨ Hover effects suaves en todos los elementos interactivos
- 🎭 Animaciones de entrada/salida para modales
- 📱 Transiciones fluidas entre vistas
- 🔔 Notificaciones toast con animaciones
- 💫 Efectos de transformación en tarjetas

---

## 🔐 Seguridad

- 🔒 Validación de formularios en el lado del cliente
- ✅ Verificación de roles y permisos antes de acceder a funciones
- 🚫 Protección de rutas administrativas
- 💾 Almacenamiento seguro en localStorage
- 🔑 Gestión de sesiones con localStorage

---

## 📱 Responsive Design

El sistema es totalmente responsive y funciona perfectamente en:

- 💻 Desktop (1920px+)
- 💻 Laptop (1366px - 1920px)
- 📱 Tablet (768px - 1366px)
- 📱 Mobile (320px - 768px)

### Características Responsive:
- Menú hamburguesa en móviles
- Grid adaptativo para tarjetas de vuelos
- Tablas con scroll horizontal en móviles
- Modales optimizados para pantallas pequeñas
- Formularios que se ajustan automáticamente

---

## 🐛 Solución de Problemas

### Los vuelos no se cargan

**Problema:** Pantalla en blanco o sin vuelos  
**Solución:** Asegúrate de estar ejecutando un servidor local. Los navegadores modernos bloquean peticiones fetch a archivos locales por seguridad.

```bash
# Usa cualquiera de estos comandos:
python -m http.server 8000
# o
npx http-server
```

### Las reservas desaparecen al recargar

**Problema:** Reservas perdidas después de F5  
**Solución:** Las reservas se guardan en `sessionStorage` (temporal). Para persistencia permanente, modifica en `app.js`:

```javascript
// Cambiar sessionStorage por localStorage
function getReservasTemp() {
  return JSON.parse(localStorage.getItem("reservasTemp")) || [];
}
```

### Error de CORS

**Problema:** Error "CORS policy" en consola  
**Solución:** No abras el archivo HTML directamente. Usa siempre un servidor local.

### Modal no se cierra

**Problema:** Modal queda abierto  
**Solución:** Presiona la tecla ESC o haz clic fuera del modal. También puedes hacer clic en la X.

---

## 🔄 Próximas Mejoras

- [ ] Backend con Node.js/Express + MongoDB
- [ ] Autenticación con JWT
- [ ] Integración con pasarela de pagos real (Stripe/PayPal)
- [ ] Sistema de notificaciones por email
- [ ] Exportación de reportes en PDF
- [ ] Calendario interactivo de vuelos
- [ ] Mapa de rutas con Google Maps
- [ ] Selección visual de asientos
- [ ] Programa de fidelización con puntos
- [ ] App móvil con React Native
- [ ] Sistema de check-in online
- [ ] Integración con WhatsApp Business

---

## 📝 Notas de Desarrollo

### Almacenamiento de Datos

```javascript
// Usuario actual
localStorage.setItem("usuario", JSON.stringify(userData));

// Vuelos modificados (temporal para la sesión)
sessionStorage.setItem("vuelosTemp", JSON.stringify(flights));

// Reservas (temporal para la sesión)
sessionStorage.setItem("reservasTemp", JSON.stringify(reservations));

// Preferencia de moneda (persistente)
localStorage.setItem("monedaSeleccionada", "USD");
```

### Estructura de Datos

**Vuelo:**
```json
{
  "idVuelo": "ALX101",
  "origen": "SDQ - Santo Domingo",
  "destino": "PUJ - Punta Cana",
  "fechaSalida": "2025-11-15",
  "horaSalida": "10:30",
  "precio": 125,
  "estado": "Programado",
  "asientosDisponibles": 180,
  "aeronave": "Boeing 737"
}
```

**Reserva:**
```json
{
  "id": "R-1731612345678",
  "usuario": "cliente@email.com",
  "nombreUsuario": "Juan Pérez",
  "vuelo": "ALX101",
  "origen": "SDQ - Santo Domingo",
  "destino": "PUJ - Punta Cana",
  "fechaSalida": "2025-11-15",
  "horaSalida": "10:30",
  "pasajeros": [
    {
      "nombre": "Juan Pérez",
      "pasaporte": "ABC123456"
    }
  ],
  "total": 125,
  "estado": "Pendiente de pago",
  "fechaReserva": "2025-11-14T10:30:00.000Z"
}
```

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**Proyecto AeroG7**
- Proyecto de Análisis y Diseño de Sistemas
- Universidad: [Tu Universidad]
- Año: 2025

---

## 🙏 Agradecimientos

- Diseño inspirado en aerolíneas reales
- Iconos emoji nativos para mejor compatibilidad
- Comunidad de desarrolladores de código abierto

---

## 📧 Contacto

**AeroG7 - Sistema de Aerolínea**
- Email: info@aerog7.com
- Tel: +1 (809) 555-0100
- Ubicación: Santo Domingo, República Dominicana

---

⭐ **Si este proyecto te fue útil, considera darle una estrella!**

**¿Preguntas o sugerencias?** Abre un issue o contáctanos directamente.

---

Desarrollado con ❤️ para el proyecto de Análisis y Diseño de Sistemas

**© 2025 AeroG7. Todos los derechos reservados.**