import { LoginUserPayload, RegisterUserPayload, getUserById, loginUser, registerUser } from "../../services/user";

const queries = {
  hello: () => "hello from graphql",
  loginUser: async (_: any, payload:LoginUserPayload) => {
    const res = loginUser(payload)
    return res;
  },
  getCurrentLoggedInUser: async (_:any, params: any, context: any) => {
    if (context && context.userIdentity) {
      const userId =  context.userIdentity.id;
      const user = getUserById(userId);
      return user;
    }
    throw new Error("access denied")
  }
};

const mutations = {
  registerUser: async (_: any, payload: RegisterUserPayload) => {
    const res = await registerUser(payload)
    return res.id
  }
};

export const resolvers = { queries, mutations };
