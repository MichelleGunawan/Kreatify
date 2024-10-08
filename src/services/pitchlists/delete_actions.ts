import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { UUID } from "crypto";
import { cache } from "react";

/**
 * Delete pitchlists
 * @param pitchlistIds
 * @returns
 **/
export const deletePitchlists = async (pitchlistIds: UUID[]) => {
  if (!pitchlistIds || pitchlistIds.length === 0) {
    console.error("No pitchlist IDs provided.");
    return;
  }

  try {
    // First, delete from the pitchlist_influencer_relation
    const { error: relationError } = await supabase
      .from("pitchlist_influencer_relation")
      .delete()
      .in("pitchlist_id", pitchlistIds);

    if (relationError) {
      throw new Error(
        `Error deleting from pitchlist_influencer_relation: ${relationError.message}`
      );
    }

    // Then, delete from the pitchlist
    const { data, error } = await supabase
      .from("pitchlist")
      .delete()
      .in("id", pitchlistIds);

    if (error) {
      throw new Error(`Error deleting pitchlists: ${error.message}`);
    }

    return data; // Return the deleted pitchlists data, if needed
  } catch (err) {
    console.error(err);
  }
};
