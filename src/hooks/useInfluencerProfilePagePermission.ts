import { useEffect, useState } from "react";
import { UUID } from "crypto";
import { fetchPitchlistPagePermission } from "@/services/pitchlists/fetch_actions";
import { PAGE_PERMISSIONS } from "@/utils/constants";
import { fetchInfluencerProfilePagePermission } from "@/services/influencers/fetch_actions";

type useInfluencerProfilePagePermissionProps = {
  role?: string;
  userId?: UUID | null;
  talentId?: UUID | null;
  managerId?: UUID | null;
  profileId: UUID | null;
};

export const useInfluencerProfilePagePermission = ({
  talentId,
  managerId,
  profileId,
}: useInfluencerProfilePagePermissionProps) => {
  const [pagePermission, setPagePermission] = useState(PAGE_PERMISSIONS.GUEST);

  useEffect(() => {
    if (talentId && profileId && talentId === profileId) {
      setPagePermission(PAGE_PERMISSIONS.ADMIN);
    }
  }, [talentId, profileId]);

  useEffect(() => {
    if (managerId && profileId) {
      setPagePermission(PAGE_PERMISSIONS.ADMIN);
      fetchInfluencerProfilePagePermission({ managerId, profileId }).then(
        (res) => setPagePermission(res)
      );
    }
  }, [managerId, profileId]);

  return { pagePermission };
};
