import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

// Type import
import { UUID } from "crypto";
import { SocialPlatformsDBType } from "@/types/enum.types";
import { SocialDBType } from "@/types/social.type";
import { formatHandleToString } from "@/utils/functions/format.functions";

/**
 * Edit the notes of an influencer
 * @param {UUID} talentID
 * @param {string} notes
 * @returns {Promise<void>}
 * @throws {Error}
 * */
export const editInfluencerNotes = cache(
  async ({ talentID, notes }: { talentID: UUID | null; notes: string }) => {
    if (!talentID) {
      throw new Error("Missing user ID or talent ID");
    }

    const { error } = await supabase
      .from("influencer")
      .update({ notes })
      .eq("id", talentID);

    if (error) {
      console.error("Error updating influencer:", error);
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} editInfluencerNote. Error: ${JSON.stringify(
          error
        )}`
      );
    }
  }
);

/**
 * Update influencer's payment info
 *  @param {UUID} talentID
 *  @param {string} type
 *  @param {string} email
 *  @param {string} phone
 *  @param {string} direct_deposit
 *  @param {string} acct_holder_name
 *  @param {string} acct_number
 *  @param {string} swift_code
 *  @returns {Promise<void>}
 **/
export const upsertInfluencerPaymentInfo = async ({
  talentID,
  paymentInfo,
}: {
  talentID: UUID | null;
  paymentInfo: any[];
}): Promise<void> => {
  if (!talentID) {
    throw new Error("Missing user ID or talent ID");
  }
  // Fetch existing payment info for the influencer
  const { data: existingData, error: fetchError } = await supabase
    .from("influencer_payment_info")
    .select("*")
    .eq("influencer_id", talentID);

  if (fetchError) {
    throw new Error(
      `Error fetching existing payment info: ${fetchError.message}`
    );
  }

  // Create a map for existing payment info for quick lookup
  const existingMap = new Map(existingData.map((item) => [item.type, item]));

  // Update and insert new payment info
  for (const payment of paymentInfo) {
    const {
      type,
      email,
      phone,
      routing_number,
      acct_holder_name,
      acct_number,
      swift_code,
      bank_name,
    } = payment;

    // Check if the type is valid
    if (!type) {
      console.warn(
        `Skipping payment info with null type: ${JSON.stringify(payment)}`
      );
      continue; // Skip this entry if type is null
    }

    const existingPayment = existingMap.get(type);

    if (existingPayment) {
      // If the record exists, update it
      const { error: updateError } = await supabase
        .from("influencer_payment_info")
        .update({
          email,
          phone,
          routing_number,
          acct_holder_name,
          acct_number,
          swift_code,
          bank_name,
        })
        .eq("influencer_id", talentID)
        .eq("type", type);

      if (updateError) {
        throw new Error(
          `Error updating payment info for type ${type}: ${updateError.message}`
        );
      }

      existingMap.delete(type); // Remove it from the map as it's updated
    } else {
      // If the record does not exist, insert it
      const { error: insertError } = await supabase
        .from("influencer_payment_info")
        .insert([
          {
            influencer_id: talentID,
            type,
            email,
            phone,
            routing_number,
            acct_holder_name,
            acct_number,
            swift_code,
            bank_name,
          },
        ]);

      if (insertError) {
        throw new Error(
          `Error inserting payment info for type ${type}: ${insertError.message}`
        );
      }
    }
  }

  // Delete any payment info that is not in the new paymentInfo array
  for (const existingPayment of existingMap.values()) {
    const { error: deleteError } = await supabase
      .from("influencer_payment_info")
      .delete()
      .eq("influencer_id", talentID)
      .eq("type", existingPayment.type);

    if (deleteError) {
      throw new Error(
        `Error deleting payment info for type ${existingPayment.type}: ${deleteError.message}`
      );
    }
  }
};

/**
 * Updates or inserts social media rows for an influencer. The socials parameter should
 * contain an array of objects with the following properties:
 * - id: The ID of the existing social row, or -1 to insert a new row
 * - platform: The social media platform (e.g. 'Instagram', 'Tiktok')
 * - handle: The influencer's handle on the given platform
 *
 * @param {string} talentID - The ID of the influencer to update
 * @param {SocialTy[]} socials - The social media rows to update or insert
 * @returns {Promise<string>} - A promise that resolves with the string "Success"
 * @throws {Error} - If there is an error fetching existing rows, inserting new rows,
 *                   updating existing rows, or deleting old rows
 */

export const upsertSocials = async ({
  talentID,
  socials,
}: {
  talentID: UUID | null;
  socials: SocialDBType[];
}) => {
  try {
    if (!talentID) {
      throw new Error("Missing user ID or talent ID");
    }
    // Step 1: Get existing social rows for the influencer
    const { data: existingRows, error: fetchError } = await supabase
      .from("social")
      .select("id")
      .eq("influencer_id", talentID);

    if (fetchError) {
      console.error("Error fetching existing social rows:", fetchError);
      throw new Error("Failed to fetch existing social rows");
    }

    const existingIds = existingRows.map((row: { id: string }) => row.id);

    // Step 2: Iterate through the provided socials and update/insert rows
    for (const social of socials) {
      if (social.id === null) {
        // Insert a new row if id = -1
        const { error: insertError } = await supabase.from("social").insert({
          influencer_id: talentID,
          platform: social.platform as SocialPlatformsDBType,
          handle: formatHandleToString(social.handle),
        });

        if (insertError) {
          console.error("Error inserting new social row:", insertError);
          throw new Error("Failed to insert new social row");
        }
      } else {
        if (social.id && social.handle !== "") {
          // Update an existing row if id is provided
          const { error: updateError } = await supabase
            .from("social")
            .update({
              platform: social.platform as SocialPlatformsDBType,
              handle: formatHandleToString(social.handle),
            })
            .eq("id", social.id)
            .eq("influencer_id", talentID);

          if (updateError) {
            console.error("Error updating social row:", updateError);
            throw new Error("Failed to update social row");
          }
        }
      }
    }

    // Step 3: Delete rows not present in the provided socials list
    const providedIds = socials.filter((s) => s.id !== null).map((s) => s.id);
    const idsToDelete = existingIds.filter((id) => !providedIds.includes(id));

    if (idsToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from("social")
        .delete()
        .in("id", idsToDelete);

      if (deleteError) {
        console.error("Error deleting old social rows:", deleteError);
        throw new Error("Failed to delete old social rows");
      }
    }

    return "Success";
  } catch (error) {
    console.error("Error in upsertSocials function:", error);
    throw error;
  }
};
