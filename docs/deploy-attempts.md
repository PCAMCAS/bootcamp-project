# Intento de despliegue unificado Front + Back en un solo proyecto de Vercel

## Objetivo
Unificar el frontend estático de TaskFlow y el backend Express en un único despliegue de Vercel, en lugar de mantenerlos separados.

## Punto de partida
Partíamos de una situación funcional en la que:
- el frontend estaba desplegado en un proyecto de Vercel
- el backend Express estaba desplegado en otro proyecto distinto
- ambos funcionaban correctamente por separado

## Qué intentamos

### 1. Backend serverless con `api/index.js`
Se probó una estructura con:
- `api/index.js`
- `vercel.json`
- redirecciones de `/api/*` hacia el backend Express

#### Resultado
No funcionó correctamente.
Vercel seguía devolviendo `404 NOT_FOUND` en rutas como:
- `/api/v1/health`
- `/api/v1/tasks`
- `/api-docs/`

El frontend cargaba, pero la API no quedaba conectada de forma real.

---

### 2. Rewrites y ajustes en `vercel.json`
Se probaron varias configuraciones de `vercel.json`:
- redirecciones hacia `/api/index.js`
- redirecciones hacia `/api`
- distintas combinaciones para Swagger (`/api-docs`, `/api-docs.json`)

#### Resultado
No resolvió el problema.
La plataforma seguía tratando el despliegue como estático o no exponía correctamente el backend.

---

### 3. Mover frontend a `public/`
Se reorganizó el frontend a:
- `public/index.html`
- `public/app.js`
- `public/tailwind.css`

#### Resultado
La parte estática quedó bien organizada para Vercel, pero esto por sí solo no resolvió el acceso al backend.

---

### 4. Uso de `server.js` como entrypoint en raíz
Se probó usar `server.js` como archivo principal para que Vercel detectase Express desde la raíz del proyecto.

También se hicieron varios cambios cruzados entre:
- `server.js`
- `server/src/index.js`

#### Problemas encontrados
- confusión entre qué archivo debía ser el entrypoint real
- cambios repetidos entre ambos archivos
- en algunos momentos se rompió el entorno local
- se generaron errores de dependencias y de rutas

---

### 5. Error con Express 5
Se detectó un fallo al usar rutas comodín del tipo:

```js
app.get('*', ...)