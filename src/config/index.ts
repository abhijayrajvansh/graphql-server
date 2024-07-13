import { config } from "dotenv";

config();

export const PORT = Number(process.env.PORT) || 8000
export const AUTH_SECRET = process.env.AUTH_SECRET