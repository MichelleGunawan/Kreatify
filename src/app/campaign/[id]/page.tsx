"use client";
import React from "react";
import { useGlobalContext } from "@/context";

//Component import
import LoggedinLayout from "@/layouts/LoggedinLayout";
import HeaderCampaign from "@/components/HeaderCampaign";
import DeliverablesCard from "@/components/DeliverablesCard";
import CardCampaignInfo from "@/components/CardCampaignInfo";
import useCampaignData from "@/hooks/useCampaignData";
import { PageIdPropsType } from "@/types/utils.type";
import { PaymentStatusType } from "@/types/campaign.type";

//CSS import
import "@/styles/campaign.page.scss";
import { createNotification } from "@/services/notifications/post_actions";
import { UUID } from "crypto";
import usePermission from "@/hooks/usePermission";
import { PAGE_PERMISSIONS, USER_PERMISSIONS } from "@/utils/constants";
import { useSession } from "@/hooks/useSession";
import { useCampaignPagePermission } from "@/hooks/useCampaignPagePermission";
import PresentationLayout from "@/layouts/PresentationLayout";
import { convertToUUID } from "@/utils/functions/converter.functions";

const CampaignPage: React.FC<PageIdPropsType> = ({ params }) => {
  const { firstName, talentId, managerId, agencyId } = useGlobalContext();
  const { id } = params;
  const campaignId = convertToUUID(id);
  // Don't delete needed to get user info
  const { sessionLoading } = useSession({ privatePage: false });
  const { pagePermission } = useCampaignPagePermission({
    campaignId: convertToUUID(campaignId),
    talentId: convertToUUID(talentId),
    managerId: convertToUUID(managerId),
    agencyId: convertToUUID(agencyId),
  });

  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const {
    campaignStatus,
    campaignBrandContact,
    campaignPaymentStatus,
    campaignInfo,
    campaignDeliverables,
    campaignUserIds,
    setCampaignPaymentStatus,
  } = useCampaignData(campaignId);

  const createAcceptCampaignNotification = async () => {
    if (M3Permission) {
      await createNotification({
        managerRecipientIDs: [
          campaignUserIds.talent_manager_id,
          campaignUserIds.campaign_manager_id,
        ],
        type: "acceptcampaign",
        header_text: campaignInfo?.campaign_name,
        body_text: `${firstName} has accepted the campaign!`,
        routing: `/campaign/${id}`,
      });
      return;
    }
  };

  const createRejectCampaignNotification = async () => {
    if (I1Permission) {
      await createNotification({
        managerRecipientIDs: [
          campaignUserIds.talent_manager_id,
          campaignUserIds.campaign_manager_id,
        ],
        type: "rejectcampaign",
        header_text: campaignInfo?.campaign_name,
        body_text: `${firstName} has rejected the campaign.`,
        routing: `/campaign/${id}`,
      });
      return;
    }
  };

  const createMilestoneSubmissionNotification = (milestoneType: string) => {
    if (I1Permission) {
      createNotification({
        managerRecipientIDs: [
          campaignUserIds.talent_manager_id,
          campaignUserIds.campaign_manager_id,
        ],
        type: "milestonesubmission",
        header_text: campaignInfo?.campaign_name,
        body_text: `${firstName} has submitted a ${milestoneType}.`,
        routing: `/campaign/${id}`,
      });
      return;
    }
  };

  // const createMilestoneApprovalNotification = (milestoneType: string) => {
  //   if (usePermission(USER_PERMISSIONS.TIER_I1)) {
  //     createNotification({
  //       recipientIDs: [
  //         campaignUserIds.talent_manager_id,
  //         campaignUserIds.campaign_manager_id,
  //       ],
  //       type: "milestoneapproval",
  //       header_text: campaignInfo?.campaign_name,
  //       body_text: `${firstName} has approved your ${milestoneType}.`,
  //       routing: `/campaign/${id}`,
  //     });
  //     return;
  //   }
  // };

  return (
    <>
      {pagePermission === PAGE_PERMISSIONS.ADMIN && (
        <LoggedinLayout headerTitle={campaignInfo?.campaign_name}>
          <h1 className="h1 campaign-page-title">
            {campaignInfo?.campaign_name}
          </h1>

          <HeaderCampaign
            campaignId={campaignId}
            campaignStatus={campaignStatus}
            brandContact={campaignBrandContact}
            paymentStatus={campaignPaymentStatus as PaymentStatusType}
            setPaymentStatus={setCampaignPaymentStatus}
            createAcceptCampaignNotification={createAcceptCampaignNotification}
            createRejectCampaignNotification={createRejectCampaignNotification}
          />

          <div className="grid grid-col-1 z-1" style={{ cursor: "pointer" }}>
            <CardCampaignInfo
              campaignStatus={campaignStatus}
              data={campaignInfo}
            />
          </div>
          <div className="grid grid-col-1 z-2">
            {campaignDeliverables && (
              <DeliverablesCard
                deliverables={campaignDeliverables}
                campaignStatus={campaignStatus}
                createMilestoneSubmissionNotification={
                  createMilestoneSubmissionNotification
                }
              />
            )}
          </div>
        </LoggedinLayout>
      )}
      {pagePermission === PAGE_PERMISSIONS.GUEST && (
        <PresentationLayout agencyId={campaignInfo?.agency_id}>
          <div style={{ width: "100%" }} className="h1 text-black">
            {campaignInfo?.campaign_name}
          </div>

          <div className="grid grid-col-1 z-1" style={{ cursor: "pointer" }}>
            <CardCampaignInfo
              campaignStatus={campaignStatus}
              data={campaignInfo}
            />
          </div>
          <div className="grid grid-col-1 z-2">
            {campaignDeliverables && (
              <DeliverablesCard
                deliverables={campaignDeliverables}
                campaignStatus={campaignStatus}
                createMilestoneSubmissionNotification={
                  createMilestoneSubmissionNotification
                }
              />
            )}
          </div>
        </PresentationLayout>
      )}
    </>
  );
};

export default CampaignPage;
