import { useState, useEffect } from "react";
import {
  fetchInfluencerProfileInfo,
  fetchManagerProfileInfo,
  fetchInfluencerBasicInfo,
  fetchManagerBasicInfo,
  fetchInfluencerNotes,
  fetchInfluencerRole,
} from "@/services/profile/fetch_acions";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";
import { fetchManagerRole } from "@/services/managers/fetch_actions";

type useProfileRoleProps = {
  userId?: UUID | null;
  talentId?: UUID | null;
  managerId?: UUID | null;
  agencyId?: UUID | null;
};

function useProfileRoleData({
  userId,
  talentId,
  managerId,
  agencyId,
}: useProfileRoleProps) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (talentId && isValidUUID(talentId)) {
      fetchInfluencerRole(talentId).then((data: string) => {
        setRole(data);
      });
    }
  }, [talentId]);

  useEffect(() => {
    if (managerId && isValidUUID(managerId)) {
      fetchManagerRole(managerId).then((data: string) => {
        setRole(data);
      });
    }
  }, [managerId]);

  return {
    role,
    setRole,
  };
}

export default useProfileRoleData;
