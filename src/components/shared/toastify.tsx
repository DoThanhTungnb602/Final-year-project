"use client";

import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";

export function Toastify() {
  const { theme } = useTheme();
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      limit={5}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme === "dark" ? "dark" : "light"}
    />
  );
}
