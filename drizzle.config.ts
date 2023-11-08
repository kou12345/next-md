import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "src/server/db/schema.ts",
  driver: "mysql2",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
