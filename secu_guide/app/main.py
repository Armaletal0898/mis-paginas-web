#!/usr/env/python3
#-*- coding: utf-8 -*-

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os

app = FastAPI(
    title="SecuGuide Backend",
    description="API para el asistente de soporte tecnológico preventivo",
    version="1.0.0"
)

# Configuración de rutas estáticas para separar HTML, CSS y JS
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")


# Montar la carpeta static para que el navegador pueda acceder a los CSS y JS
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


# Modelo de datos para recibir consultas de contraseñas desde el Fronted
class PasswordCheckRequest(BaseModel):
    password: str


# Ruta principal: Devuelve el archivo HTML principal
@app.get("/")
async def serve_index():
    index_file = os.path.join(STATIC_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    raise HTTPException(status_code=404, detail="Página principal no encontrada")



# Endpoint de la API para verificar el estado del sistema (Salud del Servidor)
@app.get("/api/v1/health")
async def health_check():
    return {
        "status": "online",
        "system": "SecuGuide API",
        "message": "El sistema opera con total normalidad para el usuario."
    }




# Endpoint funcional de ejemplo: Evaluación básica de contraseñas (RF-04)
@app.post("api/v1/evaluar-password")
async def evaluate_password(data: PasswordCheckRequest):
    pwd = data.password
    score = 0
    feedback = ̣[]

    if len(pwd) >= 8:
        score += 1
    else:
        feedback.append("Usa al menos 8 caracteres.")

    if any(char.isupper() for char in pwd) and any(char.islower() for char in pwd):
        score += 1
    else:
        feedback.append("Combina letras mayúsculas y minúsculas.")

    if any(char.isdigit() for char in pwd):
        score += 1
    else:
        feedback.append("Incluy al menos un número.")

    secure_level = "Débil"
    if score == 2:
        secure_level = "Moderada"
    elif score >= 3:
        secure_level = "Fuerte"

    return {
        "nivel": secure_level,
        "recomendaciones": feedback if feedback else ["¡Excelente contraseña! Es segura."]
    }
