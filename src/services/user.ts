import { prisma } from "../db";
import { hash } from "bcrypt";

export interface RegisterUserPayload {
  email: string;
  password: string;
}

export const registerUser = async (payload: RegisterUserPayload) => {
  const { email, password } = payload;
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);
  
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return newUser;
};

// login user