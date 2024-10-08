import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { UUID } from "crypto";
import {
  CampaignMatchingAnswerType,
  CampaignMatchingType,
} from "@/types/campaignMatching.type";

/**
 * Fetch agency campaign matching questions
 * @param {UUID} agencyID
 * @returns {Promise<Array<typeof CampaignMatchingType>>}
 * @throws {Error}
 **/
export const fetchAgencyCampaignMatchingQuestions = cache(
  async (agencyID: UUID): Promise<CampaignMatchingType[]> => {
    const { data, error } = await supabase
      .from("agency_campaign_matching_questions_view")
      .select("*")
      .eq("agency_id", agencyID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchAgencyCampaignMatchingQuestions. Error: ${error}`
      );
    }

    return (
      (data[0]?.campaign_matching_questions as CampaignMatchingType[]) || []
    );
  }
);

/**
 * Fetch agency campaign matching questions
 * @param {number} agencyID
 * @returns {Promise<Array<typeof CampaignMatchingType>>}
 * @throws {Error}
 **/
export const fetchInfluencerCampaignMatchingQuestions = cache(
  async (talentID: UUID): Promise<CampaignMatchingType[]> => {
    const { data, error } = await supabase
      .from("influencer_campaign_matching_questions_view")
      .select("*")
      .eq("influencer_id", talentID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchAgencyCampaignMatchingQuestions. Error: ${error}`
      );
    }

    return (
      (data?.[0]?.campaign_matching_questions as CampaignMatchingType[]) || []
    );
  }
);

/**
 * Fetch agency campaign matching questions
 * @param {number} agencyID
 * @returns {Promise<Array<typeof CampaignMatchingType>>}
 * @throws {Error}
 **/
export const fetchInfluencerCampaignMatchingAnswers = cache(
  async (
    talentID: UUID,
    questionID: number
  ): Promise<CampaignMatchingAnswerType> => {
    const { data, error } = await supabase
      .from("influencer_campaign_matching_answers_view")
      .select("*")
      .eq("influencer_id", talentID)
      .eq("question_id", questionID); // Use the correct field names

    if (error) {
      // Use JSON.stringify to properly display error details
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchAgencyCampaignMatchingAnswers. Error: ${JSON.stringify(
          error
        )}`
      );
    }

    return (data[0] as CampaignMatchingAnswerType) || {};
  }
);
