"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { useGlobalContext } from "@/context";

//Component import
import CustomTabs from "../Tabs";
import Button from "@/components/Button";
import { getIconLink } from "@/utils/functions/iconLinks";

//CSS import
import "@/styles/header.scss";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";

const HeaderAgency: React.FC<HeaderAgencyProps> = ({
  tabs,
  tab,
  setTab,
  handleEditButtonClick,
}) => {
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M2Permission = usePermission(USER_PERMISSIONS.TIER_M2);

  return (
    <>
      <div className="header">
        <div className="header-left">
          {tabs.length > 1 && I1Permission && (
            <CustomTabs tabs={tabs} tab={tab} setTab={setTab} color="#775FFF" />
          )}
        </div>
        <div className="header-right">
          {M2Permission && (
            <Button
              label="Edit Info"
              icon={getIconLink("edit")}
              color="#775FFF"
              backgroundColor="transparent"
              borderColor="#775FFF"
              width="130px"
              height="40px"
              borderRadius="10px"
              textClass="h3"
              onClick={handleEditButtonClick}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderAgency;
type HeaderAgencyProps = {
  tabs: string[];
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
  handleEditButtonClick: () => void;
};
