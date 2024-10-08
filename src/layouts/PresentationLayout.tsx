import type { Metadata } from "next";
import HeaderPresentation from "@/components/HeaderPresentation";
import FooterKreatify from "@/components/FooterKreatify";
import "@/styles/presentation.layout.scss";
import useAgencyLogo from "@/hooks/useAgencyLogo";
import { UUID } from "crypto";

export const metadata: Metadata = {
  title: "Kreatify",
  description: "Kreatify - Designed to Modernize Influencer Management",
};

export default function PresentationLayout({
  children,
  agencyId,
}: Readonly<{
  children: React.ReactNode;
  agencyId: UUID | null;
}>) {
  return (
    <div className="presentation-screen-view hide-scrollbar">
      <HeaderPresentation agencyId={agencyId} />
      <div className="presentation-page-content">{children}</div>
      <FooterKreatify />
    </div>
  );
}
