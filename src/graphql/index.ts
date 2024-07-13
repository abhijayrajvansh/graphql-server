import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `#graphql
      ${User.userTypeDef}
      type Query {
        ${User.typeDefs.queries}
        
      }
      type Mutation {
        ${User.typeDefs.mutations}
      }
    `,

    resolvers: {
      Query: {
        ...User.resolvers.queries,
        
      },
      Mutation: {
        ...User.resolvers.mutations
      }
    },
  });

  await gqlServer.start();
  return gqlServer;
}
export default createApolloGraphqlServer;
