import { eq, sql } from "drizzle-orm";
import db from "@/lib/db";
import { account } from "../../../../../../../drizzle/schema";

export async function GET(_request, { params }) {
  const { id } = await params;

  try {
    const [accounts] = await db
      .select({
        providerId: account.providerId,
      })
      .from(account)
      .where(eq(account.accountId, id))
      .limit(1);
    if (!accounts) {
      return Response.json({ error: "Account not found." }, { status: 404 });
    }
    return Response.json({ accounts });
  } catch (error) {
    console.error("Failed to load account:", error);
    return Response.json(
      { error: "Could not load this account." },
      { status: 500 },
    );
  }
}
