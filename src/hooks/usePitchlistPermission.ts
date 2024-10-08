import { useEffect, useState } from "react";
import { UUID } from "crypto";
import { fetchPitchlistPagePermission } from "@/services/pitchlists/fetch_actions";
import { PAGE_PERMISSIONS } from "@/utils/constants";

type usePitchlistPermissionProps = {
  role?: string;
  userId?: UUID | null;
  talentId?: UUID | null;
  managerId?: UUID | null;
  pitchlistId: UUID | null;
};

export const usePitchlistPermission = ({
  talentId,
  managerId,
  pitchlistId,
}: usePitchlistPermissionProps) => {
  const [pagePermission, setPagePermission] = useState(PAGE_PERMISSIONS.GUEST);

  useEffect(() => {
    if (talentId && pitchlistId) {
      fetchPitchlistPagePermission({ talentId, pitchlistId }).then((res) =>
        setPagePermission(res)
      );
    }
  }, [talentId, pitchlistId]);

  useEffect(() => {
    if (managerId && pitchlistId) {
      fetchPitchlistPagePermission({ managerId, pitchlistId }).then((res) =>
        setPagePermission(res)
      );
    }
  }, [managerId, pitchlistId]);

  return { pagePermission };
};
