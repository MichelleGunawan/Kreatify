import { useState, useEffect } from "react";
import { UUID } from "crypto";
import {
  fetchInfluencerTeamIds,
  fetchInfluencerTeamPreviews,
  fetchManagerTeamIds,
  fetchManagerTeamPreviews,
} from "@/services/team/fetch_actions";
import { UserPreviewType } from "@/types/user.type";
import { isValidUUID } from "@/utils/functions/validation.functions";
import { convertToUUIDArray } from "@/utils/functions/converter.functions";

type useUserTeamProps = {
  userId?: UUID | null;
  talentId?: UUID | null;
  managerId?: UUID | null;
  agencyId?: UUID | null;
};

function useUserTeamData({
  userId,
  talentId,
  managerId,
  agencyId,
}: useUserTeamProps) {
  const [teamIds, setTeamIds] = useState<UUID[]>([]);

  useEffect(() => {
    if (talentId && isValidUUID(talentId)) {
      fetchInfluencerTeamIds(talentId).then((data: string[]) => {
        if (data.length > 0) setTeamIds(convertToUUIDArray(data));
      });
    }
  }, [talentId]);

  useEffect(() => {
    if (managerId && isValidUUID(managerId)) {
      fetchManagerTeamIds(managerId).then((data: string[]) => {
        if (data.length > 0) setTeamIds(convertToUUIDArray(data));
      });
    }
  }, [managerId]);

  return {
    teamIds,
    setTeamIds,
  };
}

export default useUserTeamData;
