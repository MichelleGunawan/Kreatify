import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { Database } from "@/utils/supabase/js/database.types";
import { UUID } from "crypto";

export let TalentViewType: Database["public"]["Views"]["manager_talent_view"]["Row"];

/**
 *    Fetches talent socials, basic and partnership info of the influencers that a manager is assigned to
 *    @param {UUID} managerID - UUID of a logged in manager
 *    @returns {Array<typeof TalentViewType>} Payload of basic, partnership and socials info of influencers within the manager's talent pool
 */
export const fetchTalentInfoWithManagerID = cache(
  async (managerID: UUID): Promise<Array<typeof TalentViewType>> => {
    const { data, error } = await supabase
      .from("manager_talent_view")
      .select("*")
      .eq("manager_id", managerID);
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchTalentInfoWithManagerID. Error: ${error}`
      );
    }
    return data;
  }
);

/**
 *    Fetches talent socials, basic and partnership info of the influencers that is assigned to an agency
 *    @param {UUID} agencyID - ID of an agency
 *    @returns {Array<typeof TalentViewType>} Payload of basic, partnership and socials info of influencers within the agency's talent pool
 */
export const fetchTalentInfoWithAgencyID = cache(
  async (agencyID: UUID): Promise<Array<typeof TalentViewType>> => {
    const { data, error } = await supabase
      .from("manager_talent_view")
      .select("*")
      .eq("agency_id", agencyID);
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchTalentInfoWithAgencyID. Error: ${error}`
      );
    }
    return data;
  }
);
