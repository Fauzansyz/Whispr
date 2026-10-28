import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
export async function proxy(req) {
  const sessions = await auth.api.getSession({ headers: req.headers });
  if (sessions?.user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}

export const config = {
  matcher: "/login",
};
