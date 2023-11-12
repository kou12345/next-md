"use server";

import { clerkClient } from "@clerk/nextjs";

export async function getUserName(userId: string) {
  const user = await clerkClient.users.getUser(userId);
  return user.username;
}
