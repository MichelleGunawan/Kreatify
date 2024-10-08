"use client";
import React, { useState } from "react";
import { UUID } from "crypto";
import { SocialFollowingsType } from "@/types/social.type";
import { getIconLink } from "@/utils/functions/iconLinks";

//Component import
import ProfileInfo from "@/components/ProfileInfo";
import Button from "@/components/Button";
import PostPreview from "@/components/PostPreview";
import Icon from "@/components/Icon";
import BarChartCard from "@/components/BarChartCard";
import PieChartCard from "@/components/PieChartCard";
import CustomTabs from "@/components/Tabs";
import ModalShare from "@/components/ModalShare";
import Alert from "@/components/Alert";
import CardInfoCols from "@/components/CardInfoCols";

//CSS import
import "@/styles/mediakit.page.scss";

// Data import (will be replaced with api)
import {
  ageDemographicsData,
  countryDemographicsData,
  genderDemographicsData,
} from "@/data/MediaKitData";
import { mediaKitData } from "@/data/MediaKitData";

const MediaKit: React.FC<MediaKitProps> = ({
  profileId,
  profileImage,
  name,
  niches,
  bio,
  location,
  socialFollowing,
}) => {
  const [tab, setTab] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  const handleCopyLink = () => {
    if (!profileId) return;
    navigator.clipboard.writeText(
      `https://app.kreatify.io/mediakit/${profileId}`
    );
    setShowCopyAlert(true);
  };

  const mediaKitInfo = mediaKitData.map(
    ({ followers, averageViews, engagement }) => [
      { label: "Followers", value: followers },
      { label: "Average Views", value: averageViews },
      { label: "Engagement", value: engagement },
    ]
  );

  const tabs = mediaKitData.map((data) => data.handle);
  const tabIcons = mediaKitData.map(({ id, platform }, index) => (
    <Icon
      key={id}
      link={getIconLink(platform)}
      size={20}
      color={index === tab ? "#775FFF" : "#737373"}
    />
  ));

  const ButtonsContainer = () => {
    return (
      <>
        <Button
          icon={getIconLink("share")}
          color="#775FFF"
          borderColor="#775FFF"
          borderRadius="100px"
          width="40px"
          height="40px"
          tooltipText="Share Media Kit"
          onClick={() => {
            setIsShareModalOpen(true);
          }}
        />
        <Button
          icon={getIconLink("link")}
          color="#775FFF"
          borderColor="#775FFF"
          borderRadius="100px"
          width="40px"
          height="40px"
          tooltipText="Copy Link"
          onClick={handleCopyLink}
        />
      </>
    );
  };

  return (
    <>
      <div className="mediakit-first-section">
        <ProfileInfo
          name={name}
          profileImage={profileImage}
          bio={bio}
          location={location}
          socialFollowing={socialFollowing}
          niches={niches}
          buttons={<ButtonsContainer />}
        />
      </div>
      <div className="grid grid-col-1">
        <CustomTabs tabs={tabs} tab={tab} setTab={setTab} icons={tabIcons} />

        <div className="grid grid-col-1 z-0" style={{ width: "100%" }}>
          <CardInfoCols data={mediaKitInfo[tab]} cols={3} />
        </div>
        <div className="grid grid-col-3 z-3">
          <BarChartCard
            title="Age Demographics"
            colLabels={["18-24", "25-34", "35-44", "45-54", "55+"]}
            dataLabel="Engagement(%)"
            data={ageDemographicsData}
            color="#775FFF"
          />
          <PieChartCard
            title="Gender Demographics"
            labels={["Male", "Female", "Other"]}
            data={genderDemographicsData}
          />
          <BarChartCard
            title="Country Demographics"
            colLabels={["US", "UK", "IN", "AU", "CA"]}
            dataLabel="Engagement(%)"
            data={countryDemographicsData}
            color="#775FFF"
          />
        </div>
        <div>
          <div style={{ width: "100%", marginBottom: "20px" }}>
            <h2 className="h1 text-black">Featured Posts</h2>
          </div>
          <div className="mediakit-posts-container">
            <div className="mediakit-image-container">
              <PostPreview image="https://images.imyfone.com/filme/tiktok-video/lip-synching-tiktok.jpg" />
            </div>
            <div className="mediakit-image-container">
              <PostPreview image="https://images.imyfone.com/filme/tiktok-video/lip-synching-tiktok.jpg" />
            </div>
            <div className="mediakit-image-container">
              <PostPreview image="https://images.imyfone.com/filme/tiktok-video/lip-synching-tiktok.jpg" />
            </div>
          </div>
        </div>
      </div>
      {isShareModalOpen && (
        <ModalShare
          setOpen={setIsShareModalOpen}
          link={`https://app.kreatify.io/mediakit/${profileId}`}
          onCopyLink={handleCopyLink}
        />
      )}
      {showCopyAlert && (
        <Alert
          text="Link copied!"
          showAlert={showCopyAlert}
          setShowAlert={setShowCopyAlert}
        />
      )}
    </>
  );
};

export default MediaKit;

type MediaKitProps = {
  profileId: UUID | null;
  profileImage: string;
  name: string;
  bio: string;
  location: string;
  niches: string[];
  socialFollowing: SocialFollowingsType[];
};
