import { getChatHistory } from "@/server/chatHistory";
import { getUserName } from "@/server/user";
import { Message } from "@/types/types";
import { useEffect, useState } from "react";

export const useChatHistory = (roomId: number) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await getChatHistory(roomId);
      if (result) {
        const messagesWithUser = await Promise.all(
          result.map(async (message) => {
            const userName = await getUserName(message.userId);
            return {
              message: message.messageText as string,
              userId: message.userId as string,
              userName: userName as string,
            };
          })
        );
        setMessages(messagesWithUser);
      }
    };

    fetchMessages();
  }, [roomId]);

  return messages;
};
