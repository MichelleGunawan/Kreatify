import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";
//Type import
import { ManagerRolesType } from "@/types/user.type";
import { UUID } from "crypto";
import { ManagerOnboardingInfoType } from "@/types/user.onboarding.types";
import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { convertToUUID } from "@/utils/functions/converter.functions";

/**
 * Create a new manager account.
 * @param {Object} inviteID - The ID of the invite to be deleted.
 * @param {UUID} agency_id - The ID of the agency to be associated with the manager.
 * @param {ManagerData} userData - The data of the manager to be created.
 * @returns {Promise<{ userId: UUID; managerId: UUID }>} - A promise that resolves with an object containing the user ID and manager ID.
 * @throws {Error} - If the password does not match the confirm password.
 * @throws {Error} - If there is an error signing up the user.
 * @throws {Error} - If there is an error inserting the user into the 'user' table.
 * @throws {Error} - If there is an error inserting the manager into the 'manager' table.
 * @throws {Error} - If there is an error deleting the invite.
 */
export const createManager = cache(
  async ({
    inviteID,
    agency_id,
    userData,
  }: {
    inviteID?: UUID | null;
    agency_id: UUID | null;
    userData: ManagerOnboardingInfoType;
  }): Promise<{
    userId: UUID | null;
    managerId: UUID | null;
  }> => {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword,
      img,
      dateOfBirth,
      address,
      state,
      city,
      country,
      gender,
      sexuality,
      ethnicities,
      role,
    } = userData;

    // Check if password matches confirmPassword
    if (password !== confirmPassword) {
      throw new Error("Password and confirm password do not match.");
    }

    // Sign up the user
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    // Check for sign-up errors
    if (authError) {
      console.error(`Sign up failed: ${authError.message}`);
      throw new Error(authError.message);
    }

    // Extract user ID
    const userId = authUser?.user?.id;

    // Validate user ID
    if (!userId) {
      throw new Error("User ID not returned after sign up.");
    }

    // Insert into the 'user' table
    const { data: user, error: userError } = await supabase
      .from("user")
      .update({
        // id: userId,
        avatar_url: img,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        email: email.toLowerCase(),
        birth_date: dateOfBirth,
        address: address,
        state: state,
        city: city,
        country: country,
        gender: gender,
        sexuality: sexuality,
        ethnicity: ethnicities,
        permission: inviteID ? "Manager" : "Owner",
      })
      .eq("id", userId)
      .select("id")
      .single();

    // Handle errors in user insertion
    if (userError) {
      console.error("Error creating user:", userError);
      throw userError;
    }

    // Insert into the 'manager' table
    const { data: manager, error: managerError } = await supabase
      .from("manager")
      .insert([
        {
          user_id: user.id,
          role: role as ManagerRolesType,
          agency_id: agency_id,
        },
      ])
      .select("id")
      .single();

    // Handle errors in manager insertion
    if (managerError) {
      console.error("Error creating manager:", managerError);
      throw managerError;
    }

    // Delete invite
    if (inviteID) {
      const { error: inviteError } = await supabase
        .from("onboard_invite")
        .delete()
        .eq("id", inviteID);

      if (inviteError) {
        console.error("Error deleting invite:", inviteError);
        throw inviteError;
      }
    }

    // Return both userId and managerId
    return {
      userId: convertToUUID(user.id),
      managerId: convertToUUID(manager.id),
    };
  }
);

/**
 * Creates an owner account.
 * @param {Object} userData - The data of the manager to be created.
 * @returns {Promise<{ userId: UUID; managerId: UUID; agencyId: UUID }>} - A promise that resolves with an object containing the user ID, manager ID, and agency ID.
 * @throws {Error} - If there is an error creating the agency.
 * @throws {Error} - If there is an error creating the manager.
 */
