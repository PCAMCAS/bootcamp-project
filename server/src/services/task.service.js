let tasks = [];
let currentId = 1;

const obtenerTodas = () => {
  return tasks;
};

const crearTarea = ({
  title,
  description = "",
  tag = "",
  startAt = "",
  endAt = "",
  priority = "media",
  completed = false,
}) => {
  const nuevaTarea = {
    id: currentId++,
    title: title.trim(),
    description: description.trim(),
    tag: tag.trim().toLowerCase(),
    startAt,
    endAt,
    priority,
    completed: Boolean(completed),
    createdAt: new Date().toISOString(),
  };

  tasks.push(nuevaTarea);
  return nuevaTarea;
};

const eliminarTarea = (id) => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new Error('NOT_FOUND');
  }

  tasks.splice(index, 1);
};

const actualizarTareaParcial = (id, data) => {
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    throw new Error('NOT_FOUND');
  }

  if (typeof data.title !== 'undefined') {
    task.title = data.title.trim();
  }

  if (typeof data.description !== 'undefined') {
    task.description = data.description.trim();
  }

  if (typeof data.tag !== 'undefined') {
    task.tag = data.tag.trim().toLowerCase();
  }

  if (typeof data.startAt !== 'undefined') {
    task.startAt = data.startAt;
  }

  if (typeof data.endAt !== 'undefined') {
    task.endAt = data.endAt;
  }

  if (typeof data.priority !== 'undefined') {
    task.priority = data.priority;
  }

  if (typeof data.completed !== 'undefined') {
    task.completed = Boolean(data.completed);
  }

  return task;
};

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea,
  actualizarTareaParcial,
};