# 🚀 TaskFlow

## 🌐 Demo online

https://bootcamp-project-weld.vercel.app

---

## 📌 Descripción

**TaskFlow** es una aplicación web sencilla para gestionar tareas.

Permite crear, completar, editar y eliminar tareas, además de filtrarlas y organizarlas mediante tags, prioridades y programación por fechas.

El objetivo de este proyecto es practicar el desarrollo frontend utilizando **HTML, CSS y JavaScript**, además de trabajar con **Git, GitHub y LocalStorage**.

---

## 🎨 Diseño

El diseño inicial de la aplicación se realizó previamente antes de comenzar a programar, utilizando un wireframe sencillo para definir la estructura de la interfaz.

El wireframe fue creado con Excalidraw y se encuentra guardado dentro del repositorio en:

👉 `docs/design/taskflow-wireframe.png`

### Estructura del diseño

* Cabecera con el nombre de la aplicación
* Formulario para añadir nuevas tareas
* Lista de tareas
* Panel de estadísticas
* Sistema de tags para clasificar tareas

---

## ⚙️ Funcionalidades

### 📝 Gestión de tareas

* Crear nuevas tareas
* Marcar tareas como completadas
* Editar tareas mediante modal
* Eliminar tareas individuales
* Confirmación antes de eliminar una tarea (modal personalizado)

### 🗂️ Organización

* Añadir tags opcionales a las tareas
* Ver una lista automática de tags creados
* Filtrar tareas por estado
* Filtrar tareas por tag
* Buscar tareas por texto

### 🧠 Mejora de tareas

* Sistema de prioridad (baja, media, alta)
* Campo de descripción opcional

### ⏱️ Programación de tareas

Las tareas pueden programarse con:

* Fecha y hora de inicio
* Fecha y hora de finalización

Según la fecha configurada, la aplicación indica si una tarea está:

* Programada
* Próxima
* Vencida
* Completada

### ⚡ Acciones masivas

* Completar todas las tareas
* Borrar todas las tareas completadas

### 📊 Estadísticas

La aplicación muestra en tiempo real:

* Total de tareas
* Tareas completadas
* Tareas pendientes
* Barra de progreso visual (%)

---

## 💾 Persistencia de datos

Las tareas se guardan automáticamente en **LocalStorage**, por lo que permanecen disponibles aunque se recargue la página.

Documentación oficial:
https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

---

## 🌙 Modo oscuro

La aplicación incluye un modo oscuro que puede activarse desde el botón superior.

La preferencia del usuario se guarda también en LocalStorage.

---

## 📱 Diseño responsive

La interfaz se adapta correctamente a diferentes tamaños de pantalla:

* Móvil
* Tablet
* Pantallas grandes (incluyendo 2K)

Incluye:

* Layout con sidebar de estadísticas en escritorio
* Espaciado adaptativo
* Componentes optimizados

---

## 🛠️ Tecnologías utilizadas

* HTML5
* CSS3 + Tailwind
* JavaScript (Vanilla JS)
* LocalStorage API
* Git
* GitHub
* Vercel

---

## 📁 Estructura del proyecto

```
bootcamp-project/
│
├── index.html
├── app.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tailwind.css
├── tailwind-input.css
├── README.md
│
├── docs/
│   ├── ai/
│   │   ├── ai-comparison.md
│   │   ├── cursor-workflow.md
│   │   ├── experiments.md
│   │   ├── prompt-engineering.md
│   │   └── reflection.md
│   │
│   ├── design/
│   │   └── taskflow-wireframe.png
│   │
│   └── upgrades-tutor-jack/
│
└── node_modules/
```

---

## 🧪 Testing manual

### ✔️ Creación de tareas

* Crear una tarea simple
* Crear una tarea con tag
* Crear una tarea con fecha de inicio y fin
* Intentar crear una tarea sin título

### ✔️ Gestión de tareas

* Marcar tareas como completadas
* Editar una tarea existente
* Eliminar una tarea
* Confirmación antes de eliminar

### ✔️ Filtros

* Buscar tareas por texto
* Filtrar por estado
* Filtrar por tag

### ✔️ Acciones masivas

* Completar todas las tareas
* Borrar todas las tareas completadas

### ✔️ Persistencia

* Recargar la página
* Verificar que las tareas permanecen guardadas

### ✔️ Responsive

* Pruebas en distintos tamaños desde herramientas del navegador

---

## ♿ Accesibilidad

Se han aplicado algunas prácticas básicas de accesibilidad:

* Uso de etiquetas `label` correctamente asociadas a los inputs
* Navegación mediante teclado
* Botones con texto o `aria-label`
* Estados de foco visibles
* Uso de modales accesibles (`role="dialog"`, `aria-modal`)

Documentación:
https://www.w3.org/WAI/fundamentals/accessibility-intro/

---

## 🤖 Uso de IA en el proyecto

Durante el desarrollo se ha utilizado inteligencia artificial para:

* Generación de funciones
* Refactorización de código
* Mejora de interfaz (UI/UX)
* Detección de errores
* Documentación del proyecto

Toda la documentación relacionada se encuentra en:

```
docs/ai/
```

Incluye:

* Comparación con/sin IA
* Workflow con Cursor
* Experimentos
* Prompt engineering
* Reflexión final

---

## 🚀 Despliegue

La aplicación está desplegada utilizando **Vercel**, conectando el repositorio de GitHub para despliegues automáticos.

Documentación:
https://vercel.com/docs/deployments/git

---

## 🖼️ Diseño final

Como resultado final tras la implementación de tags, prioridades, fechas y mejoras de UI:

<img width="870" height="850" alt="image" src="https://github.com/user-attachments/assets/7614c328-b943-4a57-bb0a-1f7dc78abaf9" />

---

## 👨‍💻 Autor

Proyecto realizado como parte de las prácticas en **Corner Studio**.
