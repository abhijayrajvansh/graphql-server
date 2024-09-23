import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { User } from "../graphql/user";
import cors from "cors";

export async function initGraphqlServer() {
  const app = express();
  app.use(express.json());

  // for fixing CORS: Cross-Origin Resource Sharing
  app.use(cors());

  // for fixing COOP: Cross Origin Open Policy -> window.postMessage error
  // app.use((req, res, next) => {
  //   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  //   res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  //   next();
  // });

  const graphqlServer = new ApolloServer({
    typeDefs: `
      ${User.types}
      type Query {
        ${User.queries}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
    },
  });

  await graphqlServer.start();

  app.get("/", (req, res) => {
    return res.json({
      graphql_playground: "/graphql",
      graphql_sandbox_alternative: "https://studio.apollographql.com/sandbox/explorer/",
      status: 200
    });
  });

  app.use(
    "/graphql",
    expressMiddleware(graphqlServer, {
      context: async ({ req }) => {
        return {
          email: "sample@email.com",
        };
      },
    })
  );

  return app;
}
