import {
  PaymentOptionsDBType,
  SocialPlatformsDBType,
} from "@/types/enum.types";
import {
  isValidPaymentOption,
  isValidSocialPlatform,
  isValidUUID,
} from "./validation.functions";
import { SocialDBType, SocialInputType } from "@/types/social.type";
import { UUID } from "crypto";

// Convert any type to UUID, returning null if invalid
export const convertToUUID = (value: any): UUID | null => {
  if (isValidUUID(value)) {
    return value as UUID;
  }
  return null;
};

export const convertToUUIDArray = (values: any[]): UUID[] => {
  return values
    .filter(isValidUUID) // Filter to keep only valid UUIDs
    .map((value) => value as UUID); // Cast the filtered values to UUID
};

// Convert any type to number, returning null if conversion fails
// Accepts negative number
export const convertToNumber = (value: any): number | null => {
  const parsed = Number(value);
  return isNaN(parsed) ? null : parsed;
};

// Convert and filter the payment options
export const convertToPaymentOptionDBArray = (
  payments: any[]
): PaymentOptionsDBType[] => {
  return Array.from(new Set(payments)).filter(isValidPaymentOption); // Use filter with the type guard
};

// Converter function to transform SocialInput[] to SocialDB[]
export const convertToSocialDBArray = (
  socials: SocialInputType[]
): SocialDBType[] => {
  return socials
    .filter((social) => isValidSocialPlatform(social.platform))
    .filter((social) => social.id === null || isValidUUID(social.id))
    .map((social) => ({
      id: social?.id || null,
      platform: social?.platform as SocialPlatformsDBType,
      handle: social.handle,
    }));
};
