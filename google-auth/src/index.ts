import { initGraphqlServer } from './app/server';

const PORT = process.env.PORT ?? 8080;

async function startServer() {
  const app = await initGraphqlServer()
  app.listen(PORT, () => {
    console.log(`> server started on PORT:${PORT}\n> Graphql-Studio is live at http://localhost:${PORT}/graphql`)
    console.log(`> Graphql playground sandbox: https://studio.apollographql.com/sandbox/explorer/`)
  });
}

startServer()