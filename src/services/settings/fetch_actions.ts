import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

/*
 * Fetches the user location from the database
 * @param {string} userId - User ID
 * @returns {Promise<UserLocation | null>} - User location
 */

export const fetchUserContactInfo = async (userId: string): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from("user")
      .select("first_name, last_name, email, phone")
      .eq("id", userId)
      .single(); // Fetches a single row

    if (error) {
      console.error("Error fetching user contact info:", error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

/*
 * Fetches the user location from the database
 * @param {string} userId - User ID
 * @returns {Promise<UserLocation | null>} - User location
 */

export const fetchUserLocation = async (userId: string): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from("user")
      .select("address, city, country, state")
      .eq("id", userId)
      .single(); // Fetches a single row

    if (error) {
      console.error("Error fetching user location:", error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

/*
 * Fetches the user location from the database
 * @param {string} userId - User ID
 * @returns {Promise<UserLocation | null>} - User location
 */

export const fetchUserSecurityInfo = async (userId: string): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from("user")
      .select("email")
      .eq("id", userId)
      .single(); // Fetches a single row

    if (error) {
      console.error("Error fetching user security info:", error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};
