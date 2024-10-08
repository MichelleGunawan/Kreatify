import type { Metadata } from "next";
import "@/styles/login.page.scss";

export const metadata: Metadata = {
  title: "Kreatify",
  description: "Kreatify - Designed to Modernize Influencer Management",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="login-layout">{children}</div>;
}
