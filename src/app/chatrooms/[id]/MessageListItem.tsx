"use client";

type Props = {
  message: string;
  isOwnMessage: boolean;
  userName: string;
};

export const MessageListItem = (props: Props) => {
  return (
    <div className={`chat ${props.isOwnMessage ? "chat-end" : "chat-start"}`}>
      <div className="chat-header">{props.userName}</div>
      <div className="chat-bubble">{props.message}</div>
    </div>
  );
};
