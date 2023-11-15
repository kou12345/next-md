import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          Chat
        </a>
      </div>
      <div className="">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
  return <div></div>;
};
