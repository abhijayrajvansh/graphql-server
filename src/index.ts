import createApolloGraphqlServer from "./graphql";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { PORT } from "./config";

async function startServer() {
  const app = express();

  app.use(express.json());

  // **root**
  app.get("/", (req, res) => {
    res.json({
      status: "server is up and running",
      graphql_studio: "/graphql",
    });
  });

  // graphql endpoint
  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

  app.listen(PORT, () => {
    console.log(
      `> server started on PORT:${PORT}\n> Graphql-Studio is live at http://localhost:${PORT}/graphql.`
    );
  });
}

startServer();
