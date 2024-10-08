import { agencyData } from "@/data/AgencyData";
import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { InfluencerRolesType } from "@/types/user.type";
import { PagePermissionType } from "@/types/utils.type";
import { PAGE_PERMISSIONS, USER_PERMISSIONS } from "@/utils/constants";
import { supabase } from "@/utils/supabase/js/client";
import { UUID } from "crypto";
import { cache } from "react";
/**
 * Removes managers from an agency. DOES NOT DELETE MANAGER
 * @param {string[]} managerIDs List of manager IDs to delete
 * @throws {Error} If there was an error deleting managers
 */
export const removeInfluencerFromAgency = async (influencerID: UUID | null) => {
  // Check if managerIDs array is not empty
  if (!influencerID) return;

  // Remove manager association with influencer
  const { error: influencerError } = await supabase
    .from("influencer_manager_relation")
    .delete()
    .eq("influencer_id", influencerID);

  if (influencerError) {
    console.error("Error removing manager from influencer:", influencerError);
    throw new Error("Error deleting deliverables");
  }

  // Remove manager association with pitchlist
  const { error: pitchlistError } = await supabase
    .from("pitchlist_influencer_relation")
    .delete()
    .eq("influencer_id", influencerID);

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
    .eq("influencer_recipient_id", influencerID);

  if (notificationError) {
    console.error("Error deleting manager notifications:", notificationError);
    throw new Error("Error deleting milestones");
  }

  // Remove manager from agency
  const { error: managerError } = await supabase
    .from("influencer_agency_relation")
    .delete()
    .eq("user_id", influencerID);

  if (managerError) {
    console.error("Supabase Delete Error:", managerError);
    throw new Error(
      `Error deleting user agency relations: ${JSON.stringify(managerError)}`
    );
  }

  return;
};
