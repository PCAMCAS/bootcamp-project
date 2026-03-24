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

El uso de inteligencia artificial acelera significativamente el desarrollo y mejora la calidad del código en la mayoría de los casos. Sin embargo, es importante entender lo que se genera y no depender completamente de la IA, ya que la comprensión del código sigue siendo clave.