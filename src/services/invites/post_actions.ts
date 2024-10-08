import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { UUID } from "crypto";

/**
 * Invite a user to the app
 * @param {string} type - The type of the user (e.g. manager, influencer, etc.)
 * @param {string} role - The role of the user (e.g. manager, influencer, etc.)
 * @param {string} email - The email of the user
 * @param {File} [contract] - The contract file to send to the user
 * @returns {Promise<number>} The ID of the created invite
 */
export const inviteUser = async ({
  type,
  role,
  email,
  agency_id,
}: {
  type: string;
  role: string;
  email: string;
  agency_id: UUID;
}): Promise<string> => {
  if (!agency_id) {
    throw new Error("Missing agency ID");
  }
  // Create the pitchlist object
  const invite = {
    user_type: type,
    user_role: role,
    agency_id,
    email,
    created_at: new Date().toISOString(),
  };

  // Insert the pitch list into the pitchlist table
  const { data, error } = await supabase
    .from("onboard_invite")
    .insert([invite])
    .select("id");

  if (error) {
    console.error("Error creating invite:", error);
    throw new Error(API_BACKEND_ERROR_MESSAGE);
  }

  return data?.[0]?.id; // Return the created pitch list data
};
