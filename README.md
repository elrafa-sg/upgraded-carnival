# Upgraded Carnival

## Descrição:

Implementação de um conceito de plataforma de rastreamento de veículos.

#### Principais Tecnologias utilizadas:
- [Express](https://expressjs.com)
- [Typescript](https://www.typescriptlang.org)
- [Prisma](https://www.prisma.io)
- [Swagger](https://swagger.io)
- [Zod](https://zod.dev)
- [Jest](https://jestjs.io)

## Como usar:

1. Clone o repositório:
   ```
   git clone git@github.com:elrafa-sg/fuzzy-octo-goggles.git
   ```

2. Dentro da pasta do projeto, instale as dependências\*:
   ```
   npm install
   ```
   
3. Configure as variáveis de ambiente no arquivo .env-sample e renomeie-o para .env

4. Instale o banco de dados:
   ```
   npx prisma migrate dev
   ```

5. Execute o projeto:
   ```
   npm run dev
   ```

6. Execute os testes do projeto (opcional):
   ```
   yarn test
   ```

7. Verifique a cobertura de codigo dos testes (opcional):
   ```
   yarn test:coverage
   ```

8. Gere uma versão para produção:
   ```
   npm run build
   ```

9. Execute a versão de produção:
   ```
   npm run start
   ```


#### \* Certifique-se de ter o [Node.js](https://nodejs.org) e [npm](https://www.npmjs.com) instalados.
#### \*\* Se preferir utilizar outro gerenciador de pacotes, basta substituir nos comandos anteriores o nome 'npm' pelo nome do gerenciador de pacotes utilizado.

## Documentação da API:

1. A documentação pode ser acessada após a execução do projeto na rota url:porta/swagger 
(ex: http://localhost:3001/docs)
