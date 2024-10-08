import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { Database } from "@/utils/supabase/js/database.types";
import { UUID } from "crypto";

interface UserContact {
  firstName: string;
  lastName: string;
  phone: string;
  whatsapp: string;
}

interface UserLocation {
  country: string;
  city: string;
  state: string;
  address: string;
}

/*
 * Update the user contact info in the database
 * @param {string} userId - User ID
 * @param {UserContact} info - User contact info
 * @returns {Promise<Database["public"]["Tables"]["user"]["Update"]>} - Updated user
 */
export const editUserContact = cache(
  async (userId: UUID, info: UserContact) => {
    // Update the user location in the database
    const { data, error } = await supabase
      .from("user")
      .update({
        first_name: info.firstName,
        last_name: info.lastName,
        phone: info.phone,
        whatsapp: info.phone,
      })
      .eq("id", userId);

    if (error) {
      console.error("Error updating user contact info:", error);
      throw new Error("Failed to update user contact info");
    }

    return data;
  }
);

/*
 * Update the user location in the database
 * @param {string} userId - User ID
 * @param {UserLocation} location - User location
 * @returns {Promise<Database["public"]["Tables"]["user"]["Update"]>} - Updated user
 */
export const editUserLocation = cache(
  async (userId: UUID, location: UserLocation) => {
    // Update the user location in the database
    const { data, error } = await supabase
      .from("user")
      .update({
        country: location.country,
        city: location.city,
        state: location.state,
        address: location.address,
      })
      .eq("id", userId);

    if (error) {
      console.error("Error updating user location:", error);
      throw new Error("Failed to update user location");
    }

    return data;
  }
);
