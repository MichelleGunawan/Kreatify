"use client";
import React from "react";

//Component import
import Button from "@/components/Button";
import { getIconLink } from "@/utils/functions/iconLinks";

//CSS import
import "./styles/index.scss";
import { formatUrl } from "@/utils/functions/format.functions";
import { UUID } from "crypto";
import useAgencyLogo from "@/hooks/useAgencyLogo";

const HeaderPresentation: React.FC<HeaderPresentationProps> = ({
  agencyId,
  onExit,
}) => {
  const { agencyLogo, agencyWebsite, agencyName } = useAgencyLogo({ agencyId });

  return (
    <div className="header-presentation">
      <div className="header-presentation-exit-button">
        {onExit && (
          <Button
            icon={getIconLink("remove")}
            color="#a4a4a4"
            borderColor="#a4a4a4"
            onClick={onExit}
            width="40px"
            height="40px"
          />
        )}
      </div>

      {agencyLogo && (
        <img
          src={agencyLogo || getIconLink("kreatifylogofullblack")}
          style={{ height: "30px", width: "auto", maxWidth: "300px" }}
          onClick={() => {
            if (agencyWebsite) window.open(formatUrl(agencyWebsite), "_blank");
            // router.push(`/agency/${agencyId}`);
          }}
          alt={agencyName || "Agency logo"}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default HeaderPresentation;

type HeaderPresentationProps = {
  agencyId: UUID | null;
  onExit?: () => void;
};
