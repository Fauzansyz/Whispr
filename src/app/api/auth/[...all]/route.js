import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export async function GET(req, ctx) {
  return handler.GET(req, ctx);
}

export async function POST(req, ctx) {
  return handler.POST(req, ctx);
}
