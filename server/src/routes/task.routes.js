const express = require('express');
const taskController = require('../controllers/task.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Preparar entrega de TaskFlow
 *         description:
 *           type: string
 *           example: Revisar frontend, backend y despliegue en Vercel
 *         tag:
 *           type: string
 *           example: bootcamp
 *         startAt:
 *           type: string
 *           format: date-time
 *           example: 2026-03-28T10:00:00.000Z
 *         endAt:
 *           type: string
 *           format: date-time
 *           example: 2026-03-28T13:00:00.000Z
 *         priority:
 *           type: string
 *           enum: [baja, media, alta]
 *           example: alta
 *         completed:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-03-28T09:45:00.000Z
 *
 *     CreateTaskInput:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           minLength: 3
 *           example: Preparar documentación del backend
 *         description:
 *           type: string
 *           example: Añadir endpoints, errores y formato JSON
 *         tag:
 *           type: string
 *           example: docs
 *         startAt:
 *           type: string
 *           format: date-time
 *           example: 2026-03-28T10:00
 *         endAt:
 *           type: string
 *           format: date-time
 *           example: 2026-03-28T12:00
 *         priority:
 *           type: string
 *           enum: [baja, media, alta]
 *           example: media
 *         completed:
 *           type: boolean
 *           example: false
 *
 *     UpdateTaskInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 3
 *           example: Actualizar documentación final
 *         description:
 *           type: string
 *           example: Incluir despliegue definitivo en Vercel
 *         tag:
 *           type: string
 *           example: backend
 *         startAt:
 *           type: string
 *           format: date-time
 *           example: 2026-03-28T11:00
 *         endAt:
 *           type: string
 *           format: date-time
 *           example: 2026-03-28T14:00
 *         priority:
 *           type: string
 *           enum: [baja, media, alta]
 *           example: alta
 *         completed:
 *           type: boolean
 *           example: true
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: El título es obligatorio y debe tener al menos 3 caracteres.
 */

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', taskController.getAllTasks);

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Crear una tarea
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskInput'
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', taskController.createTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   patch:
 *     summary: Actualizar parcialmente una tarea
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskInput'
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Datos inválidos o petición vacía
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch('/:id', taskController.patchTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Tarea eliminada correctamente
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', taskController.deleteTask);

module.exports = router;