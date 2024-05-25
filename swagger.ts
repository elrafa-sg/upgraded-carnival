import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        title: 'Upgraded Carnival API',
        description: 'Projeto de cadastro de usuários e veículos para sistema de rastreamento'
    },
    host: 'localhost:3001'
};

const outputFile = './swagger.json';
const routes = ['./src/routes/index'];

swaggerAutogen()(outputFile, routes, doc);