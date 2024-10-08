"use client";
import React, { useEffect, useState } from "react";
import { UUID } from "crypto";

//Component import
import Button from "@/components/Button";
import ProfileInfo from "@/components/ProfileInfo";
import CustomTabs from "@/components/Tabs";
import ModalEditProfile from "@/components/ModalEditProfile";
import CardInfoCols from "@/components/CardInfoCols";
import { formatDateForDisplay } from "@/utils/functions/format.functions";
import { getIconLink } from "@/utils/functions/iconLinks";
import { UserProfileType } from "@/types/profile.type";
import useUserProfileData from "@/hooks/useUserProfileData";

//CSS import
import "@/styles/agency.page.scss";
import { useGlobalContext } from "@/context";
import { editManager } from "@/services/managers/post_actions";
import { convertToUUID } from "@/utils/functions/converter.functions";

const ManagerProfile: React.FC<UserProfileType> = ({ profileId }) => {
  const { managerId } = useGlobalContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tab, setTab] = useState(0);

  const handleEditButtonClick = () => {
    setIsEditModalOpen(true);
  };

  const {
    profileImage,
    name,
    niches,
    bio,
    location,
    socialFollowing,
    setProfileImage,
    basicInfo,
  } = useUserProfileData({
    managerId: convertToUUID(profileId),
  });

  const handleEditSave = ({
    profileImage,
    role,
  }: {
    profileImage: string;
    role: string;
  }) => {
    // TODO: update profileimage
    editManager({
      managerID: convertToUUID(profileId),
      role,
    });
  };

  const managerInfo = [
    { label: "Role", value: basicInfo?.role },
    { label: "Email", value: basicInfo?.email },
    { label: "Phone", value: basicInfo?.phone },
    { label: "Managing", value: basicInfo?.managing },
    {
      label: "Date of Birth",
      value: formatDateForDisplay(basicInfo?.birth_date),
    },
    { label: "Gender", value: basicInfo?.gender },
    { label: "Sexuality", value: basicInfo?.sexuality },
    { label: "Ethnicity", value: basicInfo?.ethnicity },
  ];

  useEffect(() => {
    setTab(0);
  }, []);

  const ButtonsContainer = () => {
    return (
      <>
        {/* <Button
          icon={getIconLink("File")}
          color="#775FFF"
          borderColor="#775FFF"
          borderRadius="100px"
          width="40px"
          height="40px"
          tooltipText="Download Contract"
        /> */}
        {managerId === profileId && (
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
      </>
    );
  };

  return (
    <>
      <div className="agency-page-first-section">
        <ProfileInfo
          name={name}
          bio={bio}
          niches={niches}
          location={location}
          socialFollowing={socialFollowing}
          profileImage={profileImage}
          buttons={<ButtonsContainer />}
        />
      </div>
      <div className="grid grid-col-1">
        <CustomTabs tabs={["Profile Info"]} tab={tab} setTab={setTab} />
        {tab === 0 && (
          <>
            <div className="grid grid-col-1 z-0" style={{ width: "100%" }}>
              <CardInfoCols data={managerInfo} cols={4} />
            </div>
          </>
        )}
        {tab === 1 && <></>}
        {tab === 2 && <></>}
      </div>
      {isEditModalOpen && (
        <ModalEditProfile
          profileId={convertToUUID(profileId)}
          profileType={"manager"}
          setOpen={setIsEditModalOpen}
          currentProfileImage={profileImage}
          handleEditSave={handleEditSave}
        />
      )}
    </>
  );
};

export default ManagerProfile;
