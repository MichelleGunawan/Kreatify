import { supabase } from "@/utils/supabase/js/client";

// Type import
import { UUID } from "crypto";

/**
 * Update influencer's team members
 *  @param {UUID} talentID
 *  @param {UUID[]} managerIDs
 *  @returns {Promise<void>}
 **/
export const updateInfluencerTeam = async ({
  talentID,
  managerIDs,
}: {
  talentID: UUID | null;
  managerIDs: UUID[];
}): Promise<void> => {
  if (!talentID) {
    return;
  }
  // Remove existing managers for the influencer
  const { error: deleteError } = await supabase
    .from("influencer_manager_relation")
    .delete()
    .eq("influencer_id", talentID);

  if (deleteError) {
    throw new Error(`Error removing existing managers: ${deleteError.message}`);
  }

  const uniqueManagerIDs = Array.from(new Set(managerIDs));
  if (uniqueManagerIDs.length === 0) {
    return;
  }

  // Insert the new set of managers for the influencer
  const updates = uniqueManagerIDs.map((managerID) => ({
    manager_id: managerID,
    influencer_id: talentID,
  }));

  const { error: insertError } = await supabase
    .from("influencer_manager_relation")
    .insert(updates);

  if (insertError) {
    throw new Error(`Error adding new managers: ${insertError.message}`);
  }
};

/**
 * Update manager's Team members
 *  @param {UUID} managerID
 *  @param {UUID[]} managerIDs
 *  @returns {Promise<void>}
 *  @throws {Error}
 **/
export const updateManagerTeam = async ({
  managerID,
  influencerIDs,
}: {
  managerID: UUID | null;
  influencerIDs: UUID[];
}): Promise<void> => {
  if (!managerID) {
    return;
  }
  // Remove existing influencers for the manager
  const { error: deleteError } = await supabase
    .from("influencer_manager_relation")
    .delete()
    .eq("manager_id", managerID);

  if (deleteError) {
    throw new Error(
      `Error removing existing influencers: ${deleteError.message}`
    );
  }

  // Filter out any null or undefined influencer IDs and remove duplicates
  const uniqueInfluencerIDs = Array.from(new Set(influencerIDs));

  if (uniqueInfluencerIDs.length === 0) {
    return;
  }

  // Insert the new set of influencers for the manager
  const updates = uniqueInfluencerIDs.map((influencerID) => ({
    manager_id: managerID,
    influencer_id: influencerID,
  }));

  const { error: insertError } = await supabase
    .from("influencer_manager_relation")
    .insert(updates);

  if (insertError) {
    throw new Error(`Error adding new influencers: ${insertError.message}`);
  }
};
