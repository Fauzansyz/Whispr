import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sql } from "drizzle-orm";

import db, { schema } from "@/lib/db";

const normalizeUsername = (value) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9_.]/g, "")
    .slice(0, 30);

async function createUsername(user) {
  const emailUsername = user.email?.split("@")[0]?.split("+")[0] ?? "";
  const nameUsername = user.name ?? "";
  const normalizedName = normalizeUsername(nameUsername);
  const normalizedEmail = normalizeUsername(emailUsername);
  // Prefer display name (Google/OAuth gives a real name like "Jane Smith" → "janesmith")
  // Fall back to email local part, then a generic prefix
  const base =
    (normalizedName.length >= 3 && normalizedName) ||
    (normalizedEmail.length >= 3 && normalizedEmail) ||
    "user";

  for (let suffix = 1; ; suffix += 1) {
    const suffixText = suffix === 1 ? "" : String(suffix);
    const candidate = `${base.slice(0, 30 - suffixText.length)}${suffixText}`;
    const [existingUser] = await db
      .select({ id: schema.user.id })
      .from(schema.user)
      .where(sql`lower(${schema.user.username}) = ${candidate}`)
      .limit(1);

    if (!existingUser) {
      return candidate;
    }
  }
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  databaseHooks: {
    user: {
      create: {
        before: async (newUser) => {
          if (
            typeof newUser.username === "string" &&
            /^[a-z0-9_.]{3,30}$/.test(newUser.username)
          ) {
            return;
          }

          return {
            data: {
              ...newUser,
              username: await createUsername(newUser),
            },
          };
        },
      },
    },
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: false,
        input: true,
      },
      bio: {
        type: "string",
        required: false,
        input: true,
      },
      isAcceptingMessages: {
        type: "boolean",
        required: false,
        input: true,
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 3600 * 24,
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
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },

  secret: process.env.BETTER_AUTH_SECRET,

  baseURL: process.env.BETTER_AUTH_URL,
});
