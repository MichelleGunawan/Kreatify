import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { Database } from "@/utils/supabase/js/database.types";
import { UUID } from "crypto";

let InfluencerTeamSupabaseType: Database["public"]["Views"]["influencer_team_view"]["Row"];
let AgencyManagersSupabaseType: Database["public"]["Views"]["agency_managers_team_view"]["Row"];
type InfluencerTeamListType = Partial<typeof InfluencerTeamSupabaseType>;
type AgencyManagersListType = Partial<typeof AgencyManagersSupabaseType>;

/**
 *    Fetches influencer's team members
 *    @param {number} talentId - Team ID of a logged in influencer
 *    @returns {InfluencerTeamListType} List of team members within the influencers' team
 */
export const fetchInfluencerTeamList = cache(
  async (talentId: string): Promise<Array<InfluencerTeamListType>> => {
    const { data, error } = await supabase
      .from("influencer_team_view")
      .select("*")
      .eq("influencer_id", talentId);
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchInfluencerTeamList. Error: ${error}`
      );
    }

    return data;
  }
);

/**
 *    Fetches managers within the agency
 *    @param {UUID} agencyID - Agency ID of a logged in manager
 *    @returns {AgencyManagersListType} List of managers within the agency
 */
export const fetchAgencyManagerList = cache(
  async (agencyID: UUID): Promise<Array<AgencyManagersListType>> => {
    const { data, error } = await supabase
      .from("agency_managers_team_view")
      .select("*")
      .eq("agency_id", agencyID);
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchAgencyManagerList. Error: ${error}`
      );
    }

    return data;
  }
);

/**
 * Fetch manager profile role
 * @param {number} userID
 * @returns {Promise<UserProfileType>}
 * @throws {Error}
 **/
export const fetchManagerRole = cache(
  async (talentID: UUID): Promise<string> => {
    const { data, error } = await supabase
      .from("manager")
      .select("role")
      .eq("id", talentID)
      .single();

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchManagerRole. Error: ${error}`
      );
    }

    if (!data?.role) {
      throw new Error("No role found for manager");
    }

    return data.role;
  }
);
