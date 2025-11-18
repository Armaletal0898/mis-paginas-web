/********************************************
 * app.js - AeroG7 Sistema de Aerolínea Completo
 * Incluye: Gestión de usuarios, vuelos, reservas, millas, 
 * notificaciones, soporte, descuentos y CLASES DE ASIENTOS
 ********************************************/

// ============================================================
// VARIABLES GLOBALES
// ============================================================
let vuelosGlobal = [];
let usuariosGlobal = [];
let reservasGlobal = [];
let reclamosSoporte = [];
let monedaActual = "USD";
const TASA_CAMBIO = 57.5;

// Descuentos por tipo de cliente
const DESCUENTOS = {
  minorista: 0,
  corporativo: 0.15
};

// Acumulación de millas por tipo
const MILLAS_POR_DOLAR = {
  minorista: 1,
  corporativo: 1.5
};

// ============================================================
// 🆕 CONFIGURACIÓN DE CLASES DE ASIENTOS
// ============================================================
const CLASES_ASIENTOS = {
  primera: {
    nombre: "Primera Clase",
    filas: [1, 2, 3],
    multiplicador: 2.5,
    color: "#ffd700",
    colorBorde: "#daa520",
    icono: "👑",
    beneficios: [
      "🍽️ Comida gourmet incluida",
      "🍾 Bebidas premium ilimitadas", 
      "💺 Asientos reclinables 180°",
      "📺 Entretenimiento premium",
      "🎧 Auriculares noise-cancelling",
      "🧳 2 maletas de 32kg incluidas"
    ]
  },
  ejecutiva: {
    nombre: "Clase Ejecutiva",
    filas: [4, 5, 6, 7],
    multiplicador: 1.5,
    color: "#4169e1",
    colorBorde: "#1e3a8a",
    icono: "💼",
    beneficios: [
      "🍱 Comida premium incluida",
      "🥤 Bebidas incluidas",
      "💺 Asientos extra anchos",
      "📺 Entretenimiento a bordo",
      "🧳 1 maleta de 32kg incluida",
      "⚡ Embarque prioritario"
    ]
  },
  economica: {
    nombre: "Clase Económica",
    filas: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    multiplicador: 1.0,
    color: "#28a745",
    colorBorde: "#1e7e34",
    icono: "✈️",
    beneficios: [
      "🥤 Bebida incluida",
      "🍪 Snack ligero",
      "💺 Asiento estándar",
      "🧳 1 equipaje de mano",
      "📺 Entretenimiento básico",
      "💰 Mejor precio"
    ]
  }
};

function obtenerClaseAsiento(fila) {
  for (const [key, clase] of Object.entries(CLASES_ASIENTOS)) {
    if (clase.filas.includes(fila)) {
      return { tipo: key, ...clase };
    }
  }
  return { tipo: 'economica', ...CLASES_ASIENTOS.economica };
}

function calcularPrecioAsiento(precioBase, fila) {
  const clase = obtenerClaseAsiento(fila);
  return precioBase * clase.multiplicador;
}

// ============================================================
// INICIALIZACIÓN
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  cargarDatosIniciales();
  verificarSesion();
  inicializarPagina();
});

function cargarDatosIniciales() {
  if (!localStorage.getItem("usuarios")) {
    const usuariosIniciales = [
      {
        nombre: "Administrador del Sistema",
        email: "admin@aerolinea.com",
        password: "admin123",
        rol: "admin",
        activo: true,
        millas: 0
      },
      {
        nombre: "Soporte Técnico",
        email: "soporte@aerolinea.com",
        password: "soporte123",
        rol: "soporte",
        activo: true,
        millas: 0
      },
      {
        nombre: "Cliente Minorista Prueba",
        email: "minorista@prueba.com",
        password: "12345",
        rol: "minorista",
        activo: true,
        millas: 0
      },
      {
        nombre: "Cliente Corporativo Prueba",
        email: "corporativo@prueba.com",
        password: "12345",
        rol: "corporativo",
        activo: true,
        millas: 0
      }
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
  }

  if (!localStorage.getItem("vuelos")) {
    const vuelosIniciales = [
      {
        idVuelo: "ALX101",
        origen: "SDQ - Santo Domingo",
        destino: "PUJ - Punta Cana",
        fechaSalida: "2025-11-25",
        horaSalida: "10:30",
        precio: 125,
        asientosDisponibles: 140,
        estado: "Programado"
      },
      {
        idVuelo: "ALX102",
        origen: "PUJ - Punta Cana",
        destino: "SDQ - Santo Domingo",
        fechaSalida: "2025-11-26",
        horaSalida: "14:10",
        precio: 120,
        asientosDisponibles: 140,
        estado: "Programado"
      },
      {
        idVuelo: "ALX215",
        origen: "SDQ - Santo Domingo",
        destino: "MIA - Miami",
        fechaSalida: "2025-11-28",
        horaSalida: "08:45",
        precio: 350,
        asientosDisponibles: 140,
        estado: "Programado"
      },
      {
        idVuelo: "ALX330",
        origen: "MIA - Miami",
        destino: "SDQ - Santo Domingo",
        fechaSalida: "2025-12-01",
        horaSalida: "15:20",
        precio: 370,
        asientosDisponibles: 140,
        estado: "Programado"
      },
      {
        idVuelo: "ALX540",
        origen: "PUJ - Punta Cana",
        destino: "NYC - New York",
        fechaSalida: "2025-11-30",
        horaSalida: "13:15",
        precio: 480,
        asientosDisponibles: 140,
        estado: "Cancelado"
      },
      {
        idVuelo: "ALX600",
        origen: "NYC - New York",
        destino: "PUJ - Punta Cana",
        fechaSalida: "2025-12-05",
        horaSalida: "09:30",
        precio: 455,
        asientosDisponibles: 140,
        estado: "Programado"
      },
      {
        idVuelo: "ALX700",
        origen: "SDQ - Santo Domingo",
        destino: "SJU - San Juan",
        fechaSalida: "2025-11-21",
        horaSalida: "12:00",
        precio: 200,
        asientosDisponibles: 140,
        estado: "Programado"
      },
      {
        idVuelo: "ALX701",
        origen: "SJU - San Juan",
        destino: "SDQ - Santo Domingo",
        fechaSalida: "2025-11-22",
        horaSalida: "09:45",
        precio: 215,
        asientosDisponibles: 140,
        estado: "Programado"
      },
      {
        idVuelo: "ALX800",
        origen: "SDQ - Santo Domingo",
        destino: "PTY - Panama",
        fechaSalida: "2025-11-29",
        horaSalida: "18:20",
        precio: 310,
        asientosDisponibles: 140,
        estado: "Programado"
      },
      {
        idVuelo: "ALX801",
        origen: "PTY - Panama",
        destino: "SDQ - Santo Domingo",
        fechaSalida: "2025-11-30",
        horaSalida: "21:40",
        precio: 315,
        asientosDisponibles: 140,
        estado: "Programado"
      },
      {
        idVuelo: "ALX900",
        origen: "PUJ - Punta Cana",
        destino: "BOG - Bogota",
        fechaSalida: "2025-12-10",
        horaSalida: "16:00",
        precio: 295,
        asientosDisponibles: 140,
        estado: "Programado"
      },
      {
        idVuelo: "ALX901",
        origen: "BOG - Bogota",
        destino: "PUJ - Punta Cana",
        fechaSalida: "2025-12-11",
        horaSalida: "11:15",
        precio: 310,
        asientosDisponibles: 140,
        estado: "Programado"
      }
    ];
    localStorage.setItem("vuelos", JSON.stringify(vuelosIniciales));
  }

  if (!localStorage.getItem("reservas")) {
    localStorage.setItem("reservas", JSON.stringify([]));
  }

  if (!localStorage.getItem("reclamosSoporte")) {
    localStorage.setItem("reclamosSoporte", JSON.stringify([]));
  }

  usuariosGlobal = JSON.parse(localStorage.getItem("usuarios"));
  vuelosGlobal = JSON.parse(localStorage.getItem("vuelos"));
  reservasGlobal = JSON.parse(localStorage.getItem("reservas"));
  reclamosSoporte = JSON.parse(localStorage.getItem("reclamosSoporte"));
}

function inicializarPagina() {
  const path = window.location.pathname;
  
  if (path.includes("index.html") || path.endsWith("/")) {
    cargarVuelos();
  } else if (path.includes("aplicacion.html")) {
    cargarVuelos();
  } else if (path.includes("dashboard.html")) {
    cargarDashboard();
  } else if (path.includes("soporte.html")) {
    inicializarSoporte();
  }
}

// ============================================================
// AUTENTICACIÓN
// ============================================================
function login(e) {
  e.preventDefault();

  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value;

  const usuario = usuariosGlobal.find(
    u => u.email === email && u.password === password && u.activo
  );

  if (usuario) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
    enviarNotificacion(usuario.email, "Inicio de sesión exitoso", 
      `Hola ${usuario.nombre}, has iniciado sesión correctamente en AeroG7.`);
    
    alert(`¡Bienvenido ${usuario.nombre}!`);
    
    if (usuario.rol === "admin" || usuario.rol === "soporte") {
      window.location.href = "dashboard.html";
    } else {
      window.location.href = "aplicacion.html";
    }
  } else {
    alert("❌ Credenciales incorrectas o usuario inactivo");
  }
}

