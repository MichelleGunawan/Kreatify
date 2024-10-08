import { UserPermissionType } from "@/types/enum.types";
import { USER_PERMISSIONS } from "@/utils/constants";
import { useGlobalContext } from "@/context";

function usePermission(permissionTier: UserPermissionType) {
  const { userPermission } = useGlobalContext();

  // Early return if either permission is not set
  if (!userPermission || !permissionTier) {
    // console.warn("Permissions are undefined or null");
    return false;
  }

  // Handle Tier comparisons
  if (
    permissionTier === USER_PERMISSIONS.TIER_I1 &&
    userPermission === USER_PERMISSIONS.TIER_I1
  ) {
    return true;
  }

  if (
    permissionTier === USER_PERMISSIONS.TIER_M1 &&
    userPermission === USER_PERMISSIONS.TIER_M1
  ) {
    return true;
  }

  if (
    permissionTier === USER_PERMISSIONS.TIER_M2 &&
    (userPermission === USER_PERMISSIONS.TIER_M2 ||
      userPermission === USER_PERMISSIONS.TIER_M1)
  ) {
    return true;
  }

  if (
    permissionTier === USER_PERMISSIONS.TIER_M3 &&
    (userPermission === USER_PERMISSIONS.TIER_M3 ||
      userPermission === USER_PERMISSIONS.TIER_M2 ||
      userPermission === USER_PERMISSIONS.TIER_M1)
  ) {
    return true;
  }

  // If none of the conditions match, return false
  return false;
}

export default usePermission;
