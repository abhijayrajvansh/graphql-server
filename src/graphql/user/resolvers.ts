import { LoginUserPayload, RegisterUserPayload, loginUser, registerUser } from "../../services/user";

const queries = {
  hello: () => "hello from graphql",
  loginUser: async (_: any, payload:LoginUserPayload) => {
    const res = loginUser(payload)
    return res
  }
};

const mutations = {
  registerUser: async (_: any, payload: RegisterUserPayload) => {
    const res = await registerUser(payload)
    return res.id
  }
};

export const resolvers = { queries, mutations };
