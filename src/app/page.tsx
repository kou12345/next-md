"use server";

import { ChatRoomList } from "./ChatRoomList";

export default async function Home() {
  return (
    // <div className="grid grid-cols-12 gap-4">
    <div className="col-start-5 col-span-4">
      <ChatRoomList />
    </div>
    // </div>
  );
}
