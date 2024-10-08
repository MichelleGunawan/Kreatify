import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { UUID } from "crypto";
import { UserPreviewType } from "@/types/user.type";

/**
 * Fetch manager team in user preview format
 * @param {number} userID
 *  @returns {Promise<UserBasicInfoType>}
 *  @throws {Error}
 **/
export const fetchManagerTeamPreviews = cache(
  async (managerID: UUID): Promise<Array<UserPreviewType>> => {
    const { data, error } = await supabase
      .from("manager_team_previews")
      .select("influencers")
      .eq("manager_id", managerID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchManagerBasicInfo. Error: ${
          error.message || JSON.stringify(error)
        }`
      );
    }

    return (data[0]?.influencers as UserPreviewType[]) || [];
  }
);

/**
 * Fetch manager team in user preview format
 * @param {number} userID
 *  @returns {Promise<UserBasicInfoType>}
 *  @throws {Error}
 **/
export const fetchInfluencerTeamPreviews = cache(
  async (talentID: UUID): Promise<Array<UserPreviewType>> => {
    const { data, error } = await supabase
      .from("influencer_team_previews")
      .select("managers")
      .eq("influencer_id", talentID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchInfluencerTeamPreviews. Error: ${
          error.message || JSON.stringify(error)
        }`
      );
    }

    return (data[0]?.managers as UserPreviewType[]) || [];
  }
);

/**
 * Fetch manager ids of managers on influencer team
 * @param {number} userID
 *  @returns {Promise<UserBasicInfoType>}
 *  @throws {Error}
 * **/
export const fetchInfluencerTeamIds = cache(
  async (talentID: UUID): Promise<Array<string>> => {
    const { data, error } = await supabase
      .from("influencer_manager_relation")
      .select("manager_id")
      .eq("influencer_id", talentID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchInfluencerTeamPreviews. Error: ${
          error.message || JSON.stringify(error)
        }`
      );
    }

    return (
      data
        ?.map((row) => row.manager_id)
        .filter((id): id is string => id !== null) ?? []
    );
  }
);

export const fetchManagerTeamIds = cache(
  async (talentID: UUID): Promise<Array<string>> => {
    const { data, error } = await supabase
      .from("influencer_manager_relation")
      .select("influencer_id")
      .eq("manager_id", talentID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchInfluencerTeamPreviews. Error: ${
          error.message || JSON.stringify(error)
        }`
      );
    }

    return (
      data
        ?.map((row) => row.influencer_id)
        .filter((id): id is string => id !== null) || []
    );
  }
);
