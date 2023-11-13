"use client";

import { useChatHistory } from "@/hooks/useChatHistory";
import { MessageList } from "./MessageList";

type Props = {
  roomId: number;
};

export const ChatHistory = (props: Props) => {
  const messages = useChatHistory(props.roomId);

  if (!messages) {
    return <div>Loading...</div>;
  }

  return <MessageList messages={messages} />;
};
