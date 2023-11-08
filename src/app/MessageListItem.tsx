type Props = {
  message: string;
};

export const MessageListItem = (props: Props) => {
  return (
    <div className="chat chat-start">
      <div className="chat-header">
        Obi-Wan Kenobi
        <time className="text-xs opacity-50">2 hours ago</time>
      </div>
      <div className="chat-bubble">{props.message}</div>
    </div>
  );
};
