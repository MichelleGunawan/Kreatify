import { supabase } from "@/utils/supabase/js/client";
import { MilestoneStatusType, SubmissionType } from "@/types/campaign.type";
const now = new Date().toISOString(); // Convert the date to ISO 8601 format

export const updateMilestoneStatus = async (
  milestoneId: number,
  newStatus: MilestoneStatusType
) => {
  const { data, error } = await supabase
    .from("milestone")
    .update({ status: newStatus })
    .eq("id", milestoneId);

  if (error) {
    console.error("Error updating milestone status:", error);
    return { success: false, error };
  }

  return { success: true, data };
};

export const createMilestoneNote = async (
  milestoneId: number,
  note: string,
  createdBy: string
) => {
  const { data, error } = await supabase.from("milestone_note").insert({
    milestone_id: milestoneId,
    note: note,
    created_at: new Date().toISOString(),
    created_by: createdBy,
  });

  if (error) {
    console.error("Error creating milestone note:", error);
    return { success: false, error };
  }

  return { success: true, data };
};

export const createMilestoneSubmission = async (
  milestoneId: number,
  type: SubmissionType,
  submission: any,
  description: string | null
): Promise<void> => {
  try {
    // Check if a submission with the given milestone_id already exists
    const { data: existingData, error: fetchError } = await supabase
      .from("milestone_submission")
      .select("*")
      .eq("milestone_id", milestoneId)
      .limit(1); // Limit to one result

    // Handle the case where no submissions exist
    if (fetchError) {
      throw new Error(
        `Failed to fetch existing submission: ${fetchError.message}`
      );
    }

    const existingSubmission = existingData.length > 0 ? existingData[0] : null;

    // Prepare the submission data
    const submissionData = {
      milestone_id: milestoneId,
      type: type,
      submission: type === "File" ? (submission as File).name : submission,
      description: description || null,
      created_at: new Date().toISOString(),
    };

    if (existingSubmission) {
      // Update existing submission
      const { data: updateData, error: updateError } = await supabase
        .from("milestone_submission")
        .update(submissionData)
        .eq("id", existingSubmission.id); // Update based on existing submission's ID

      if (updateError) {
        throw new Error(
          `Failed to update milestone submission: ${updateError.message}`
        );
      }
    } else {
      // Create new submission
      const { data: insertData, error: insertError } = await supabase
        .from("milestone_submission")
        .insert([submissionData]);

      if (insertError) {
        throw new Error(
          `Failed to create milestone submission: ${insertError.message}`
        );
      }
    }

    // Update the milestone status to "pending"
    const { data: updateMilestoneData, error: updateMilestoneError } =
      await supabase
        .from("milestone")
        .update({ status: "pending" })
        .eq("id", milestoneId);

    if (updateMilestoneError) {
      throw new Error(
        `Failed to update milestone status: ${updateMilestoneError.message}`
      );
    }
  } catch (error) {
    console.error("Error processing milestone submission:", error);
  }
};
