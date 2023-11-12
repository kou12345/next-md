"use server";

import { ChatRoomList } from "./ChatRoomList";

export default async function Home() {
  return (
    <div className="w-full flex justify-center items-center">
      <ChatRoomList />
    </div>
  );
}
