import { supabase } from "@/utils/supabase/js/client";

/**
 * Deletes a milestone from the database, as well as any associated milestone notes.
 * @param {number} milestoneId - The ID of the milestone to delete.
 * @throws {Error} If there is an error deleting the milestone or associated notes.
 */
export const deleteMilestone = async (milestoneId: number): Promise<void> => {
  if (milestoneId < 0) return;
  const { error } = await supabase
    .from("milestone") // Replace 'milestones' with your actual table name
    .delete()
    .eq("id", milestoneId);

  const { error: noteDeletionError } = await supabase
    .from("milestone_note") // Replace 'milestones' with your actual table name
    .delete()
    .eq("milestone_id", milestoneId);

  //TODO: delete milestone_submissions associated with this milestone unless we want to keep submission data

  if (error) {
    console.error("Error deleting milestone:", error);
    throw new Error("Failed to delete milestone");
  }

  if (noteDeletionError) {
    console.error("Error deleting milestone notes:", noteDeletionError);
    throw new Error("Failed to delete milestone notes");
  }

  return;
};
