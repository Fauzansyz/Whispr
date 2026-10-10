import { eq, sql } from "drizzle-orm";
import db from "@/lib/db";
import { user } from "../../../../../drizzle/schema";

export async function GET(_request, { params }) {
  const { username: routeUsername } = await params;
  const username = routeUsername.replace(/^@/, "").trim().toLowerCase();
  if (!/^[a-z0-9_.]{3,30}$/.test(username)) {
    return Response.json({ error: "Profile not found." }, { status: 404 });
  }

  try {
    const [profile] = await db
      .select({
        name: user.name,
        username: user.username,
        bio: user.bio,
        isAcceptingMessages: user.isAcceptingMessages,
      })
      .from(user)
      .where(sql`lower(${user.username}) = ${username}`)
      .limit(1);
    if (!profile) {
      return Response.json({ error: "Profile not found." }, { status: 404 });
    }
    return Response.json({ profile });
  } catch (error) {
    console.error("Failed to load public profile:", error);
    return Response.json({ error: "Could not load this profile." }, { status: 500 });
  }
}
