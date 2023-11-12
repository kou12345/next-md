"use client";

import { useChatHistory } from "@/hooks/useChatHistory";
import { MessageList } from "./MessageList";

type Props = {
  roomId: number;
};

export const ChatHistory = (props: Props) => {
  const messages = useChatHistory(props.roomId);

  if (!messages) {
    return null;
  }

  return <MessageList messages={messages} />;
};
