import { useUser } from "@clerk/nextjs";
import { Message } from "./Socket";

type Props = {
  message: Message;
};

export const MessageListItem = (props: Props) => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Not signed in</div>;
  }

  const isOwnMessage = props.message.userId === user?.id;

  return (
    <div className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}>
      <div className="chat-header">
        {isOwnMessage ? user?.username : "Other User"}
        <time className="text-xs opacity-50">2 hours ago</time>
      </div>
      <div className="chat-bubble">{props.message.message}</div>
    </div>
  );
};
