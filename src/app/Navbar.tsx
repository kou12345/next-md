import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
