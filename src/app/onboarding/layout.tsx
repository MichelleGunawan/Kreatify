import type { Metadata } from "next";
import "@/styles/onboarding.page.scss";

export const metadata: Metadata = {
  title: "Kreatify",
  description: "Kreatify - Designed to Modernize Influencer Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="onboarding-layout">{children}</div>;
}
