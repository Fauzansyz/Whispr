import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import db, { schema } from "@/lib/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        input: true,
      },
    },
  },
  rateLimit: {
    enabled: true,
    max: 100,
    window: 10,
  },
  emailAndPassword: {
    enabled: true,
  },

  secret: process.env.BETTER_AUTH_SECRET,

  baseURL: process.env.BETTER_AUTH_URL,
});
