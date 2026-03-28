# TaskFlow

TaskFlow es una aplicación web de gestión de tareas desarrollada como práctica de backend y despliegue full stack.

## 🌍 Acceso a la aplicación

- 🚀 **Frontend (App)**  
  https://bootcamp-frontback.vercel.app/

- 🔗 **Backend API (Base URL)**  
  https://bootcamp-frontback.vercel.app/api/v1

- 📚 **Documentación Swagger**  
  https://bootcamp-frontback.vercel.app/api-docs/

La aplicación permite:

- crear tareas
- editarlas
- marcarlas como completadas
- eliminarlas
- filtrarlas
- organizarlas por tags
- asignar prioridad
- añadir descripción
- programarlas con fecha de inicio y fecha de fin

## Estado actual del proyecto

Actualmente el proyecto está desplegado en **un único proyecto de Vercel**, integrando:

- **frontend estático**
- **backend con Node.js + Express**
- **documentación Swagger**
- **rutas unificadas en el mismo dominio**

## Integraciones realizadas

Durante la evolución del proyecto se han realizado estas integraciones principales:

- Integración de **frontend y backend en un único despliegue**
- Integración de **API REST** para la gestión de tareas
- Integración de **Swagger** para documentar y probar la API
- Integración de **Vercel Functions** para ejecutar el backend
- Integración de **rewrites** en `vercel.json` para enrutar frontend, backend y documentación
- Integración de **Tailwind CSS** para el diseño visual
- Integración de **modo oscuro**
- Integración de **filtros**, **estadísticas**, **tags** y **prioridades**
- Integración de tareas con **fechas de inicio y fin**

## Tecnologías

### Frontend
- HTML
- JavaScript
- Tailwind CSS

### Backend
- Node.js
- Express

### Documentación
- Swagger
- Markdown

### Despliegue
- Vercel

## Rutas principales

### Aplicación
- `/`

### API
- `/api/v1/health`
- `/api/v1/tasks`

### Documentación
- `/api-docs/`

## Estructura general

```text
/
├── api/
├── public/
├── server/
├── docs/
├── vercel.json
├── package.json

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
