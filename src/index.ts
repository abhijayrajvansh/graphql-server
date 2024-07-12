import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { PORT } from "./config";

async function startServer() {
  const app = express();

  app.use(express.json());

  const gqlServer = new ApolloServer({
    // schema layer
    typeDefs: `
      type Query {
        hello: String
        say(name: String): String
      }
    `,
    // actual function that executes
    resolvers: {
      Query: {
        hello: () => `hello from graphql!`,
        say: (_, { name }: { name: String }) => `hello ${name}, how are you?`,
      },
    },
  });

  await gqlServer.start();

  // **root**
  app.get("/", (req, res) => {
    res.json({
      status: "server is up and running",
      graphql_studio: "/graphql",
    });
  });

  // **graphql endpoint**
  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(
      `> server started on PORT:${PORT}\n> Graphql-Studio is live at http://localhost:${PORT}/graphql.`
    );
  });
}

startServer();
