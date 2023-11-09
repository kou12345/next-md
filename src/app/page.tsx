"use server";

import { currentUser } from "@clerk/nextjs";
import { Socket } from "./Socket";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="w-full flex justify-center items-center">
      <Socket userId={user?.id as string} userName={user?.username as string} />
    </div>
  );
}
