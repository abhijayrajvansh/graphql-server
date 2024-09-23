export const userTypeDef = `#graphql
  type User {
    id: ID!
    email: String!
    profileImageUrl: String
  }
`
const queries = `#graphql
  hello: String
  loginUser(email: String!, password: String!): String
  getCurrentLoggedInUser: User
`;

const mutations = `#graphql
  registerUser(email: String!, password: String!): String
`;

export const typeDefs = { queries, mutations };
