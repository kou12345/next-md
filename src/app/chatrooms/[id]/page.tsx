import { currentUser } from "@clerk/nextjs";
import { Socket } from "../../Socket";

export default async function Home({ params }: { params: { id: string } }) {
  const user = await currentUser();

  const id = params.id;
  console.log(id);

  return (
    <div className="w-full flex justify-center items-center">
      <Socket roomId={id} userId={user?.id as string} userName={user?.username as string} />
    </div>
  );
}
