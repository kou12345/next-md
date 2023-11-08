"use server";

import { currentUser } from "@clerk/nextjs";
import { Socket } from "./Socket";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="w-full">
      <Socket userId={user?.id as string} />
    </div>
  );
}
