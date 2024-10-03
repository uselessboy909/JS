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
  components: {
    schemas: {
      users: {
        type: 'object',
        required: ['login', 'password'],
        properties: {
          id: {
            type: 'integer',
            description: 'Автоматически сгенерированный ID пользователя',
          },
          login: {
            type: 'string',
            description: 'Логин пользователя',
          },
          password: {
            type: 'string',
            description: 'Пароль пользователя',
          },
        },
        example: {
          login: "user123",
          password: "password123",
        }
      }
    }
  },
  paths: {
    '/api/users': {
      post: {
        summary: 'Создать нового пользователя',
        tags: ['users'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/users',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Пользователь успешно создан',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/users',
                },
              },
            },
          },
          '500': {
            description: 'Произошла ошибка при добавлении записи',
          },
        }
      }
    }
  },
  apis: [], // Укажите путь к вашим роутам
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app) => {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};