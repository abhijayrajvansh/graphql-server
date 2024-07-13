import { prisma } from "../db";
import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { AUTH_SECRET } from "../config";

export interface RegisterUserPayload {
  email: string;
  password: string;
}

export interface LoginUserPayload {
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



export const loginUser = async (payload: LoginUserPayload) => {
  const { email, password } = payload;

  const isUser = await prisma.user.findUnique({ where: { email } });
  if (!isUser) throw new Error("user not found");

  const isValidPassword = await compare(password, isUser.password);
  if (!isValidPassword) throw new Error("wrong password");

  const userIdentity = {
    id: isUser.id,
    email: isUser.email,
  };

  const token = sign(userIdentity, AUTH_SECRET);
  return token;
};

export const decodeToken = (token: string) => {
  return verify(token, AUTH_SECRET) as {id: string, email: string};
};
