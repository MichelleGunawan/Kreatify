import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { UserPermissionType } from "@/types/enum.types";
import { supabase } from "@/utils/supabase/js/client";
import { UUID } from "crypto";
import { cache } from "react";

/**
 * Logs out the current user.
 *
 * Note: This will only work if there is an active session.
 * If there is no active session, an error message will be logged.
 * If you want to handle the logout action differently, you should
 * either check for an active session before calling this function
 * or handle the error message differently in your application.
 */
export const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
};

/**
 * Changes the current user's password.
 * @param {{ currentPassword: string, newPassword: string }} - An object containing
 * the current password and the new password to be set.
 * @returns {Promise<string>} - A promise that resolves with either an empty string
 * if the password update was successful, or an error message if not.
 * @throws {Error} - If there is no active session, an error will be thrown.
 * Note: This function will sign the user out after updating their password.
 */
export const changePassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}): Promise<string> => {
  // Get the current session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Failed to get session:", sessionError.message);
    return "User not found. Please reload page";
  }

  // Check if session exists
  if (!session) {
    console.error("No active session found.");
    return "User not found. Please reload page";
  }

  const userEmail = session.user.email; // Get the user's email from the session

  if (!userEmail) {
    return "User not found. Please reload page";
  }

  // Sign in with the current password
  const { data: user, error: userError } =
    await supabase.auth.signInWithPassword({
      email: userEmail,
      password: currentPassword,
    });

  if (userError) {
    console.error("Authentication failed:", userError.message);
    return "Incorrect current password. Please try again";
  }

  // Update the password
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return "Password update failed. Please try again";
  } else {
    return "";
  }
};
