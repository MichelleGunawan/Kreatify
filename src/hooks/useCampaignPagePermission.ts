import { useEffect, useState } from "react";
import { UUID } from "crypto";
import { fetchCampaignPagePermission } from "@/services/campaigns/fetch_actions";
import { PAGE_PERMISSIONS } from "@/utils/constants";
import { isValidUUID } from "@/utils/functions/validation.functions";

export const useCampaignPagePermission = ({
  talentId,
  managerId,
  agencyId,
  campaignId,
}: {
  talentId: UUID | null;
  managerId: UUID | null;
  agencyId: UUID | null;
  campaignId: UUID | null;
}) => {
  const [pagePermission, setPagePermission] = useState(PAGE_PERMISSIONS.GUEST);

  useEffect(() => {
    if (campaignId && talentId && isValidUUID(talentId)) {
      fetchCampaignPagePermission({
        campaignId,
        talentOrManagerId: talentId,
        agencyId,
      }).then((res) => setPagePermission(res));
    }
  }, [campaignId, talentId, agencyId]);

  useEffect(() => {
    if (campaignId && managerId && isValidUUID(managerId)) {
      fetchCampaignPagePermission({
        campaignId,
        talentOrManagerId: managerId,
        agencyId,
      }).then((res) => setPagePermission(res));
    }
  }, [campaignId, managerId, agencyId]);

  return { pagePermission };
};
