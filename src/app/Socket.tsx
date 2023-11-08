"use client";

import { useEffect, useRef, useState } from "react";
import { MessageForm } from "./MessageForm";
import { MessageList } from "./MessageList";

type Props = {
  userId: string;
};

export type Message = {
  message: string;
  userId: string;
};

export const Socket = (props: Props) => {
  console.log("userId: ", props.userId);
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const existingSocket = socketRef.current;
    if (existingSocket) {
      existingSocket.close();
    }

    // 新しいWebSocketインスタンスを作成
    const ws = new WebSocket("ws://localhost:8080");
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to the WebSocket server");
    };

    ws.onmessage = (event) => {
      console.log("Message from server:", event.data);
      // event.dataがJSON形式の文字列なので、JSON.parse()でオブジェクトに変換

      const message = JSON.parse(event.data) as Message;
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
  }, []);

  // メッセージをサーバーに送信する関数
  const sendMessage = (message: string) => {
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({ message, userId: props.userId }));
    } else {
      console.error("WebSocket instance is not ready.");
    }
  };

  return (
    <div>
      <div>
        <h2>Messages:</h2>
        <MessageList messages={messages} />
      </div>
      <MessageForm sendMessage={sendMessage} />
    </div>
  );
};
