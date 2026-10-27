import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { getEnvironment } from "./environment";
const globalDb = globalThis as unknown as { h3ldeskDb?: PrismaClient };
export const db =
  globalDb.h3ldeskDb ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: getEnvironment().DATABASE_URL,
      max: 5,
    }),
  });
if (process.env.NODE_ENV !== "production") globalDb.h3ldeskDb = db;
