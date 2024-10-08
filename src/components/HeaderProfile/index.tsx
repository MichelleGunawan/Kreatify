"use client";
import React, { useState, Dispatch, SetStateAction } from "react";

//Component import
import CustomTabs from "../Tabs";

//CSS import
import "@/styles/header.scss";
import { UUID } from "crypto";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";

const HeaderProfile: React.FC<HeaderProfileProps> = ({
  profileId,
  role,
  view,
  setView,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditButtonClick = () => {
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="header">
        <div className="header-left">
          {usePermission(USER_PERMISSIONS.TIER_I1) && (
            <CustomTabs
              tabs={["Profile", "Media Kit"]}
              tab={view}
              setTab={setView}
            />
          )}
        </div>
        <div className="header-right">
          {/* <Button
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
          /> */}
        </div>
      </div>

      {/* {isEditModalOpen && (
        <ModalEdit setOpen={setIsEditModalOpen} profileRole={role} />
      )} */}
    </>
  );
};

export default HeaderProfile;

type HeaderProfileProps = {
  profileId: UUID | null;
  role: string | null;
  view: number;
  setView: Dispatch<SetStateAction<number>>;
};
