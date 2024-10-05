import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for my Express.js project',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Укажите ваш URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Укажите путь к вашим роутам
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app) => {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};