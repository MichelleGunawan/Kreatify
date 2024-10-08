import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";

//Type import
import { InfluencerRolesType } from "@/types/user.type";
import {
  PaymentOptionsDBType,
  SocialPlatformsDBType,
} from "@/types/enum.types";
import { UUID } from "crypto";
import { InfluencerOnboardingInfoType } from "@/types/user.onboarding.types";
import { CampaignMatchingAnswerType } from "@/types/campaignMatching.type";
import { upsertCampaignMatchingAnswers } from "../campaignMatching/post_actions";
import { INFLUENCER_ROLES } from "@/utils/constants";
import { convertToUUID } from "@/utils/functions/converter.functions";

export async function createInfluencer({
  inviteID,
  agencyID,
  userData,
}: {
  inviteID: UUID | null;
  agencyID: UUID | null;
  userData: InfluencerOnboardingInfoType;
}): Promise<{
  userId: UUID | null;
  influencerId: UUID | null;
}> {
  if (!inviteID || !agencyID) {
    throw new Error(API_BACKEND_ERROR_MESSAGE);
  }

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
    payment_info,
    socials,
    campaignMatchingAnswers,
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
    throw new Error("Unable to sign up. Error:", authError);
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
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email.toLowerCase(),

      avatar_url: img,
      birth_date: dateOfBirth,
      address: address,
      state: state,
      city: city,
      country: country,
      gender: gender,
      sexuality: sexuality,
      ethnicity: ethnicities,
      permission: "Influencer",
    })
    .eq("id", userId)
    .select("id")
    .single();

  // Handle errors in user insertion
  if (userError) {
    console.error("Error creating user:", userError);
    throw userError;
  }

  // Insert into the 'influencer' table
  const { data: influencer, error: influencerError } = await supabase
    .from("influencer")
    .insert([
      {
        user_id: user.id,
        role: role as InfluencerRolesType,
      },
    ])
    .select("id")
    .single();

  // Handle errors in influencer insertion
  if (influencerError) {
    console.error("Error creating influencer:", influencerError);
    throw influencerError;
  }

  if (!influencer?.id) {
    throw new Error(API_BACKEND_ERROR_MESSAGE);
  }

  // Add influencer to agency
  const { error: relationError } = await supabase
    .from("influencer_agency_relation")
    .insert([
      {
        influencer_id: influencer.id,
        agency_id: agencyID,
      },
    ]);

  if (relationError) {
    console.error("Error creating influencer-agency relation:", relationError);
    throw relationError;
  }

  const validPayments = payment_info.filter((payment) => payment.type !== "");

  // Insert into the 'payment_info' table
  for (const payment of validPayments) {
    const { error: paymentError } = await supabase
      .from("influencer_payment_info")
      .insert([
        {
          influencer_id: influencer.id,
          ...payment,
          type: payment.type as PaymentOptionsDBType,
        },
      ]);

    if (paymentError) {
      console.error("Error inserting payment:", paymentError);
      throw paymentError;
    }
  }

  // Insert into the 'socials' table
  for (const social of socials) {
    const { error: socialError } = await supabase.from("social").insert([
      {
        influencer_id: influencer.id,
        platform: social.platform as SocialPlatformsDBType,
        handle: social.handle,
      },
    ]);

    if (socialError) {
      console.error("Error inserting social:", socialError);
      throw socialError;
    }
  }

  upsertCampaignMatchingAnswers({
    influencerID: convertToUUID(influencer.id),
    campaignMatchingAnswers,
  });

  // Delete invite
  const { error: inviteError } = await supabase
    .from("onboard_invite")
    .delete()
    .eq("id", inviteID);

  if (inviteError) {
    console.error("Error deleting invite:", inviteError);
    throw inviteError;
  }

  return {
    influencerId: convertToUUID(influencer.id),
    userId: convertToUUID(user.id),
  };
}

export async function updateNonexclusiveInfluencer({
  inviteID,
  agencyID,
  userID,
  talentID,
  campaignMatchingAnswers,
}: {
  inviteID: UUID | null;
  agencyID: UUID | null;
  userID: UUID;
  talentID: UUID;
  campaignMatchingAnswers: CampaignMatchingAnswerType[];
}): Promise<{
  userId: UUID | null;
  influencerId: UUID | null;
}> {
  if (!inviteID || !agencyID) {
    throw new Error(API_BACKEND_ERROR_MESSAGE);
  }
  // Insert into the 'influencer' table
  const { data: influencer, error: influencerError } = await supabase
    .from("influencer")
    .insert([
      {
        user_id: userID,
        role: INFLUENCER_ROLES.NONEXCLUSIVE as InfluencerRolesType,
      },
    ])
    .select("id")
    .single();

  // Handle errors in influencer insertion
  if (influencerError) {
    console.error("Error creating influencer:", influencerError);
    throw influencerError;
  }

  if (!influencer?.id) {
    throw new Error(API_BACKEND_ERROR_MESSAGE);
  }

  // Add influencer to agency
  const { error: relationError } = await supabase
    .from("influencer_agency_relation")
    .insert([
      {
        influencer_id: influencer.id,
        agency_id: agencyID,
      },
    ]);

  if (relationError) {
    console.error("Error creating influencer-agency relation:", relationError);
    throw relationError;
  }

  upsertCampaignMatchingAnswers({
    influencerID: convertToUUID(talentID),
    campaignMatchingAnswers,
  });

  // Delete invite
  const { error: inviteError } = await supabase
    .from("onboard_invite")
    .delete()
    .eq("id", inviteID);

  if (inviteError) {
    console.error("Error deleting invite:", inviteError);
    throw inviteError;
  }

  return {
    influencerId: convertToUUID(talentID),
    userId: convertToUUID(userID),
  };
}

/**
 * Edits the profile info of an influencer
 * @param {UUID} talentID
 * @param {string} profileImage
 * @param {string[]} niches
 */
export const editInfluencer = cache(
  async ({
    talentID,
    profileImage,
    niches,
    bio,
    role,
  }: {
    talentID: UUID | null;
    profileImage: string;
    niches?: string[];
    bio?: string;
    role: string;
  }): Promise<InfluencerEditProfileType> => {
    if (!talentID) {
      throw new Error("Missing user ID or talent ID");
    }

    const { data, error } = await supabase
      .from("influencer")
      .update({
        niches,
        bio,
        role: role as InfluencerRolesType,
      })
      .eq("id", talentID)
      .select("id, niches, bio") // Return the updated row
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
        .eq("id", talentID)
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

    return (data[0] as InfluencerEditProfileType) || {};
  }
);

interface InfluencerEditProfileType {
  id: UUID;
  niches: string[];
  bio: string;
  notes: string;
}
