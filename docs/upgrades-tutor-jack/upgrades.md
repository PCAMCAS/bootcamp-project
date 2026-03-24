# Mejoras del proyecto TaskFlow

En este documento recojo las mejoras realizadas en el proyecto a partir del feedback del tutor.

---

## Mejora 1: Adaptación a pantallas grandes (2K)

**Problema:**
En pantallas grandes (2K), la interfaz se veía demasiado pequeña y no aprovechaba el ancho disponible.

**Solución:**

**Lo que he hecho:**

He probado la aplicación en diferentes tamaños de pantalla y he detectado que el uso de un ancho fijo (`max-w-3xl`) limitaba la visualización en resoluciones grandes.

He aplicado un sistema de layout más flexible utilizando clases personalizadas para adaptar el ancho y los márgenes según el tamaño de pantalla.

**Qué ha hecho la IA:**

La IA ha propuesto:
- eliminar el ancho fijo (`max-w-3xl`)
- crear una clase `.page-shell` con ancho adaptable
- ajustar el padding horizontal con `.page-padding-x`
- mejorar los espaciados en pantallas grandes (`xl`, `2xl`)

También ha reorganizado el layout para que todos los bloques (header, main, aside, footer) mantengan coherencia visual.

**Resultado:**

Ahora la aplicación se adapta correctamente a pantallas grandes, aprovechando mejor el espacio disponible y mejorando la legibilidad y la experiencia de usuario.

---

## Mejora 2: Alineación del título

**Problema:**
El título no estaba correctamente alineado a la izquierda en todos los tamaños de pantalla.

**Solución:**

**Lo que he hecho:**

**Qué ha hecho la IA:**

**Resultado:**

---

**Mejora adicional:**

Además, he reorganizado el layout para que en pantallas grandes las estadísticas aparezcan en una columna lateral izquierda, mientras que el contenido principal queda a la derecha.

**Lo que he hecho:**

He revisado la distribución general de la interfaz y he probado una organización más parecida a un dashboard, manteniendo el layout en columna para móvil.

**Qué ha hecho la IA:**

La IA me ha ayudado a:
- envolver `main` y `aside` en un contenedor responsive
- reorganizar el layout para escritorio con una sidebar lateral
- mantener el orden correcto en móvil
- ajustar el grid de estadísticas para que funcione bien dentro de una columna estrecha

**Resultado:**

En pantallas grandes la aplicación aprovecha mucho mejor el espacio, y la sección de estadísticas gana protagonismo al mostrarse como una barra lateral izquierda.

---

## Mejora 4: Oscurecer fondo en modales

**Problema:**
Al mostrar elementos emergentes, el fondo no se oscurecía y además algunos diálogos aparecían en la parte superior porque dependían de `prompt()` y `confirm()`, que son diálogos nativos del navegador.

**Solución:**

**Lo que he hecho:**

He revisado el sistema de edición y borrado de tareas y he sustituido los diálogos nativos por modales personalizados dentro de la propia aplicación.

También he comprobado que ahora los modales aparecen centrados y bloquean correctamente la interacción con el resto de la interfaz.

**Qué ha hecho la IA:**

La IA me ha ayudado a:
- reemplazar `prompt()` y `confirm()` por modales personalizados
- añadir un overlay oscuro semitransparente
- centrar los modales en pantalla
- añadir botones de confirmar y cancelar
- implementar cierre con clic en el fondo y con la tecla Escape
- coordinar el bloqueo de scroll del `body` cuando hay un modal abierto

**Resultado:**

Ahora los mensajes emergentes aparecen centrados, con un fondo oscurecido detrás, mejorando mucho la experiencia de usuario y haciendo la interfaz más profesional y coherente.
**Resultado:**