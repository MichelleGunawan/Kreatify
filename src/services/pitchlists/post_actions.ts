import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { Database } from "@/utils/supabase/js/database.types";
import { UUID } from "crypto";
import { PitchlistUserType } from "@/types/user.type";

type PitchlistInput = {
  agency_id: UUID;
  created_by: UUID;
  pitchlistName: string;
  created_at: string;
};

/**
 * Creates a new pitch list
 * @param {number} agency_id
 * @param {UUID} created_by
 * @param {string} pitchlistName
 * @param {string[]} influencerIds
 * @returns {Promise<{id: number}>} The created pitch list data
 */
export const createPitchlist = async (
  agency_id: UUID,
  created_by: UUID,
  pitchlistName: string,
  pitchlistInfluencers: PitchlistUserType[]
): Promise<any> => {
  // Create the pitchlist object
  const pitchlist: PitchlistInput = {
    agency_id,
    created_by,
    pitchlistName: pitchlistName,
    created_at: new Date().toISOString(),
  };

  // Insert the pitch list into the pitchlist table
  const { data: pitchlistData, error: pitchlistError } = await supabase
    .from("pitchlist")
    .insert([pitchlist])
    .select("id");

  if (pitchlistError || !pitchlistData) {
    console.error("Error creating pitch list:", pitchlistError);
    return null; // Or handle the error as needed
  }

  if (!pitchlistData[0] || !pitchlistData[0]?.id) {
    return {};
  }
  const pitchlistId = pitchlistData[0].id; // Get the newly created pitch list ID

  // Insert into pitchlist_influencer_relation table
  const { error: relationError } = await supabase
    .from("pitchlist_influencer_relation")
    .insert(
      pitchlistInfluencers.map((influencer) => ({
        pitchlist_id: pitchlistId,
        influencer_id: influencer.id,
        influencer_rate: influencer.rate,
      }))
    );

  if (relationError) {
    console.error(
      "Error adding pitchlistInfluencers to pitch list:",
      relationError
    );
    return null; // Or handle the error as needed
  }

  return pitchlistData[0].id; // Return the created pitch list data
};

/**
 * Update a pitch list
 * @param pitchlistId The ID of the pitch list to update
 * @param managerId The ID of the manager updating the pitch list
 * @param pitchlistName The new pitchlistName for the pitch list
 * @param influencerIds The IDs of the pitchlistInfluencers to add to the pitch list
 * @returns The updated pitch list data on success, null on failure
 */
export const updatePitchlist = async ({
  pitchlistId,
  managerId,
  pitchlistName,
  pitchlistDescription,
  pitchlistInfluencers,
}: {
  pitchlistId: UUID | null;
  managerId: string;
  pitchlistName: string;
  pitchlistDescription: string;
  pitchlistInfluencers: PitchlistUserType[];
}) => {
  if (!pitchlistId) {
    throw new Error(API_BACKEND_ERROR_MESSAGE);
  }
  // Update the pitch list in the pitchlist table
  const { error: updateError } = await supabase
    .from("pitchlist")
    .update({
      pitchlistName: pitchlistName,
      pitchlistDescription,
      updated_at: new Date().toISOString(),
      updated_by: managerId,
    })
    .eq("id", pitchlistId);

  if (updateError) {
    console.error("Error updating pitch list:", updateError);
    return null; // Or handle the error as needed
  }

  // Clear existing relations
  await supabase
    .from("pitchlist_influencer_relation")
    .delete()
    .eq("pitchlist_id", pitchlistId);

  // Insert new influencer relations
  const { error: relationError } = await supabase
    .from("pitchlist_influencer_relation")
    .insert(
      pitchlistInfluencers.map((influencer) => ({
        pitchlist_id: pitchlistId,
        influencer_id: influencer.id,
        influencer_rate: influencer.rate,
      }))
    );

  if (relationError) {
    console.error(
      "Error updating pitchlistInfluencers in pitch list:",
      relationError
    );
    return null; // Or handle the error as needed
  }

  return { id: pitchlistId, pitchlistName }; // Return the updated pitch list data
};
