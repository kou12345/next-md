"use server";

import Link from "next/link";

type Props = {
  id: number;
  roomName: string;
};

export const ChatRoomListItem = (props: Props) => {
  return (
    <div className="card bg-neutral text-neutral-content my-4">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{props.roomName}</h2>
        <div className="card-actions justify-end">
          <Link href={`/chatrooms/${props.id}`} className="btn btn-primary">
            {"Join"}
          </Link>
        </div>
      </div>
    </div>
  );
};
{
}
