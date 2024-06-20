import { UserInfo } from "~/components/shared/user-info";
import { Button } from "../ui/button";
import { FaList } from "react-icons/fa6";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { Package2 } from "lucide-react";
import { Home, ShoppingCart, Package, Users2, LineChart } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-[57px] shrink-0 items-center justify-between gap-1 border-b bg-background px-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm" variant="outline">
            <FaList className="mr-2 size-4" /> Problem list
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-lg">
          <p className="text-xl font-semibold"></p>
        </SheetContent>
      </Sheet>
      <UserInfo />
    </header>
  );
};

export default Header;
