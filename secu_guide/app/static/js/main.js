document.addEventListener("DOMContentLoaded", () => {
    // 1. Validador de Contraseñas en vivo
    const userPassword = document.getElementById("userPassword");
    const pwdResult = document.getElementById("pwdResult");
    const pwdStrengthText = document.getElementById("pwdStrengthText").querySelector("span");
    const pwdDescText = document.getElementById("pwdDescText");
    const pwdSuggestions = document.getElementById("pwdSuggestions");

    if (userPassword) {
        userPassword.addEventListener("input", async () => {
            const password = userPassword.value;
            if (password.length === 0) {
                pwdResult.classList.add("hidden");
                return;
            }

            try {
                const response = await fetch("/api/validate-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ password })
                });
                const data = await response.json();

                if (response.ok) {
                    pwdResult.classList.remove("hidden");
                    pwdStrengthText.textContent = data.strength;
                    pwdDescText.textContent = data.description;
                    
                    pwdSuggestions.innerHTML = "";
                    data.suggestions.forEach(s => {
                        const li = document.createElement("li");
                        li.textContent = s;
                        pwdSuggestions.appendChild(li);
                    });
                }
            } catch (error) {
                console.error("Error validando contraseña:", error);
            }
        });
    }

    // 2. Generador automático de contraseñas
    const btnGenerate = document.getElementById("btnGenerate");
    const generatedPassword = document.getElementById("generatedPassword");

    if (btnGenerate) {
        btnGenerate.addEventListener("click", async () => {
            try {
                const response = await fetch("/api/generate-password");
                const data = await response.json();
                if (response.ok) {
                    generatedPassword.value = data.password;
                    generatedPassword.select();
                    navigator.clipboard.writeText(data.password);
                    alert("¡Contraseña segura generada y copiada al portapapeles!");
                }
            } catch (error) {
                console.error("Error generando contraseña:", error);
            }
        });
    }

    // 3. Buscador en tiempo real para el Glosario
    const glossarySearch = document.getElementById("glossarySearch");
    const glossaryCards = document.querySelectorAll(".glossary-card");

    if (glossarySearch) {
        glossarySearch.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase().trim();
            glossaryCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(term)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
});

// 4. Sistema de Pestañas para el Troubleshooting
function switchTab(evt, tabName) {
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach(content => content.classList.remove("active"));

    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => btn.classList.remove("active"));

    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}
