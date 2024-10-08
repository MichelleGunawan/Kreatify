import React, { ReactNode } from "react";
import AppWrappers from "./AppWrappers";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable}`}>
      <body id={"root"}>
        <AppWrappers>{children}</AppWrappers>
      </body>
    </html>
  );
}
