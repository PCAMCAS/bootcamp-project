const taskService = require('../services/task.service');

const validPriorities = ['baja', 'media', 'alta'];

const getAllTasks = (req, res, next) => {
  try {
    const tasks = taskService.obtenerTodas();
    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const createTask = (req, res, next) => {
  try {
    const {
      title,
      description = '',
      tag = '',
      startAt = '',
      endAt = '',
      priority = 'media',
      completed = false,
    } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return res.status(400).json({
        error: 'El título es obligatorio y debe tener al menos 3 caracteres.',
      });
    }

    if (typeof description !== 'string') {
      return res.status(400).json({
        error: 'La descripción debe ser un texto.',
      });
    }

    if (typeof tag !== 'string') {
      return res.status(400).json({
        error: 'El tag debe ser un texto.',
      });
    }

    if (startAt !== '' && Number.isNaN(Date.parse(startAt))) {
      return res.status(400).json({
        error: 'La fecha de inicio no es válida.',
      });
    }

    if (endAt !== '' && Number.isNaN(Date.parse(endAt))) {
      return res.status(400).json({
        error: 'La fecha de fin no es válida.',
      });
    }

    if (startAt && endAt && new Date(endAt) < new Date(startAt)) {
      return res.status(400).json({
        error: 'La fecha de fin no puede ser anterior a la fecha de inicio.',
      });
    }

    if (!validPriorities.includes(priority)) {
      return res.status(400).json({
        error: 'La prioridad debe ser baja, media o alta.',
      });
    }

    if (typeof completed !== 'boolean') {
      return res.status(400).json({
        error: 'El campo completed debe ser booleano.',
      });
    }

    const nuevaTarea = taskService.crearTarea({
      title,
      description,
      tag,
      startAt,
      endAt,
      priority,
      completed,
    });

    return res.status(201).json(nuevaTarea);
  } catch (error) {
    next(error);
  }
};

const deleteTask = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        error: 'El id debe ser un número entero positivo.',
      });
    }

    taskService.eliminarTarea(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const patchTask = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const {
      title,
      description,
      tag,
      startAt,
      endAt,
      priority,
      completed,
    } = req.body;

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        error: 'El id debe ser un número entero positivo.',
      });
    }

    if (
      typeof title === 'undefined' &&
      typeof description === 'undefined' &&
      typeof tag === 'undefined' &&
      typeof startAt === 'undefined' &&
      typeof endAt === 'undefined' &&
      typeof priority === 'undefined' &&
      typeof completed === 'undefined'
    ) {
      return res.status(400).json({
        error: 'Debes enviar al menos un campo para actualizar.',
      });
    }

    if (typeof title !== 'undefined') {
      if (typeof title !== 'string' || title.trim().length < 3) {
        return res.status(400).json({
          error: 'El título debe tener al menos 3 caracteres.',
        });
      }
    }

    if (typeof description !== 'undefined' && typeof description !== 'string') {
      return res.status(400).json({
        error: 'La descripción debe ser un texto.',
      });
    }

    if (typeof tag !== 'undefined' && typeof tag !== 'string') {
      return res.status(400).json({
        error: 'El tag debe ser un texto.',
      });
    }

    if (typeof startAt !== 'undefined' && startAt !== '' && Number.isNaN(Date.parse(startAt))) {
      return res.status(400).json({
        error: 'La fecha de inicio no es válida.',
      });
    }

    if (typeof endAt !== 'undefined' && endAt !== '' && Number.isNaN(Date.parse(endAt))) {
      return res.status(400).json({
        error: 'La fecha de fin no es válida.',
      });
    }

    const finalStartAt = typeof startAt !== 'undefined' ? startAt : undefined;
    const finalEndAt = typeof endAt !== 'undefined' ? endAt : undefined;

    if (
      typeof finalStartAt !== 'undefined' &&
      typeof finalEndAt !== 'undefined' &&
      finalStartAt &&
      finalEndAt &&
      new Date(finalEndAt) < new Date(finalStartAt)
    ) {
      return res.status(400).json({
        error: 'La fecha de fin no puede ser anterior a la fecha de inicio.',
      });
    }

    if (typeof priority !== 'undefined' && !validPriorities.includes(priority)) {
      return res.status(400).json({
        error: 'La prioridad debe ser baja, media o alta.',
      });
    }

    if (typeof completed !== 'undefined' && typeof completed !== 'boolean') {
      return res.status(400).json({
        error: 'El campo completed debe ser booleano.',
      });
    }

    const updatedTask = taskService.actualizarTareaParcial(id, {
      title,
      description,
      tag,
      startAt,
      endAt,
      priority,
      completed,
    });

    return res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  patchTask,
};