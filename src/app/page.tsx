"use client";

import { useEffect, useRef, useState } from "react";

const Home = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // useRefを使ってWebSocketインスタンスを保持する
    socketRef.current = new WebSocket("ws://localhost:8080");

    const ws = socketRef.current;

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
    const ws = socketRef.current;
    if (ws) {
      ws.send(message);
    }
  };

  return (
    <div>
      <h1>WebSocket Test</h1>
      <button onClick={() => sendMessage("Hello Server!")}>Send Message</button>
      <div>
        <h2>Messages:</h2>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
