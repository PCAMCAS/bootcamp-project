# 📡 Backend API - TaskFlow

## 📌 Introducción

En esta fase del proyecto, TaskFlow evoluciona hacia una arquitectura fullstack mediante la implementación de un backend con Node.js y Express.

El frontend se comunica con el backend a través de peticiones HTTP, eliminando el uso de LocalStorage como sistema principal de persistencia.

---

## 🔌 Comunicación cliente-servidor

El frontend utiliza la API nativa Fetch para realizar peticiones HTTP al backend.

Ejemplo:

```js
fetch("http://localhost:3000/api/v1/tasks")
```

📚 Documentación:
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

## 🧠 Arquitectura del backend

El backend sigue una arquitectura por capas:

* **Routes** → Definen las rutas HTTP
* **Controllers** → Gestionan request y response
* **Services** → Contienen la lógica de negocio
* **Middlewares** → Funcionalidades transversales (logger, errores, CORS)

### Ventajas

* Separación de responsabilidades
* Código más limpio y mantenible
* Escalabilidad

---

## 🔌 API REST

### Base URL

```text
http://localhost:3000/api/v1
```

---

## 📍 Endpoints

### 🔹 Obtener todas las tareas

```http
GET /tasks
```

✅ Respuesta:

```json
[
  {
    "id": 1,
    "title": "Ejemplo",
    "completed": false,
    "createdAt": "2026-03-26T08:35:51.638Z"
  }
]
```

---

### 🔹 Crear una tarea

```http
POST /tasks
```

Body:

```json
{
  "title": "Nueva tarea",
  "completed": false
}
```

✅ Respuesta:

```json
{
  "id": 1,
  "title": "Nueva tarea",
  "completed": false,
  "createdAt": "2026-03-26T08:35:51.638Z"
}
```

❌ Error (validación):

```json
{
  "error": "El título es obligatorio y debe tener al menos 3 caracteres."
}
```

---

### 🔹 Actualizar una tarea

```http
PATCH /tasks/:id
```

Body:

```json
{
  "completed": true
}
```

---

### 🔹 Eliminar una tarea

```http
DELETE /tasks/:id
```

✅ Respuesta:

```http
204 No Content
```

❌ Error:

```json
{
  "error": "Tarea no encontrada"
}
```

---

### 🔹 Health check

```http
GET /health
```

```json
{
  "ok": true,
  "message": "Servidor funcionando"
}
```

---

## 🔐 Validación de datos

El backend implementa validación manual en los controladores.

Reglas:

* El título es obligatorio
* Debe tener al menos 3 caracteres

Si no se cumplen:

* Se devuelve error 400

---

## ⚠️ Manejo de errores

Se implementa un middleware global de errores.

Tipos de errores:

* **400** → Error del cliente (validación)
* **404** → Recurso no encontrado
* **500** → Error interno del servidor

Esto garantiza respuestas consistentes.

---

## 🧪 Testing de la API

La API se ha probado utilizando:

* curl
* navegador
* Swagger UI

### Ejemplos

```bash
curl http://localhost:3000/api/v1/tasks
```

```bash
curl -X POST http://localhost:3000/api/v1/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Test","completed":false}'
```

---

## 🛠️ Herramientas utilizadas

### Swagger

Permite documentar y probar la API desde el navegador:

👉 http://localhost:3000/api-docs

📚 https://swagger.io/

---

### Postman

Herramienta para probar endpoints sin frontend.

📚 https://www.postman.com/

---

### Axios

Librería alternativa a Fetch para peticiones HTTP.

📚 https://axios-http.com/

---

## 💾 Persistencia de datos

Actualmente los datos se almacenan en memoria:

```js
let tasks = []
```

Esto implica:

* Los datos se pierden al reiniciar el servidor
* Es una solución temporal

---

## 🚀 Conclusión

La implementación del backend permite:

* Separar frontend y lógica de negocio
* Trabajar con APIs reales
* Aplicar arquitectura por capas
* Preparar el proyecto para escalar con base de datos

Este paso marca la transición hacia un desarrollo fullstack profesional.
