"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context";
import { useSearchParams } from "next/navigation";

//Component import
import LoggedinLayout from "@/layouts/LoggedinLayout";
import InfluencerProfile from "./_components/Profile";
import HeaderProfile from "@/components/HeaderProfile";
import MediaKit from "@/app/mediakit/[id]/_components/MediaKit";
import useUserProfileData from "@/hooks/useUserProfileData";

//CSS import
import "@/styles/agency.page.scss";

// Data import (will be replaced with api)
import { paymentsData, profileNotesData } from "@/data/ProfileData";

import { UUID } from "crypto";
import { useSession } from "@/hooks/useSession";
import { convertToUUID } from "@/utils/functions/converter.functions";

const ProfilePage: React.FC<{ params: { id?: UUID; tab: number } }> = ({
  params,
}) => {
  const { sessionLoading } = useSession({});
  const searchParams = useSearchParams();
  const { id } = params;
  const urlId = convertToUUID(id?.[0]);
  const tab = searchParams.get("tab");

  const [view, setView] = useState(0);
  const { userPermission, talentId } = useGlobalContext(); // TODO: check user userPermission by user id

  useEffect(() => {
    setView(0);
  }, [userPermission]);

  useEffect(() => {
    setView(tab ? Number(tab) : 0);
  }, [tab]);

  const {
    profileImage,
    name,
    niches,
    bio,
    location,
    socialFollowing,
    setProfileImage,
    setBio,
    setNiches,
  } = useUserProfileData({
    talentId: urlId || talentId,
  });

  return (
    <LoggedinLayout headerTitle="Profile">
      <HeaderProfile
        profileId={urlId || talentId || null}
        role={"influencer"}
        view={view}
        setView={setView}
      />
      {view === 0 && (
        <InfluencerProfile
          profileId={urlId || talentId || ""}
          profileImage={profileImage}
          name={name}
          niches={niches}
          bio={bio}
          location={location}
          socialFollowing={socialFollowing}
          setProfileImage={setProfileImage}
          setBio={setBio}
          setNiches={setNiches}
        />
      )}

      {view === 1 && (
        <>
          <MediaKit
            profileId={urlId || talentId || null}
            profileImage={profileImage}
            name={name}
            niches={niches}
            bio={bio}
            location={location}
            socialFollowing={socialFollowing}
          />
        </>
      )}
    </LoggedinLayout>
  );
};

export default ProfilePage;
