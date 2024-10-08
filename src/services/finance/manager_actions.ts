import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { UUID } from "crypto";
import { cache } from "react";

/**
 *  Fetches earnings for the current month for a specific manager ID
 *  @param managerId UUID of the manager
 *  @param year
 *  @returns array of earnings for the current month
 **/
export const fetchManagerMonthlyEarnings = cache(
  async (managerId: UUID, year: number): Promise<number[]> => {
    const { data, error } = await supabase.rpc("get_earnings_monthly_manager", {
      manager_id: managerId,
      year: year,
    });

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchTalentMonthlyEarnings. Error: ${error.message}`
      );
    }

    return data;
  }
);

/**
 * Fetches monthly earnings for a specific agency ID
 * @param agencyId UUID of the agency
 * @param year
 * @returns array of earnings each month the agency
 */
export const fetchAgencyMonthlyEarnings = cache(
  async (agencyId: UUID, year: number): Promise<number[]> => {
    const { data, error } = await supabase.rpc("get_earnings_monthly_agency", {
      agency_id: agencyId,
      year: year,
    });

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchAgencyMonthlyEarnings. Error: ${error.message}`
      );
    }

    return data;
  }
);
