import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { Database } from "@/utils/supabase/js/database.types";
import { UUID } from "crypto";
import { PAGE_PERMISSIONS } from "@/utils/constants";
import { PagePermissionType } from "@/types/utils.type";

/**
 * Fetch campaign page permission
 * @param {UUID} talentOrManagerId - ID of the talent or manager
 * @param {UUID} campaignId - ID of the campaign
 * @returns {Promise<PagePermissionType>}
 */
export const fetchCampaignPagePermission = cache(
  async ({
    talentOrManagerId,
    campaignId,
    agencyId,
  }: {
    talentOrManagerId: UUID;
    campaignId: UUID;
    agencyId: UUID | null;
  }): Promise<PagePermissionType> => {
    const { data, error } = await supabase
      .from("campaign")
      .select("influencer, talent_manager, campaign_manager, agency_id")
      .eq("id", campaignId)
      .single();

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchTalentPendingCampaigns. Error: ${error}`
      );
    }

    if (
      data?.influencer === talentOrManagerId ||
      data?.talent_manager === talentOrManagerId ||
      data?.campaign_manager === talentOrManagerId ||
      (agencyId && data?.agency_id === agencyId)
    ) {
      return PAGE_PERMISSIONS.ADMIN;
    }

    return PAGE_PERMISSIONS.GUEST;
  }
);
