"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context";
import { useSearchParams } from "next/navigation";

//Component import
import LoggedinLayout from "@/layouts/LoggedinLayout";
import ManagerProfile from "./_components/Profile";
import useUserProfileData from "@/hooks/useUserProfileData";

//CSS import
import "@/styles/agency.page.scss";

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
  const { managerId } = useGlobalContext();

  const {
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
  } = useUserProfileData({
    managerId: urlId || managerId,
  });

  useEffect(() => {
    setView(tab ? Number(tab) : 0);
  }, [tab]);

  return (
    <LoggedinLayout headerTitle="Profile">
      <ManagerProfile
        profileId={urlId || managerId || ""}
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
    </LoggedinLayout>
  );
};

export default ProfilePage;
