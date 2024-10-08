import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { UUID } from "crypto";
import { cache } from "react";

/**
 * Fetches earnings for the current month for a specific talent ID
 * @param talentId UUID of the talent
 * @returns int of earnings for the current month
 */
export const fetchTalentMonthEarnings = cache(
  async (talentId: UUID): Promise<number> => {
    const { data, error } = await supabase.rpc(
      "get_earnings_current_month_influencer",
      {
        influencer_id: talentId,
      }
    );

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchTalentMonthEarnings. Error: ${error.message}`
      );
    }

    return data;
  }
);

/**
 * Fetches all time earnings for a specific talent ID
 * @param talentId UUID of the talent
 * @returns int of total earnings for the talent
 */
export const fetchTalentAlltimeEarnings = cache(
  async (talentId: UUID): Promise<number> => {
    const { data, error } = await supabase.rpc(
      "get_earnings_alltime_influencer",
      {
        influencer_id: talentId,
      }
    );

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchTalentAlltimeEarnings. Error: ${error.message}`
      );
    }

    return data;
  }
);

/**
 * Fetches monthly earnings for a specific talent ID
 * @param talentId UUID of the talent
 * @returns array of earnings each month the talent
 */
export const fetchTalentMonthlyEarnings = cache(
  async (talentId: UUID, year: number): Promise<number[]> => {
    const { data, error } = await supabase.rpc(
      "get_earnings_monthly_influencer",
      {
        influencer_id: talentId,
        year: year,
      }
    );

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchTalentMonthlyEarnings. Error: ${error.message}`
      );
    }

    return data as number[];
  }
);
