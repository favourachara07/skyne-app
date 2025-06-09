'use client'

import Chatbot from "@/app/components/common/Chatbot";
import Footer from "@/app/components/common/Footer";
import Navbar from "@/app/components/common/Navbar";
import { usePathname } from "next/navigation";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <>
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <Footer />}
      {!isAuthPage && <Chatbot />}
    </>
  );
}
