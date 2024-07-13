import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { PORT } from "./config";
import gql from "graphql-tag";
import { prisma } from "./db";

async function startServer() {
  const app = express();

  app.use(express.json());

  const gqlServer = new ApolloServer({
    // schema layer
    typeDefs: gql`
      type Query {
        hello: String
        say(name: String): String
      }
      type Mutation {
        createUser(
          firstName: String!
          lastName: String!
          email: String!
          password: String!
        ): Boolean
      }
    `,
    // actual function that executes
    resolvers: {
      Query: {
        hello: () => `hello from graphql!`,
        say: (_, { name }: { name: string }) => `hello ${name}, how are you?`,
      },
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        ) => {
          await prisma.user.create({
            data: {
              email,
              password,
              firstName,
              lastName,
              salt: "random_salt", // will be using bcrypt.js for salt and hashed password
            },
          });
          return true;
        },
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
