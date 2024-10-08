import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { Database } from "@/utils/supabase/js/database.types";

type OnboardInviteType = Database["public"]["Tables"]["onboard_invite"]["Row"];

export const fetchOnboardInvite = cache(
  async (inviteID: string): Promise<OnboardInviteType> => {
    const { data, error } = await supabase
      .from("onboard_invite")
      .select("*")
      .eq("id", inviteID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchOnboardInvite. Error: ${error}`
      );
    }
    return data[0] || {};
  }
);
