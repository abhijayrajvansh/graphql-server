const queries = `#graphql
  hello: String
  loginUser(email: String!, password: String!): String
`;

const mutations = `#graphql
  registerUser(email: String!, password: String!): String
`;

export const typeDefs = { queries, mutations };
