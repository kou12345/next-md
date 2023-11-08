import { MessageListItem } from "./MessageListItem";
import { Message } from "./Socket";

type Props = {
  messages: Message[];
};

export const MessageList = (props: Props) => {
  return (
    <div>
      {props.messages.map((message, index) => {
        return <MessageListItem key={index} message={message} />;
      })}
    </div>
  );
};
