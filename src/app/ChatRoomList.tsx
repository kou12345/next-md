"use server";

import { getChatRoomList } from "@/server/chatRooms/chatRoomList";
import { ChatRoomListItem } from "./ChatRoomListItem";

export const ChatRoomList = async () => {
  const ChatRoomList = await getChatRoomList();
  return (
    <div>
      <div className="text-center text-lg">チャットルーム一覧</div>
      {ChatRoomList?.map((chatRoom) => (
        <div key={chatRoom.id}>
          <ChatRoomListItem id={chatRoom.id} roomName={chatRoom.roomName} />
        </div>
      ))}
    </div>
  );
};
