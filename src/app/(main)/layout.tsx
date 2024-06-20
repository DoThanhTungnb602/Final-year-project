import Header from "~/components/layout/header";
import Sidebar from "~/components/layout/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-screen max-h-screen w-full pl-[56px]">
      <Sidebar />
      <div className="flex h-full flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-3">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
