console.log("Script ejecutado");

function actualizarMenu() {
  fetch('menu.json')
    .then(response => response.json())
    .then(data => {
      const menuItems = data.menuJson;
      const menuElement = document.getElementById('menu');
      menuElement.innerHTML = '';

      menuItems.forEach(item => {
        const menuItem = document.createElement('li');

        // Crear el enlace principal
        const link = document.createElement('a');
        link.href = item.url;
        link.textContent = item.name;

        menuItem.appendChild(link);

        // Si hay un submenu, crearlo
        if (item.submenu && item.submenu.length > 0) {
          const subMenu = document.createElement('ul');
          subMenu.classList.add('submenu');

          item.submenu.forEach(sub => {
            const subMenuItem = document.createElement('li');
            const subMenuLink = document.createElement('a');
            subMenuLink.href = sub.url;
            subMenuLink.textContent = sub.name;

            subMenuItem.appendChild(subMenuLink);
            subMenu.appendChild(subMenuItem);
          });

          menuItem.appendChild(subMenu);
          menuItem.classList.add('has-submenu');
        }

        menuElement.appendChild(menuItem);
      });
    })
    .catch(error => console.error("Error cargando el menú:", error));
}

actualizarMenu();
setInterval(actualizarMenu, 5000); // Actualiza el menú cada 5 segundos
