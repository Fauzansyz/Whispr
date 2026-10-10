import { and, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { message } from "../../../../../drizzle/schema";

export async function PATCH(request, { params }) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return Response.json({ error: "Sign in to manage inbox messages." }, { status: 401 });
  }

  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return Response.json({ error: "Message not found." }, { status: 404 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Request body must be a JSON object." }, { status: 400 });
  }

  const updates = {
    read: { isRead: true },
    unread: { isRead: false },
    star: { isStarred: true },
    unstar: { isStarred: false },
    spam: { isSpam: true },
    unspam: { isSpam: false },
  };
  const update = updates[body.action];
  if (!update) {
    return Response.json({ error: "Unsupported message action." }, { status: 400 });
  }

  try {
    const [updated] = await db
      .update(message)
      .set(update)
      .where(and(eq(message.id, id), eq(message.recipientId, session.user.id)))
      .returning({
        id: message.id,
      });

    if (!updated) {
      return Response.json({ error: "Message not found." }, { status: 404 });
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to update inbox message:", error);
    return Response.json({ error: "Could not update this message." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return Response.json({ error: "Sign in to manage inbox messages." }, { status: 401 });
  }

  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return Response.json({ error: "Message not found." }, { status: 404 });
  }

  try {
    const deleted = await db
      .delete(message)
      .where(and(eq(message.id, id), eq(message.recipientId, session.user.id)))
      .returning({ id: message.id });

    if (!deleted[0]) {
      return Response.json({ error: "Message not found." }, { status: 404 });
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete inbox message:", error);
    return Response.json({ error: "Could not delete this message." }, { status: 500 });
  }
}
