import { PrismaClient } from "./generated/client/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const dbAdapter = new PrismaMariaDb(connectionString);

export const prisma = new PrismaClient({
    adapter: dbAdapter,
});