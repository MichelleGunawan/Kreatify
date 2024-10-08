import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import {
  CampaignMatchingAnswerType,
  CampaignMatchingType,
} from "@/types/campaignMatching.type";
import { UUID } from "crypto";

/**
 * Create or edit campaign matching questions
 * @param {number} agency_id
 * @param {Array<{id?: number, question: string, type: string}>} questions
 * @returns {Promise<void>}
 * @throws {Error}
 **/
export const createOrEditCampaignMatchingQuestions = async (
  agency_id: UUID,
  questions: CampaignMatchingType[],
  questionsToDelete: number[] = [] // Array of IDs to delete
): Promise<void> => {
  // Validate that there are questions to process
  if (!questions?.length && !questionsToDelete?.length) {
    return;
  }

  // Handle deletions first
  if (questionsToDelete.length) {
    const { error: deleteError } = await supabase
      .from("campaign_matching_questions")
      .delete()
      .in("id", questionsToDelete);

    if (deleteError) {
      throw new Error(
        `Error deleting campaign matching questions: ${deleteError.message}`
      );
    }

    const { error: deleteAnswerError } = await supabase
      .from("campaign_matching_answer")
      .delete()
      .in("question_id", questionsToDelete);

    if (deleteAnswerError) {
      throw new Error(
        `Error deleting campaign matching answers: ${deleteAnswerError.message}`
      );
    }
  }

  // Iterate over each question in the array
  for (const { id, question, type, options } of questions) {
    if (!question || !type || !agency_id) {
      throw new Error("Missing required fields: question, type, or agency_id");
    }

    if (id !== -1) {
      // Update existing campaign matching question
      const { error: updateError } = await supabase
        .from("campaign_matching_questions")
        .update({
          question,
          type,
          agency_id,
          created_at: new Date().toISOString(), // Use ISO format for consistency
          options: options,
        })
        .eq("id", id);

      if (updateError) {
        throw new Error(
          `Error updating campaign matching question with ID ${id}: ${updateError.message}`
        );
      }
    } else {
      // Insert new campaign matching question
      const { error: insertError } = await supabase
        .from("campaign_matching_questions")
        .insert([
          {
            question,
            type,
            agency_id,
            created_at: new Date().toISOString(),
            options: options,
          },
        ]);

      if (insertError) {
        throw new Error(
          `Error creating new campaign matching question: ${insertError.message}`
        );
      }
    }
  }
};

/**
 * Create or edit campaign matching answers
 * @param {{ answerId?: number, questionId: number, talentId: UUID, answer: string }} params
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const createOrEditCampaignMatchingAnswer = async ({
  answerId,
  questionId,
  talentId,
  answer,
}: {
  answerId: number | null;
  questionId: number;
  talentId: UUID | null;
  answer: string;
}): Promise<void> => {
  if (!questionId || !talentId || !answer) {
    throw new Error(
      "Missing required fields: campaign_id, influencer_id, or answer"
    );
  }

  if (answerId !== null && answerId !== -1) {
    // Update existing campaign matching answer
    const { error: updateError } = await supabase
      .from("campaign_matching_answer")
      .update({
        answer,
        created_at: new Date().toISOString(), // Optional: Update timestamp
      })
      .eq("id", answerId);

    if (updateError) {
      throw new Error(
        `Error updating campaign matching answer: ${updateError.message}`
      );
    }
  } else {
    // Insert new campaign matching answer
    const { error: insertError } = await supabase
      .from("campaign_matching_answer")
      .insert([
        {
          question_id: questionId,
          influencer_id: talentId,
          answer,
          created_at: new Date().toISOString(),
        },
      ]);

    if (insertError) {
      throw new Error(
        `Error creating new campaign matching answer: ${insertError.message}`
      );
    }
  }
};

/**
 * Create or edit campaign matching answers
 * @param {{ answerId?: number, questionId: number, talentId: UUID, answer: string }} params
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const upsertCampaignMatchingAnswers = async ({
  influencerID,
  campaignMatchingAnswers,
}: {
  influencerID: UUID | null;
  campaignMatchingAnswers: CampaignMatchingAnswerType[];
}): Promise<void> => {
  // Insert into the 'campaign_matching_answer' table
  for (const { id, answer } of campaignMatchingAnswers) {
    await createOrEditCampaignMatchingAnswer({
      answerId: null,
      answer,
      talentId: influencerID,
      questionId: id,
    });
  }
};
