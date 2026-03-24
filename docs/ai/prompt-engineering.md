# Prompt engineering aplicado al desarrollo

En este documento recopilo y analizo los prompts que he utilizado durante el desarrollo del proyecto TaskFlow. El objetivo es entender cómo formular mejores instrucciones para obtener resultados más útiles al trabajar con inteligencia artificial en programación.

He probado distintos tipos de prompts: con rol, con ejemplos, con razonamiento paso a paso, con restricciones y aplicados directamente al proyecto.

---

## Prompts con rol

### Prompt 1

**Prompt:**
Actúa como un desarrollador frontend senior y refactoriza este código para que sea más limpio y mantenible.

**Por qué funciona:**
Definir un rol hace que la IA adopte un nivel más profesional. En este caso, al indicarle que actúe como desarrollador senior, tiende a aplicar buenas prácticas, mejorar nombres de variables, reducir duplicaciones y estructurar mejor el código.

---

## Prompts con ejemplos (few-shot)

### Prompt 2

**Prompt:**
Aquí tienes un ejemplo de función bien estructurada:

    function sumar(a, b) {
      return a + b;
    }

Ahora crea una función similar que reciba un array y devuelva la suma total.

**Por qué funciona:**
Dar un ejemplo guía a la IA sobre el formato, estilo y estructura que se espera. Esto reduce ambigüedades y mejora mucho la calidad del resultado.

---

## Prompts con razonamiento paso a paso

### Prompt 3

**Prompt:**
Analiza esta función paso a paso, detecta sus problemas y luego propón una versión mejorada.

**Por qué funciona:**
Obliga a la IA a razonar antes de responder. En lugar de dar una solución directa, analiza primero el código, lo que mejora la precisión y la calidad de la respuesta.

---

## Prompts con restricciones

### Prompt 4

**Prompt:**
Refactoriza este código cumpliendo estas condiciones:
- no cambies el comportamiento
- no uses librerías externas
- usa nombres de variables claros
- responde solo con el código

**Por qué funciona:**
Las restricciones ayudan a controlar la respuesta. Evitan que la IA se desvíe del objetivo o introduzca cambios innecesarios.

---

## Prompts para generar código

### Prompt 5

**Prompt:**
Genera una función en JavaScript que cumpla este requisito y explica brevemente cómo funciona.

**Por qué funciona:**
Combina generación de código con explicación. Esto no solo resuelve el problema, sino que ayuda a entender la solución.

---

## Prompts para detectar errores

### Prompt 6

**Prompt:**
Encuentra el error en este código, explica por qué ocurre y propón una versión corregida.

**Por qué funciona:**
Es un prompt muy completo porque obliga a la IA a:
1. detectar el problema
2. explicarlo
3. corregirlo

---

## Prompts para simplificar código

### Prompt 7

**Prompt:**
Simplifica este código manteniendo el mismo comportamiento pero haciéndolo más legible.

**Por qué funciona:**
Hace que la IA se centre en mejorar la claridad sin cambiar la lógica.

---

## Prompts para documentar código

### Prompt 8

**Prompt:**
Añade comentarios JSDoc a esta función explicando sus parámetros y lo que devuelve.

**Por qué funciona:**
Permite generar documentación automática siguiendo un formato estándar profesional.

---

## Prompts para añadir validaciones

### Prompt 9

**Prompt:**
Revisa este código y añade validaciones necesarias para evitar errores comunes.

**Por qué funciona:**
Hace que la IA piense en casos límite (null, undefined, inputs incorrectos), mejorando la robustez del código.

---

## Prompts para mejorar diseño

### Prompt 10

**Prompt:**
Reorganiza este código siguiendo buenas prácticas de clean code.

**Por qué funciona:**
No solo cambia el código, sino que mejora su estructura general siguiendo principios de diseño.

---

## Prompts aplicados en el proyecto TaskFlow

### Prompt 11

**Prompt:**
Reorganiza el layout para que en pantallas grandes las estadísticas se muestren en una columna lateral izquierda y el contenido principal a la derecha, manteniendo el diseño en móvil.

**Por qué funciona:**
Define claramente el comportamiento responsive y el resultado esperado.

---

### Prompt 12

**Prompt:**
Reemplaza el uso de prompt() por un modal personalizado centrado en pantalla con fondo oscuro.

**Por qué funciona:**
Define claramente el problema y la solución deseada.

---

### Prompt 13

**Prompt:**
Reemplaza confirm() por un modal de confirmación con botones de aceptar y cancelar, manteniendo la lógica actual.

**Por qué funciona:**
Evita romper funcionalidad y mejora la UX.

---

### Prompt 14

**Prompt:**
Mejora visualmente la sección de estadísticas usando tarjetas y mejor jerarquía visual.

**Por qué funciona:**
Permite mejoras de diseño claras y aplicables.

---

### Prompt 15

**Prompt:**
Añade una barra de progreso que muestre el porcentaje de tareas completadas y se actualice automáticamente.

**Por qué funciona:**
Define funcionalidad + comportamiento dinámico.

---

## Conclusión

El prompt engineering es una parte fundamental al trabajar con inteligencia artificial.

**Lo que he aprendido:**

- Cuanto más claro y específico es un prompt, mejor es el resultado
- Definir un rol ayuda a mejorar la calidad del código generado
- Dar ejemplos reduce errores y ambigüedades
- Añadir restricciones evita respuestas incorrectas
- Es importante revisar siempre el código generado

**Conclusión final:**

La inteligencia artificial es una herramienta muy potente, pero su efectividad depende directamente de cómo se le dan las instrucciones. Aprender a escribir buenos prompts permite aprovechar al máximo su potencial dentro del desarrollo de software.