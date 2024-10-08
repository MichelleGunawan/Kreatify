import { UserPermissionType } from "@/types/enum.types";

export const getSortOptions = (
  campaignStatus: string,
  userPermission: UserPermissionType | null
) => {
  if (campaignStatus === "pending") {
    if (userPermission === "Manager") {
      return ["Name", "Campaign Rate", "Confirm By"];
    }
    return ["Name", "My Payout", "Confirm By"];
  }
  if (campaignStatus === "ongoing") {
    return ["Name", "Next Milestone", "Progress"];
  }
  if (campaignStatus === "completed") {
    if (userPermission === "Manager") {
      return ["Name", "Campaign Rate", "Payment Status"];
    }
    return ["Name", "My Payout", "Payment Status"];
  }
  if (campaignStatus === "rejected") {
    if (userPermission === "Manager") {
      return ["Name", "Campaign Rate", "Date Rejected"];
    }
    return ["Name", "My Payout", "Date Rejected"];
  }
  return [];
};
