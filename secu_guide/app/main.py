from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
import random
import string

app = FastAPI(title="SecuGuide - Asistente Digital de Seguridad y Soporte")

class PasswordCheck(BaseModel):
    password: str

# Montar archivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def read_index():
    index_path = os.path.join("static", "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    raise HTTPException(status_code=404, detail="index.html not found")

@app.post("/api/validate-password")
def validate_password(data: PasswordCheck):
    pwd = data.password
    score = 0
    feedback = []

    if len(pwd) >= 8:
        score += 1
    else:
        feedback.append("Usa al menos 8 caracteres.")

    if len(pwd) >= 12:
        score += 1

    if any(c.isupper() for c in pwd) and any(c.islower() for c in pwd):
        score += 1
    else:
        feedback.append("Combina letras mayúsculas y minúsculas.")

    if any(c.isdigit() for c in pwd):
        score += 1
    else:
        feedback.append("Agrega al menos un número.")

    if any(c in string.punctuation for c in pwd):
        score += 1
    else:
        feedback.append("Incluye símbolos especiales (ej. @, #, $, !).")

    # Determinar nivel amigable
    if score <= 2:
        strength = "Débil ❌"
        description = "Es fácil de adivinar por programas maliciosos."
    elif score <= 4:
        strength = "Buena ⚠️"
        description = "Es decente, pero puede mejorar con símbolos o más longitud."
    else:
        strength = "¡Excelente y Segura! 🛡️"
        description = "Muy difícil de descifrar. ¡Felicitaciones!"

    return {
        "strength": strength,
        "description": description,
        "suggestions": feedback
    }

@app.get("/api/generate-password")
def generate_password():
    length = 14
    chars = string.ascii_letters + string.digits + "!@#$%^&*"
    while True:
        pwd = "".join(random.choice(chars) for _ in range(length))
        if (any(c.isupper() for c in pwd) and 
            any(c.islower() for c in pwd) and 
            any(c.isdigit() for c in pwd) and 
            any(c in "!@#$%^&*" for c in pwd)):
            return {"password": pwd}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
