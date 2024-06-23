import AdminHeader from "~/components/layout/admin-header";
import AdminSidebar from "~/components/layout/admin-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-screen max-h-screen w-full pl-[56px]">
      <AdminSidebar />
      <div className="flex h-full flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-3">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
