const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-full w-full place-items-center">{children}</div>
  );
};

export default AuthLayout;
