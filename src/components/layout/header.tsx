import { UserInfo } from "~/components/shared/user-info";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-[57px] shrink-0 items-center gap-1 border-b bg-background px-4">
      <UserInfo />
    </header>
  );
};

export default Header;
