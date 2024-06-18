import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function startServer() {
  const PORT = process.env.PORT || 2711;
  const app = express();

  app.use(express.json());

  const gqlServer = new ApolloServer({
    typeDefs:`
      type Query {
        hello: String
        say(name: String): String
      }
    `,
    resolvers: {
      Query: {
        hello: () => `hello from graphql!`,
        say: (_, {name}: {name: String}) => `hello ${name}, how are you?` 
      },
    },
  });

  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ msg: "server is up and running" });
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(
      `> server started on PORT:${PORT}\n> Graphql-Studio is live at http://localhost:${PORT}/graphql.`
    );
  });
}

startServer();
