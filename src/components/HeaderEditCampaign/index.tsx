"use client";
import React from "react";
import { useRouter } from "next/navigation";

//Component import
import Button from "@/components/Button";
import { getIconLink } from "@/utils/functions/iconLinks";

//CSS import
import "@/styles/header.scss";
import { UUID } from "crypto";

const HeaderEditCampaign: React.FC<HeaderEditCampaignProps> = ({
  campaignId,
  onSave,
  saveDisabled,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="header">
        <div className="header-left"></div>
        <div className="header-right">
          <Button
            icon={getIconLink("save")}
            label="Save"
            color="#ffffff"
            backgroundColor="#775FFF"
            borderColor="#775FFF"
            width="100px"
            height="40px"
            borderRadius="10px"
            textClass="h3"
            onClick={onSave}
            disabled={saveDisabled}
          />
        </div>
      </div>
    </>
  );
};

export default HeaderEditCampaign;

type HeaderEditCampaignProps = {
  campaignId: UUID | null;
  onSave: () => void;
  saveDisabled: boolean;
};
