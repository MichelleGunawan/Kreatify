import { useState, useEffect } from "react";
import {
  fetchManagerPitchlists,
  fetchAgencyPitchlists,
} from "@/services/pitchlists/fetch_actions";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";

function usePitchlistsData({ managerId, agencyId }: pitchliststHookType) {
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const [managerPitchLists, setManagerPitchlists] = useState<any[]>([]); //TODO: Change type to PitchListsType
  const [agencyPichLists, setAgencyPitchlists] = useState<any[]>([]); //TODO: Change type to PitchListsType

  useEffect(() => {
    if (M3Permission && managerId && isValidUUID(managerId)) {
      fetchManagerPitchlists(managerId).then(setManagerPitchlists);
    }
  }, [managerId, M3Permission]);

  useEffect(() => {
    if (M3Permission && agencyId && isValidUUID(agencyId)) {
      fetchAgencyPitchlists(agencyId).then(setAgencyPitchlists);
    }
  }, [agencyId, M3Permission]);

  return {
    managerPitchLists,
    agencyPichLists,
  };
}

export default usePitchlistsData;

type pitchliststHookType = {
  managerId?: UUID | null;
  agencyId?: UUID | null;
};
