const path = require('path');
const express = require('express');
const cors = require('cors');
const swaggerSpec = require('./config/swagger');
const { PORT, CLIENT_URL, isProduction } = require('./config/env');
const loggerAcademico = require('./middlewares/logger.middleware');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (origin === CLIENT_URL) {
        return callback(null, true);
      }

      return callback(new Error('Origen no permitido por CORS'));
    }
  })
);

app.use(express.json());
app.use(loggerAcademico);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api-docs.json', (req, res) => {
  return res.status(200).json(swaggerSpec);
});

app.get('/api/v1/health', (req, res) => {
  return res.status(200).json({ ok: true, message: 'Servidor funcionando' });
});

app.use('/api/v1/tasks', taskRoutes);

app.use((req, res) => {
  return res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  if (err.message === 'Origen no permitido por CORS') {
    return res.status(403).json({ error: 'Origen no permitido por CORS' });
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