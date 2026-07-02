// Cambiar pestañas
const tabs = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('section');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    sections.forEach(sec => {
      sec.classList.remove('active');
      if(sec.id === target) sec.classList.add('active');
    });
  });
});

// Toggle detalles certificación
const toggleButtons = document.querySelectorAll('.toggle-btn');
toggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const p = btn.nextElementSibling;
    if(p.style.display === 'block'){
      p.style.display = 'none';
      btn.textContent = 'Ver detalles';
    } else {
      p.style.display = 'block';
      btn.textContent = 'Ocultar detalles';
    }
  });
});






// Modal de Certificados
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");
const closeSpan = document.getElementsByClassName("close")[0];

// tarjetas de certificados
const certCards = document.querySelectorAll('.cert-card');

certCards.forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    const title = card.querySelector('h3').innerText;
    
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = title; // título del curso debajo de la imagen
  });
});

// Cerrar al dar clic en la X
closeSpan.onclick = function() { 
  modal.style.display = "none";
}

// Cerrar al dar clic fuera de la imagen
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}