"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context";
import { UUID } from "crypto";

//Component import
import CardText from "@/components/CardText";
import CardInfoCols from "@/components/CardInfoCols";
import Button from "@/components/Button";
import ProfileInfo from "@/components/ProfileInfo";
import CustomTabs from "@/components/Tabs";
import CardCampaignMatching from "@/components/CardCampaignMatching";
import CardPaymentInfo from "@/components/CardPaymentInfo";
import ModalEditProfile from "@/components/ModalEditProfile";
import {
  formatDateForDisplay,
  formatListWithComma,
} from "@/utils/functions/format.functions";
import useUserProfileData from "@/hooks/useUserProfileData";
import { getIconLink } from "@/utils/functions/iconLinks";
import { UserProfileType } from "@/types/profile.type";
import { editInfluencerNotes } from "@/services/profile/post_actions";
import { editInfluencer } from "@/services/influencers/post_actions";
import { PaymentType } from "@/types/payments.type";
import useUserSocialData from "@/hooks/useUserSocialData";
import useUserPaymentData from "@/hooks/useUserPaymentData";
import useUserCampaignMatchingData from "@/hooks/useUserCampaignMatchingData";
import usePermission from "@/hooks/usePermission";
import { PAGE_PERMISSIONS, USER_PERMISSIONS } from "@/utils/constants";

//CSS import
import "@/styles/agency.page.scss";
import { useInfluencerProfilePagePermission } from "@/hooks/useInfluencerProfilePagePermission";
import { convertToUUID } from "@/utils/functions/converter.functions";

const InfluencerProfile: React.FC<UserProfileType> = ({
  profileId,
  profileImage,
  name,
  niches,
  bio,
  location,
  socialFollowing,
  setProfileImage,
  setBio,
  setNiches,
}) => {
  const { talentId, managerId } = useGlobalContext();
  const { pagePermission } = useInfluencerProfilePagePermission({
    talentId,
    managerId,
    profileId: convertToUUID(profileId),
  });
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const { socials, setSocials } = useUserSocialData({
    talentId: convertToUUID(profileId),
  });
  const { paymentInfo, setPaymentInfo } = useUserPaymentData({
    talentId: convertToUUID(profileId),
  });
  const { campaignMatching } = useUserCampaignMatchingData({
    talentId: convertToUUID(profileId),
  });
  const { basicInfo, notes, setNotes } = useUserProfileData({
    talentId: convertToUUID(profileId),
  });
  const [tab, setTab] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    setTab(0);
  }, []);

  const talentInfo = [
    { label: "Role", value: basicInfo?.role },
    { label: "Email", value: basicInfo?.email },
    { label: "Phone", value: basicInfo?.phone },
    { label: "Manager", value: basicInfo?.manager },
    {
      label: "Date of Birth",
      value: formatDateForDisplay(basicInfo?.birth_date),
    },
    { label: "Gender", value: basicInfo?.gender },
    { label: "Sexuality", value: basicInfo?.sexuality },
    {
      label: "Ethnicity",
      value:
        basicInfo?.ethnicity?.length === 0 &&
        formatListWithComma(basicInfo?.ethnicity),
    },
  ];

  const handleEditButtonClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditNotes = (notes: string) => {
    setNotes(notes);
    editInfluencerNotes({
      talentID: convertToUUID(profileId),
      notes,
    });
  };

  const handleEditSave = async ({
    profileImage,
    niches,
    bio,
    paymentInfo,
    role,
  }: {
    profileImage: string;
    niches: string[];
    bio: string;
    paymentInfo: PaymentType[];
    role: string;
  }) => {
    // TODO: update profileimage
    //setProfileImage(profileImage);
    setBio(bio);
    setNiches(niches);
    setPaymentInfo(paymentInfo);

    editInfluencer({
      talentID: convertToUUID(profileId),
      profileImage,
      bio,
      niches,
      role,
    }).then((res) => {
      if (res) {
        setIsEditModalOpen(false);
      }
    });
  };

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
        {pagePermission !== PAGE_PERMISSIONS.GUEST && (
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
        <CustomTabs
          tabs={["Profile Info", "Campaign Matching", "Payment Info"]}
          tab={tab}
          setTab={setTab}
        />
        {tab === 0 && (
          <>
            <div className="grid grid-col-1 z-0" style={{ width: "100%" }}>
              <CardInfoCols data={talentInfo} cols={4} />
            </div>
            {M3Permission && (
              <div className="grid grid-col-1 z-2" style={{ width: "100%" }}>
                <CardText
                  label="Notes (Not visible to creator)"
                  value={notes}
                  onEdit={handleEditNotes}
                />
              </div>
            )}
          </>
        )}
        {tab === 1 && (
          <>
            {campaignMatching?.map(
              ({ id, question, type, options }: any, index: number) => (
                <CardCampaignMatching
                  key={index}
                  questionId={id}
                  question={question}
                  type={type}
                  options={options}
                  talentId={convertToUUID(profileId)}
                />
              )
            )}
          </>
        )}
        {tab === 2 && (
          <>
            {paymentInfo?.map((payment: any, index: number) => (
              <CardPaymentInfo key={index} paymentAccount={payment} />
            ))}
          </>
        )}
      </div>
      {isEditModalOpen && (
        <ModalEditProfile
          profileId={convertToUUID(profileId)}
          profileType={"influencer"}
          setOpen={setIsEditModalOpen}
          currentProfileImage={profileImage}
          currentBio={bio}
          currentNiches={niches}
          currentPaymentInfo={paymentInfo}
          handleEditSave={handleEditSave}
        />
      )}
    </>
  );
};

export default InfluencerProfile;
