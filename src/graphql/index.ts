import { prisma } from "../db";
import { ApolloServer } from "@apollo/server";
import gql from "graphql-tag";

async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: gql`
      type Query {
        greet: String
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

    resolvers: {
      Query: {
        greet: () => `greetings from graphql!`,
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

  return gqlServer;
}

export default createApolloGraphqlServer;
