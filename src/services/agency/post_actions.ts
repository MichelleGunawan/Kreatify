import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";

//Type import
import { UUID } from "crypto";
import { PaymentOptionsDBType } from "@/types/enum.types";
import { CreateAgencyPropType } from "@/types/agency.onboarding.types";
import { convertToPaymentOptionDBArray } from "@/utils/functions/converter.functions";

/**
 * Update agency information
 * @param {{
 *   agencyID: UUID;
 *   name: string;
 *   logo: string;
 *   bio: string;
 *   website: string;
 *   email: string;
 *   phone: string;
 *   address: string;
 *   city: string;
 *   state: string;
 *   country: string;
 * }} param
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const editAgency = async ({
  agencyID,
  logo,
  name,
  bio,
  website,
  email,
  phone,
  address,
  city,
  state,
  country,
  dateFounded,
  managerCommission,
  agencyCommission,
  influencerCommission,
}: CreateAgencyPropType): Promise<void> => {
  // Check if agency ID is valid
  if (!agencyID) {
    throw new Error("Missing agency ID");
  }
  if (!email) {
    throw new Error("Missing email");
  }

  // Update agency information
  const { error } = await supabase
    .from("agency")
    .update({
      name,
      avatar_url: logo,
      bio: bio || null,
      website_url: website || null,
      email: email?.toLowerCase(),
      phone,
      country,
      state: state || null,
      city: city || null,
      address,
      date_founded: dateFounded || null,

      manager_commission: managerCommission,
      agency_commission: agencyCommission,
      influencer_commission: influencerCommission,
    })
    .eq("id", agencyID);

  // Throw error if there is an error
  if (error) {
    throw new Error(`${API_BACKEND_ERROR_MESSAGE} editAgency. Error: ${error}`);
  }
};

/**
 * Update agency payment options
 * @param {number} agencyID
 * @param {Array<PaymentType>} payment_options
 * @returns {Promise<void>}
 * @throws {Error}
 **/
export const editAgencyPaymentOptions = async ({
  agencyID,
  payment_options,
}: {
  agencyID: UUID | null;
  payment_options: PaymentOptionsDBType[];
}): Promise<void> => {
  if (!agencyID) {
    throw new Error("Missing agency ID");
  }
  // Remove duplicates using a Set
  const uniquePaymentOptions = Array.from(new Set(payment_options));

  if (uniquePaymentOptions.length === 0) {
    return;
  }

  const { data, error: updateError } = await supabase
    .from("agency")
    .update({
      payment_options: convertToPaymentOptionDBArray(uniquePaymentOptions),
    })
    .eq("id", agencyID);

  if (updateError) {
    throw new Error(
      `${API_BACKEND_ERROR_MESSAGE} editAgencyPaymentOptions. Error: ${JSON.stringify(
        updateError
      )}`
    );
  }

  return;
};
