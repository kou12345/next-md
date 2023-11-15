"use client";

import { getChatHistory } from "@/server/chatHistory";
import { Message } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { MessageForm } from "./MessageForm";
import { MessageList } from "./MessageList";

type Props = {
  roomId: string;
  userId: string;
  userName: string;
};

export const Socket = (props: Props) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await getChatHistory(Number(props.roomId));
      console.log("result: ", result);
      if (result) {
        result.forEach((message) => {
          const newMessage: Message = {
            message: message.messageText,
            userId: message.userId,
            userName: message.userName,
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      }
    };

    fetchMessages();

    const existingSocket = socketRef.current;
    if (existingSocket) {
      existingSocket.close();
    }

    // 新しいWebSocketインスタンスを作成
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL as string);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to the WebSocket server");
      // ルーム参加のメッセージを送信
      ws.send(
        JSON.stringify({
          type: "joinRoom",
          roomId: props.roomId,
          userId: props.userId,
        })
      );
    };

    ws.onmessage = (event) => {
      console.log("Received:", event.data);
      const resultJson = JSON.parse(event.data);
      console.log("resultJson: ", resultJson);
      const message: Message = {
        message: resultJson.message,
        userId: resultJson.userId,
        userName: resultJson.userName,
      };
      console.log("message: ", message);

      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = () => {
      console.log("Disconnected from the WebSocket server");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // コンポーネントのアンマウント時にWebSocket接続を閉じる
    return () => {
      ws.close();
    };
  }, [props.roomId, props.userId]);

  // メッセージをサーバーに送信する関数
  const sendMessage = (message: string) => {
    if (socketRef.current) {
      socketRef.current.send(
        JSON.stringify({
          type: "message",
          roomId: props.roomId,
          userId: props.userId,
          userName: props.userName,
          message,
        })
      );
    } else {
      console.error("WebSocket instance is not ready.");
    }
  };

  return (
    <div className="">
      <MessageList messages={messages} />
      <MessageForm sendMessage={sendMessage} />
    </div>
  );
};
