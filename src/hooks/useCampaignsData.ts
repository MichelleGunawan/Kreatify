import { useState, useEffect } from "react";
import {
  fetchTalentPendingCampaigns,
  fetchTalentOngoingCampaigns,
  fetchTalentCompletedCampaigns,
} from "@/services/campaigns/talent_actions";
import {
  fetchManagerPendingCampaigns,
  fetchManagerOngoingCampaigns,
  fetchManagerCompletedCampaigns,
  fetchManagerRejectedCampaigns,
  fetchAgencyPendingCampaigns,
  fetchAgencyOngoingCampaigns,
  fetchAgencyCompletedCampaigns,
  fetchAgencyRejectedCampaigns,
  getUrgentCampaignsCount,
} from "@/services/campaigns/management_actions";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";

function useCampaignsData({
  talentId,
  managerId,
  agencyId,
}: {
  talentId?: UUID | null;
  managerId?: UUID | null;
  agencyId?: UUID | null;
}) {
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const [pendingCampaignsData, setPendingCampaignsData] = useState<any[]>([]);
  const [ongoingCampaignsData, setOngoingCampaignsData] = useState<any[]>([]);
  const [completedCampaignsData, setCompletedCampaignsData] = useState<any[]>(
    []
  );
  const [rejectedCampaignsData, setRejectedCampaignsData] = useState<any[]>([]);

  const [agencyPendingCampaignsData, setAgencyPendingCampaignsData] = useState<
    any[]
  >([]);
  const [agencyOngoingCampaignsData, setAgencyOngoingCampaignsData] = useState<
    any[]
  >([]);
  const [agencyCompletedCampaignsData, setAgencyCompletedCampaignsData] =
    useState<any[]>([]);
  const [agencyRejectedCampaignsData, setAgencyRejectedCampaignsData] =
    useState<any[]>([]);

  const [ongoingCampaignsCount, setOngoingCampaignsCount] = useState(0);

  useEffect(() => {
    if (I1Permission && talentId && isValidUUID(talentId)) {
      fetchTalentPendingCampaigns(talentId).then(setPendingCampaignsData);
      fetchTalentOngoingCampaigns(talentId).then(setOngoingCampaignsData);
      fetchTalentCompletedCampaigns(talentId).then(setCompletedCampaignsData);
    }
  }, [talentId, I1Permission]);

  useEffect(() => {
    if (M3Permission && managerId && isValidUUID(managerId)) {
      fetchManagerPendingCampaigns(managerId).then(setPendingCampaignsData);
      fetchManagerOngoingCampaigns(managerId).then(setOngoingCampaignsData);
      fetchManagerCompletedCampaigns(managerId).then(setCompletedCampaignsData);
      fetchManagerRejectedCampaigns(managerId).then(setRejectedCampaignsData);
      getUrgentCampaignsCount(managerId).then(setOngoingCampaignsCount);
    }
  }, [managerId, M3Permission]);

  useEffect(() => {
    if (M3Permission && agencyId && isValidUUID(agencyId)) {
      fetchAgencyPendingCampaigns(agencyId).then(setAgencyPendingCampaignsData);
      fetchAgencyOngoingCampaigns(agencyId).then(setAgencyOngoingCampaignsData);
      fetchAgencyCompletedCampaigns(agencyId).then(
        setAgencyCompletedCampaignsData
      );
      fetchAgencyRejectedCampaigns(agencyId).then(
        setAgencyRejectedCampaignsData
      );
    }
  }, [agencyId, M3Permission]);

  return {
    pendingCampaignsData,
    ongoingCampaignsData,
    completedCampaignsData,
    rejectedCampaignsData,
    agencyPendingCampaignsData,
    agencyOngoingCampaignsData,
    agencyCompletedCampaignsData,
    agencyRejectedCampaignsData,
    ongoingCampaignsCount,
  };
}

export default useCampaignsData;
