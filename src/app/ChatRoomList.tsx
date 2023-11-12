import { getChatRoomList } from "@/server/chatRooms.ts/chatRoomList";
import Link from "next/link";

export const ChatRoomList = async () => {
  const ChatRoomList = await getChatRoomList();
  console.log(ChatRoomList);
  return (
    <div>
      <div>チャットルーム一覧</div>
      <ul>
        {ChatRoomList?.map((chatRoom) => (
          <li key={chatRoom.id}>
            <Link href={`/chatrooms/${chatRoom.id}`}>{chatRoom.roomName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
