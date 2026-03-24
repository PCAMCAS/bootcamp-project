# Uso de Cursor como IDE asistido por IA

## Uso del chat contextual

He utilizado el chat de Cursor para analizar el archivo principal del proyecto (`app.js`).

**Prompt utilizado:**
Explícame qué hace este archivo línea por línea.

**Resultado:**

Cursor ha generado una explicación muy detallada del archivo, describiendo la funcionalidad de cada bloque de código. Ha identificado correctamente:

- La inicialización de variables del DOM
- El manejo de almacenamiento en localStorage
- La lógica de creación, edición y eliminación de tareas
- El sistema de filtros y búsqueda
- El renderizado dinámico de la interfaz
- El cálculo de estadísticas
- La gestión del tema (modo oscuro)

También ha explicado funciones complejas como el ordenado de tareas, el filtrado, y la gestión de estados temporales (vencida, próxima, programada).

**Análisis:**

La explicación ha sido muy completa y útil para entender la estructura del proyecto. Cursor destaca especialmente en este tipo de tareas porque tiene acceso directo al contexto del código, lo que le permite ofrecer respuestas más precisas que otros asistentes.

En este caso, me ha permitido entender rápidamente un archivo largo sin tener que leerlo línea por línea manualmente.

## Edición de código con IA (refactorización)

He utilizado la funcionalidad de edición inline de Cursor para mejorar una función existente del proyecto (`createTask`).

**Acción realizada:**
Seleccioné la función y utilicé el atajo `Ctrl + K` para pedir a la IA que la refactorizara.

**Prompt utilizado:**
Refactoriza esta función para que sea más clara y legible sin cambiar su comportamiento.

**Resultado:**

Cursor generó una versión mejorada de la función, realizando varias mejoras importantes:

- Eliminó código duplicado (existían dos objetos similares: `task` y `newTask`)
- Simplificó el uso de variables intermedias (`trimmedTitle`, `normalizedTag`)
- Evitó repetir llamadas a funciones como `normalizeTag`
- Eliminó duplicación en la inserción de tareas (`tasks.push`)
- Mejoró la claridad general del código

**Análisis:**

Esta funcionalidad resulta muy útil para mejorar código existente rápidamente. Cursor no solo reescribe el código, sino que identifica problemas reales como duplicaciones y malas prácticas.

En este caso, la refactorización ha hecho el código más limpio, más mantenible y más fácil de entender sin cambiar su comportamiento original.

## Autocompletado con IA

He probado el autocompletado inteligente de Cursor escribiendo una función parcialmente y dejando que la IA completara el código.

**Acción realizada:**
Escribí el inicio de una función para filtrar tareas y esperé a que Cursor sugiriera el resto del código.

