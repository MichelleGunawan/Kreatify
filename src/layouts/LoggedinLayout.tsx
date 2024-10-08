import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "@/styles/globals.css";
import "@/styles/loggedin.layout.scss";

export const metadata: Metadata = {
  title: "Kreatify",
  description: "Kreatify - Designed to Modernize Influencer Management",
};

export default function LoggedinLayout({
  children,
  headerTitle,
}: Readonly<{
  children: React.ReactNode;
  headerTitle: string;
}>) {
  return (
    <div className="screen-view">
      <Sidebar user={"Management"} />
      <div className="page-view hide-scrollbar">
        <Header title={headerTitle} />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}