export const createOwner = cache(
  async ({
    userData,
  }: {
    userData: ManagerOnboardingInfoType;
  }): Promise<{
    userId: UUID | null;
    managerId: UUID | null;
    agencyId: UUID | null;
  }> => {
    // Create an agency with all fields set to null (except for id)
    const { data: agency, error: agencyError } = await supabase
      .from("agency")
      .insert([{ payment_options: [] }]) // Insert an empty agency (all fields null except id)
      .select("id")
      .single();

    if (agencyError) {
      console.error("Error creating agency:", agencyError);
      throw agencyError;
    }

    // First, create the manager and get the user ID
    const { userId, managerId } = await createManager({
      agency_id: convertToUUID(agency.id),
      userData,
    });

    const agencyId = agency.id;

    return {
      userId,
      managerId,
      agencyId: convertToUUID(agencyId),
    };
  }
);

export const getInviteManagerError = cache(
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

      // Check if influencer exists
      const { data: influencerData, error: influencerError } = await supabase
        .from("influencer")
        .select("id")
        .eq("user_id", userId)
        .single();

      const influencerId = influencerData?.id || null;

      if (influencerId) {
        return "User is already a creator.";
      }

      // Check for errors and manage the logic
      if (influencerError) {
        console.warn("No creator found");
      }

      // Check if manager exists
      const { data: managerData, error: managerError } = await supabase
        .from("manager")
        .select("id, role, agency_id")
        .eq("user_id", userId)
        .single();

      const managerId = managerData?.id || null;
      const agencyId = managerData?.agency_id || null;

      // Return no error if manager does not exist
      if (!managerId) {
        return "";
      }

      if (!agencyId) {
        return "";
      }

      // If agency is trying to change user's role
      if (agencyID === agencyId && managerData?.role !== role) {
        return "User is already a part of this agency. Please edit user role in user's profile.";
      }

      if (agencyID === agencyId) {
        return "User is already a part of this agency";
      }

      // If user is already an owner
      if (managerData?.role === "Owner" && agencyId !== agencyID) {
        return "User is already an exclusive influencer";
      }

      return "";
    } catch (error) {
      return `Unable to invite user ${error}`;
    }
  }
);

/**
 * Edits the profile info of an influencer
 * @param {UUID} talentID
 * @param {string} profileImage
 * @param {string[]} niches
 */
export const editManager = cache(
  async ({
    managerID,
    profileImage,
    bio,
    role,
  }: {
    managerID: UUID | null;
    profileImage?: string;
    bio?: string;
    role: string;
  }): Promise<null> => {
    if (!managerID) {
      throw new Error("Manager ID is required");
    }

    const { data, error } = await supabase
      .from("manager")
      .update({
        role: role as ManagerRolesType,
      })
      .eq("id", managerID)
      .select("id") // Return the updated row
      .order("id", { ascending: true }) // Specify an order
      .limit(1);

    if (error) {
      console.error("Error updating influencer:", error);
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} editInfluencerProfile. Error: ${JSON.stringify(
          error
        )}`
      );
    }

    if (profileImage) {
      const { data: influencerData, error: influencerError } = await supabase
        .from("influencer")
        .select("user_id")
        .eq("id", managerID)
        .limit(1);

      if (influencerError || !influencerData || influencerData.length === 0) {
        console.error("Error fetching influencer data:", influencerError);
        throw new Error(
          `${API_BACKEND_ERROR_MESSAGE} editInfluencerProfile. Error: ${
            influencerError
              ? JSON.stringify(influencerError)
              : "Influencer not found"
          }`
        );
      }

      const userID = influencerData[0].user_id;
      if (userID) {
        const { error: avatarError } = await supabase
          .from("user")
          .update({
            avatar_url: profileImage,
          })
          .eq("id", userID);

        if (avatarError) {
          console.error("Error updating user avatar:", avatarError);
          throw new Error(
            `${API_BACKEND_ERROR_MESSAGE} editInfluencerProfile. Error: ${JSON.stringify(
              avatarError
            )}`
          );
        }
      }
    }

    return null;
  }
);
