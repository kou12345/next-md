"use server";

import { currentUser } from "@clerk/nextjs";
import { Socket } from "./Socket";

export default async function Home() {
  const user = await currentUser();
  console.log(user?.id);

  return (
    <div>
      <Socket userId={user?.id as string} />
    </div>
  );
}
