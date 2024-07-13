import { RegisterUserPayload, registerUser } from "../../services/user";

const queries = {
  hello: () => "hello from graphql"
};

const mutations = {
  registerUser: async (_: any, payload: RegisterUserPayload) => {
    const response = await registerUser(payload)
    return response.id;
  }
};

export const resolvers = { queries, mutations };
