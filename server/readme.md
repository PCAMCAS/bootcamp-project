# 🚀 Backend de TaskFlow

Documentación técnica del backend de **TaskFlow**, una API REST desarrollada con Node.js y Express para la gestión de tareas.

---

## 🧠 1. Descripción general

El backend permite gestionar tareas mediante una API REST.

### Funcionalidades principales

- 📥 Obtener todas las tareas  
- ➕ Crear nuevas tareas  
- ✏️ Actualizar tareas  
- ❌ Eliminar tareas  
- 🟢 Verificar estado del servidor  

⚠️ Las tareas se almacenan en memoria → **no hay persistencia tras reinicio**

---

## 🌐 2. Endpoints de la API

### 🟢 2.1 Health check

GET `/api/v1/health`

Permite comprobar que el servidor está activo.

Respuesta:

{
  "ok": true,
  "message": "Servidor funcionando"
}

---

### 📋 2.2 Obtener todas las tareas

GET `/api/v1/tasks`

Devuelve todas las tareas almacenadas.

Respuesta:

[]

o:

[
  {
    "id": 1,
    "title": "Preparar práctica",
    "description": "Revisar README y Swagger",
    "tag": "estudio",
    "startAt": "2026-03-28T18:00",
    "endAt": "2026-03-28T20:00",
    "priority": "alta",
    "completed": false,
    "createdAt": "2026-03-28T18:10:00.000Z"
  }
]

---

### ➕ 2.3 Crear una tarea

POST `/api/v1/tasks`

Crea una nueva tarea.

Entrada:

{
  "title": "Preparar práctica",
  "description": "Revisar README y Swagger",
  "tag": "estudio",
  "startAt": "2026-03-28T18:00",
  "endAt": "2026-03-28T20:00",
  "priority": "alta",
  "completed": false
}

Respuesta:

{
  "id": 1,
  "title": "Preparar práctica",
  "description": "Revisar README y Swagger",
  "tag": "estudio",
  "startAt": "2026-03-28T18:00",
  "endAt": "2026-03-28T20:00",
  "priority": "alta",
  "completed": false,
  "createdAt": "2026-03-28T18:10:00.000Z"
}

---

### ✏️ 2.4 Actualizar una tarea

PATCH `/api/v1/tasks/:id`

Permite actualizar parcialmente una tarea.

Ejemplo:

{
  "title": "Preparar práctica final",
  "completed": true
}

Respuesta:

{
  "id": 1,
  "title": "Preparar práctica final",
  "description": "Revisar README y Swagger",
  "tag": "estudio",
  "startAt": "2026-03-28T18:00",
  "endAt": "2026-03-28T20:00",
  "priority": "alta",
  "completed": true,
  "createdAt": "2026-03-28T18:10:00.000Z"
}

---

### ❌ 2.5 Eliminar una tarea

DELETE `/api/v1/tasks/:id`

Elimina una tarea por ID.

Respuesta:

204 No Content

---

## ✅ 3. Validaciones

El backend valida todos los datos antes de procesarlos:

- `title` → obligatorio (mínimo 3 caracteres)  
- `description` → texto  
- `tag` → texto  
- `startAt` / `endAt` → fechas válidas o vacío  
- `endAt` no puede ser anterior a `startAt`  
- `priority` → baja | media | alta  
- `completed` → booleano  
- `id` → entero positivo  
- PATCH → debe incluir al menos un campo  

---

## ⚠️ 4. Gestión de errores

### 🔴 400 - Error de validación

{
  "error": "El título es obligatorio y debe tener al menos 3 caracteres."
}

{
  "error": "La fecha de fin no puede ser anterior a la fecha de inicio."
}

---

### 🔴 404 - No encontrado

{
  "error": "Tarea no encontrada"
}

{
  "error": "Ruta no encontrada"
}

---

### 🔴 500 - Error interno

{
  "error": "Error interno del servidor"
}

---

### 🔴 403 - CORS

{
  "error": "Origen no permitido por CORS"
}

---

## 🧾 5. Formato JSON de las tareas

{
  "id": 1,
  "title": "Texto de la tarea",
  "description": "Descripción opcional",
  "tag": "tag-normalizado",
  "startAt": "2026-03-28T18:00",
  "endAt": "2026-03-28T20:00",
  "priority": "media",
  "completed": false,
  "createdAt": "2026-03-28T18:10:00.000Z"
}

---

## 🏗️ 6. Estructura del backend

server/
├── src/
│   ├── index.js
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   └── services/

---

## 🧩 7. Fragmentos de código

### Logger middleware

const loggerAcademico = (req, res, next) => {
  const inicio = Date.now();

  res.on('finish', () => {
    const duracion = Date.now() - inicio;
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duracion}ms)`);
  });

  next();
};

---

### Rutas principales

app.get('/api/v1/health', (req, res) => {
  return res.status(200).json({ ok: true, message: 'Servidor funcionando' });
});

app.use('/api/v1/tasks', taskRoutes);

---

## ☁️ 8. Despliegue en Vercel

Configuración actual:

- Frontend → `/public`  
- Backend → `/api` (Vercel Functions)  
- Express adaptado a entorno serverless  
- Routing → `vercel.json`  
- Swagger → `/api-docs`  

---

## 🧪 9. Ejecución en local

npm install  
npm run dev  

---

## ⚠️ 10. Limitaciones actuales

- ❌ Sin base de datos  
- ❌ Sin persistencia  
- ❌ Sin autenticación  
- ❌ Sin tests automáticos  

---

## 🎯 Resumen

Este backend implementa una API REST completa para la gestión de tareas, incluyendo:

- validación de datos  
- control de errores  
- arquitectura modular  
- despliegue en Vercel  

Su objetivo es demostrar buenas prácticas de desarrollo backend en un entorno real.