import { supabase } from "@/utils/supabase/js/client";
import { UUID } from "crypto";

/**
 * Deletes campaigns and their associated deliverables and milestones.
 * @param {UUID[]} campaignIDs - Array of campaign IDs to delete
 * @throws {Error} - If there is an error deleting the campaigns, deliverables, or milestones
 */
export const deleteCampaigns = async (campaignIDs: UUID[]) => {
  // Check if campaignIDs array is not empty
  if (campaignIDs.length === 0) return;

  // Remove campaign association with milestone. Keep milestone for stats
  const { error: milestoneError } = await supabase
    .from("milestone")
    .update({ campaign_id: null, deliverable_id: null })
    .in("campaign_id", campaignIDs);

  if (milestoneError) {
    console.error("Error deleting milestones:", milestoneError);
    throw new Error("Error deleting milestones");
  }

  // Deleting deliverable
  const { error: deliverableError } = await supabase
    .from("deliverable")
    .delete()
    .in("campaign_id", campaignIDs);

  if (deliverableError) {
    console.error("Error deleting deliverables:", deliverableError);
    throw new Error("Error deleting deliverables");
  }

  // Deleting from campaign_payment first to avoid foreign key constraint errors
  const { error: paymentError } = await supabase
    .from("campaign_payment")
    .delete()
    .in("campaign_id", campaignIDs);

  if (paymentError) {
    console.error("Error deleting campaign payments:", paymentError);
    throw new Error("Error deleting campaign payments");
  }

  // Deleting from campaign
  const { error: campaignError } = await supabase
    .from("campaign")
    .delete()
    .in("id", campaignIDs);

  if (campaignError) {
    console.error("Error deleting campaigns:", campaignError);
    throw new Error("Error deleting campaigns");
  }
};
