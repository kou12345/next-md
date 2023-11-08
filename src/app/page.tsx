"use client";

import { useEffect, useRef, useState } from "react";
import { MessageForm } from "./MessageForm";
import { MessageList } from "./MessageList";

export default function Home() {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

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
      setMessages((prevMessages) => [...prevMessages, event.data]);
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
      socketRef.current.send(message);
    } else {
      console.error("WebSocket instance is not ready.");
    }
  };

  return (
    <div>
      <h1>WebSocket Test</h1>
      <button onClick={() => sendMessage("Hello Server!")}>Send Message</button>
      <div>
        <h2>Messages:</h2>
        <MessageList messages={messages} />
      </div>
      <MessageForm sendMessage={sendMessage} />
    </div>
  );
}
