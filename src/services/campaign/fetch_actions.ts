import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { Database } from "@/utils/supabase/js/database.types";
import { UUID } from "crypto";

let CampaignHeaderType: Database["public"]["Functions"]["get_campaign_header"]["Returns"][0];
let ManagerCampaignPageInfoType: Database["public"]["Views"]["manager_campaign_page_info_view"]["Row"];
let InfluencerCampaignPageInfoType: Database["public"]["Views"]["influencer_campaign_page_info_view"]["Row"];
let CampaignDeliverablesType: Database["public"]["Views"]["campaign_deliverables_view"]["Row"];
let CampaignPaymentStructureType: Database["public"]["Functions"]["get_campaign_payment_structure"]["Returns"][0];
let CampaignEditInfoType: Database["public"]["Views"]["campaign_edit_info_view"]["Row"];

/**
 *    Fetches campaign status
 *    @param {UUID} campaignId - String campaign ID
 *    @returns {UUID} - campaign status
 *    */
export const fetchCampaignStatus = async (campaignId: UUID) => {
  const { data, error } = await supabase
    .from("campaign")
    .select("status")
    .eq("id", campaignId)
    .single();

  if (error) {
    throw new Error(
      `${API_BACKEND_ERROR_MESSAGE} fetchCampaignStatus. Error: ${error.message}`
    );
  }

  return data?.status;
};

/**
 *    Fetches campaign header info
 *    @param {UUID} campaignId - String campaign ID
 *    @returns {
 *      campaign_status: UUID
 *      payment_status: UUID
 *      brand_contact?: ContactPreviewType
 *     } - campaign header info
 *
 * */
export const fetchCampaignHeader = cache(
  async (campaignId: UUID): Promise<typeof CampaignHeaderType> => {
    const { data, error } = await supabase.rpc("get_campaign_header", {
      campaign_id_param: campaignId,
    });

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchTalentAlltimeEarnings. Error: ${error.message}`
      );
    }

    return data[0] || {};
  }
);

/**
 *    Fetches campaign page info (manager view)
 *    @param {UUID} campaignId - String campaign ID
 *    @returns {
 *      campaign_status: UUID
 *      campaign_rate: number
 *      brand: BrandPreviewType
 *      influencer: UserPreviewType
 *      campaign_manager: UserPreviewType
 *      category: UUID
 *      usage: UUID
 *      partnershipType: UUID
 *      exclusivity: UUID
 *    } - campaign page info
 *
 * */
export const fetchManagerCampaignInfo = cache(
  async (campaignID: UUID): Promise<typeof ManagerCampaignPageInfoType> => {
    const { data, error } = await supabase
      .from("manager_campaign_page_info_view")
      .select("*")
      .eq("id", campaignID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchManagerCampaignInfo. Error: ${error}`
      );
    }

    return data[0] || [];
  }
);

/**
 *    Fetches campaign page info (influencer view)
 *    @param {UUID} campaignId - String campaign ID
 *    @returns {
 *      campaign_status: UUID
 *      campaign_rate: number
 *      brand: BrandPreviewType
 *      influencer: UserPreviewType
 *      campaign_manager: UserPreviewType
 *      category: UUID
 *      usage: UUID
 *      partnershipType: UUID
 *      exclusivity: UUID
 *    } - campaign page info
 *
 * */
export const fetchInfluencerCampaignInfo = cache(
  async (campaignID: UUID): Promise<typeof InfluencerCampaignPageInfoType> => {
    const { data, error } = await supabase
      .from("influencer_campaign_page_info_view")
      .select("*")
      .eq("id", campaignID);
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchInfluencerCampaignInfo. Error: ${error}`
      );
    }

    return data[0] || [];
  }
);

/**
 *    Fetches campaign deliverables
 *    @param {UUID} campaignId - String campaign ID
 *    @returns {Array<typeof CampaignDeliverablesType>} List of campaign deliverables
 *
 * */
export const fetchDeliverablesData = cache(
  async (campaignID: UUID): Promise<Array<typeof CampaignDeliverablesType>> => {
    const { data, error } = await supabase
      .from("campaign_deliverables_view")
      .select("*")
      .eq("campaign_id", campaignID)
      .order("order", { ascending: true });
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchDeliverablesData. Error: ${error}`
      );
    }

    return data;
  }
);

/**
 *    Fetches campaign payment structure
 *    @param {UUID} campaignId - String campaign ID
 *    @returns {
 *      campaign_status: UUID
 *      campaign_name: UUID
 *      campaign_rate: UUID
 *      influencer_commission: UUID
 *      agency_commission: UUID
 *      manager_commission: UUID
 *      category: UUID
 *      usage: UUID
 *      partnershipType: UUID
 *      exclusivity: UUID
 *      brand_contact?: ContactPreviewType
 *      campaign_manager?: UserPreviewType
 *      influencer?: UserPreviewType
 *     } - campaign header info
 **/

export const fetchCampaignPaymentStructure = cache(
  async (campaignId: UUID): Promise<typeof CampaignPaymentStructureType> => {
    const { data, error } = await supabase.rpc(
      "get_campaign_payment_structure",
      {
        campaign_id_param: campaignId,
      }
    );

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchTalentAlltimeEarnings. Error: ${error.message}`
      );
    }

    return data[0] || {};
  }
);

/**
 *    Fetches campaign edit info
 *    @param {UUID} campaignId - String campaign ID
 *    @returns {
 *      campaign_status: UUID
 *      campaign_name: UUID
 *      campaign_rate: UUID
 *      influencer_commission: UUID
 *      agency_commission: UUID
 *      manager_commission: UUID
 *      category: UUID
 *      usage: UUID
 *      partnershipType: UUID
 *      exclusivity: UUID
 *     } - campaign header info
 * **/
export const fetchCampaignEditInfo = cache(
  async (campaignID: UUID): Promise<typeof CampaignEditInfoType> => {
    const { data, error } = await supabase
      .from("campaign_edit_info_view")
      .select("*")
      .eq("id", campaignID);
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchCampaignEditInfo. Error: ${error}`
      );
    }

    return data[0] || [];
  }
);

/**
 *    Fetches campaign user ids
 *    Used for notification recipients
 *    @param {UUID} campaignId - String campaign ID
 *    @returns {
 *      influencer: UserPreviewType
 *      campaign_manager: UserPreviewType
 *      talent_manager: UserPreviewType
 *     } - campaign users
 * **/
export const fetchCampaignUserIds = cache(
  async (
    campaignID: UUID
  ): Promise<{
    influencer_id: string | null;
    campaign_manager_id: string | null;
    talent_manager_id: string | null;
  }> => {
    const { data, error } = await supabase
      .from("campaign")
      .select("influencer, campaign_manager, talent_manager")
      .eq("id", campaignID)
      .limit(1);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetching campaign users. Error: ${error}`
      );
    }

    const formattedData = {
      influencer_id: data[0]?.influencer || null,
      campaign_manager_id: data[0]?.campaign_manager || null,
      talent_manager_id: data[0]?.talent_manager || null,
    };

    return formattedData;
  }
);
