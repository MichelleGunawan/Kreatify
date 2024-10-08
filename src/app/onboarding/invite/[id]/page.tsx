"use client";
import React, { useState } from "react";
import { UUID } from "crypto";
import { PageIdPropsType } from "@/types/utils.type";
import useOnboardInviteData from "@/hooks/useOnboardInvite";
import InfluencerOnboarding from "../../_influencer/page";
import ManagerOnboarding from "../../_manager/page";
import { isDateOlderThanInHours } from "@/utils/functions/validation.functions";
import { convertToUUID } from "@/utils/functions/converter.functions";

const OnboardingPage: React.FC<PageIdPropsType> = ({ params }) => {
  const { id } = params;
  const { onboardInvite, loading, error } = useOnboardInviteData({
    inviteId: convertToUUID(id),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {onboardInvite?.user_type === "influencer" && (
        <InfluencerOnboarding
          inviteId={convertToUUID(id)}
          agencyId={convertToUUID(onboardInvite?.agency_id)}
          role={onboardInvite?.user_role}
          inviteEmail={onboardInvite?.email}
        />
      )}
      {onboardInvite?.user_type === "manager" && (
        <ManagerOnboarding
          inviteId={convertToUUID(id)}
          agencyId={convertToUUID(onboardInvite?.agency_id)}
          role={onboardInvite?.user_role}
          inviteEmail={onboardInvite?.email}
        />
      )}
      {!onboardInvite?.user_type ||
        (isDateOlderThanInHours(onboardInvite?.created_at, 48) && (
          <>
            <div className="p1 text-black">Invalid Onboard Invite</div>
          </>
        ))}
    </>
  );
};

export default OnboardingPage;
