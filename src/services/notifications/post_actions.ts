import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { Database } from "@/utils/supabase/js/database.types";
import { UUID } from "crypto";
import { NotificationTypeType } from "@/types/notifications.type";

/**
 * Creates a notification for each recipient in `recipientIDs` with the given `type`, `header_text`, `body_text`, and `routing`.
 * @param {Array<string | null>} recipientIDs - The IDs of the recipients to create notifications for. If a recipient has a null ID, the notification will not be created for them.
 * @param {NotificationTypeType} type - The type of the notification.
 * @param {string} header_text - The header text of the notification.
 * @param {string} body_text - The body text of the notification.
 * @param {string} routing - The routing of the notification.
 * @returns {Promise<any>} - A promise that resolves when all notifications have been created. If there is an error, the promise will resolve to null.
 */
export const createNotification = async ({
  talentRecipientIDs,
  managerRecipientIDs,
  type,
  header_text,
  body_text,
  routing,
}: {
  talentRecipientIDs?: Array<string | null>;
  managerRecipientIDs?: Array<string | null>;
  type: NotificationTypeType;
  header_text: string;
  body_text: string;
  routing: string;
}): Promise<any> => {
  const uniqueTalentRecipientIDs = Array.from(new Set(talentRecipientIDs));
  const uniqueManagerRecipientIDs = Array.from(new Set(managerRecipientIDs));

  if (talentRecipientIDs && uniqueTalentRecipientIDs.length != 0) {
    for (const talentRecipientID of uniqueTalentRecipientIDs) {
      if (!talentRecipientID) {
        continue;
      }
      const { data, error } = await supabase
        .from("notification")
        .insert([
          {
            influencer_recipient_id: talentRecipientID,
            type,
            header_text,
            body_text,
            routing,
            created_at: new Date().toISOString(),
          },
        ])
        .select("id");

      if (error) {
        console.error("Error creating notification:", error);
        return null; // Or handle the error as needed
      }
    }
  }

  if (managerRecipientIDs && uniqueManagerRecipientIDs.length != 0) {
    for (const managerRecipientID of uniqueManagerRecipientIDs) {
      if (!managerRecipientID) {
        continue;
      }
      const { data, error } = await supabase
        .from("notification")
        .insert([
          {
            manager_recipient_id: managerRecipientID,
            type,
            header_text,
            body_text,
            routing,
            created_at: new Date().toISOString(),
          },
        ])
        .select("id");

      if (error) {
        console.error("Error creating notification:", error);
        return null; // Or handle the error as needed
      }
    }
  }
};
