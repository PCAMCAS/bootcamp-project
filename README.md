#  TaskFlow — Aplicación Fullstack de Gestión de Tareas

> Aplicación fullstack desplegada en Vercel que integra frontend, backend y documentación en un único entorno.

TaskFlow es una aplicación web para la gestión de tareas que permite crear, organizar y visualizar actividades con prioridad, fechas, tags y estado de completado.

---

##  Tabla de Contenidos

1. [Acceso a la aplicación](#-acceso-a-la-aplicación)
2. [Arquitectura del proyecto](#-arquitectura-del-proyecto)
3. [Infraestructura del backend](#-infraestructura-del-backend)
4. [API REST](#-api-rest)
5. [Modelo de datos](#-modelo-de-datos)
6. [Frontend](#-frontend)
7. [Despliegue en Vercel](#-despliegue-en-vercel)
8. [Documentación Swagger](#-documentación-swagger)
9. [Ejecución en local](#-ejecución-en-local)
10. [Decisiones técnicas](#-decisiones-técnicas)

---

##  Acceso a la aplicación

*  Frontend
  https://bootcamp-frontback.vercel.app/

*  Health check
  https://bootcamp-frontback.vercel.app/api/v1/health

*  API
  https://bootcamp-frontback.vercel.app/api/v1/tasks

*  Swagger
  https://bootcamp-frontback.vercel.app/api-docs/

---

##  Arquitectura del proyecto

El proyecto sigue una arquitectura fullstack unificada:

```text
Usuario → Frontend (public/) → API REST → Backend (Express)
```

### Estructura de carpetas

```text
/
├── api/                # Entrada para Vercel Functions
├── public/             # Frontend estático
├── server/             # Backend Express
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middlewares/
│   └── config/
├── docs/
├── server.js           # Entrada backend
├── vercel.json
└── package.json
```

---

##  Infraestructura del backend

El backend está desarrollado con **Node.js + Express** y organizado en capas.

### Flujo de petición

```text
HTTP Request
   ↓
Routes → Controller → Service
   ↓
HTTP Response
```

### Separación de responsabilidades

| Capa       | Responsabilidad                            |
| ---------- | ------------------------------------------ |
| Routes     | Define endpoints y conecta con controllers |
| Controller | Valida datos, gestiona request/response    |
| Service    | Lógica de negocio y manipulación de datos  |

---

###  Middleware global

El servidor incluye varios middlewares:

* **CORS restringido**

  * Solo permite peticiones desde `CLIENT_URL`
* **express.json()**

  * Parseo de cuerpos JSON
* **Logger personalizado**

  * Registro de peticiones (`loggerAcademico`)
* **Manejo global de errores**

  * Traduce errores a respuestas HTTP (`404`, `403`, `500`)
* **Catch-all 404**

  * Devuelve JSON si la ruta no existe

---

##  API REST

### Base URL

```text
https://bootcamp-frontback.vercel.app/api/v1
```

---

###  Endpoints disponibles

| Método | Endpoint     | Descripción              |
| ------ | ------------ | ------------------------ |
| GET    | `/tasks`     | Obtener todas las tareas |
| POST   | `/tasks`     | Crear tarea              |
| PATCH  | `/tasks/:id` | Actualizar tarea         |
| DELETE | `/tasks/:id` | Eliminar tarea           |
| GET    | `/health`    | Estado del servidor      |

---

###  GET /tasks

Devuelve todas las tareas almacenadas.

```bash
curl /api/v1/tasks
```

---

###  POST /tasks

Crea una nueva tarea.

```json
{
  "title": "Nueva tarea",
  "description": "Descripción opcional",
  "tag": "trabajo",
  "priority": "media"
}
```

### Validaciones

* `title` obligatorio (mínimo 3 caracteres)
* fechas válidas (`startAt`, `endAt`)
* `endAt` no puede ser anterior a `startAt`
* prioridad: `baja | media | alta`
* `completed` debe ser booleano

---

###  PATCH /tasks/:id

Actualiza parcialmente una tarea.

* Requiere al menos un campo
* Solo modifica los campos enviados

---

###  DELETE /tasks/:id

Elimina una tarea por ID.

---

##  Modelo de datos

```json
{
  "id": 1,
  "title": "Preparar entrega",
  "description": "Revisar backend",
  "tag": "bootcamp",
  "startAt": "2026-03-28T10:00:00.000Z",
  "endAt": "2026-03-28T13:00:00.000Z",
  "priority": "alta",
  "completed": false,
  "createdAt": "2026-03-28T09:45:00.000Z"
}
```

---

##  Frontend

El frontend está desarrollado con:

* HTML
* JavaScript (Vanilla)
* Tailwind CSS

### Características principales

* Consumo de API mediante `fetch`
* Renderizado dinámico de tareas
* Filtros:

  * estado
  * tag
  * búsqueda
* Sistema de prioridades visual
* Gestión de fechas
* Modales de edición y confirmación
* Modo oscuro persistente (`localStorage`)

---

##  Despliegue en Vercel

El proyecto utiliza un despliegue unificado:

* Frontend servido desde `/public`
* Backend ejecutado como **Serverless Functions**
* Reutilización de la app Express en:

  * `server.js`
  * `api/index.js`

### Ventajas

* Un único dominio
* Sin necesidad de servidor dedicado
* Integración directa frontend + backend
* Escalabilidad automática

---

##  Documentación Swagger

La API está documentada mediante **swagger-jsdoc** usando comentarios en las rutas.

* Spec disponible en:
  `/api-docs.json`

* Interfaz Swagger UI:
  `/api-docs/`

---

##  Ejecución en local

```bash
npm install
npm run dev
```

Servidor:

```text
http://localhost:3000
```

---

##  Decisiones técnicas

* Arquitectura por capas (Controller + Service)
* Validación manual exhaustiva en backend
* Manejo centralizado de errores
* Uso de almacenamiento en memoria
* Normalización de datos (`trim`, `lowercase`)
* API REST clara y consistente
* Integración Swagger para documentación
* Deploy fullstack unificado en Vercel

---

##  Limitaciones actuales

* Persistencia en memoria (los datos se pierden al reiniciar)
* No hay autenticación
* No hay base de datos

---

##  Autor

Proyecto realizado como parte de las prácticas en Corner Studio.
