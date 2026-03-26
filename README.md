# 🚀 TaskFlow

## 🌐 Demo online

https://bootcamp-project-weld.vercel.app

---

## 📌 Descripción

TaskFlow es una aplicación web para la gestión de tareas que permite crear, editar, completar y eliminar tareas, además de organizarlas mediante filtros, tags, prioridades y programación por fechas.

Este proyecto evoluciona desde una aplicación frontend con LocalStorage hacia una arquitectura fullstack, incorporando un backend con API REST desarrollada con Node.js y Express.

---

## 🧠 Arquitectura del proyecto

La aplicación sigue una arquitectura cliente-servidor:

Frontend (HTML + JS)  
↓  
Fetch API (HTTP)  
↓  
Backend (Node.js + Express)  
↓  
Servicios (lógica de negocio)  

El backend está estructurado en capas:

- Routes → Definen endpoints  
- Controllers → Manejan request/response  
- Services → Lógica de negocio  
- Middlewares → Logger, errores, CORS  

Documentación:
- https://expressjs.com/
- https://nodejs.org/en/docs
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

## ⚙️ Funcionalidades

### 📝 Gestión de tareas
- Crear tareas  
- Editar tareas (modal)  
- Eliminar tareas  
- Marcar como completadas  

### 🗂️ Organización
- Tags personalizados  
- Filtros por estado  
- Filtros por tag  
- Búsqueda por texto  

### 🧠 Mejora de tareas
- Prioridad (baja, media, alta)  
- Descripción opcional  

### ⏱️ Programación
- Fecha inicio / fin  
- Estados automáticos:
  - Programada  
  - Próxima  
  - Vencida  
  - Completada  

### ⚡ Acciones masivas
- Completar todas  
- Eliminar completadas  

### 📊 Estadísticas
- Total  
- Completadas  
- Pendientes  
- % progreso  

---

## 🔌 API REST

Base URL:
http://localhost:3000/api/v1

Endpoints:

GET /tasks → obtener todas las tareas  
POST /tasks → crear tarea  
PATCH /tasks/:id → actualizar tarea  
DELETE /tasks/:id → eliminar tarea  
GET /health → comprobar servidor  

Ejemplo de creación:

title: "Nueva tarea"  
completed: false  

---

## 🧪 Testing

Se han probado los endpoints usando:

- curl  
- navegador  
- frontend conectado  

Ejemplo:

curl http://localhost:3000/api/v1/tasks  

---

## ⚠️ Manejo de errores

La API implementa:

- 400 → validación  
- 404 → recurso no encontrado  
- 500 → error interno  

---

## 💾 Persistencia de datos

Actualmente, los datos se almacenan en memoria en el backend.

Esto implica:

- Los datos se pierden al reiniciar el servidor  
- Es una solución temporal antes de integrar base de datos  

---

## 🌙 Modo oscuro

Se guarda en LocalStorage:

https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

---

## 📱 Responsive

Adaptado a:

- móvil  
- tablet  
- desktop (incluyendo 2K)  

---

## 🛠️ Tecnologías utilizadas

- HTML5  
- CSS3 + Tailwind  
- JavaScript (Vanilla)  
- Node.js  
- Express.js  
- Fetch API  
- Git / GitHub  
- Vercel  

---

## 📁 Estructura del proyecto

bootcamp-project/  
│  
├── index.html  
├── app.js  
├── server/  
│   ├── src/  
│   │   ├── controllers/  
│   │   ├── routes/  
│   │   ├── services/  
│   │   ├── middlewares/  
│   │   └── index.js  
│   └── .env  
│  
├── docs/  
│   ├── ai/  
│   └── design/  

---

## 🚀 Ejecución en local

Backend:

cd server  
npm install  
npm run dev  

Frontend:

Abrir index.html con Live Server:  
http://127.0.0.1:5500  

---

## ♿ Accesibilidad

Buenas prácticas aplicadas:

- labels asociados  
- navegación con teclado  
- modales accesibles  

https://www.w3.org/WAI/fundamentals/accessibility-intro/

---

## 🤖 Uso de IA

Se ha utilizado IA para:

- generación de código  
- debugging  
- refactorización  
- documentación  

Documentación en:

docs/ai/

---

## 🚀 Despliegue

Frontend desplegado en Vercel:

https://vercel.com/docs/deployments/git

---

## 🖼️ Diseño final

Como resultado final tras la implementación de tags, prioridades, fechas y mejoras de UI:

<img width="870" height="850" alt="image" src="https://github.com/user-attachments/assets/7614c328-b943-4a57-bb0a-1f7dc78abaf9" />

---

## 🧠 Conclusión

Este proyecto demuestra la transición de una aplicación frontend a una arquitectura fullstack, incorporando una API REST, separación por capas y buenas prácticas de desarrollo moderno.

---

## 👨‍💻 Autor

Proyecto realizado como parte de las prácticas en Corner Studio.
