const queries = {
  hello: () => "hello from graphql"
};

const mutations = {
  createUser: async (_: any, {}: {}) => "random_id"
};

export const resolvers = { queries, mutations };
