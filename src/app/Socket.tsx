"use client";

import { useEffect, useRef, useState } from "react";
import { MessageForm } from "./MessageForm";
import { MessageList } from "./MessageList";

export type Message = {
  message: string;
  userId: string;
  userName: string;
};

type Props = {
  userId: string;
  userName: string;
};

export const Socket = (props: Props) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const existingSocket = socketRef.current;
    if (existingSocket) {
      existingSocket.close();
    }

    // 新しいWebSocketインスタンスを作成
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL as string);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to the WebSocket server");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data) as Message;
      // console.log("message: ", message);

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
  }, []);

  // メッセージをサーバーに送信する関数
  const sendMessage = (message: string) => {
    if (socketRef.current) {
      socketRef.current.send(
        JSON.stringify({ message, userId: props.userId, userName: props.userName })
      );
    } else {
      console.error("WebSocket instance is not ready.");
    }
  };

  return (
    <div className="w-4/5 flex justify-center items-center">
      <div className="justify-center">
        <MessageList messages={messages} />
        <div>
          <MessageForm sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};