**Código inicial:**
function filtrarTareasCompletadas(tareas) {

**Resultado:**

Cursor generó automáticamente múltiples funciones relacionadas con el filtrado de tareas, incluyendo:

- Filtrar tareas completadas
- Filtrar tareas pendientes
- Filtrar por tag
- Filtrar por título
- Filtrar por fechas
- Filtrar por combinaciones de criterios

**Análisis:**

El autocompletado de Cursor no solo completa código, sino que puede anticipar funcionalidades completas a partir de una intención inicial.

En este caso, en lugar de generar solo una función, ha propuesto un conjunto completo de utilidades relacionadas, lo que demuestra su capacidad para acelerar el desarrollo.

Sin embargo, es importante revisar el código generado antes de usarlo, ya que puede incluir más funcionalidades de las necesarias o no ajustarse exactamente al proyecto.

---

## Uso de Cursor en mejoras del proyecto

Además de las funcionalidades básicas, he utilizado Cursor para aplicar mejoras reales en el proyecto TaskFlow.

---

### Mejora del layout responsive

**Lo que he hecho:**

He detectado que la aplicación no se adaptaba bien a pantallas grandes (2K), debido al uso de un ancho fijo.

**Qué ha hecho la IA:**

Cursor ha propuesto:
- eliminar el ancho fijo (`max-w-3xl`)
- crear un layout adaptable (`page-shell`)
- mejorar el espaciado en pantallas grandes

**Resultado:**

La aplicación ahora se adapta correctamente a distintos tamaños de pantalla.

---

### Mejora de estadísticas

**Lo que he hecho:**

He identificado que la sección de estadísticas era demasiado simple.

**Qué ha hecho la IA:**

Cursor ha transformado la sección en:
- tarjetas visuales
- diseño en grid responsive
- colores diferenciados

**Resultado:**

Las estadísticas son más claras y visuales.

---

### Implementación de modales

**Lo que he hecho:**

He detectado que el uso de `prompt()` y `confirm()` generaba una mala experiencia.

**Qué ha hecho la IA:**

Cursor ha creado modales personalizados:
- centrados
- con overlay oscuro
- con botones de acción

**Resultado:**

La interfaz es más profesional y coherente.

---

## Conclusión

El uso de Cursor ha sido clave en el desarrollo del proyecto.

**Lo que he aprendido:**

- Permite trabajar directamente sobre el código real
- Facilita refactorizaciones complejas
- Mejora tanto la lógica como la interfaz
- Acelera el desarrollo de funcionalidades

**Conclusión final:**

Cursor no solo actúa como asistente, sino como una herramienta de desarrollo que permite mejorar el código y la experiencia de usuario de forma rápida y eficiente.

---

## Uso de MCP en Cursor

### ¿Qué es MCP?

MCP (Model Context Protocol) es un protocolo abierto que permite conectar herramientas de inteligencia artificial con fuentes externas como archivos locales, repositorios o servicios.

En Cursor, MCP permite que la IA acceda directamente al contexto real del proyecto, en lugar de responder únicamente de forma genérica.

---

### Configuración realizada

Para esta práctica he configurado un servidor MCP de tipo **filesystem** dentro de Cursor.

Pasos realizados:

* Acceso a `Settings`
* Navegación a `Tools & MCP`
* Uso de la opción **Add Custom MCP**
* Configuración mediante un archivo JSON utilizando `npx`

El objetivo era permitir que la IA pudiera acceder directamente a los archivos del proyecto TaskFlow.

---

### Servidor utilizado

Se ha utilizado el servidor **filesystem**, que permite trabajar con los archivos locales del proyecto.

Este tipo de servidor permite:

* Leer archivos del proyecto
* Analizar estructura de carpetas
* Buscar funciones concretas
* Inspeccionar código directamente
* Acceder a documentación interna

---

### Comprobación del funcionamiento

Tras añadir la configuración, el servidor `filesystem` apareció correctamente dentro de la sección de MCP en Cursor, lo que indica que la conexión se realizó correctamente.

Esto confirma que el entorno quedó preparado para que la IA pudiera interactuar con el proyecto.

---

### Consultas planteadas

Para comprobar el uso del servidor MCP, se plantearon las siguientes consultas sobre el proyecto:

1. Leer el archivo `app.js` y explicar la función `createTask`
2. Buscar dónde se calcula el porcentaje de tareas completadas
3. Analizar `index.html` y describir la sección de estadísticas
4. Listar los archivos dentro de la carpeta `docs`
5. Buscar funciones relacionadas con filtros en `app.js`

Estas consultas están diseñadas para validar que la IA puede acceder al contenido real del proyecto.

---

### Nota sobre la ejecución de consultas

Debido a las limitaciones del plan gratuito de Cursor, no fue posible ejecutar todas las consultas dentro del propio entorno.

Sin embargo:

* El servidor MCP quedó correctamente configurado
* El entorno estaba preparado para su uso
* Se definieron consultas realistas y directamente aplicables al proyecto

Esto permite entender claramente el funcionamiento de MCP y cómo se utilizaría en un entorno real.

---

### Utilidad de MCP en proyectos reales

MCP permite mejorar significativamente el uso de IA en desarrollo, ya que aporta contexto real.

Algunos usos prácticos:

* Analizar proyectos grandes sin necesidad de copiar código manualmente
* Buscar funciones o componentes concretos
* Consultar documentación interna del proyecto
* Integrar herramientas externas (repositorios, APIs, bases de datos)
* Mejorar la precisión de las respuestas de la IA

---

### Conclusión

La integración de MCP en Cursor permite dar un paso más allá en el uso de inteligencia artificial en desarrollo.

En esta práctica he comprendido:

* Cómo conectar herramientas externas a la IA
* Cómo preparar un entorno con contexto real
* Cómo se pueden mejorar los flujos de trabajo con este tipo de integración

Aunque el uso práctico estuvo limitado por el plan gratuito, la configuración y el planteamiento de consultas han permitido entender claramente su utilidad en proyectos reales.
