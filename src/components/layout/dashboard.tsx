import Sidebar from "./sidebar";
import Header from "./header";

export function Dashboard() {
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
      </div>
    </div>
  );
}