function registrarUsuario(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const rol = document.getElementById("rol").value;

  if (usuariosGlobal.find(u => u.email === email)) {
    alert("❌ Este correo ya está registrado");
    return;
  }

  const nuevoUsuario = {
    nombre,
    email,
    password,
    rol,
    activo: true,
    millas: 0,
    fechaRegistro: new Date().toISOString()
  };

  usuariosGlobal.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuariosGlobal));

  enviarNotificacion(email, "Registro exitoso", 
    `¡Bienvenido a AeroG7, ${nombre}! Tu cuenta ha sido creada exitosamente.`);

  alert("✅ Usuario registrado exitosamente");
  window.location.href = "login.html";
}

function logout() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (usuario) {
    enviarNotificacion(usuario.email, "Cierre de sesión", 
      `Has cerrado sesión en AeroG7. ¡Esperamos verte pronto!`);
  }
  
  localStorage.removeItem("usuario");
  window.location.href = "index.html";
}

function verificarSesion() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario) {
    const nombreUsuario = document.getElementById("nombreUsuario");
    if (nombreUsuario) {
      nombreUsuario.innerText = `👤 ${usuario.nombre}`;
    }

    const btnLogin = document.getElementById("btnLogin");
    const btnRegistro = document.getElementById("btnRegistro");
    const btnLogout = document.getElementById("btnLogout");
    const btnDashboard = document.getElementById("btnDashboard");

    if (btnLogin) btnLogin.style.display = "none";
    if (btnRegistro) btnRegistro.style.display = "none";
    if (btnLogout) btnLogout.style.display = "inline-block";
    if (btnDashboard) btnDashboard.style.display = "inline-block";
  }
}


// ============================================================
// Lógica de Recuperación de Contraseña
// ============================================================
function recuperarContrasena(event) {
    // ⚠️ Es importante que esta función reciba el evento y lo detenga.
    if (event) {
        event.preventDefault(); 
    }

    // Usamos el ID del input que definimos en recuperar.html
    const emailInput = document.getElementById("emailRecuperar");
    const mensajeDiv = document.getElementById("mensajeRecuperacion");
    
    // Si alguno de los elementos no existe, salimos
    if (!emailInput || !mensajeDiv) return;

    const email = emailInput.value.trim();

    // 1. Verificar si el email está vacío
    if (!email) {
        mensajeDiv.innerHTML = `<p class='error'>❌ Por favor, introduce tu correo electrónico.</p>`;
        mensajeDiv.style.display = 'block';
        return;
    }
    
    // 2. Buscar al usuario en la lista global
    // (Asumiendo que `usuariosGlobal` existe y contiene todos los usuarios)
    const usuarioExiste = usuariosGlobal.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (usuarioExiste) {
        // 3. Simular el envío del enlace de recuperación (ÉXITO)
        mensajeDiv.innerHTML = `<p class='success'>✅ Se ha enviado un enlace de recuperación a <b>${email}</b>. Revisa tu bandeja de entrada.</p>`;
        mensajeDiv.style.display = 'block';
        
        // Limpiar el campo de correo después del éxito
        emailInput.value = ""; 

    } else {
        // 4. El usuario no fue encontrado (ERROR)
        mensajeDiv.innerHTML = `<p class='error'>⚠️ No se encontró ninguna cuenta asociada al correo <b>${email}</b>. Verifica el email.</p>`;
        mensajeDiv.style.display = 'block';
    }
}


// ============================================================
// Conexión del Formulario HTML al Script
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    // ... Tu lógica existente de DOMContentLoaded ...
    
    // 🆕 Conectar el formulario de recuperación
    const recoverForm = document.getElementById('recoverForm');
    if (recoverForm) {
      recoverForm.addEventListener('submit', recuperarContrasena);
    }
});



// ============================================================
// GESTIÓN DE VUELOS
// ============================================================
function cargarVuelos() {
  vuelosGlobal = JSON.parse(localStorage.getItem("vuelos"));
  mostrarVuelos(vuelosGlobal);
}

function buscarVuelos() {
  const origen = document.getElementById("origen")?.value.toLowerCase().trim();
  const destino = document.getElementById("destino")?.value.toLowerCase().trim();

  const filtrados = vuelosGlobal.filter(v => {
    const origenMatch = !origen || v.origen.toLowerCase().includes(origen);
    const destinoMatch = !destino || v.destino.toLowerCase().includes(destino);
    return origenMatch && destinoMatch && v.estado === "Programado";
  });

  mostrarVuelos(filtrados);
}

