const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { PORT, CLIENT_URL, isProduction } = require('./config/env');
const loggerAcademico = require('./middlewares/logger.middleware');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
  })
);

app.use(express.json());
app.use(loggerAcademico);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api/v1/health', (req, res) => {
  return res.status(200).json({ ok: true, message: 'Servidor funcionando' });
});

app.use('/api/v1/tasks', taskRoutes);

app.use((req, res) => {
  return res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  console.error(err);
  return res.status(500).json({ error: 'Error interno del servidor' });
});

if (!isProduction) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

module.exports = app;