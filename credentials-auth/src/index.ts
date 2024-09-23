import createApolloGraphqlServer from "./graphql";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { PORT } from "./config";
import { decodeToken } from "./services/user";

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
  app.use(
    "/graphql",
    expressMiddleware(await createApolloGraphqlServer(), {
      context: async ({ req }) => {
        const tokenFromHeaders = req.headers.authorization;
        try {
          const userIdentity = decodeToken(tokenFromHeaders);
          return { userIdentity };
        } catch (error) {
          return {};
        }
      },
    })
  );

  app.listen(PORT, () => {
    console.log(
      `> server started on PORT:${PORT}\n> Graphql-Studio is live at http://localhost:${PORT}/graphql`
    );
  });
}

startServer();
