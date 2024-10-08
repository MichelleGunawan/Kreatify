import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { Database } from "@/utils/supabase/js/database.types";
import { UUID } from "crypto";
import { NotificationType } from "@/types/notifications.type";

/**
 * Fetches notifications for an influencer
 * @param {UUID} userID
 * @returns {Promise<Array<NotificationType>>}
 * @throws {Error}
 */
export const fetchInfluencerNotifications = cache(
  async (userID: UUID): Promise<Array<NotificationType>> => {
    const { data, error } = await supabase
      .from("notification")
      .select("*")
      .eq("influencer_recipient_id", userID);
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchNotifications. Error: ${error}`
      );
    }

    return (data as NotificationType[]) || [];
  }
);

/**
 * Fetches notifications for a manager
 * @param {UUID} userID
 * @returns {Promise<Array<NotificationType>>}
 * @throws {Error}
 * */
export const fetchManagerNotifications = cache(
  async (userID: UUID): Promise<Array<NotificationType>> => {
    const { data, error } = await supabase
      .from("notification")
      .select("*")
      .eq("manager_recipient_id", userID);
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchNotifications. Error: ${error}`
      );
    }

    return (data as NotificationType[]) || [];
  }
);
