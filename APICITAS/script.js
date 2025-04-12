let quoteObj = {};

async function fetchQuotes() {
  try {
    const res = await fetch("https://quoteslate.vercel.app/api/quotes/random");
    const data = await res.json();
    quoteObj = data;
    translateQuote(quoteObj.quote);  // Traducir la cita cuando la cargue
  } catch (error) {
    console.error("Error al cargar las frases:", error);
    document.getElementById('quote').innerText = "No se pudieron cargar las frases.";
    document.getElementById('author').innerText = "";
  }
}

async function translateQuote(text) {
  try {
    // Solicitar la traducción a Google Translate sin clave API
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|es`);
    const data = await res.json();
    
    // Si la traducción está disponible, se actualizará
    if (data.responseData && data.responseData.translatedText) {
      document.getElementById('quote').innerText = `"${data.responseData.translatedText}"`;
    } else {
      document.getElementById('quote').innerText = `"${text}"`; // Si falla, muestra el original
    }
    document.getElementById('author').innerText = `- ${quoteObj.author || "Anónimo"}`;
  } catch (error) {
    console.error("Error al traducir la frase:", error);
    document.getElementById('quote').innerText = `"${text}"`;  // Si falla, muestra la original
  }
}

function nextQuote() {
  fetchQuotes();
}

function prevQuote() {
  fetchQuotes(); // no hay historial, pero puedes repetir
}

fetchQuotes();
