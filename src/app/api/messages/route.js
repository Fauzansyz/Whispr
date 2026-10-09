import { createHmac } from "node:crypto";
import { and, count, desc, eq, gt, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { message, user } from "../../../../drizzle/schema";

const MAX_MESSAGE_LENGTH = 1000;
const MAX_PROMPT_LENGTH = 120;
const IP_MESSAGE_LIMIT = 5;
const IP_WINDOW_MS = 10 * 60 * 1000;

export async function GET(request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return Response.json({ error: "Sign in to view your inbox." }, { status: 401 });
  }

  try {
    const messages = await db
      .select({
        id: message.id,
        content: message.content,
        prompt: message.prompt,
        isRead: message.isRead,
        isStarred: message.isStarred,
        isSpam: message.isSpam,
        createdAt: message.createdAt,
      })
      .from(message)
      .where(eq(message.recipientId, session.user.id))
      .orderBy(desc(message.createdAt))
      .limit(100);

    return Response.json({ messages });
  } catch (error) {
    console.error("Failed to load inbox messages:", error);
    return Response.json({ error: "Could not load messages." }, { status: 500 });
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Request body must be a JSON object." }, { status: 400 });
  }

  const username =
    typeof body.username === "string"
      ? body.username.replace(/^@/, "").trim().toLowerCase()
      : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const prompt =
    typeof body.prompt === "string" ? body.prompt.trim().slice(0, MAX_PROMPT_LENGTH) : "";

  if (!/^[a-z0-9_.]{3,30}$/.test(username)) {
    return Response.json({ error: "That profile link is invalid." }, { status: 400 });
  }
  if (!content || content.length > MAX_MESSAGE_LENGTH) {
    return Response.json(
      { error: `Message must be between 1 and ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 },
    );
  }

  try {
    const [recipient] = await db
      .select({
        id: user.id,
        isAcceptingMessages: user.isAcceptingMessages,
      })
      .from(user)
      .where(sql`lower(${user.username}) = ${username}`)
      .limit(1);

    if (!recipient || !recipient.isAcceptingMessages) {
      return Response.json(
        { error: "This profile is not accepting messages." },
        { status: 404 },
      );
    }

    const ipAddress =
      request.headers.get("x-real-ip") ||
      request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim();
    let senderIpHash = null;
    if (ipAddress) {
      const secret = process.env.BETTER_AUTH_SECRET;
      if (!secret) {
        console.error("BETTER_AUTH_SECRET is required to hash sender IP addresses.");
        return Response.json({ error: "Messages are temporarily unavailable." }, { status: 503 });
      }
      senderIpHash = createHmac("sha256", secret).update(ipAddress).digest("hex");
      const cutoff = new Date(Date.now() - IP_WINDOW_MS);
      const [recent] = await db
        .select({ total: count() })
        .from(message)
        .where(
          and(
            eq(message.senderIpHash, senderIpHash),
            gt(message.createdAt, cutoff),
          ),
        );
      if (recent.total >= IP_MESSAGE_LIMIT) {
        return Response.json(
          { error: "Please wait a few minutes before sending another message." },
          { status: 429 },
        );
      }
    }

    await db.insert(message).values({
      recipientId: recipient.id,
      content,
      prompt: prompt || null,
      senderIpHash,
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to create anonymous message:", error);
    return Response.json({ error: "Could not send your message. Please try again." }, { status: 500 });
  }
}
