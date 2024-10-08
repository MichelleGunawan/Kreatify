import { agencyData } from "@/data/AgencyData";
import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { InfluencerRolesType } from "@/types/user.type";
import { PagePermissionType } from "@/types/utils.type";
import {
  INFLUENCER_ROLES,
  PAGE_PERMISSIONS,
  USER_PERMISSIONS,
} from "@/utils/constants";
import { convertToUUID } from "@/utils/functions/converter.functions";
import { supabase } from "@/utils/supabase/js/client";
import { UUID } from "crypto";
import { cache } from "react";

export const getInfluencerDataFromEmail = cache(
  async ({
    email,
  }: {
    email: string;
  }): Promise<{
    userID: UUID | null;
    influencerID: UUID | null;
    agencyID: UUID | null;
    userRole: InfluencerRolesType | null;
  }> => {
    try {
      // First, get the user's id based on the email
      const { data: userData, error: userError } = await supabase
        .from("user")
        .select("id")
        .eq("email", email)
        .limit(1);

      const userId = userData?.[0]?.id;

      if (!userId) {
        throw new Error("User not found");
      }
      if (userError) {
        throw userError;
      }

      // Then, use the user_id to get the influencer's id
      const { data: influencerData, error: influencerError } = await supabase
        .from("influencer")
        .select("id, role")
        .eq("user_id", userId)
        .single();

      if (influencerError) {
        throw influencerError;
      }

      if (!influencerData) {
        throw new Error("Influencer not found");
      }

      // Then, use the user_id to get the influencer's id
      const { data: agency, error: agencyError } = await supabase
        .from("influencer_agency_relation")
        .select("agency_id")
        .eq("influencer_id", influencerData?.id)
        .single();

      // Return both userID and influencerID
      return {
        userID: convertToUUID(userId),
        influencerID: convertToUUID(influencerData?.id),
        agencyID: convertToUUID(agency?.agency_id),
        userRole: (influencerData?.role as InfluencerRolesType) || null,
      };
    } catch (error) {
      return {
        userID: null,
        influencerID: null,
        agencyID: null,
        userRole: null,
      };
    }
  }
);

export const getInviteInfluencerError = cache(
  async ({
    email,
    agencyID,
    role,
  }: {
    email: string;
    agencyID: UUID;
    role: string;
  }): Promise<string> => {
    try {
      // Check if user exists
      const { data: userData, error: userError } = await supabase
        .from("user")
        .select("id")
        .eq("email", email)
        .limit(1);

      const userId = userData?.[0]?.id || null;

      // Return no error if user does not exist
      if (!userId) {
        return "";
      }

      // Check if email is a manager
      const { data: managerData, error: managerError } = await supabase
        .from("manager")
        .select("id")
        .eq("user_id", userId)
        .single();

      const managerId = managerData?.id || null;

      if (managerId) {
        return "User is already a manager.";
      }

      // Check for errors and manage the logic
      if (managerError) {
        console.warn("No manager found");
      }

      // Check if influencer exists
      const { data: influencerData, error: influencerError } = await supabase
        .from("influencer")
        .select("id, role")
        .eq("user_id", userId)
        .single();

      const influencerId = influencerData?.id || null;

      // Return no error if influencer does not exist
      if (!influencerId) {
        return "";
      }

      // Check if influencer is already in agency
      const { data: influencerAgencyData, error: influencerAgencyError } =
        await supabase
          .from("influencer_agency_relation")
          .select("agency_id")
          .eq("influencer_id", influencerId)
          .single();

      const agencyId = influencerAgencyData?.agency_id || null;

      // Return no error if influencer is not a part of any agency
      if (!agencyId) {
        return "";
      }

      // If agency is trying to change user's role
      if (agencyID === agencyId && influencerData?.role !== role) {
        return "User is already a part of this agency. Please edit user role in user's profile.";
      }

      if (agencyID === agencyId) {
        return "User is already a part of this agency";
      }

      // If user is already an exclusive influencer
      if (
        influencerData?.role === INFLUENCER_ROLES.EXCLUSIVE &&
        agencyId !== agencyID
      ) {
        return "User is already an exclusive influencer";
      }

      return "";
    } catch (error) {
      return `Unable to invite user ${error}`;
    }
  }
);

/**
 * Fetch campaign page permission
 * @param {UUID} talentOrManagerId - ID of the talent or manager
 * @param {UUID} pitchlistId - ID of the campaign
 * @returns {Promise<PagePermissionType>}
 */
export const fetchInfluencerProfilePagePermission = cache(
  async ({
    managerId,
    profileId,
  }: {
    managerId?: UUID | null;
    profileId: UUID;
  }): Promise<PagePermissionType> => {
    const { data: agency, error: agencyError } = await supabase
      .from("influencer_agency_relation")
      .select("agency_id")
      .eq("influencer_id", profileId)
      .single();

    const agencyId = agency?.agency_id;
    if (!agencyId) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchTalentPendingCampaigns. Error: ${agencyError}`
      );
    }

    const { data: manager, error: managerError } = await supabase
      .from("manager")
      .select("id")
      .eq("agency_id", agencyId);

    if (manager && managerId && manager?.length > 0) {
      if (manager.some((manager) => manager.id === managerId)) {
        return PAGE_PERMISSIONS.ADMIN;
      }
    }

    if (managerError) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchManager. Error: ${managerError}`
      );
    }

    // // Only influencer's manager can edit their profile
    // const { data: profile, error } = await supabase
    //   .from("influencer_manager_relation")
    //   .select("manager_id")
    //   .eq("influencer_id", profileId);

    // if (error) {
    //   throw new Error(
    //     `${API_BACKEND_ERROR_MESSAGE} fetchTalentPendingCampaigns. Error: ${error}`
    //   );
    // }

    // if (managerId) {
    //   if (profile.some((manager) => manager.manager_id === managerId)) {
    //     return PAGE_PERMISSIONS.ADMIN;
    //   }
    // }

    return PAGE_PERMISSIONS.GUEST;
  }
);
