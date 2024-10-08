import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { Database } from "@/utils/supabase/js/database.types";
import { UUID } from "crypto";
import { UserProfileType } from "@/types/profile.type";

// Define types for the result of the SQL functions as arrays of objects
type ManagerByAgencyType =
  Database["public"]["Functions"]["get_managers_by_agency"]["Returns"];
type InfluencerByAgencyType =
  Database["public"]["Functions"]["get_influencers_by_agency"]["Returns"];
type ContactsByAgencyType =
  Database["public"]["Functions"]["get_contacts_by_agency"]["Returns"];
type UserPreviewType =
  Database["public"]["Functions"]["get_user_preview"]["Returns"];

let InfluencersWithSocialByAgencyType: Database["public"]["Views"]["agency_influencers_with_socials_view"]["Row"];

/**
 * Fetches managers associated with the given agency ID
 * @param {UUID} agencyId - Agency ID
 * @returns {Promise<ManagerByAgencyType>} - An array of manager objects
 */
export const fetchManagersByAgency = cache(
  async (agencyId: UUID): Promise<ManagerByAgencyType> => {
    const { data, error } = await supabase.rpc("get_managers_by_agency", {
      agency_id_param: agencyId,
    });

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchManagersByAgency. Error: ${error.message}`
      );
    }

    return data || [];
  }
);

/**
 * Fetches influencers associated with the given agency ID
 * @param {UUID} agencyId - Agency ID
 * @returns {Promise<InfluencerByAgencyType>} - An array of influencer objects
 */
export const fetchTalentsByAgency = cache(
  async (agencyId: UUID): Promise<InfluencerByAgencyType> => {
    const { data, error } = await supabase.rpc("get_influencers_by_agency", {
      agency_id_param: agencyId,
    });

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchTalentsByAgency. Error: ${error.message}`
      );
    }

    return data || [];
  }
);

/**
 * Fetches contacts associated with the given agency ID
 * @param {UUID} agencyId - Agency ID
 * @returns {Promise<ContactsByAgencyType>} - An array of contact objects
 */
export const fetchContactsByAgency = cache(
  async (
    agencyId: UUID | null
  ): Promise<{ id: number; name: string; email: string }[]> => {
    if (!agencyId) {
      throw new Error("Agency ID is required");
    }

    const { data, error } = await supabase
      .from("contact")
      .select("id, name, email")
      .eq("agency_id", agencyId);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchContactsByAgency. Error: ${error.message}`
      );
    }

    // Verify and return the data
    if (!Array.isArray(data)) {
      throw new Error("Unexpected data format received");
    }

    return data;
  }
);

/**
 * Fetches contacts associated with the given manager ID
 * @param {UUID} managerId - Agency ID
 * @returns {Promise<ContactsByManagerType>} - An array of contact objects
 */
export const fetchContactsByManager = cache(
  async (
    agencyId: UUID | null
  ): Promise<{ id: number; name: string; email: string }[]> => {
    if (!agencyId) {
      throw new Error("Agency ID is required");
    }

    const { data, error } = await supabase
      .from("contact")
      .select("id, name, email")
      .eq("agency_id", agencyId);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchContactsByAgency. Error: ${error.message}`
      );
    }

    // Verify and return the data
    if (!Array.isArray(data)) {
      throw new Error("Unexpected data format received");
    }

    return data;
  }
);

/**
 * Fetches influencers associated with the given agency ID with their social following info
 * @param {UUID} agencyId - Agency ID
 * @returns {Promise<InfluencerByAgencyType>} - An array of influencer objects
 */
export const fetchInfluencersWithSocialsByAgency = cache(
  async (
    agencyID: UUID
  ): Promise<Array<typeof InfluencersWithSocialByAgencyType>> => {
    const { data, error } = await supabase
      .from("agency_influencers_with_socials_view")
      .select("*")
      .eq("agency_id", agencyID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchPitchlistUsers. Error: ${error}`
      );
    }

    return data;
  }
);

export const fetchUserPreviews = cache(
  async ({
    managerOrInfluencerIds,
  }: {
    managerOrInfluencerIds: UUID[];
  }): Promise<Array<UserPreviewType | null>> => {
    let userPreviews: UserPreviewType[] = [];

    for (const managerOrInfluencerId of managerOrInfluencerIds) {
      // Use 'for...of' here
      const { data, error } = await supabase.rpc("get_user_preview", {
        manager_or_influencer_id: managerOrInfluencerId,
      });

      if (error) {
        throw new Error(
          `${API_BACKEND_ERROR_MESSAGE} fetchManagersByAgency. Error: ${error.message}`
        );
      }

      userPreviews.push(data); // Push the fetched data
    }

    return userPreviews;
  }
);

export const fetchInfluencerPreviews = cache(
  async ({
    influencerIds,
  }: {
    influencerIds: UUID[];
  }): Promise<Array<UserPreviewType | null>> => {
    let userPreviews: UserPreviewType[] = [];

    for (const influencerId of influencerIds) {
      const { data, error } = await supabase.rpc("get_influencer_preview", {
        influencer_id_param: influencerId,
      });

      if (error) {
        throw new Error(
          `${API_BACKEND_ERROR_MESSAGE} fetchInfluencersByAgency. Error: ${error.message}`
        );
      }

      userPreviews.push(data); // Push the fetched data
    }

    return userPreviews;
  }
);
