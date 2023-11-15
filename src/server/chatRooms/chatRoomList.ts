"use server";

import { rooms } from "../../../drizzle/schema";
import { db } from "../db";

export async function getChatRoomList() {
  try {
    const result = await db.select().from(rooms);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
