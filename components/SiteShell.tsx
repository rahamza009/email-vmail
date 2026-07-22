"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FooterDivider from "./FooterDivider";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  return (
    <>
      <Navbar />
      {children}
      <FooterDivider />
      <Footer />
    </>
  );
}
