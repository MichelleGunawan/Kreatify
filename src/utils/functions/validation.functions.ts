import {
  PaymentOptionsDBType,
  SocialPlatformsDBType,
} from "@/types/enum.types";
import bcrypt from "bcryptjs";

export async function unhashPassword(
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const match = await bcrypt.compare(plainTextPassword, hashedPassword);
  return match;
}

export const getPasswordError = (
  password: string,
  confirmPassword?: string
) => {
  if (!password) {
    return { password: "Password is required", confirmPassword: "" };
  }
  if (password.length < 6) {
    return {
      password: "Password must be at least 6 characters",
      confirmPassword: "",
    };
  }
  if (confirmPassword && password !== confirmPassword) {
    return {
      password: "Passwords do not match",
      confirmPassword: "Passwords do not match",
    };
  }
  return {};
};

export const getEmailError = (email: string): string => {
  if (!email) {
    return "Email is required";
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return "Invalid email address";
  }
  return "";
};

export const getPhoneError = (phone: string): string => {
  if (!phone) {
    return "Phone is required";
  }
  if (!/^\d{10}$/.test(phone)) {
    return "Invalid phone number";
  }
  return "";
};

export const getPaymentFormError = (payments: string[]): string => {
  const filteredPayments = payments.filter((payment) => payment !== "");
  if (filteredPayments.length < 1) {
    return "At least one payment method is required";
  }
  return "";
};

export const getCommissionError = (
  agencyCommission: number | null,
  influencerCommission: number | null,
  managerCommission: number | null
): string => {
  const agencyCommissionNumber = agencyCommission || 0;
  const influencerCommissionNumber = influencerCommission || 0;
  const managerCommissionNumber = managerCommission || 0;
  // if (!agencyCommission) {
  //   return "Agency Commission is required";
  // }
  // if (!influencerCommission) {
  //   return "Influencer Commission is required";
  // }
  // if (!managerCommission) {
  //   return "Manager Commission is required";
  // }
  if (influencerCommissionNumber > 100) {
    return "Influencer Commission must be less than 100";
  }
  if (agencyCommissionNumber > 100) {
    return "Agency Commission must be less than 100";
  }
  if (managerCommissionNumber > 100) {
    return "Manager Commission must be less than 100";
  }

  const totalCommission =
    Number(agencyCommissionNumber) +
    Number(influencerCommissionNumber) +
    Number(managerCommissionNumber);

  if (totalCommission !== 100 && totalCommission !== 0) {
    return "Total Commission must equal 100";
  }
  return "";
};

export const isValidUUID = (value?: any): boolean => {
  const valueString = value?.toString();
  // Check if the value is an empty string
  if (valueString?.trim() === "" || !valueString) {
    return false; // An empty string is not a valid UUID
  }

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  // Check against the UUID regex pattern
  return uuidRegex.test(valueString);
};

export const isValidNumber = (id: string): boolean => {
  if (!id) {
    return false;
  }
  const num = Number(id);
  return !isNaN(num) && isFinite(num);
};

export const isDateOlderThanInHours = (
  created_at: string,
  hours: number
): boolean => {
  // Get the current date and time
  const now = new Date();

  // Parse the `created_at` string to a Date object
  const createdDate = new Date(created_at);

  // Calculate the difference in milliseconds between now and created_at
  const diffInMs = now.getTime() - createdDate.getTime();

  // Convert the difference to hours (1 hour = 60 minutes * 60 seconds * 1000 milliseconds)
  const diffInHours = diffInMs / (1000 * 60 * 60);

  // Return true if the difference is more than 24 hours
  return diffInHours > hours;
};

export const hasMissingValue = (values: any[]) => {
  return values.some((value) => !value || value.length < 1);
};

// Type guard to validate payment options
export const isValidPaymentOption = (
  payment: any
): payment is PaymentOptionsDBType => {
  return (
    payment !== null &&
    (payment === "Zelle" ||
      payment === "Paypal" ||
      payment === "Direct Deposit" ||
      payment === "Wise")
  );
};

// Helper function to validate the platform against SocialPlatformsDB
export const isValidSocialPlatform = (
  platform: any
): platform is SocialPlatformsDBType => {
  return (
    platform !== "" &&
    [
      "Tiktok",
      "Instagram",
      "Youtube",
      "X",
      "Twitch",
      "Facebook",
      "Threads",
    ].includes(platform)
  );
};
