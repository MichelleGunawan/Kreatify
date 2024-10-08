import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { Database } from "@/utils/supabase/js/database.types";
import { UUID } from "crypto";

let ManagerCompletedCampaignsType: Database["public"]["Views"]["manager_completed_campaigns_view"]["Row"];
let ManagerOngoingCampaignsType: Database["public"]["Views"]["manager_ongoing_campaigns_view"]["Row"];
let ManagerPendingCampaignsType: Database["public"]["Views"]["manager_pending_campaigns_view"]["Row"];
let ManagerRejectedCampaignsType: Database["public"]["Views"]["manager_rejected_campaigns_view"]["Row"];

/**
 *    Fetches pending campaigns info for a specific talent ID of a logged in manager
 *    @param {UUID} managerID - Int Manager ID of a logged in manager
 *    @returns {Array<typeof ManagerPendingCampaignsType>} List of talent pending campaigns info
 */
export const fetchManagerPendingCampaigns = cache(
  async (
    managerID: UUID
  ): Promise<Array<typeof ManagerPendingCampaignsType>> => {
    const { data, error } = await supabase
      .from("manager_pending_campaigns_view")
      .select("*")
      .or(
        `talent_manager_id.eq.${managerID},campaign_manager_id.eq.${managerID}`
      );

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchManagerPendingCampaigns. Error: ${error}`
      );
    }

    return data || [];
  }
);
/**
 *    Fetches ongoing campaigns info for a specific talent ID of a logged in manager
 *    @param {UUID} managerID - Int Manager ID of a logged in manager
 *    @returns {Array<typeof ManagerOngoingCampaignsType>} List of talent ongoing campaigns info
 */
export const fetchManagerOngoingCampaigns = cache(
  async (
    managerID: UUID
  ): Promise<Array<typeof ManagerOngoingCampaignsType>> => {
    const { data, error } = await supabase
      .from("manager_ongoing_campaigns_view")
      .select("*")
      .or(
        `talent_manager_id.eq.${managerID},campaign_manager_id.eq.${managerID}`
      );

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchManagerOngoingCampaigns. Error: ${error}`
      );
    }

    return data || [];
  }
);

/**
 *    Fetches completed campaigns info for a specific talent ID of a logged in manager
 *    @param {UUID} managerID - Int Manager ID of a logged in manager
 *    @returns {Array<typeof ManagerCompletedCampaignsType>} List of talent completed campaigns info
 */
export const fetchManagerCompletedCampaigns = cache(
  async (
    managerID: UUID
  ): Promise<Array<typeof ManagerCompletedCampaignsType>> => {
    const { data, error } = await supabase
      .from("manager_completed_campaigns_view")
      .select("*")
      .or(
        `talent_manager_id.eq.${managerID},campaign_manager_id.eq.${managerID}`
      );

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchManagerCompletedCampaigns. Error: ${error}`
      );
    }

    return data || [];
  }
);

/**
 *    Fetches rejected campaigns info for a specific talent ID of a logged in manager
 *    @param {UUID} managerID - Int Manager ID of a logged in manager
 *    @returns {Array<typeof ManagerRejectedCampaignsType>} List of talent completed campaigns info
 */
export const fetchManagerRejectedCampaigns = cache(
  async (
    managerID: UUID
  ): Promise<Array<typeof ManagerRejectedCampaignsType>> => {
    const { data, error } = await supabase
      .from("manager_rejected_campaigns_view")
      .select("*")
      .or(
        `talent_manager_id.eq.${managerID},campaign_manager_id.eq.${managerID}`
      );

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchManagerRejectedCampaigns. Error: ${error}`
      );
    }

    return data || [];
  }
);

/**
 *    Fetches pending campaigns info for a specific agency of a logged in manager
 *    @param {UUID} agencyID - Int Manager ID of a logged in manager
 *    @returns {Array<typeof ManagerCompletedCampaignsType>} List of talent completed campaigns info
 */
export const fetchAgencyPendingCampaigns = cache(
  async (
    agencyID: UUID
  ): Promise<Array<typeof ManagerPendingCampaignsType>> => {
    const { data, error } = await supabase
      .from("manager_pending_campaigns_view")
      .select("*")
      .eq("agency_id", agencyID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchManagerPendingCampaigns. Error: ${error}`
      );
    }

    return data || [];
  }
);

/**
 *    Fetches ongoing campaigns info for a specific agency of a logged in manager
 *    @param {UUID} agencyID - Int Manager ID of a logged in manager
 *    @returns {Array<typeof ManagerOngoingCampaignsType>} List of talent completed campaigns info
 */
export const fetchAgencyOngoingCampaigns = cache(
  async (
    agencyID: UUID
  ): Promise<Array<typeof ManagerOngoingCampaignsType>> => {
    const { data, error } = await supabase
      .from("manager_ongoing_campaigns_view")
      .select("*")
      .eq("agency_id", agencyID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchManagerOngoingCampaigns. Error: ${error}`
      );
    }

    return data || [];
  }
);

/**
 *    Fetches completed campaigns info for a specific agency of a logged in manager
 *    @param {UUID} agencyID - Int Manager ID of a logged in manager
 *    @returns {Array<typeof ManagerCompletedCampaignsType>} List of talent completed campaigns info
 */
export const fetchAgencyCompletedCampaigns = cache(
  async (
    agencyID: UUID
  ): Promise<Array<typeof ManagerCompletedCampaignsType>> => {
    const { data, error } = await supabase
      .from("manager_completed_campaigns_view")
      .select("*")
      .eq("agency_id", agencyID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchManagerCompletedCampaigns. Error: ${error}`
      );
    }

    return data || [];
  }
);

/**
 *    Fetches rejected campaigns info for a specific agency of a logged in manager
 *    @param {UUID} agencyID - Int Manager ID of a logged in manager
 *    @returns {Array<typeof ManagerRejectedCampaignsType>} List of talent completed campaigns info
 */
export const fetchAgencyRejectedCampaigns = cache(
  async (
    agencyID: UUID
  ): Promise<Array<typeof ManagerRejectedCampaignsType>> => {
    const { data, error } = await supabase
      .from("manager_rejected_campaigns_view")
      .select("*")
      .eq("agency_id", agencyID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchManagerRejectedCampaigns. Error: ${error}`
      );
    }

    return data || [];
  }
);

/**
 * Function to get the count of urgent campaigns for a given manager ID
 * @param {UUID} managerId - The ID of the manager
 * @returns {Promise<number>} - The count of urgent campaigns
 */
export const getUrgentCampaignsCount = cache(
  async (managerID: UUID): Promise<number> => {
    try {
      const { data, error } = await supabase.rpc("get_urgent_campaigns_count", {
        manager_id: managerID,
      });

      if (error) {
        throw error; // Handle any errors from the function
      }

      return data; // Return the count of urgent campaigns
    } catch (error) {
      console.error("Error fetching urgent campaigns count:", error);
      return 0; // Return null or handle error as needed
    }
  }
);
