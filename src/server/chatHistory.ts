"use server";

import { eq } from "drizzle-orm";
import { messages } from "../../drizzle/schema";
import { db } from "./db";

export async function getChatHistory(roomId: number) {
  console.log("getChatHistory");
  console.log(roomId);
  try {
    const result = await db
      .select({
        userId: messages.userId,
        userName: messages.userName,
        messageText: messages.messageText,
      })
      .from(messages)
      .where(eq(messages.roomId, roomId));
    console.log(result);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
