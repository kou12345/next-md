import { MessageListItem } from "./MessageListItem";

type Props = {
  messages: string[];
};

export const MessageList = (props: Props) => {
  console.log("MessageList");
  console.log(props.messages);
  console.log(props.messages.length);
  return (
    <div>
      <div>MessageList</div>
      {props.messages.map((message, index) => {
        return <MessageListItem key={index} message={message} />;
      })}
    </div>
  );
};