import { useState, useEffect } from "react";
import {
  fetchManagersByAgency,
  fetchTalentsByAgency,
  fetchContactsByAgency,
  fetchInfluencersWithSocialsByAgency,
} from "@/services/users/fetch_actions";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";

type useUsersDataProps = {
  userPermission?: string;
  talentId?: UUID | null;
  managerId?: UUID | null;
  agencyId?: UUID | null;
};

function useUsersData({
  userPermission,
  talentId,
  managerId,
  agencyId,
}: useUsersDataProps) {
  const [managersByAgency, setManagersByAgency] = useState<any[]>([]);
  const [talentsByAgency, setTalentsByAgency] = useState<any[]>([]);
  const [brandContactsByAgency, setBrandContactsByAgency] = useState<any[]>([]);
  const [talentsWithSocialsByAgency, setTalentsWithSocialsByAgency] = useState<
    any[]
  >([]);

  useEffect(() => {
    if (agencyId && isValidUUID(agencyId)) {
      fetchManagersByAgency(agencyId).then(setManagersByAgency);
      fetchTalentsByAgency(agencyId).then(setTalentsByAgency);
      fetchContactsByAgency(agencyId).then(setBrandContactsByAgency);
    }
  }, [agencyId]);

  useEffect(() => {
    if (agencyId && isValidUUID(agencyId)) {
      fetchInfluencersWithSocialsByAgency(agencyId).then(
        setTalentsWithSocialsByAgency
      );
    }
  }, [agencyId]);

  return {
    managersByAgency,
    talentsByAgency,
    brandContactsByAgency,
    talentsWithSocialsByAgency,
  };
}

export default useUsersData;
