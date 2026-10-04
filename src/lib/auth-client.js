"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  fetchOptions: {
    onError: async (context) => {
      const { response } = context;
      if (response.status === 429) {
        const retryAf = response.headers.get("X-Retry-After");
        console.log(`Rate limit has been exceed. Retry after ${retryAf}`);
      }
    },
  },
});

export const { signIn, signOut, useSession } = authClient;
