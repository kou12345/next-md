"use client";

import { Message } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { MessageListItem } from "./MessageListItem";

type Props = {
  messages: Message[];
};

export const MessageList = (props: Props) => {
  const { isSignedIn, user: currentUser, isLoaded } = useUser();

  return (
    <div>
      {props.messages.map((message, index) => {
        const isOwnMessage = message.userId === currentUser?.id;

        return (
          <MessageListItem
            key={index}
            message={message.message}
            isOwnMessage={isOwnMessage}
            userName={message.userName}
          />
        );
      })}
    </div>
  );
};
