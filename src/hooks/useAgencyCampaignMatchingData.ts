import { useState, useEffect } from "react";
import {
  fetchInfluencerAgencyInfo,
  fetchManagerAgencyInfo,
} from "@/services/agency/fetch_actions";
import { UUID } from "crypto";
import { fetchAgencyCampaignMatchingQuestions } from "@/services/campaignMatching/fetch_actions";
import { CampaignMatchingType } from "@/types/campaignMatching.type";
import { isValidUUID } from "@/utils/functions/validation.functions";

type useAgencyCampaignMatchingProps = {
  userPermission?: string;
  talentId?: UUID | null;
  managerId?: UUID | null;
  userId?: UUID | null;
  agencyId?: UUID | null;
};

function useAgencyCampaignMatchingData({
  userPermission,
  talentId,
  managerId,
  userId,
  agencyId,
}: useAgencyCampaignMatchingProps) {
  const [campaignMatchingQuestions, setCampaignMatchingQuestions] = useState<
    CampaignMatchingType[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (agencyId && isValidUUID(agencyId)) {
      fetchAgencyCampaignMatchingQuestions(agencyId).then((data) => {
        setCampaignMatchingQuestions(data);
      });
    }
  }, [agencyId]);

  return {
    campaignMatchingQuestions,
    setCampaignMatchingQuestions,

    loading,
    error,
  };
}

export default useAgencyCampaignMatchingData;
