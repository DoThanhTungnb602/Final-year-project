import Header from "~/components/layout/header";
import Sidebar from "~/components/layout/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
