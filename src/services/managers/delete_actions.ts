import { supabase } from "@/utils/supabase/js/client";
import { UUID } from "crypto";

/**
 * Removes managers from an agency. DOES NOT DELETE MANAGER
 * @param {string[]} managerIDs List of manager IDs to delete
 * @throws {Error} If there was an error deleting managers
 */
export const removeManagerFromAgency = async (managerID: UUID | null) => {
  // Check if managerIDs array is not empty
  if (!managerID) return;

  // Remove manager association with campaign
  // const { error: campaignMgrError } = await supabase
  //   .from("campaign")
  //   .update({ talent_manager: null })
  //   .in("talent_manager", managerIDs);

  // if (campaignMgrError) {
  //   console.error(
  //     "Error removing talent manager from campaign:",
  //     campaignMgrError
  //   );
  //   throw new Error("Error deleting milestones");
  // }

  // const { error: campaignMgrError2 } = await supabase
  //   .from("campaign")
  //   .update({ campaign_manager: null })
  //   .in("campaign_manager", managerIDs);

  // if (campaignMgrError2) {
  //   console.error(
  //     "Error removing talent manager from campaign:",
  //     campaignMgrError2
  //   );
  //   throw new Error("Error deleting milestones");
  // }
  const { data: manager, error: managerError } = await supabase
    .from("manager")
    .select("role")
    .eq("id", managerID)
    .single();

  if (managerError) {
    console.error("Error deleting manager:", managerError);
    throw new Error("Error deleting milestones");
  }

  if (manager && manager?.role) {
    if (manager?.role === "Owner") {
      throw new Error("Cannot remove an admin");
    }
  }

  // Remove manager association with influencer
  const { error: influencerError } = await supabase
    .from("influencer_manager_relation")
    .delete()
    .eq("manager_id", managerID);

  if (influencerError) {
    console.error("Error removing manager from influencer:", influencerError);
    throw new Error("Error deleting deliverables");
  }

  // Remove manager association with pitchlist
  const { error: pitchlistError } = await supabase
    .from("pitchlist")
    .update({ created_by: null })
    .eq("talent_manager", managerID);

  if (pitchlistError) {
    console.error(
      "Error removing talent manager from pitchlist:",
      pitchlistError
    );
    throw new Error("Error deleting milestones");
  }

  // Delete manager notifications
  const { error: notificationError } = await supabase
    .from("notification")
    .delete()
    .eq("manager_recipient_id", managerID);

  if (notificationError) {
    console.error("Error deleting manager notifications:", notificationError);
    throw new Error("Error deleting milestones");
  }

  // Get user IDs from manager IDs
  const { data: userIDs, error: userError } = await supabase
    .from("manager")
    .update({ agency_id: null })
    .eq("id", managerID);

  if (userError) {
    console.error("Supabase Select Error:", userError);
    throw new Error(`Error fetching user IDs: ${JSON.stringify(userError)}`);
  }

  return;
};
