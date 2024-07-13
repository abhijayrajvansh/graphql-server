const queries = `#graphql
  hello: String
`;

const mutations = `#graphql
  registerUser(email: String!, password: String!): String
`;

export const typeDefs = { queries, mutations };
