import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <div className="flex bg-base-100 fixed justify-between w-4/5 items-center">
      <div className="">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          Chat
        </a>
      </div>
      <div className="">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
