import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { Database } from "@/utils/supabase/js/database.types";
import { UUID } from "crypto";
import { PagePermissionType } from "@/types/utils.type";
import { PAGE_PERMISSIONS } from "@/utils/constants";

let PitchListsType: Database["public"]["Views"]["pitchlists_view"]["Row"];
let PitchlistInfoType: Database["public"]["Views"]["pitchlist_info_view"]["Row"];
let PitchlistContactInfoType: Database["public"]["Views"]["pitchlist_contact_info_view"]["Row"];
let PitchlistUsersType: Database["public"]["Views"]["pitchlist_users_view"]["Row"];

/**
 * Fetch pitchlists that are part of agency
 * @param {UUID} agencyID
 * @returns {Promise<Array<typeof PitchListsType>>}
 * @throws {Error}
 **/
export const fetchAgencyPitchlists = cache(
  async (agencyID: UUID): Promise<Array<typeof PitchListsType>> => {
    const { data, error } = await supabase
      .from("pitchlists_view")
      .select("*")
      .eq("agency_id", agencyID)
      .order("created_at", { ascending: false });
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchPitchlists. Error: ${error}`
      );
    }

    return data || [];
  }
);

/**
 * Fetch pitchlists created by a certain manager
 * @param {number} managerID
 * @returns {Promise<Array<typeof PitchListsType>>}
 * @throws {Error}
 **/
export const fetchManagerPitchlists = cache(
  async (managerID: UUID): Promise<Array<typeof PitchListsType>> => {
    const { data, error } = await supabase
      .from("pitchlists_view")
      .select("*")
      .eq("manager_id", managerID)
      .order("created_at", { ascending: false });
    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchPitchlists. Error: ${error}`
      );
    }

    return data || [];
  }
);

/**
 * Fetch pitchlist info
 * @param {UUID} pitchlistID
 * @returns {Promise<typeof PitchlistInfoType>}
 * @throws {Error}
 **/
export const fetchPitchlistInfo = cache(
  async (pitchlistID: UUID): Promise<typeof PitchlistInfoType> => {
    const { data, error } = await supabase
      .from("pitchlist_info_view")
      .select("*")
      .eq("id", pitchlistID)
      .limit(1);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchPitchlistInfo. Error: ${error}`
      );
    }

    return data[0] || {};
  }
);

/**
 * Fetch pitchlist contact info
 * @param {UUID} pitchlistID
 * @returns {Promise<typeof PitchlistContactInfoType>}
 * @throws {Error}
 **/
export const fetchPitchlistContactInfo = cache(
  async (pitchlistID: UUID): Promise<typeof PitchlistContactInfoType> => {
    const { data, error } = await supabase
      .from("pitchlist_contact_info_view")
      .select("*")
      .eq("id", pitchlistID)
      .limit(1);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchPitchlistContactInfo. Error: ${error}`
      );
    }

    return data[0];
  }
);

/**
 * Fetch pitchlist users
 * @param {UUID} pitchlistID
 * @returns {Promise<Array<typeof PitchlistUsersType>>}
 * @throws {Error}
 **/
export const fetchPitchlistUsers = cache(
  async (pitchlistID: UUID): Promise<Array<typeof PitchlistUsersType>> => {
    const { data, error } = await supabase
      .from("pitchlist_users_view")
      .select("*")
      .eq("pitchlist_id", pitchlistID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchPitchlistUsers. Error: ${error}`
      );
    }

    return data;
  }
);

/**
 * Fetch campaign page permission
 * @param {UUID} talentOrManagerId - ID of the talent or manager
 * @param {UUID} pitchlistId - ID of the campaign
 * @returns {Promise<PagePermissionType>}
 */
export const fetchPitchlistPagePermission = cache(
  async ({
    talentId,
    managerId,
    agencyId,
    pitchlistId,
  }: {
    talentId?: UUID | null;
    managerId?: UUID | null;
    agencyId?: UUID | null;
    pitchlistId: UUID;
  }): Promise<PagePermissionType> => {
    const { data: pitchlist, error } = await supabase
      .from("pitchlist")
      .select("agency_id")
      .eq("id", pitchlistId)
      .single();

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchTalentPendingCampaigns. Error: ${error}`
      );
    }

    if (talentId) {
      const { data: influencer } = await supabase
        .from("influencer_agency_relation")
        .select("agency_id")
        .eq("influencer_id", talentId)
        .single();

      if (pitchlist.agency_id === influencer?.agency_id) {
        return PAGE_PERMISSIONS.ADMIN;
      }
    }

    if (managerId) {
      const { data: manager } = await supabase
        .from("manager")
        .select("agency_id")
        .eq("id", managerId)
        .single();

      if (pitchlist.agency_id === manager?.agency_id) {
        return PAGE_PERMISSIONS.ADMIN;
      }
    }

    return PAGE_PERMISSIONS.GUEST;
  }
);
