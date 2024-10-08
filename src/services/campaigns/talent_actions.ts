import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { Database } from "@/utils/supabase/js/database.types";
import { UUID } from "crypto";

let TalentCompletedCampaignsType: Database["public"]["Views"]["influencer_completed_campaigns_view"]["Row"];
let TalentOngoingCampaignsType: Database["public"]["Views"]["influencer_ongoing_campaigns_view"]["Row"];
let TalentPendingCampaignsType: Database["public"]["Views"]["influencer_pending_campaigns_view"]["Row"];

/**
 *    Fetches pending campaigns info for a specific talent ID of a logged in manager
 *    @param {UUID} influencerID - Int Talent ID of a logged in manager
 *    @returns {Array<typeof TalentPendingCampaignsType>} List of talent pending campaigns info
 */
export const fetchTalentPendingCampaigns = cache(
  async (
    influencerID: UUID
  ): Promise<Array<typeof TalentPendingCampaignsType>> => {
    const { data, error } = await supabase
      .from("influencer_pending_campaigns_view")
      .select("*")
      .eq("influencer_id", influencerID);
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchTalentPendingCampaigns. Error: ${error}`
      );
    }

    return data || [];
  }
);

/**
 *    Fetches ongoing campaigns info for a specific talent ID of a logged in manager
 *    @param {UUID} influencerID - Int Talent ID of a logged in manager
 *    @returns {Array<typeof TalentOngoingCampaignsType>} List of talent ongoing campaigns info
 */
export const fetchTalentOngoingCampaigns = cache(
  async (
    influencerID: UUID
  ): Promise<Array<typeof TalentOngoingCampaignsType>> => {
    const { data, error } = await supabase
      .from("influencer_ongoing_campaigns_view")
      .select("*")
      .eq("influencer_id", influencerID);
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchTalentOngoingCampaigns. Error: ${error}`
      );
    }

    return data || [];
  }
);

/**
 *    Fetches completed campaigns info for a specific talent ID of a logged in manager
 *    @param {UUID} influencerID - Int Talent ID of a logged in manager
 *    @returns {Array<typeof TalentCompletedCampaignsType>} List of talent completed campaigns info
 */
export const fetchTalentCompletedCampaigns = cache(
  async (
    influencerID: UUID
  ): Promise<Array<typeof TalentCompletedCampaignsType>> => {
    const { data, error } = await supabase
      .from("influencer_completed_campaigns_view")
      .select("*")
      .eq("influencer_id", influencerID);
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchTalentCompletedCampaigns. Error: ${error}`
      );
    }

    return data || [];
  }
);
