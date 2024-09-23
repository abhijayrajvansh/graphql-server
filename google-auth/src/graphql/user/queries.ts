export const queries = `#graphql
  generateSignedToken(token: String!): String
  verifySignedToken(token: String!): User
`