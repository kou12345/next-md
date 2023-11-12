"use client";

import { Message } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { ChatHistory } from "./ChatHistory";
import { MessageForm } from "./MessageForm";

type Props = {
  roomId: string;
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
    <div className="w-4/5 flex justify-center items-center">
      <div>
        <ChatHistory roomId={Number(props.roomId)} />
        <div>
          <div className="my-6">
            <MessageForm sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};
