import { supabase } from "@/utils/supabase/js/client";
import { MilestoneNoteType } from "@/types/campaign.type";
import { USER_PERMISSIONS } from "@/utils/constants";
const now = new Date().toISOString(); // Convert the date to ISO 8601 format

/**
 * Fetches all milestone submissions for the given milestone ID
 * @param {number} milestoneId - The ID of the milestone to fetch submissions for
 * @returns {Promise<MilestoneSubmissionType[]>} - An array of milestone submissions
 * @throws {Error} - If there is an error fetching the milestone submissions
 * */
export const fetchMilestoneById = async (milestoneId: number) => {
  try {
    // Fetch the milestone data
    const { data: milestone, error: milestoneError } = await supabase
      .from("milestone")
      .select("*")
      .eq("id", milestoneId)
      .single();

    if (milestoneError) {
      throw new Error(`Error fetching milestone: ${milestoneError.message}`);
    }

    // Fetch the milestone submission data, limiting to one result
    const { data: milestoneSubmissions, error: milestoneSubmissionError } =
      await supabase
        .from("milestone_submission")
        .select("*")
        .eq("milestone_id", milestoneId)
        .limit(1); // Limit to one submission

    if (milestoneSubmissionError) {
      throw new Error(
        `Error fetching milestone submission: ${milestoneSubmissionError.message}`
      );
    }

    // Check if any submission was found
    const milestoneSubmission =
      milestoneSubmissions.length > 0 ? milestoneSubmissions[0] : null;

    // Combine the results
    return (
      {
        id: milestone.id,
        type: milestone.type,
        submission: milestoneSubmission,
        status: milestone.status,
      } || null
    );
  } catch (error) {
    console.error("Error fetching milestone by ID:", error);
    throw error; // Rethrow to handle it in the calling function if needed
  }
};

/**
 * Fetches all milestone notes for the given milestone ID
 * @param {number} milestoneId - The ID of the milestone to fetch notes for
 * @returns {Promise<MilestoneNoteType[]>} - An array of milestone notes
 * @throws {Error} - If there is an error fetching the milestone notes
 * */
export const fetchMilestoneNotes = async (
  milestoneId: number,
  userPermission: string
): Promise<MilestoneNoteType[]> => {
  // Fetch milestone notes
  const { data, error } = await supabase
    .from("milestone_note")
    .select("*")
    .eq("milestone_id", milestoneId);

  if (error) {
    console.error("Error fetching milestone notes:", error);
    return []; // Return an empty array on error
  }

  // If no notes are fetched, return an empty array
  if (!data || data.length === 0) {
    return [];
  }

  if (userPermission === USER_PERMISSIONS.TIER_I1) {
    // Update the 'seen' field to true for all fetched notes
    const { error: updateError } = await supabase
      .from("milestone_note")
      .update({ seen: true })
      .eq("milestone_id", milestoneId)
      .is("seen", false); // Only update those not seen yet

    if (updateError) {
      console.error("Error updating milestone notes:", updateError);
    }
  }

  return data as MilestoneNoteType[]; // Return the fetched notes
};
