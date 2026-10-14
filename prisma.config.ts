import path from "path";
import "dotenv/config";
import { defineConfig } from "prisma/config";

const dbPath = path.resolve(process.cwd(), "prisma", "dev.db");
const dbUrl = process.env.DATABASE_URL || `file:${dbPath}`;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: dbUrl,
  },
});
