import { useState, useEffect } from "react";
import { getInfluencerSocialFollowing } from "@/services/profile/fetch_acions";
import { UUID } from "crypto";
import { SocialDBType } from "@/types/social.type";
import { isValidUUID } from "@/utils/functions/validation.functions";

type useAgencyProps = {
  userId?: UUID | null;
  talentId?: UUID | null;
  managerId?: UUID | null;
  agencyId?: UUID | null;
};

function useUserSocialData({
  userId,
  talentId,
  managerId,
  agencyId,
}: useAgencyProps) {
  const [socials, setSocials] = useState<SocialDBType[]>([]);

  useEffect(() => {
    if (talentId && isValidUUID(talentId)) {
      getInfluencerSocialFollowing(talentId).then((data: SocialDBType[]) => {
        console.log("hook data:", data);
        setSocials(data);
      });
    }
  }, [talentId]);

  return {
    socials,
    setSocials,
  };
}

export default useUserSocialData;
