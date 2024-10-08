import { useState, useEffect } from "react";

import { fetchInfluencerCampaignMatchingQuestions } from "@/services/campaignMatching/fetch_actions";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";

type useUserCampaignMatchingProps = {
  userId?: UUID | null;
  talentId?: UUID | null;
  managerId?: UUID | null;
  agencyId?: UUID | null;
};

function useUserCampaignMatchingData({
  userId,
  talentId,
  managerId,
  agencyId,
}: useUserCampaignMatchingProps) {
  const [campaignMatching, setCampaignMatching] = useState<any>();

  useEffect(() => {
    if (talentId && isValidUUID(talentId)) {
      fetchInfluencerCampaignMatchingQuestions(talentId).then((data) => {
        setCampaignMatching(data);
      });
    }
  }, [talentId]);

  return {
    // info for campaign matching section
    campaignMatching,
    setCampaignMatching,
  };
}

export default useUserCampaignMatchingData;
