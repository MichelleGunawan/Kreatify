import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { Database } from "@/utils/supabase/js/database.types";
import { UUID } from "crypto";

let InfluencerAgencyInfoType: Database["public"]["Views"]["influencer_agency_info_view"]["Row"];
let ManagerAgencyInfoType: Database["public"]["Views"]["manager_agency_info_view"]["Row"];
let AgencyLogoInfoType: Database["public"]["Views"]["agency_logo_view"]["Row"];

/**
 * Fetch agency info when influencer is logged in
 * @param {UUID} useryID
 * @returns {Promise<typeof AgencyInfoType>}
 * @throws {Error}
 **/
export const fetchInfluencerAgencyInfo = cache(
  async (talentID: UUID): Promise<Array<typeof InfluencerAgencyInfoType>> => {
    const { data, error } = await supabase
      .from("influencer_agency_info_view")
      .select("*")
      .eq("influencer_id", talentID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchAgencyInfo. Error: ${error}`
      );
    }

    return data || [];
  }
);

/**
 * Fetch agency info when manager is logged in
 * @param {UUID} useryID
 * @returns {Promise<typeof AgencyInfoType>}
 * @throws {Error}
 **/
export const fetchManagerAgencyInfo = cache(
  async (managerID: UUID): Promise<Array<typeof ManagerAgencyInfoType>> => {
    const { data, error } = await supabase
      .from("manager_agency_info_view")
      .select("*")
      .eq("manager_id", managerID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchAgencyInfo. Error: ${error}`
      );
    }

    return data || [];
  }
);

/**
 * Fetch agency logo
 * @param {UUID} agencyID
 * @returns {Promise<typeof AgencyLogoInfoType>}
 * @throws {Error}
 **/
export const fetchAgencyLogoInfo = cache(
  async (agencyID: UUID): Promise<typeof AgencyLogoInfoType> => {
    const { data, error } = await supabase
      .from("agency_logo_view")
      .select("*")
      .eq("id", agencyID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchAgencyInfo. Error: ${error}`
      );
    }

    return data[0] || {};
  }
);

/**
 * Fetch agency commission structure
 * @param {UUID} agencyID
 * @returns {Promise<string>}
 * @throws {Error}
 **/
export const fetchAgencyCommisionInfo = cache(
  async (
    agencyID: UUID
  ): Promise<{
    manager_commission: number | null;
    agency_commission: number | null;
    influencer_commission: number | null;
  }> => {
    const { data, error } = await supabase
      .from("agency")
      .select("manager_commission, agency_commission, influencer_commission")
      .eq("id", agencyID);

    if (error) {
      throw new Error(
        `${API_BACKEND_ERROR_MESSAGE} fetchAgencyInfo. Error: ${error}`
      );
    }

    const result = data[0];

    // Ensure the result contains the required fields
    return {
      manager_commission: result.manager_commission ?? null,
      agency_commission: result.agency_commission ?? null,
      influencer_commission: result.influencer_commission ?? null,
    };
  }
);
