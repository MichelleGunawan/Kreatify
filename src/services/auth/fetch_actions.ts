import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { UserPermissionType } from "@/types/enum.types";
import { convertToUUID } from "@/utils/functions/converter.functions";
import { supabase } from "@/utils/supabase/js/client";
import { UUID } from "crypto";
import { cache } from "react";

export const loginUser = cache(
  async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{
    firstName: string | null;
    lastName: string | null;
    userId: UUID | null;
    influencerId: UUID | null;
    managerId: UUID | null;
    agencyId: UUID | null;
    userPermission: UserPermissionType | null;
  }> => {
    // Step 1: Authenticate the user with Supabase auth
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError || !authData.user) {
      console.error("Authentication failed:", authError?.message);
      return {
        firstName: null,
        lastName: null,
        userId: null,
        influencerId: null,
        managerId: null,
        agencyId: null,
        userPermission: null,
      };
    }

    const userId = convertToUUID(authData?.user?.id);

    const userData = await getUserData({ userId });

    return userData;
  }
);

export const fetchSession = cache(
  async (): Promise<{
    firstName: string | null;
    lastName: string | null;
    userId: UUID | null;
    influencerId: UUID | null;
    managerId: UUID | null;
    agencyId: UUID | null;
    userPermission: UserPermissionType | null;
  }> => {
    // Step 1: Check if the user is logged in
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !sessionData?.session) {
      console.error("User is not logged in:", sessionError?.message);
      return {
        firstName: null,
        lastName: null,
        userId: null,
        influencerId: null,
        managerId: null,
        agencyId: null,
        userPermission: null,
      };
    }

    const userId = convertToUUID(sessionData?.session?.user?.id);

    const userData = await getUserData({ userId });

    return userData;
  }
);

/**
 * Fetches managers associated with the given agency ID
 * @param {UUID} agencyId - Agency ID
 * @returns {Promise<ManagerByAgencyType>} - An array of manager objects
 */
export const getUserData = cache(
  async ({
    userId,
  }: {
    userId: UUID | null;
  }): Promise<{
    firstName: string | null;
    lastName: string | null;
    userId: UUID | null;
    influencerId: UUID | null;
    managerId: UUID | null;
    agencyId: UUID | null;
    userPermission: UserPermissionType | null;
  }> => {
    if (!userId) {
      console.error("Error fetching user data");
      return {
        firstName: null,
        lastName: null,
        userId: null,
        influencerId: null,
        managerId: null,
        agencyId: null,
        userPermission: null,
      };
    }

    // Fetch additional user auth details
    const { data: userAuthDetails, error: userAuthError } = await supabase
      .from("user_auth_details")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (userAuthError) {
      // Proper error handling if fetching auth details fails
      throw new Error(
        `Failed to fetch user auth data. Error: ${userAuthError.message}`
      );
    }

    // Prepare the final user auth data
    const userAuthData = {
      firstName: userAuthDetails?.first_name as string,
      lastName: userAuthDetails?.last_name as string,
      userId: convertToUUID(userAuthDetails?.user_id),
      influencerId: convertToUUID(userAuthDetails?.influencer_id),
      managerId: convertToUUID(userAuthDetails?.manager_id),
      agencyId: convertToUUID(userAuthDetails?.agency_id),
      userPermission:
        (userAuthDetails?.user_permission as UserPermissionType) ?? null,
    };

    return userAuthData;
  }
);

/**
 * Checks if a user exists by their email.
 * @param {string} email
 * @returns {Promise<boolean>}
 * @throws {Error} If the database query fails.
 */
export async function isExistingEmail(email: string): Promise<boolean> {
  // Query the database for the user by email
  const { data: existingUser, error: fetchError } = await supabase
    .from("user") // make sure this table name is correct
    .select("*")
    .eq("email", email)
    .single(); // single ensures only one result is returned

  if (fetchError) {
    return false; // You can adjust the behavior here if you want to throw or handle the error differently
  }

  return !!existingUser; // This ensures we return true if a user is found
}
