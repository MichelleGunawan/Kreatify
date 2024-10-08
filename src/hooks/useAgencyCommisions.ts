import { useState, useEffect } from "react";
import { fetchAgencyCommisionInfo } from "@/services/agency/fetch_actions";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";

type useAgencyProps = {
  userPermission?: string;
  talentId?: UUID | null;
  managerId?: UUID | null;
  userId?: UUID | null;
  agencyId?: UUID | null;
};

function useAgencyCommissionData({
  userPermission,
  talentId,
  managerId,
  userId,
  agencyId,
}: useAgencyProps) {
  const [agencyAgencyCommission, setAgencyAgencyCommission] = useState<
    number | null
  >(null);
  const [agencyManagerCommission, setAgencyManagerCommission] = useState<
    number | null
  >(null);
  const [agencyInfluencerCommission, setAgencyInfluencerCommission] = useState<
    number | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (agencyId && isValidUUID(agencyId)) {
      fetchAgencyCommisionInfo(agencyId)
        .then(
          ({
            manager_commission,
            influencer_commission,
            agency_commission,
          }) => {
            setAgencyManagerCommission(manager_commission);
            setAgencyInfluencerCommission(influencer_commission);
            setAgencyAgencyCommission(agency_commission);
          }
        )
        .catch((err) => {
          setError(err);
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
  }, [agencyId]);

  return {
    agencyAgencyCommission,
    agencyManagerCommission,
    agencyInfluencerCommission,

    setAgencyAgencyCommission,
    setAgencyManagerCommission,
    setAgencyInfluencerCommission,

    loading,
    error,
  };
}

export default useAgencyCommissionData;