function mostrarVuelos(vuelos = vuelosGlobal) {
  const lista = document.getElementById("listaVuelos");
  if (!lista) return;

  lista.innerHTML = "";

  const vuelosProgramados = vuelos.filter(v => v.estado === "Programado");

  if (vuelosProgramados.length === 0) {
    lista.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">✈️</div>
        <h3>No se encontraron vuelos</h3>
        <p>Intenta con otros criterios de búsqueda</p>
      </div>
    `;
    return;
  }

  vuelosProgramados.forEach(vuelo => {
    const precioMostrar = monedaActual === "USD" 
      ? vuelo.precio 
      : (vuelo.precio * TASA_CAMBIO).toFixed(2);

    const simbolo = monedaActual === "USD" ? "$" : "RD$";

    const card = document.createElement("div");
    card.className = "vuelo-card";
    card.innerHTML = `
      <div class="vuelo-header">
        <span class="vuelo-id">${vuelo.idVuelo}</span>
      </div>

      <div class="vuelo-route">
        <div class="route-item">
          <div class="route-info">
            <span class="route-code">${vuelo.origen.split(' - ')[0]}</span>
          </div>
        </div>
        <span class="route-arrow">→</span>
        <div class="route-item">
          <div class="route-info">
            <span class="route-code">${vuelo.destino.split(' - ')[0]}</span>
          </div>
        </div>
      </div>

      <div class="vuelo-details">
        <div class="detail-item">
          <span>${vuelo.fechaSalida}</span>
        </div>
        <div class="detail-item">
          <span>${vuelo.horaSalida}</span>
        </div>
        <div class="detail-item">
          <span>✈️ ${vuelo.asientosDisponibles || 140} asientos</span>
        </div>
      </div>

      <div class="vuelo-footer">
        <div class="vuelo-price">Desde ${simbolo}${precioMostrar}</div>
        <button class="btn-reservar" onclick="abrirModalReserva('${vuelo.idVuelo}')">
          Reservar
        </button>
      </div>
    `;

    lista.appendChild(card);
  });
}

function toggleMoneda() {
  monedaActual = monedaActual === "USD" ? "DOP" : "USD";
  const btn = document.getElementById("btnMoneda");
  if (btn) {
    btn.innerText = `Cambiar a ${monedaActual === "USD" ? "DOP" : "USD"}`;
  }
  mostrarVuelos();
}

// ============================================================
// RESERVAS CON CLASES
// ============================================================
let vueloSeleccionado = null;

function abrirModalReserva(idVuelo) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  
  if (!usuario) {
    alert("⚠️ Debes iniciar sesión para reservar");
    window.location.href = "login.html";
    return;
  }

  vueloSeleccionado = vuelosGlobal.find(v => v.idVuelo === idVuelo);
  
  if (!vueloSeleccionado) {
    alert("❌ Vuelo no encontrado");
    return;
  }

  const modal = document.getElementById("modalReserva");
  const detalle = document.getElementById("detalleVueloModal");

  const descuento = DESCUENTOS[usuario.rol] || 0;
  const precioBase = vueloSeleccionado.precio;

  detalle.innerHTML = `
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <div>
          <strong style="font-size: 1.3rem;">✈️ ${vueloSeleccionado.idVuelo}</strong>
        </div>
        <div style="text-align: right; font-size: 0.9rem; opacity: 0.95;">
          <div>📅 ${vueloSeleccionado.fechaSalida}</div>
          <div>⏰ ${vueloSeleccionado.horaSalida}</div>
        </div>
      </div>
      <div style="font-size: 1.1rem; font-weight: 600;">
        📍 ${vueloSeleccionado.origen} → ${vueloSeleccionado.destino}
      </div>
    </div>

    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
      <h4 style="margin-bottom: 20px; color: #333; text-align: center; font-size: 1.2rem;">💺 Clases Disponibles</h4>
      
      <div style="display: grid; gap: 15px;">
        <!-- Primera Clase -->
        <div style="background: linear-gradient(135deg, ${CLASES_ASIENTOS.primera.color}30, ${CLASES_ASIENTOS.primera.color}15); padding: 20px; border-radius: 12px; border-left: 5px solid ${CLASES_ASIENTOS.primera.color}; box-shadow: 0 3px 10px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 2rem;">${CLASES_ASIENTOS.primera.icono}</span>
              <div>
                <div style="font-size: 1.3rem; font-weight: 700; color: ${CLASES_ASIENTOS.primera.colorBorde};">${CLASES_ASIENTOS.primera.nombre}</div>
                <div style="font-size: 0.85rem; color: #666; margin-top: 3px;">Experiencia de lujo</div>
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 1.6rem; font-weight: 800; color: ${CLASES_ASIENTOS.primera.colorBorde};">$${(precioBase * CLASES_ASIENTOS.primera.multiplicador).toFixed(2)}</div>
              <div style="font-size: 0.75rem; color: #666; margin-top: 2px;">por pasajero</div>
            </div>
          </div>
          <div style="border-top: 2px dashed ${CLASES_ASIENTOS.primera.color}50; padding-top: 12px; margin-top: 12px;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 0.85rem; color: #555;">
              ${CLASES_ASIENTOS.primera.beneficios.map(b => `<div>${b}</div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Clase Ejecutiva -->
        <div style="background: linear-gradient(135deg, ${CLASES_ASIENTOS.ejecutiva.color}30, ${CLASES_ASIENTOS.ejecutiva.color}15); padding: 20px; border-radius: 12px; border-left: 5px solid ${CLASES_ASIENTOS.ejecutiva.color}; box-shadow: 0 3px 10px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 2rem;">${CLASES_ASIENTOS.ejecutiva.icono}</span>
              <div>
                <div style="font-size: 1.3rem; font-weight: 700; color: ${CLASES_ASIENTOS.ejecutiva.colorBorde};">${CLASES_ASIENTOS.ejecutiva.nombre}</div>
                <div style="font-size: 0.85rem; color: #666; margin-top: 3px;">Confort premium</div>
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 1.6rem; font-weight: 800; color: ${CLASES_ASIENTOS.ejecutiva.colorBorde};">$${(precioBase * CLASES_ASIENTOS.ejecutiva.multiplicador).toFixed(2)}</div>
              <div style="font-size: 0.75rem; color: #666; margin-top: 2px;">por pasajero</div>
            </div>
          </div>
          <div style="border-top: 2px dashed ${CLASES_ASIENTOS.ejecutiva.color}50; padding-top: 12px; margin-top: 12px;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 0.85rem; color: #555;">
              ${CLASES_ASIENTOS.ejecutiva.beneficios.map(b => `<div>${b}</div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Clase Económica -->
        <div style="background: linear-gradient(135deg, ${CLASES_ASIENTOS.economica.color}30, ${CLASES_ASIENTOS.economica.color}15); padding: 20px; border-radius: 12px; border-left: 5px solid ${CLASES_ASIENTOS.economica.color}; box-shadow: 0 3px 10px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 2rem;">${CLASES_ASIENTOS.economica.icono}</span>
              <div>
                <div style="font-size: 1.3rem; font-weight: 700; color: ${CLASES_ASIENTOS.economica.colorBorde};">${CLASES_ASIENTOS.economica.nombre}</div>
                <div style="font-size: 0.85rem; color: #666; margin-top: 3px;">Mejor precio</div>
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 1.6rem; font-weight: 800; color: ${CLASES_ASIENTOS.economica.colorBorde};">$${(precioBase * CLASES_ASIENTOS.economica.multiplicador).toFixed(2)}</div>
              <div style="font-size: 0.75rem; color: #666; margin-top: 2px;">por pasajero</div>
            </div>
          </div>
          <div style="border-top: 2px dashed ${CLASES_ASIENTOS.economica.color}50; padding-top: 12px; margin-top: 12px;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 0.85rem; color: #555;">
              ${CLASES_ASIENTOS.economica.beneficios.map(b => `<div>${b}</div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>

    ${descuento > 0 ? `
      <div style="background: linear-gradient(135deg, #d4edda, #c3e6cb); border: 2px solid #28a745; padding: 15px; border-radius: 10px; margin-top: 15px; box-shadow: 0 3px 10px rgba(40, 167, 69, 0.2);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 2rem;">🎉</span>
          <div>
            <div style="color: #155724; font-size: 1.2rem; font-weight: 700;">Descuento ${usuario.rol === 'corporativo' ? 'Corporativo' : ''}</div>
            <div style="color: #155724; font-size: 1rem; margin-top: 3px;">-${(descuento * 100)}% aplicado al precio final de tu reserva</div>
          </div>
        </div>
      </div>
    ` : ''}

    <p style="margin-top: 20px; font-size: 0.9rem; color: #666; text-align: center; font-style: italic;">
      💡 Selecciona tus asientos a continuación para ver el precio final
    </p>
  `;

  const cantidadInput = document.getElementById("cantidadPasajeros");
  cantidadInput.value = 1;
  cantidadInput.oninput = generarCamposPasajeros;

  generarCamposPasajeros();
  modal.classList.add("show");
}

function generarCamposPasajeros() {
  const cantidad = parseInt(document.getElementById("cantidadPasajeros").value) || 1;
  const container = document.getElementById("pasajerosContainer");
  
  container.innerHTML = "";
  generarMapaAsientos(cantidad);

  for (let i = 1; i <= cantidad; i++) {
    const card = document.createElement("div");
    card.className = "pasajero-card";
    card.innerHTML = `
      <h4>Pasajero ${i}</h4>
      <input type="text" class="pasajero-nombre" placeholder="Nombre completo" required />
      <input type="text" class="pasajero-pasaporte" placeholder="Número de pasaporte" required />
      <input type="email" class="pasajero-email" placeholder="Correo electrónico" />
      <div class="asiento-seleccionado-info" id="asientoInfo${i}">
        <span style="color: #dc3545; font-weight: 600;">⚠️ Sin asiento seleccionado</span>
      </div>
    `;
    container.appendChild(card);
  }
}

// ============================================================
// SISTEMA DE SELECCIÓN DE ASIENTOS CON CLASES
// ============================================================
let asientosSeleccionados = [];
let asientosOcupados = [];

function generarMapaAsientos(cantidadPasajeros) {
  cargarAsientosOcupados();

  const modal = document.getElementById("modalReserva");
  let mapaContainer = document.getElementById("mapaAsientos");
  
  if (!mapaContainer) {
    mapaContainer = document.createElement("div");
    mapaContainer.id = "mapaAsientos";
    mapaContainer.style.cssText = `
      margin: 25px 0;
      padding: 25px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 15px;
      border: 2px solid #dee2e6;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    `;
    
    const pasajerosContainer = document.getElementById("pasajerosContainer");
    pasajerosContainer.parentNode.insertBefore(mapaContainer, pasajerosContainer);
  }

  asientosSeleccionados = [];

  mapaContainer.innerHTML = `
    <h4 style="color: var(--primary); margin-bottom: 20px; text-align: center; font-size: 1.4rem; font-weight: 700;">
      ✈️ Selecciona ${cantidadPasajeros} asiento${cantidadPasajeros > 1 ? 's' : ''}
    </h4>
    
    <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 25px; flex-wrap: wrap;">
      <div style="display: flex; align-items: center; gap: 10px; padding: 10px 18px; background: white; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
        <span style="font-size: 1.5rem;">👑</span>
        <div>
          <div style="font-size: 0.9rem; font-weight: 700; color: #daa520;">Primera</div>
          <div style="font-size: 0.75rem; color: #666;">Filas 1-3</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px; padding: 10px 18px; background: white; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
        <span style="font-size: 1.5rem;">💼</span>
        <div>
          <div style="font-size: 0.9rem; font-weight: 700; color: #4169e1;">Ejecutiva</div>
          <div style="font-size: 0.75rem; color: #666;">Filas 4-7</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px; padding: 10px 18px; background: white; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
        <span style="font-size: 1.5rem;">✈️</span>
        <div>
          <div style="font-size: 0.9rem; font-weight: 700; color: #28a745;">Económica</div>
          <div style="font-size: 0.75rem; color: #666;">Filas 8-20</div>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: center; gap: 25px; margin-bottom: 25px; flex-wrap: wrap; padding: 15px; background: white; border-radius: 12px; box-shadow: 0 3px 10px rgba(0,0,0,0.08);">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 32px; height: 32px; background: #28a745; border-radius: 7px; border: 2px solid #1e7e34;"></div>
        <span style="font-size: 0.95rem; font-weight: 600; color: #333;">Disponible</span>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 32px; height: 32px; background: #007bff; border-radius: 7px; border: 2px solid #0056b3;"></div>
        <span style="font-size: 0.95rem; font-weight: 600; color: #333;">Tu selección</span>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 32px; height: 32px; background: #dc3545; border-radius: 7px; border: 2px solid #c82333;"></div>
        <span style="font-size: 0.95rem; font-weight: 600; color: #333;">Ocupado</span>
      </div>
    </div>

    <div id="seccionAsientos" style="max-width: 700px; margin: 0 auto;"></div>
    
    <div style="text-align: center; margin-top: 25px; padding: 20px; background: white; border-radius: 12px; box-shadow: 0 3px 15px rgba(0,0,0,0.1);">
      <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 12px;">
        <strong style="color: #333;">Asientos seleccionados:</strong> 
        <span id="contadorAsientos" style="color: #007bff; font-size: 1.4rem; font-weight: 800; margin: 0 5px;">0</span>
        <span style="color: #666;">/ ${cantidadPasajeros}</span>
      </p>
      <div style="border-top: 2px solid #e9ecef; padding-top: 15px; margin-top: 15px;">
        <p style="color: var(--primary); font-size: 1.3rem; font-weight: 700; margin: 0;">
          💰 Total: <span style="color: #28a745;">$<span id="totalAsientos">0.00</span> USD</span>
        </p>
        <p style="font-size: 0.85rem; color: #666; margin-top: 8px; font-style: italic;">
          ${DESCUENTOS[JSON.parse(localStorage.getItem("usuario"))?.rol] > 0 ? 
            '🎉 Se aplicará tu descuento corporativo al confirmar' : 
            'Precio antes de descuentos'}
        </p>
      </div>
    </div>
  `;

  generarAsientos(cantidadPasajeros);
}

function generarAsientos(cantidadNecesaria) {
  const seccion = document.getElementById("seccionAsientos");
  const filas = 20;
  const columnas = ['A', 'B', 'C', '', 'D', 'E', 'F'];

  seccion.innerHTML = "";

  // Cabecera del avión
  const cabecera = document.createElement("div");
  cabecera.style.cssText = `
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 25px;
    padding: 18px;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: white;
    border-radius: 50% 50% 0 0;
    font-weight: 800;
    box-shadow: 0 4px 15px rgba(0, 51, 102, 0.3);
  `;
  cabecera.textContent = "✈️ FRENTE DEL AVIÓN";
  seccion.appendChild(cabecera);

  // Generar filas por clase
  for (let fila = 1; fila <= filas; fila++) {
    const claseInfo = obtenerClaseAsiento(fila);
    const precioAsiento = calcularPrecioAsiento(vueloSeleccionado.precio, fila);

    // Separador visual entre clases
    if (fila === 4 || fila === 8) {
      const separador = document.createElement("div");
      separador.style.cssText = `
        height: 40px;
        margin: 20px 0;
        background: linear-gradient(to right, transparent, ${claseInfo.color}40, transparent);
        border-top: 3px dashed ${claseInfo.color};
        border-bottom: 3px dashed ${claseInfo.color};
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        color: ${claseInfo.colorBorde};
        font-size: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px ${claseInfo.color}30;
      `;
      separador.innerHTML = `
        <span style="background: white; padding: 8px 20px; border-radius: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          ${claseInfo.icono} ${claseInfo.nombre.toUpperCase()} - ${precioAsiento.toFixed(2)} USD
        </span>
      `;
      seccion.appendChild(separador);
    }

    const filaDiv = document.createElement("div");
    filaDiv.style.cssText = `
      display: grid;
      grid-template-columns: 50px repeat(7, 1fr);
      gap: 10px;
      margin-bottom: 10px;
      align-items: center;
      padding: 8px 10px;
      background: ${claseInfo.color}15;
      border-radius: 10px;
      transition: all 0.3s ease;
    `;

    // Número de fila con icono de clase
    const numeroFila = document.createElement("div");
    numeroFila.innerHTML = `
      <div style="text-align: center; padding: 8px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="font-weight: 800; color: ${claseInfo.color}; font-size: 1.1rem;">${fila}</div>
        <div style="font-size: 0.8rem; margin-top: 2px;">${claseInfo.icono}</div>
      </div>
    `;
    filaDiv.appendChild(numeroFila);

    // Generar asientos
    columnas.forEach(columna => {
      if (columna === '') {
        const pasillo = document.createElement("div");
        pasillo.style.cssText = `
          width: 30px;
          background: linear-gradient(to bottom, #dee2e6 0%, #ced4da 100%);
          height: 45px;
          border-radius: 6px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        `;
        filaDiv.appendChild(pasillo);
      } else {
        const asientoId = `${fila}${columna}`;
        const asiento = document.createElement("button");
        asiento.type = "button";
        asiento.textContent = columna;
        asiento.dataset.asiento = asientoId;
        asiento.dataset.fila = fila;
        
        const estaOcupado = asientosOcupados.includes(asientoId);
        
        asiento.style.cssText = `
          padding: 14px 10px;
          border: 3px solid ${estaOcupado ? '#c82333' : claseInfo.colorBorde};
          border-radius: 10px;
          background: ${estaOcupado ? '#dc3545' : claseInfo.color};
          color: white;
          cursor: ${estaOcupado ? 'not-allowed' : 'pointer'};
          font-weight: 800;
          font-size: 1rem;
          transition: all 0.3s ease;
          opacity: ${estaOcupado ? '0.6' : '1'};
          position: relative;
          box-shadow: 0 3px 8px rgba(0,0,0,0.15);
        `;

        asiento.title = estaOcupado ? '❌ Ocupado' : `${claseInfo.nombre} - ${precioAsiento.toFixed(2)} USD`;

        if (!estaOcupado) {
          asiento.onclick = () => seleccionarAsiento(asientoId, asiento, cantidadNecesaria, fila);
          
          asiento.onmouseover = () => {
            if (!asientosSeleccionados.find(a => a.id === asientoId)) {
              asiento.style.transform = 'scale(1.2) translateY(-3px)';
              asiento.style.boxShadow = `0 8px 20px ${claseInfo.color}80`;
              asiento.style.zIndex = '10';
            }
          };
          
          asiento.onmouseout = () => {
            if (!asientosSeleccionados.find(a => a.id === asientoId)) {
              asiento.style.transform = 'scale(1)';
              asiento.style.boxShadow = '0 3px 8px rgba(0,0,0,0.15)';
              asiento.style.zIndex = '1';
            }
          };
        }

        filaDiv.appendChild(asiento);
      }
    });

    seccion.appendChild(filaDiv);
  }
}

function cargarAsientosOcupados() {
  if (!vueloSeleccionado) return;
  
  const reservasDelVuelo = reservasGlobal.filter(r => 
    r.idVuelo === vueloSeleccionado.idVuelo && r.estado !== 'Cancelada'
  );

  asientosOcupados = [];
  reservasDelVuelo.forEach(reserva => {
    if (reserva.asientos) {
      asientosOcupados.push(...reserva.asientos);
    }
  });
}

function seleccionarAsiento(asientoId, botonAsiento, maxSelecciones, fila) {
  const index = asientosSeleccionados.findIndex(a => a.id === asientoId);
  const claseInfo = obtenerClaseAsiento(fila);
  const precioAsiento = calcularPrecioAsiento(vueloSeleccionado.precio, fila);

  if (index > -1) {
    // Deseleccionar
    asientosSeleccionados.splice(index, 1);
    botonAsiento.style.background = claseInfo.color;
    botonAsiento.style.border = `3px solid ${claseInfo.colorBorde}`;
    botonAsiento.style.transform = 'scale(1)';
    botonAsiento.style.boxShadow = '0 3px 8px rgba(0,0,0,0.15)';
    botonAsiento.style.zIndex = '1';
  } else {
    // Seleccionar
    if (asientosSeleccionados.length >= maxSelecciones) {
      alert(`⚠️ Solo puedes seleccionar ${maxSelecciones} asiento(s)`);
      return;
    }

    asientosSeleccionados.push({
      id: asientoId,
      fila: fila,
      clase: claseInfo.nombre,
      precio: precioAsiento,
      icono: claseInfo.icono
    });
    
    botonAsiento.style.background = '#007bff';
    botonAsiento.style.border = '3px solid #0056b3';
    botonAsiento.style.transform = 'scale(1.25) translateY(-4px)';
    botonAsiento.style.boxShadow = '0 10px 30px rgba(0, 123, 255, 0.6)';
    botonAsiento.style.zIndex = '10';
  }

  actualizarContadorAsientos(maxSelecciones);
  actualizarTotalAsientos();
  actualizarInfoAsientosPasajeros();
}

function actualizarContadorAsientos(max) {
  const contador = document.getElementById("contadorAsientos");
  if (contador) {
    contador.textContent = asientosSeleccionados.length;
    contador.style.color = asientosSeleccionados.length === max ? '#28a745' : '#007bff';
    contador.style.fontWeight = '800';
  }
}

function actualizarTotalAsientos() {
  const totalElement = document.getElementById("totalAsientos");
  if (!totalElement) return;

  const total = asientosSeleccionados.reduce((sum, asiento) => sum + asiento.precio, 0);
  totalElement.textContent = total.toFixed(2);
  
  totalElement.style.transform = 'scale(1.15)';
  totalElement.style.transition = 'transform 0.3s ease';
  setTimeout(() => {
    totalElement.style.transform = 'scale(1)';
  }, 300);
}

function actualizarInfoAsientosPasajeros() {
  asientosSeleccionados.forEach((asientoData, index) => {
    const info = document.getElementById(`asientoInfo${index + 1}`);
    if (info) {
      const colorClase = asientoData.clase.includes('Primera') ? '#ffd700' : 
                         asientoData.clase.includes('Ejecutiva') ? '#4169e1' : '#28a745';
      
      info.innerHTML = `
        <div style="background: linear-gradient(135deg, ${colorClase}25, ${colorClase}10); padding: 15px; border-radius: 10px; border-left: 5px solid ${colorClase}; box-shadow: 0 3px 10px rgba(0,0,0,0.1); margin-top: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="color: #28a745; font-weight: 700; font-size: 1.1rem;">
              ✅ Asiento: <strong style="font-size: 1.4rem; color: #007bff;">${asientoData.id}</strong>
            </span>
            <span style="font-size: 1.8rem;">${asientoData.icono}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 0.9rem; color: #555;">
              <strong style="color: ${colorClase === '#ffd700' ? '#daa520' : colorClase === '#4169e1' ? '#1e3a8a' : '#1e7e34'};">${asientoData.clase}</strong>
            </div>
            <div style="font-size: 1.1rem; font-weight: 700; color: #28a745;">
              ${asientoData.precio.toFixed(2)}
            </div>
          </div>
        </div>
      `;
    }
  });

  for (let i = asientosSeleccionados.length + 1; i <= 10; i++) {
    const info = document.getElementById(`asientoInfo${i}`);
    if (info) {
      info.innerHTML = `
        <span style="color: #dc3545; font-weight: 600;">⚠️ Sin asiento seleccionado</span>
      `;
    }
  }
}

function confirmarReserva() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  
  if (!usuario || !vueloSeleccionado) {
    alert("❌ Error en la reserva");
    return;
  }

  const cantidadPasajeros = parseInt(document.getElementById("cantidadPasajeros").value) || 1;
  if (asientosSeleccionados.length !== cantidadPasajeros) {
    alert(`⚠️ Debes seleccionar exactamente ${cantidadPasajeros} asiento(s). Actualmente tienes ${asientosSeleccionados.length} seleccionado(s).`);
    return;
  }

  const pasajeros = [];
  const nombreInputs = document.querySelectorAll(".pasajero-nombre");
  const pasaporteInputs = document.querySelectorAll(".pasajero-pasaporte");
  const emailInputs = document.querySelectorAll(".pasajero-email");

  for (let i = 0; i < nombreInputs.length; i++) {
    if (!nombreInputs[i].value.trim() || !pasaporteInputs[i].value.trim()) {
      alert("⚠️ Completa todos los campos de los pasajeros");
      return;
    }

    const asientoData = asientosSeleccionados[i];
    pasajeros.push({
      nombre: nombreInputs[i].value.trim(),
      pasaporte: pasaporteInputs[i].value.trim(),
      email: emailInputs[i].value.trim(),
      asiento: asientoData.id,
      claseAsiento: asientoData.clase,
      precioAsiento: asientoData.precio
    });
  }

  if (!vueloSeleccionado.asientosDisponibles) {
    vueloSeleccionado.asientosDisponibles = 140;
  }

  if (vueloSeleccionado.asientosDisponibles < pasajeros.length) {
    alert(`❌ Solo hay ${vueloSeleccionado.asientosDisponibles} asientos disponibles`);
    return;
  }

  const descuentoUsuario = DESCUENTOS[usuario.rol] || 0;
  const precioTotalAsientos = asientosSeleccionados.reduce((sum, a) => sum + a.precio, 0);
  const precioTotal = precioTotalAsientos * (1 - descuentoUsuario);
  const millasGanadas = Math.floor(precioTotal * MILLAS_POR_DOLAR[usuario.rol]);

  const nuevaReserva = {
    id: `RES${Date.now()}`,
    idVuelo: vueloSeleccionado.idVuelo,
    emailUsuario: usuario.email,
    nombreUsuario: usuario.nombre,
    vuelo: { ...vueloSeleccionado },
    pasajeros,
    asientos: asientosSeleccionados.map(a => a.id),
    detalleAsientos: asientosSeleccionados.map(a => ({
      id: a.id,
      clase: a.clase,
      precio: a.precio,
      icono: a.icono
    })),
    precioBaseAsientos: precioTotalAsientos.toFixed(2),
    descuentoAplicado: (descuentoUsuario * 100).toFixed(0) + '%',
    precioTotal: precioTotal.toFixed(2),
    millasGanadas,
    estado: "Pendiente",
    fechaReserva: new Date().toISOString()
  };

  vueloSeleccionado.asientosDisponibles -= pasajeros.length;
  const indexVuelo = vuelosGlobal.findIndex(v => v.idVuelo === vueloSeleccionado.idVuelo);
  vuelosGlobal[indexVuelo] = vueloSeleccionado;
  localStorage.setItem("vuelos", JSON.stringify(vuelosGlobal));

  reservasGlobal.push(nuevaReserva);
  localStorage.setItem("reservas", JSON.stringify(reservasGlobal));

  const detalleAsientos = asientosSeleccionados.map(a => 
    `${a.icono} ${a.id} (${a.clase} - ${a.precio.toFixed(2)})`
  ).join('\n   ');

  enviarNotificacion(usuario.email, "Reserva confirmada", 
    `Tu reserva ${nuevaReserva.id} ha sido creada exitosamente.
    
    Vuelo: ${vueloSeleccionado.idVuelo}
    Asientos: ${detalleAsientos}
    Precio base: ${precioTotalAsientos.toFixed(2)} USD
    Descuento ${usuario.rol}: ${(descuentoUsuario * 100)}%
    Total a pagar: ${precioTotal.toFixed(2)} USD
    
    Ganarás ${millasGanadas} millas al completar el pago.`);

  alert(`✅ ¡Reserva creada exitosamente!

🎫 ID: ${nuevaReserva.id}
✈️ Vuelo: ${vueloSeleccionado.idVuelo}

💺 Asientos seleccionados:
${asientosSeleccionados.map(a => `   ${a.icono} ${a.id} - ${a.clase} (${a.precio.toFixed(2)})`).join('\n')}

💰 Resumen de precios:
   Subtotal asientos: ${precioTotalAsientos.toFixed(2)} USD
   Descuento: -${(descuentoUsuario * 100)}%
   TOTAL A PAGAR: ${precioTotal.toFixed(2)} USD

✨ Millas a ganar: ${millasGanadas}

Puedes proceder al pago desde tu panel de usuario.`);
  
  cerrarModal();
  window.location.href = "dashboard.html";
}

function cerrarModal() {
  const modal = document.getElementById("modalReserva");
  modal.classList.remove("show");
  vueloSeleccionado = null;
  asientosSeleccionados = [];
}

// ============================================================
// DASHBOARD
// ============================================================
function cargarDashboard() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  
  if (!usuario) {
    alert("⚠️ Debes iniciar sesión");
    window.location.href = "login.html";
    return;
  }

  const nombreUsuario = document.getElementById("nombreUsuario");
  if (nombreUsuario) {
    nombreUsuario.innerText = `👤 ${usuario.nombre}`;
  }

  if (usuario.rol === "admin") {
    document.getElementById("panelAdmin").style.display = "block";
    cargarPanelAdmin();
  } else if (usuario.rol === "soporte") {
    document.getElementById("panelAdmin").style.display = "block";
    cargarPanelSoporte();
  } else {
    document.getElementById("panelUsuario").style.display = "block";
    cargarPanelUsuario();
  }
}

function cargarPanelAdmin() {
  mostrarVuelosAdmin();
  mostrarUsuariosAdmin();
}

function cargarPanelSoporte() {
  const tabUsuarios = document.querySelector('[onclick*="tabUsuarios"]');
  if (tabUsuarios) {
    tabUsuarios.style.display = "none";
  }

  const tabs = document.querySelector(".tabs");
  if (tabs && !document.getElementById("tabReclamos")) {
    const btnReclamos = document.createElement("button");
    btnReclamos.className = "tab-btn";
    btnReclamos.innerText = "📋 Reclamos de Soporte";
    btnReclamos.onclick = () => activarTab("tabReclamos");
    tabs.appendChild(btnReclamos);

    const tabReclamos = document.createElement("div");
    tabReclamos.id = "tabReclamos";
    tabReclamos.style.display = "none";
    tabReclamos.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2>📋 Reclamos de Soporte</h2>
        <button onclick="mostrarReclamos()" class="btn-guardar" style="padding: 10px 20px;">
          🔄 Actualizar
        </button>
      </div>
      <div id="listaReclamos"></div>
    `;
    document.getElementById("panelAdmin").appendChild(tabReclamos);
  }

  mostrarVuelosAdmin();
  mostrarReclamos();
}

function cargarPanelUsuario() {
  mostrarHistorialReservas();
}

// ============================================================
// PANEL ADMIN - VUELOS
// ============================================================
function mostrarVuelosAdmin(vuelos = vuelosGlobal) {
  const tbody = document.querySelector("#tablaVuelos tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  vuelos.forEach(vuelo => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${vuelo.idVuelo}</td>
      <td><input type="text" value="${vuelo.origen}" data-campo="origen" data-id="${vuelo.idVuelo}"></td>
      <td><input type="text" value="${vuelo.destino}" data-campo="destino" data-id="${vuelo.idVuelo}"></td>
      <td><input type="date" value="${vuelo.fechaSalida}" data-campo="fechaSalida" data-id="${vuelo.idVuelo}"></td>
      <td><input type="time" value="${vuelo.horaSalida}" data-campo="horaSalida" data-id="${vuelo.idVuelo}"></td>
      <td><input type="number" value="${vuelo.precio}" data-campo="precio" data-id="${vuelo.idVuelo}"></td>
      <td>
        <button class="btn-guardar" onclick="guardarVuelo('${vuelo.idVuelo}')">💾</button>
        <button class="btn-cancel" onclick="eliminarVuelo('${vuelo.idVuelo}')">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function crearVuelo() {
  const origen = document.getElementById("origenNuevo").value.trim();
  const destino = document.getElementById("destinoNuevo").value.trim();
  const fecha = document.getElementById("fechaNuevo").value;
  const hora = document.getElementById("horaNuevo").value;
  const precio = parseFloat(document.getElementById("precioNuevo").value);

  if (!origen || !destino || !fecha || !hora || !precio) {
    alert("⚠️ Completa todos los campos");
    return;
  }

  const nuevoId = `ALX${Math.floor(Math.random() * 9000) + 1000}`;

  const nuevoVuelo = {
    idVuelo: nuevoId,
    origen,
    destino,
    fechaSalida: fecha,
    horaSalida: hora,
    precio,
    asientosDisponibles: 140,
    estado: "Programado"
  };

  vuelosGlobal.push(nuevoVuelo);
  localStorage.setItem("vuelos", JSON.stringify(vuelosGlobal));

  alert("✅ Vuelo creado exitosamente");
  
  document.getElementById("origenNuevo").value = "";
  document.getElementById("destinoNuevo").value = "";
  document.getElementById("fechaNuevo").value = "";
  document.getElementById("horaNuevo").value = "";
  document.getElementById("precioNuevo").value = "";

  mostrarVuelosAdmin();
}

function guardarVuelo(idVuelo) {
  const inputs = document.querySelectorAll(`[data-id="${idVuelo}"]`);
  const vuelo = vuelosGlobal.find(v => v.idVuelo === idVuelo);

  if (!vuelo) return;

  inputs.forEach(input => {
    const campo = input.dataset.campo;
    vuelo[campo] = input.value;
  });

  localStorage.setItem("vuelos", JSON.stringify(vuelosGlobal));
  alert("✅ Vuelo actualizado");
}

function eliminarVuelo(idVuelo) {
  if (!confirm("¿Eliminar este vuelo?")) return;

  vuelosGlobal = vuelosGlobal.filter(v => v.idVuelo !== idVuelo);
  localStorage.setItem("vuelos", JSON.stringify(vuelosGlobal));
  
  alert("✅ Vuelo eliminado");
  mostrarVuelosAdmin();
}

function buscarVuelosEnTiempoReal() {
  const input = document.getElementById('busquedaVuelos').value.toLowerCase().trim();

  const filtrados = vuelosGlobal.filter(v => 
    v.idVuelo.toLowerCase().includes(input) ||
    v.origen.toLowerCase().includes(input) ||
    v.destino.toLowerCase().includes(input)
  );

  mostrarVuelosAdmin(filtrados);
}

// ============================================================
// PANEL ADMIN - USUARIOS
// ============================================================
function mostrarUsuariosAdmin() {
  const tbody = document.querySelector("#tablaUsuarios tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  usuariosGlobal.forEach(usuario => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${usuario.nombre}</td>
      <td>${usuario.email}</td>
      <td>
        <select data-campo="rol" data-email="${usuario.email}">
          <option value="minorista" ${usuario.rol === 'minorista' ? 'selected' : ''}>Minorista</option>
          <option value="corporativo" ${usuario.rol === 'corporativo' ? 'selected' : ''}>Corporativo</option>
          <option value="soporte" ${usuario.rol === 'soporte' ? 'selected' : ''}>Soporte</option>
          <option value="admin" ${usuario.rol === 'admin' ? 'selected' : ''}>Admin</option>
        </select>
      </td>
      <td>
        <select data-campo="activo" data-email="${usuario.email}">
          <option value="true" ${usuario.activo ? 'selected' : ''}>Activo</option>
          <option value="false" ${!usuario.activo ? 'selected' : ''}>Inactivo</option>
        </select>
      </td>
      <td>
        <button class="btn-cancel" onclick="eliminarUsuario('${usuario.email}')">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function guardarCambiosUsuarios() {
  const selects = document.querySelectorAll("#tablaUsuarios select");
  
  selects.forEach(select => {
    const email = select.dataset.email;
    const campo = select.dataset.campo;
    const valor = select.value;
    
    const usuario = usuariosGlobal.find(u => u.email === email);
    if (usuario) {
      if (campo === "activo") {
        usuario[campo] = valor === "true";
      } else {
        usuario[campo] = valor;
      }
    }
  });

  localStorage.setItem("usuarios", JSON.stringify(usuariosGlobal));
  alert("✅ Cambios guardados exitosamente");
}

function descartarCambiosUsuarios() {
  if (confirm("¿Descartar todos los cambios?")) {
    usuariosGlobal = JSON.parse(localStorage.getItem("usuarios"));
    mostrarUsuariosAdmin();
  }
}

function eliminarUsuario(email) {
  if (!confirm(`¿Eliminar usuario ${email}?`)) return;

  usuariosGlobal = usuariosGlobal.filter(u => u.email !== email);
  localStorage.setItem("usuarios", JSON.stringify(usuariosGlobal));
  
  alert("✅ Usuario eliminado");
  mostrarUsuariosAdmin();
}

// ============================================================
// PANEL SOPORTE - RECLAMOS
// ============================================================
function mostrarReclamos() {
  const container = document.getElementById("listaReclamos");
  if (!container) return;

  // Recargar desde localStorage cada vez
  reclamosSoporte = JSON.parse(localStorage.getItem("reclamosSoporte") || "[]");
  
  console.log("📋 Total de reclamos:", reclamosSoporte.length);
  console.log("Reclamos:", reclamosSoporte);

  if (reclamosSoporte.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">📋</div>
        <h3>No hay reclamos registrados</h3>
        <p>Cuando los clientes envíen reclamos, aparecerán aquí</p>
      </div>
    `;
    return;
  }

  container.innerHTML = "";

  // Ordenar por fecha (más recientes primero)
  const reclamosOrdenados = [...reclamosSoporte].sort((a, b) => {
    return new Date(b.fecha) - new Date(a.fecha);
  });

  reclamosOrdenados.forEach(reclamo => {
    const card = document.createElement("div");
    card.className = "reserva-item";
    card.style.cssText = "background: white; padding: 20px; border-radius: 12px; margin-bottom: 15px; border-left: 5px solid " + (reclamo.estado === 'Pendiente' ? '#ffc107' : '#28a745');
    
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
        <div>
          <strong style="font-size: 1.2rem; color: #007bff;">📋 Reclamo #${reclamo.id}</strong>
          <div style="margin-top: 5px; font-size: 0.9rem; color: #666;">
            ${new Date(reclamo.fecha).toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
        <span style="padding: 6px 15px; border-radius: 20px; font-weight: 700; font-size: 0.9rem; background: ${reclamo.estado === 'Pendiente' ? '#fff3cd' : '#d4edda'}; color: ${reclamo.estado === 'Pendiente' ? '#856404' : '#155724'};">
          ${reclamo.estado === 'Pendiente' ? '⏳ Pendiente' : '✅ Resuelto'}
        </span>
      </div>
      
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
        <p style="margin: 8px 0;"><strong>👤 Usuario:</strong> ${reclamo.nombreUsuario}</p>
        <p style="margin: 8px 0;"><strong>📧 Email:</strong> ${reclamo.emailUsuario}</p>
        <p style="margin: 8px 0;"><strong>📝 Asunto:</strong> ${reclamo.asunto}</p>
      </div>
      
      <div style="padding: 15px; background: white; border: 2px solid #e9ecef; border-radius: 8px; margin-bottom: 15px;">
        <strong style="color: #333;">💬 Mensaje:</strong>
        <p style="margin-top: 10px; color: #555; line-height: 1.6;">${reclamo.mensaje}</p>
      </div>
      
      ${reclamo.estado === 'Pendiente' ? `
        <div class="acciones-reserva" style="display: flex; gap: 10px; justify-content: flex-end;">
          <button class="btn-pagar" onclick="resolverReclamo('${reclamo.id}')" style="padding: 12px 25px;">
            ✅ Marcar como resuelto
          </button>
        </div>
      ` : `
        <div style="padding: 12px; background: #d4edda; border-radius: 8px; text-align: center; color: #155724; font-weight: 600;">
          ✅ Este reclamo fue resuelto el ${new Date(reclamo.fechaResolucion).toLocaleDateString('es-ES')}
        </div>
      `}
    `;
    container.appendChild(card);
  });
}

function resolverReclamo(idReclamo) {
  const reclamo = reclamosSoporte.find(r => r.id === idReclamo);
  if (!reclamo) return;

  reclamo.estado = "Resuelto";
  reclamo.fechaResolucion = new Date().toISOString();

  localStorage.setItem("reclamosSoporte", JSON.stringify(reclamosSoporte));

  enviarNotificacion(reclamo.emailUsuario, "Reclamo resuelto", 
    `Tu reclamo #${idReclamo} ha sido atendido y resuelto por nuestro equipo de soporte.`);

  alert("✅ Reclamo marcado como resuelto");
  mostrarReclamos();
}


function mostrarHistorialReservas() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario) return;

  reservasGlobal = JSON.parse(localStorage.getItem("reservas") || "[]");
  const misReservas = reservasGlobal.filter(r => r.emailUsuario === usuario.email);

  const pendientes = misReservas.filter(r => r.estado === "Pendiente");
  const pagadas = misReservas.filter(r => r.estado === "Pagada");

  mostrarReservasPorEstado(pendientes, "historialPendientes");
  mostrarReservasPorEstado(pagadas, "historialPagadas");

  const panelUsuario = document.getElementById("panelUsuario");
  if (panelUsuario && !document.getElementById("infoMillas")) {
    const infoMillas = document.createElement("div");
    infoMillas.id = "infoMillas";
    infoMillas.style.cssText = "background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 25px; border-radius: 15px; text-align: center; margin: 20px 0; box-shadow: 0 8px 20px rgba(0,0,0,0.15);";
    infoMillas.innerHTML = `
      <h3 style="margin-bottom: 15px; font-size: 1.4rem;">✈️ Tus Millas AeroG7</h3>
      <div style="font-size: 3.5rem; font-weight: 800; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">${usuario.millas || 0}</div>
      <p style="opacity: 0.95; margin-top: 15px; font-size: 1.1rem;">
        Tipo de cuenta: <strong>${usuario.rol === 'corporativo' ? '💼 Corporativo (15% descuento)' : '👤 Minorista'}</strong>
      </p>
    `;
    panelUsuario.insertBefore(infoMillas, panelUsuario.firstChild);
  }
}

function mostrarReservasPorEstado(reservas, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  if (reservas.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">📋</div>
        <h3>No hay reservas en esta categoría</h3>
      </div>
    `;
    return;
  }

  reservas.forEach(reserva => {
    const card = document.createElement("div");
    card.className = "reserva-item";
    
    const precioMostrar = monedaActual === "USD" 
      ? reserva.precioTotal 
      : (reserva.precioTotal * TASA_CAMBIO).toFixed(2);
    const simbolo = monedaActual === "USD" ? "USD" : "DOP";

    card.innerHTML = `
      <div class="reserva-details">
        <div>
          <strong style="font-size: 1.2rem; color: var(--primary);">✈️ Vuelo: ${reserva.idVuelo}</strong>
          <p style="margin: 8px 0; font-size: 1.05rem;"><strong>📍</strong> ${reserva.vuelo.origen} → ${reserva.vuelo.destino}</p>
          <p style="margin: 5px 0;"><strong>📅</strong> ${reserva.vuelo.fechaSalida} | <strong>⏰</strong> ${reserva.vuelo.horaSalida}</p>
          <p style="margin: 5px 0;"><strong>👥</strong> ${reserva.pasajeros.length} pasajero(s)</p>
          
          ${reserva.detalleAsientos && reserva.detalleAsientos.length > 0 ? `
            <div style="margin-top: 12px; padding: 12px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #007bff;">
              <strong style="color: #007bff; font-size: 1.05rem;">💺 Asientos:</strong>
              <div style="margin-top: 8px; display: grid; gap: 6px;">
                ${reserva.detalleAsientos.map(a => `
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.95rem;">
                    <span>${a.icono} <strong>${a.id}</strong> - ${a.clase}</span>
                    <span style="font-weight: 700; color: #28a745;">${a.precio.toFixed(2)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          ${reserva.estado === 'Pagada' ? `
            <p style="margin-top: 10px; color: #28a745; font-weight: 700;">
              ✨ Millas ganadas: <strong style="font-size: 1.2rem;">${reserva.millasGanadas}</strong>
            </p>
          ` : ''}
        </div>
        <div class="total">
          <span style="font-size: 0.9rem; color: #666;">Total</span>
          <div style="font-size: 1.8rem; font-weight: 800; color: #28a745;">${simbolo} ${precioMostrar}</div>
          ${reserva.descuentoAplicado && reserva.descuentoAplicado !== '0%' ? `
            <div style="font-size: 0.85rem; color: #28a745; margin-top: 5px;">
              🎉 Descuento: ${reserva.descuentoAplicado}
            </div>
          ` : ''}
        </div>
      </div>

      <div class="acciones-reserva">
        ${reserva.estado === 'Pendiente' ? `
          <button class="btn-pagar" onclick="abrirModalPago('${reserva.id}')">💳 Pagar</button>
          <button class="btn-cancelar" onclick="abrirModalCancelar('${reserva.id}')">❌ Cancelar</button>
        ` : `
          <span style="color: #28a745; font-weight: 700; font-size: 1.1rem;">✅ Pagada</span>
        `}
      </div>
    `;

    container.appendChild(card);
  });
}

function mostrarTabHistorial(tab) {
  document.getElementById("historialPendientes").style.display = tab === "pendiente" ? "block" : "none";
  document.getElementById("historialPagadas").style.display = tab === "pagado" ? "block" : "none";

  document.getElementById("pendienteBtn").classList.toggle("active", tab === "pendiente");
  document.getElementById("pagadoBtn").classList.toggle("active", tab === "pagado");
}


let reservaAPagar = null;

function abrirModalPago(idReserva) {
  reservaAPagar = reservasGlobal.find(r => r.id === idReserva);
  
  if (!reservaAPagar) return;

  const modal = document.getElementById("modalPago");
  const detalle = document.getElementById("detallePago");

  detalle.innerHTML = `
    <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
      <strong style="font-size: 1.2rem;">🎫 Reserva:</strong> ${reservaAPagar.id}<br>
      <strong>✈️ Vuelo:</strong> ${reservaAPagar.idVuelo}
    </div>
    
    ${reservaAPagar.detalleAsientos && reservaAPagar.detalleAsientos.length > 0 ? `
      <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
        <strong style="color: #007bff;">💺 Asientos seleccionados:</strong>
        ${reservaAPagar.detalleAsientos.map(a => `
          <div style="margin-top: 6px;">${a.icono} <strong>${a.id}</strong> - ${a.clase}: ${a.precio.toFixed(2)}</div>
        `).join('')}
      </div>
    ` : ''}
    
    <div style="font-size: 1.1rem; padding: 12px; background: #e7f3ff; border-radius: 8px; border-left: 4px solid #007bff;">
      <strong style="color: #007bff;">💰 Total a pagar:</strong> 
      <span style="font-size: 1.4rem; font-weight: 800; color: #28a745;">${reservaAPagar.precioTotal} USD</span>
    </div>
    
    <div style="margin-top: 10px; font-size: 0.95rem; color: #28a745; font-weight: 600;">
      ✨ <strong>Millas a ganar:</strong> ${reservaAPagar.millasGanadas}
    </div>
  `;

  modal.classList.add("show");
}

function procesarPago() {
  const nombre = document.getElementById("nombreTarjeta").value.trim();
  const numero = document.getElementById("numTarjeta").value.trim();
  const vence = document.getElementById("venceTarjeta").value.trim();
  const cvv = document.getElementById("cvvTarjeta").value.trim();

  if (!nombre || !numero || !vence || !cvv) {
    alert("⚠️ Completa todos los campos de pago");
    return;
  }

  if (numero.length !== 16) {
    alert("⚠️ Número de tarjeta inválido (debe tener 16 dígitos)");
    return;
  }

  reservaAPagar.estado = "Pagada";
  reservaAPagar.fechaPago = new Date().toISOString();

  const index = reservasGlobal.findIndex(r => r.id === reservaAPagar.id);
  reservasGlobal[index] = reservaAPagar;
  localStorage.setItem("reservas", JSON.stringify(reservasGlobal));

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  usuario.millas = (usuario.millas || 0) + reservaAPagar.millasGanadas;
  
  const indexUsuario = usuariosGlobal.findIndex(u => u.email === usuario.email);
  usuariosGlobal[indexUsuario].millas = usuario.millas;
  
  localStorage.setItem("usuario", JSON.stringify(usuario));
  localStorage.setItem("usuarios", JSON.stringify(usuariosGlobal));

  enviarNotificacion(usuario.email, "Pago confirmado", 
    `Tu pago de ${reservaAPagar.precioTotal} USD ha sido procesado exitosamente. Has ganado ${reservaAPagar.millasGanadas} millas. ¡Buen viaje!`);

  alert(`✅ ¡Pago procesado exitosamente!

💳 Monto: ${reservaAPagar.precioTotal} USD
✨ Has ganado ${reservaAPagar.millasGanadas} millas
🎯 Total de millas: ${usuario.millas}

¡Gracias por volar con AeroG7!`);

  cerrarModalPago();
  window.location.reload();
}

function cerrarModalPago() {
  const modal = document.getElementById("modalPago");
  modal.classList.remove("show");
  
  document.getElementById("nombreTarjeta").value = "";
  document.getElementById("numTarjeta").value = "";
  document.getElementById("venceTarjeta").value = "";
  document.getElementById("cvvTarjeta").value = "";
  
  reservaAPagar = null;
}


let reservaACancelar = null;

function abrirModalCancelar(idReserva) {
  reservaACancelar = reservasGlobal.find(r => r.id === idReserva);
  
  if (!reservaACancelar) return;

  const modal = document.getElementById("modalCancelar");
  
  const btnConfirmar = document.getElementById("btnConfirmarCancelacion");
  btnConfirmar.onclick = () => confirmarCancelacion(idReserva);

  modal.classList.add("show");
}

function confirmarCancelacion(idReserva) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  reservasGlobal = reservasGlobal.filter(r => r.id !== idReserva);
  localStorage.setItem("reservas", JSON.stringify(reservasGlobal));

  const vuelo = vuelosGlobal.find(v => v.idVuelo === reservaACancelar.idVuelo);
  if (vuelo) {
    vuelo.asientosDisponibles += reservaACancelar.pasajeros.length;
    localStorage.setItem("vuelos", JSON.stringify(vuelosGlobal));
  }

  enviarNotificacion(usuario.email, "Reserva cancelada", 
    `Tu reserva ${idReserva} ha sido cancelada exitosamente.`);

  alert("✅ Reserva cancelada exitosamente");

  cerrarModalCancelar();
  window.location.reload();
}

function cerrarModalCancelar() {
  const modal = document.getElementById("modalCancelar");
  modal.classList.remove("show");
  reservaACancelar = null;
}


function enviarNotificacion(email, asunto, mensaje) {
  const notificacion = {
    id: `NOTIF${Date.now()}`,
    email,
    asunto,
    mensaje,
    fecha: new Date().toISOString(),
    leida: false
  };

  let notificaciones = JSON.parse(localStorage.getItem("notificaciones") || "[]");
  notificaciones.push(notificacion);
  localStorage.setItem("notificaciones", JSON.stringify(notificaciones));

  console.log("📧 NOTIFICACIÓN ENVIADA:");
  console.log(`Para: ${email}`);
  console.log(`Asunto: ${asunto}`);
  console.log(`Mensaje: ${mensaje}`);
  console.log("-------------------");
}


function inicializarSoporte() {
  const formSoporte = document.getElementById("formSoporte");
  if (formSoporte) {
    formSoporte.addEventListener("submit", enviarReclamo);
  }

  const tabBtns = document.querySelectorAll(".support-tabs .tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".tab-panel").forEach(panel => {
        panel.style.display = "none";
      });

      document.getElementById(tab).style.display = "block";
    });
  });
}

function enviarReclamo(e) {
  e.preventDefault();

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!mensaje) {
    alert("⚠️ Por favor escribe tu mensaje");
    return;
  }

  const nuevoReclamo = {
    id: `REC${Date.now()}`,
    nombreUsuario: usuario ? usuario.nombre : nombre,
    emailUsuario: usuario ? usuario.email : correo,
    asunto: "Solicitud de soporte",
    mensaje,
    fecha: new Date().toISOString(),
    estado: "Pendiente"
  };

  // Obtener reclamos actuales
  let reclamosActuales = JSON.parse(localStorage.getItem("reclamosSoporte") || "[]");
  
  // Agregar el nuevo reclamo
  reclamosActuales.push(nuevoReclamo);
  
  // Guardar en localStorage
  localStorage.setItem("reclamosSoporte", JSON.stringify(reclamosActuales));
  
  // Actualizar variable global
  reclamosSoporte = reclamosActuales;

  console.log("✅ Reclamo guardado:", nuevoReclamo);
  console.log("📋 Total de reclamos:", reclamosActuales.length);

  alert("✅ Tu mensaje ha sido enviado exitosamente.\n\n📋 ID del reclamo: " + nuevoReclamo.id + "\n\nNuestro equipo te contactará pronto.");
  
  document.getElementById("formSoporte").reset();
  
 
  if (window.location.pathname.includes("dashboard.html")) {
    mostrarReclamos();
  }
}


function activarTab(tabId) {
  const tabs = ["tabVuelos", "tabUsuarios", "tabReclamos"];
  tabs.forEach(tab => {
    const element = document.getElementById(tab);
    if (element) element.style.display = "none";
  });

  const selectedTab = document.getElementById(tabId);
  if (selectedTab) selectedTab.style.display = "block";

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  if (tabId === "tabReclamos") {
    mostrarReclamos();
  }
}


window.login = login;
window.registrarUsuario = registrarUsuario;
window.logout = logout;
window.cargarVuelos = cargarVuelos;
window.buscarVuelos = buscarVuelos;
window.mostrarVuelos = mostrarVuelos;
window.toggleMoneda = toggleMoneda;
window.abrirModalReserva = abrirModalReserva;
window.confirmarReserva = confirmarReserva;
window.cerrarModal = cerrarModal;
window.abrirModalPago = abrirModalPago;
window.procesarPago = procesarPago;
window.cerrarModalPago = cerrarModalPago;
window.abrirModalCancelar = abrirModalCancelar;
window.cerrarModalCancelar = cerrarModalCancelar;
window.crearVuelo = crearVuelo;
window.guardarVuelo = guardarVuelo;
window.eliminarVuelo = eliminarVuelo;
window.buscarVuelosEnTiempoReal = buscarVuelosEnTiempoReal;
window.guardarCambiosUsuarios = guardarCambiosUsuarios;
window.descartarCambiosUsuarios = descartarCambiosUsuarios;
window.eliminarUsuario = eliminarUsuario;
window.mostrarTabHistorial = mostrarTabHistorial;
window.activarTab = activarTab;
window.resolverReclamo = resolverReclamo;