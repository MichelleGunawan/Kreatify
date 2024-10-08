import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { Database } from "@/utils/supabase/js/database.types";
import { UUID } from "crypto";
import { PaymentType } from "@/types/payments.type";
import { SocialDBType } from "@/types/social.type";

// Define types for the result of the SQL functions as arrays of objects
type UserProfileType = Database["public"]["Views"]["user_profile_view"]["Row"];
type InfluencerProfileInfoType =
  Database["public"]["Views"]["influencer_profile_view"]["Row"];
type ManagerProfileInfoType =
  Database["public"]["Views"]["manager_profile_view"]["Row"];
type UserBasicInfoType =
  Database["public"]["Views"]["user_basic_info_view"]["Row"];
type InfluencerBasicInfoType =
  Database["public"]["Views"]["influencer_basic_info_view"]["Row"];
type ManagerBasicInfoType =
  Database["public"]["Views"]["manager_basic_info_view"]["Row"];

/**
 * Fetch user profile info
 * @param {number} userID
 * @returns {Promise<UserProfileType>}
 * @throws {Error}
 **/
export const fetchUserProfileInfo = cache(
  async (userID: UUID): Promise<UserProfileType> => {
    const { data, error } = await supabase
      .from("user_profile_view")
      .select("*")
      .eq("user_id", userID)
      .limit(1);
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchUserProfileInfo. Error: ${error}`
      );
    }

    return data[0] || {};
  }
);

/**
 * Fetch user profile info
 * @param {number} userID
 * @returns {Promise<UserProfileType>}
 * @throws {Error}
 **/
export const fetchInfluencerProfileInfo = cache(
  async (talentID: UUID): Promise<InfluencerProfileInfoType> => {
    const { data, error } = await supabase
      .from("influencer_profile_view")
      .select("*")
      .eq("id", talentID)
      .limit(1);
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchUserProfileInfo. Error: ${error}`
      );
    }

    return data[0] || {};
  }
);

/**
 * Fetch user profile info
 * @param {number} userID
 * @returns {Promise<UserProfileType>}
 * @throws {Error}
 **/
export const fetchManagerProfileInfo = cache(
  async (managerID: UUID): Promise<ManagerProfileInfoType> => {
    const { data, error } = await supabase
      .from("manager_profile_view")
      .select("*")
      .eq("id", managerID)
      .limit(1);
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchUserProfileInfo. Error: ${error}`
      );
    }

    return data[0] || {};
  }
);

/**
 * Fetch user basic info for the basic info card on profile
 * @param {number} userID
 *  @returns {Promise<UserBasicInfoType>}
 *  @throws {Error}
 **/
export const fetchUserBasicInfo = cache(
  async (userID: UUID): Promise<UserBasicInfoType> => {
    const { data, error } = await supabase
      .from("user_basic_info_view")
      .select("*")
      .eq("user_id", userID)
      .limit(1);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchUserBasicInfo. Error: ${error}`
      );
    }

    return data[0] || {};
  }
);

/**
 * Fetch manager basic info for the basic info card on profile
 * @param {number} userID
 *  @returns {Promise<UserBasicInfoType>}
 *  @throws {Error}
 **/
export const fetchInfluencerBasicInfo = cache(
  async (talentID: UUID): Promise<InfluencerBasicInfoType> => {
    const { data, error } = await supabase
      .from("influencer_basic_info_view")
      .select("*")
      .eq("id", talentID)
      .limit(1);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchInfluencerBasicInfo. Error: ${error}`
      );
    }

    return data[0] || {};
  }
);

/**
 * Fetch notes on an influencer
 * @param {UUID} talentID
 *  @returns {Promise<string>}
 *  @throws {Error}
 **/
export const fetchInfluencerNotes = cache(
  async (talentID: UUID): Promise<string> => {
    const { data, error } = await supabase
      .from("influencer")
      .select("notes")
      .eq("id", talentID)
      .limit(1);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchInfluencerBasicInfo. Error: ${error}`
      );
    }

    return data[0].notes || "";
  }
);

/**
 * Fetch influencer basic info for the basic info card on profile
 * @param {number} userID
 *  @returns {Promise<UserBasicInfoType>}
 *  @throws {Error}
 **/
export const fetchManagerBasicInfo = cache(
  async (managerID: UUID): Promise<ManagerBasicInfoType> => {
    const { data, error } = await supabase
      .from("manager_basic_info_view")
      .select("*")
      .eq("id", managerID)
      .limit(1);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchManagerBasicInfo. Error: ${error}`
      );
    }

    return data[0] || {};
  }
);

/**
 * Fetch manager Managers in user preview format
 * @param {number} userID
 *  @returns {Promise<UserBasicInfoType>}
 *  @throws {Error}
 **/
export const fetchInfluencerPayments = cache(
  async (talentID: UUID): Promise<Array<PaymentType>> => {
    const { data, error } = await supabase
      .from("influencer_payment_info")
      .select("*")
      .eq("influencer_id", talentID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchInfluencerPayments. Error: ${
          error.message || JSON.stringify(error)
        }`
      );
    }

    return (data as PaymentType[]) || [];
  }
);

/**
 * Get social following for an influencer
 * @param talentID
 * @returns Promise<Array<SocialFollowingType>>
 * @throws Error
 */
export const getInfluencerSocialFollowing = async (
  talentID: string
): Promise<Array<SocialDBType>> => {
  try {
    const { data, error } = await supabase.rpc("get_social_following", {
      influencer_id_param: talentID,
    });

    if (error) {
      console.error("Error fetching social following:", error);
      throw new Error("Failed to fetch social following");
    }

    return (data as Array<SocialDBType>) || []; // This will be the JSON array from the SQL function
  } catch (error) {
    console.error("Error in getSocialFollowing function:", error);
    throw error;
  }
};

/**
 * Fetch user profile role
 * @param {number} userID
 * @returns {Promise<UserProfileType>}
 * @throws {Error}
 **/
export const fetchInfluencerRole = cache(
  async (talentID: UUID): Promise<string> => {
    const { data, error } = await supabase
      .from("influencer")
      .select("role")
      .eq("id", talentID)
      .single();

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchInfluencerRole. Error: ${error}`
      );
    }

    if (!data?.role) {
      throw new Error("No role found for talent");
    }

    return data.role;
  }
);
