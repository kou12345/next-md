import { Button, Textarea } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="h-screen">
      <div>hoge</div>
      <Button>hoge</Button>
      <Textarea
        variant="bordered"
        placeholder="Enter your description"
        className="w-full h-screen"
      />
    </div>
  );
}
