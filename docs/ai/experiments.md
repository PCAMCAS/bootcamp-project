# Experimentos con IA en programación

En este documento comparo la resolución de distintos problemas de programación con y sin el uso de inteligencia artificial.

## Experimento 1: Sumar un array

**Sin IA (lo que he hecho):**

He implementado una función manualmente utilizando un bucle `for`:

    function sumarArray(arr) {
      let total = 0;
      for (let i = 0; i < arr.length; i++) {
        total += arr[i];
      }
      return total;
    }

**Con IA (qué ha hecho la IA):**

La IA ha generado una solución más moderna utilizando `reduce`:

    function sumarArray(arr) {
      return arr.reduce((total, num) => total + num, 0);
    }

**Comparación:**

- Tiempo: más rápido con IA  
- Calidad: mejor con IA (uso de métodos modernos)  
- Comprensión: mejor sin IA inicialmente, pero la IA ayuda a aprender nuevas formas  

---

## Experimento 2: Filtrar tareas completadas

**Sin IA (lo que he hecho):**

He implementado una función utilizando `filter`:

    function filtrarTareasCompletadas(tareas) {
      return tareas.filter(tarea => tarea.completada);
    }

**Con IA (qué ha hecho la IA):**

La IA ha generado la función automáticamente y además ha propuesto variantes adicionales con validaciones:

    function obtenerTareasCompletadas(tareas) {
      if (!Array.isArray(tareas)) return [];
      return tareas.filter(tarea => tarea?.completada);
    }

**Comparación:**

- Tiempo: mucho más rápido con IA  
- Calidad: mejor con IA (más robusto)  
- Comprensión: similar en ambos casos  

---

## Experimento 3: Ordenar tareas por título

**Sin IA (lo que he hecho):**

He implementado una función básica con `sort`:

    function ordenarTareasPorTitulo(tareas) {
      return [...tareas].sort((a, b) => a.titulo > b.titulo ? 1 : -1);
    }

**Con IA (qué ha hecho la IA):**

La IA ha propuesto una solución más correcta usando `localeCompare`:

    function ordenarTareasPorTitulo(tareas) {
      return [...tareas].sort((a, b) =>
        a.titulo.localeCompare(b.titulo, "es", { sensitivity: "base" })
      );
    }

**Comparación:**

- Tiempo: más rápido con IA  
- Calidad: mejor con IA (mejor ordenación de texto)  
- Comprensión: la IA aporta soluciones más avanzadas  

---

## Experimento 4: Mejora del código del proyecto

**Sin IA (lo que he hecho):**

He revisado manualmente funciones del proyecto como `createTask`, detectando que había código duplicado y variables innecesarias, lo que dificultaba la lectura.

**Con IA (qué ha hecho la IA):**

Cursor ha refactorizado automáticamente la función:

- Eliminando duplicaciones (`task` y `newTask`)
- Simplificando variables (`trimmedTitle`, `normalizedTag`)
- Mejorando la claridad general del código

**Comparación:**

- Tiempo: mucho más rápido con IA  
- Calidad: mejor con IA (código más limpio y mantenible)  
- Comprensión: la IA ayuda a identificar problemas reales  

---

## Conclusión

## Funcionalidad añadida 1: Barra de progreso

**Lo que he hecho:**

He añadido una barra de progreso visual en la sección de estadísticas para mostrar el porcentaje de tareas completadas respecto al total.

La barra se actualiza automáticamente al crear tareas, completarlas, desmarcarlas o eliminarlas.

**Qué ha hecho la IA:**

La IA me ha ayudado a:
- proponer la estructura HTML de la barra
- conectarla con la lógica de `updateStats()`
- calcular el porcentaje de tareas completadas
- actualizar el texto y el ancho de la barra dinámicamente

**Resultado:**

La aplicación muestra ahora un indicador visual más claro del progreso del usuario, mejorando la experiencia de uso y haciendo más intuitivo el estado general de las tareas.

## Funcionalidad añadida 2: Prioridad en tareas

**Lo que he hecho:**

He añadido un sistema de prioridad a las tareas con tres niveles: baja, media y alta.

Para ello:
- he añadido un campo de selección en el formulario
- he modificado la creación de tareas para guardar la prioridad
- he actualizado el renderizado para mostrar la prioridad como un badge visual en cada tarea

También he comprobado que las tareas antiguas siguen funcionando correctamente asignando una prioridad por defecto.

**Qué ha hecho la IA:**

La IA me ha ayudado a:
- proponer la estructura del selector de prioridad en el formulario
- adaptar la función `createTask` para incluir la prioridad
- modificar `loadTasks()` para mantener compatibilidad con datos antiguos
- generar la lógica para mostrar la prioridad con estilos visuales (badges de colores)

**Resultado:**

Ahora cada tarea tiene una prioridad visible, lo que mejora la organización y permite identificar rápidamente las tareas más importantes.

## Funcionalidad añadida 3: Descripción en tareas

**Lo que he hecho:**

He añadido un campo de descripción opcional a las tareas.

Para ello:
- he añadido un textarea en el formulario de creación
- he modificado la estructura de las tareas para incluir la descripción
- he actualizado el renderizado para mostrar la descripción debajo del título

También he asegurado que las tareas antiguas sigan funcionando correctamente añadiendo un valor por defecto.

**Qué ha hecho la IA:**

La IA me ha ayudado a:
- generar el campo textarea en el formulario
- adaptar las funciones para guardar la descripción en cada tarea
- modificar `loadTasks()` para mantener compatibilidad con datos antiguos
- implementar la lógica para mostrar u ocultar la descripción según exista

**Resultado:**

Ahora cada tarea puede incluir una descripción adicional, lo que permite añadir más contexto y mejorar la organización del trabajo.

## Funcionalidad añadida 4: Animación al completar tareas

**Lo que he hecho:**

He añadido una animación visual al marcar una tarea como completada.

Para ello:
- he modificado los estilos de las tarjetas de tarea
- he añadido transiciones más suaves
- he aplicado cambios visuales como color de fondo, borde y texto tachado

La animación se aplica automáticamente al cambiar el estado de la tarea.

**Qué ha hecho la IA:**

La IA me ha ayudado a:
- proponer mejoras visuales utilizando Tailwind CSS
- ajustar las transiciones para que sean más suaves
- aplicar estilos diferenciados para tareas completadas
- mejorar la experiencia de usuario sin modificar la lógica del código

**Resultado:**

Ahora la aplicación tiene una experiencia más fluida y visual, haciendo más evidente cuándo una tarea ha sido completada y mejorando la interacción general.