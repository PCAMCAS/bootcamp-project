const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const serverUrl =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TaskFlow API',
      version: '1.0.0',
      description: 'API REST para la gestión de tareas de TaskFlow',
    },
    servers: [
      {
        url: serverUrl,
      },
    ],
  },
  apis: [path.resolve(__dirname, '../routes/task.routes.js')],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;