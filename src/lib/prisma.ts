import path from "path";
import { PrismaClient } from "@prisma/client";

// Resolve SQLite path relative to project root
if (
  !process.env.DATABASE_URL ||
  process.env.DATABASE_URL.includes("dev.db") ||
  process.env.DATABASE_URL.startsWith("file:")
) {
  const dbPath = path.resolve(process.cwd(), "prisma", "dev.db");
  process.env.DATABASE_URL = `file:${dbPath}`;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
