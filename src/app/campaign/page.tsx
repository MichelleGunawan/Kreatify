"use client";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context";
import LoggedinLayout from "@/layouts/LoggedinLayout";

//Component import
import HeaderCampaigns from "@/components/HeaderCampaigns";
import TableCampaigns from "@/components/TableCampaigns";
import useCampaignsData from "@/hooks/useCampaignsData";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";

//CSS import
import "@/styles/campaigns.page.scss";
import { useSession } from "@/hooks/useSession";

const CampaignsPage = () => {
  const { sessionLoading } = useSession({});
  const { userPermission, agencyId, managerId, talentId } = useGlobalContext();
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);
  const [tab, setTab] = useState(0);

  const {
    pendingCampaignsData,
    ongoingCampaignsData,
    completedCampaignsData,
    rejectedCampaignsData,
    agencyPendingCampaignsData,
    agencyOngoingCampaignsData,
    agencyCompletedCampaignsData,
    agencyRejectedCampaignsData,
  } = useCampaignsData({ talentId, managerId, agencyId });

  useEffect(() => {
    setTab(0);
  }, [userPermission]);

  return (
    <LoggedinLayout headerTitle="Campaigns">
      {M3Permission && <HeaderCampaigns tab={tab} setTab={setTab} />}
      <div className="grid grid-col-1">
        <TableCampaigns
          title=""
          pendingCampaignsData={
            tab == 0 ? pendingCampaignsData : agencyPendingCampaignsData
          }
          ongoingCampaignsData={
            tab == 0 ? ongoingCampaignsData : agencyOngoingCampaignsData
          }
          completedCampaignsData={
            tab == 0 ? completedCampaignsData : agencyCompletedCampaignsData
          }
          rejectedCampaignsData={
            tab == 0 ? rejectedCampaignsData : agencyRejectedCampaignsData
          }
        />
      </div>
    </LoggedinLayout>
  );
};

export default CampaignsPage;
