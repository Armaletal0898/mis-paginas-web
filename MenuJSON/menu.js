console.log ("Script ejecutado");


function actualizarMenu() {
  fetch('menu.json')
    .then(response => response.json())
    .then(data => {
      const menuItems = data.menuJson;
      // Actualiza el menú en la página
      const menuElement = document.getElementById('menu');
      menuElement.innerHTML = '';
      menuItems.forEach(item => {
        const menuItem = document.createElement('li');
        menuItem.innerHTML = `<a href="${item.url}">${item.name}</a>`;
        menuElement.appendChild(menuItem);
      });
    });
}
actualizarMenu();
setInterval(actualizarMenu, 5000); // Actualiza el menu cada 5 segundo