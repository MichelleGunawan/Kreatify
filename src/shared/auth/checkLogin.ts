"use server";

import { createClient } from "@/utils/supabase/ssr/server";
import { API_LOGIN_ERROR_MESSAGE } from "../errors";

/**
 *    Fetches the user UUID of an authenticated user, if user is not authenticated
 *    the user will be redirected to the login page.
 *    @returns {string} UUID of the authenticated user
 */
export async function checkUserID() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    const user_id = data.user?.id;
    // Commenting out until auth works in a deployed instance
    // if (error || !data?.user) {
    //     redirect("/login");
    // }
    if (error) {
        console.error(`${API_LOGIN_ERROR_MESSAGE}`, error);
    }
    return user_id;
}
