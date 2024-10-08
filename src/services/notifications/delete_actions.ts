import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

/**
 * Deletes a notification from the database
 * @param {number} notificationID - Notification ID
 * @returns {Promise<any>} - A promise that resolves when the notification is deleted
 * @throws {Error} - If there is an error deleting the notification
 */
export const deleteNotification = cache(async (notificationID: number) => {
  const { data, error } = await supabase
    .from("notification")
    .delete()
    .eq("id", notificationID);

  if (error) {
    // Extract the actual error message
    throw new Error(
      `${API_BACKEND_ERROR_MESSAGE} deleteNotification. Error: ${
        error.message || JSON.stringify(error)
      }`
    );
  }

  return data;
});
