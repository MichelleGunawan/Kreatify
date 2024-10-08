import { useState, useEffect } from "react";
import { fetchCampaignEditInfo } from "@/services/campaign/fetch_actions";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";
import { convertToUUID } from "@/utils/functions/converter.functions";

export const useEditCampaignInfo = (campaignId: UUID | null) => {
  const [name, setName] = useState("");
  const [campaignRate, setCampaignRate] = useState<number | null>(0);
  const [influencerCommission, setInfluencerCommission] = useState<
    number | null
  >(null);
  const [agencyCommission, setAgencyCommission] = useState<number | null>(null);
  const [managerCommission, setManagerCommission] = useState<number | null>(
    null
  );
  const [usage, setUsage] = useState("");
  const [exclusivity, setExclusivity] = useState("");
  const [partnershipType, setPartnershipType] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [brandWebsite, setBrandWebsite] = useState("");
  const [brandContact, setBrandContact] = useState<number>(-1);
  const [influencerId, setInfluencerId] = useState<UUID | null>(null);
  const [campaignManagerId, setCampaignManagerId] = useState<UUID | null>(null);
  const [contract, setContract] = useState<File | null>(null);

  useEffect(() => {
    if (campaignId && isValidUUID(campaignId)) {
      fetchCampaignEditInfo(campaignId).then((res) => {
        setName(res.campaign_name || "");
        setBrand(res.brand_name || "");
        setBrandWebsite(res.brand_link || "");
        setUsage(res.usage || "");
        setExclusivity(res.exclusivity || "");
        setPartnershipType(res.partnership_type || "");
        setCategory(res.category || "");
        setBrandContact(res.brand_contact_id || -1);
        setCampaignManagerId(convertToUUID(res.campaign_manager_id));
        setInfluencerId(convertToUUID(res.influencer_id));
        setCampaignRate(res.campaign_rate || 0);
        setInfluencerCommission(res.influencer_commission || 0);
        setAgencyCommission(res.agency_commission || 0);
        setManagerCommission(res.manager_commission || 0);
      });
    }
  }, [campaignId]);

  return {
    name,
    setName,
    campaignRate,
    setCampaignRate,
    influencerCommission,
    setInfluencerCommission,
    agencyCommission,
    setAgencyCommission,
    managerCommission,
    setManagerCommission,
    usage,
    setUsage,
    exclusivity,
    setExclusivity,
    partnershipType,
    setPartnershipType,
    category,
    setCategory,
    brand,
    setBrand,
    brandWebsite,
    setBrandWebsite,
    brandContact,
    setBrandContact,
    influencerId,
    setInfluencerId,
    campaignManagerId,
    setCampaignManagerId,
    contract,
    setContract,
  };
};

export const useCommissionCalculations = (
  campaignRate: number | null,
  influencerCommission: number | null
) => {
  const [influencerPayout, setInfluencerPayout] = useState<number | null>(null);

  useEffect(() => {
    // If influencerCommission is empty, influencerPayout should be 0
    if (!campaignRate) {
      setInfluencerPayout(0);
    } // Ensure there's a campaignRate

    if (influencerCommission === null) {
      setInfluencerPayout(0);
    } else {
      setInfluencerPayout(
        parseFloat(
          ((Number(influencerCommission) / 100) * Number(campaignRate)).toFixed(
            2
          )
        )
      );
    }
  }, [campaignRate, influencerCommission]);

  const updateInfluencerCommission = (payout: number | null) => {
    if (payout === null) {
      return 0;
    }

    if (campaignRate && payout) {
      return parseFloat(
        ((Number(payout) / Number(campaignRate)) * 100).toFixed(2)
      );
    }
    return influencerCommission;
  };

  return {
    influencerPayout,
    setInfluencerPayout,
    updateInfluencerCommission,
  };
};
