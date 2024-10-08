"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

//Component import
import Button from "@/components/Button";
import CustomTabs from "@/components/Tabs";
import { getIconLink } from "@/utils/functions/iconLinks";

//CSS import
import "@/styles/header.scss";

const HeaderCampaigns: React.FC<HeaderCampaignsProps> = ({ tab, setTab }) => {
  const router = useRouter();

  const handleTabChange = (index: number) => {
    setTab(index);
  };

  return (
    <>
      <div className="header">
        <div className="header-left">
          <CustomTabs
            tabs={["My Campaigns", "All Campaigns"]}
            tab={tab}
            setTab={handleTabChange}
            color="#775FFF"
          />
        </div>
        <div className="header-right">
          <Button
            label="Create Campaign"
            icon={getIconLink("add")}
            color="#ffffff"
            backgroundColor="#775FFF"
            borderColor="#775FFF"
            width="180px"
            height="40px"
            borderRadius="10px"
            textClass="h3"
            onClick={() => router.push(`/campaign/edit/new`)}
          />
        </div>
      </div>
    </>
  );
};

export default HeaderCampaigns;
type HeaderCampaignsProps = {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
};
