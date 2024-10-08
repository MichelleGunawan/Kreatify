import { useState, useEffect } from "react";
import {
  fetchCampaignStatus,
  fetchManagerCampaignInfo,
  fetchInfluencerCampaignInfo,
  fetchDeliverablesData,
  fetchCampaignHeader,
  fetchCampaignPaymentStructure,
  fetchCampaignUserIds,
} from "@/services/campaign/fetch_actions";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";

const useCampaignData = (campaignId: UUID | null) => {
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const [campaignStatus, setCampaignStatus] = useState("");
  const [campaignPaymentStatus, setCampaignPaymentStatus] =
    useState<string>("Pending");
  const [campaignBrandContact, setCampaignBrandContact] = useState<any>({});
  const [campaignPaymentStructure, setCampaignPaymentStructure] =
    useState<CampaignPaymentStructureType>();

  const [campaignInfo, setCampaignInfo] = useState<any>({});
  const [campaignDeliverables, setCampaignDeliverables] = useState<any[]>();
  const [campaignUserIds, setCampaignUserIds] = useState<{
    influencer_id: string | null;
    campaign_manager_id: string | null;
    talent_manager_id: string | null;
  }>({
    influencer_id: null,
    campaign_manager_id: null,
    talent_manager_id: null,
  });

  // Get campaign status
  useEffect(() => {
    if (campaignId && isValidUUID(campaignId)) {
      fetchCampaignStatus(campaignId).then(setCampaignStatus);
    }
  }, [campaignId, campaignStatus]);

  // Get campaign header info
  useEffect(() => {
    if (M3Permission && campaignId && isValidUUID(campaignId)) {
      fetchCampaignHeader(campaignId).then(
        ({ brand_contact, payment_status }) => {
          if (brand_contact) setCampaignBrandContact(brand_contact);
          if (payment_status) {
            setCampaignPaymentStatus(payment_status);
          }
        }
      );

      fetchCampaignPaymentStructure(campaignId).then((data) => {
        if (data) setCampaignPaymentStructure(data);
      });
    }

    if (I1Permission && campaignId && isValidUUID(campaignId)) {
      fetchInfluencerCampaignInfo(campaignId).then(setCampaignInfo);
    }

    if (!I1Permission && campaignId && isValidUUID(campaignId)) {
      fetchManagerCampaignInfo(campaignId).then(setCampaignInfo);
    }
  }, [campaignId, M3Permission, I1Permission]);

  useEffect(() => {
    if (campaignId && isValidUUID(campaignId)) {
      fetchDeliverablesData(campaignId).then((data) => {
        setCampaignDeliverables(data);
      });
      fetchCampaignUserIds(campaignId).then(setCampaignUserIds);
    }
  }, [campaignId]);

  return {
    campaignStatus,
    campaignPaymentStatus,
    campaignBrandContact,
    campaignPaymentStructure,
    campaignInfo,
    campaignDeliverables,
    campaignUserIds,
    setCampaignPaymentStatus,
    setCampaignStatus,
  };
};

export default useCampaignData;

type CampaignPaymentStructureType = {
  campaign_rate: number;
  agency_commission: number;
  manager_commission: number;
  influencer_commission: number;
};
