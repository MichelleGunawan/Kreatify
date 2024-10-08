import { useState, useEffect } from "react";
import {
  fetchAgencyManagerList,
  fetchInfluencerTeamList,
} from "@/services/managers/fetch_actions";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";

interface useManagersDataProps {
  talentId?: UUID | null;
  agencyId?: UUID | null;
}

function useManagersData(props: useManagersDataProps) {
  const { talentId, agencyId } = props;
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const [influencerManagers, setInfluencerManagers] = useState<any[]>([]);
  const [agencyManagers, setAgencyManagers] = useState<any[]>([]);

  useEffect(() => {
    if (M3Permission && talentId && isValidUUID(talentId)) {
      fetchInfluencerTeamList(talentId).then(setInfluencerManagers);
    }
  }, [talentId, M3Permission]);

  useEffect(() => {
    if (M3Permission && agencyId && isValidUUID(agencyId)) {
      fetchAgencyManagerList(agencyId).then(setAgencyManagers);
    }
  }, [agencyId, M3Permission]);

  return {
    influencerManagers,
    agencyManagers,
  };
}

export default useManagersData;
