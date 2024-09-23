import { prismaClient } from "..";

const logAllUsers = async () => {
  const allUsers = await prismaClient.user.findMany()
  console.log({allUsers})
}

logAllUsers()