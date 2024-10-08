"use client";
import React from "react";
import useUserMediakitData from "@/hooks/useUserMediakitData";
//Component import
import PresentationLayout from "@/layouts/PresentationLayout";
import MediaKit from "./_components/MediaKit";
import { UUID } from "crypto";

//CSS import
import "@/styles/agency.page.scss";

const MediaKitPage: React.FC<{ params: { id: UUID } }> = ({ params }) => {
  const { id } = params;
  const {
    agencyId,
    profileImage,
    name,
    niches,
    bio,
    location,
    socialFollowing,
  } = useUserMediakitData({
    talentId: id,
  });

  return (
    <>
      <PresentationLayout agencyId={agencyId}>
        <MediaKit
          profileId={id}
          profileImage={profileImage}
          name={name}
          niches={niches}
          bio={bio}
          location={location}
          socialFollowing={socialFollowing}
        />
      </PresentationLayout>
    </>
  );
};

export default MediaKitPage;
