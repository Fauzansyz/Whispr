"use client"
import { useState } from "react";
import { useSession } from "@/lib/auth-client";

export default function Profile() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Profile</h1>
      <p>{session?.user?.email}</p>
    </div>
  );
}
