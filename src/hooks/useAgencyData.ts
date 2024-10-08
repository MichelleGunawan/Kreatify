import { useState, useEffect } from "react";
import {
  fetchInfluencerAgencyInfo,
  fetchManagerAgencyInfo,
} from "@/services/agency/fetch_actions";
import { UUID } from "crypto";
import { fetchAgencyCampaignMatchingQuestions } from "@/services/campaignMatching/fetch_actions";
import { CampaignMatchingType } from "@/types/campaignMatching.type";
import { isValidUUID } from "@/utils/functions/validation.functions";

type useAgencyProps = {
  userPermission?: string;
  talentId?: UUID | null;
  managerId?: UUID | null;
  userId?: UUID | null;
  agencyId?: UUID | null;
};

function useAgencyData({
  userPermission,
  talentId,
  managerId,
  userId,
  agencyId,
}: useAgencyProps) {
  const [agencies, setAgencies] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (talentId && isValidUUID(talentId)) {
      fetchInfluencerAgencyInfo(talentId)
        .then((data) => {
          setAgencies(data);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
  }, [talentId]);

  useEffect(() => {
    if (managerId && isValidUUID(managerId)) {
      fetchManagerAgencyInfo(managerId)
        .then((data) => {
          setAgencies(data);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
  }, [managerId]);

  return {
    agencies,
    setAgencies,

    loading,
    error,
  };
}

export default useAgencyData;
