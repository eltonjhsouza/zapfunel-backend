import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ZapIme API',
      version: '1.0.0',
      description: 'API documentation for ZapIme backend',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Caminho para os arquivos com anotações JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;