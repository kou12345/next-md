"use client";

import { useState } from "react";

type Props = {
  sendMessage: (message: string) => void;
};

export const MessageForm = (props: Props) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.sendMessage(message);
    setMessage("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          required
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />
        <button className="btn btn-active btn-primary">Primary</button>
      </form>
    </div>
  );
};
