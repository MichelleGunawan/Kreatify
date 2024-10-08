import { UserPermissionType } from "@/types/enum.types";
import { InfluencerRolesType, ManagerRolesType } from "@/types/user.type";
import { PagePermissionType } from "@/types/utils.type";
import { green } from "@mui/material/colors";

// src/constants.tsx
export const NUM_ROWS_PER_PAGE = 10;
export const CLOUDINARY_URL =
  "https://res.cloudinary.com/dqfvqkqhe/image/upload";
export const SUPABASE_BASE_URL = "https://kolntzybgcmbthfpdecb.supabase.co";

// User permissions
export const USER_PERMISSIONS = {
  TIER_M1: "Owner" as UserPermissionType,
  TIER_M2: "Admin" as UserPermissionType,
  TIER_M3: "Manager" as UserPermissionType,
  TIER_I1: "Influencer" as UserPermissionType,
};

// Colors
export const COLORS = {
  PRIMARY: "var(--primary-color, #775fff)",
  ACCENT1: "var(--accent-color-1, #6ad1de)",
  ACCENT3: "var(--accent-color-2, #ff4d67)",

  GREY200: "var(--grey-color-200, #f5f5f5)",
  GREY300: "var(--grey-color-300, #e6e6e6)",
  GREY400: "var(--grey-color-400, #a3a3a3)",
  GREY500: "var(--grey-color-500, #555555)",
  GREY600: "var(--grey-color-600, #3e3e3e)",
  GREY700: "var(--grey-color-700, #2d2d2d)",
  GREY800: "var(--grey-color800, #1e1e1e)",
  BLACK: "#000",
  WHITE: "#fff",

  RED: "var(--red-color, #ff3a36)",
  GREEN: "var(--green-color, #0abc5d)",
  BLUE: "var(--blue-color, #3c5bff)",
  YELLOW: "var(--yellow-color, #ffab05)",
};

export const COLORS_RGB = {
  PRIMARY: "var(--primary-color-rgb, 119, 95, 255)",
  ACCENT1: "var(--accent-color-1-rgb, 106, 209, 222)",
  ACCENT2: "var(--accent-color-2-rgb, 255, 77, 103)",

  GREY200: "var(--grey-color-200, 245, 245, 245)", // #f5f5f5
  GREY300: "var(--grey-color-300, 230, 230, 230)", // #e6e6e6
  GREY400: "var(--grey-color-400, 163, 163, 163)", // #a3a3a3
  GREY500: "var(--grey-color-500, 85, 85, 85)", // #555555
  GREY600: "var(--grey-color-600, 62, 62, 62)", // #3e3e3e
  GREY700: "var(--grey-color-700, 45, 45, 45)", // #2d2d2d
  GREY800: "var(--grey-color-800, 30, 30, 30)", // #1e1e1e

  RED: "var(--red-color-rgb,255, 58, 54)",
  GREEN: "var(--green-color-rgb, 10, 188, 93)",
  BLUE: "var(--blue-color-rgb, 60, 91, 255)",
  YELLOW: "var(--yellow-color-rgb, 255, 171, 5)",
};

export const PAGE_PERMISSIONS = {
  ADMIN: "Admin" as PagePermissionType,
  GUEST: "Guest" as PagePermissionType,
};

export const INFLUENCER_ROLES = {
  EXCLUSIVE: "Exclusive" as InfluencerRolesType,
  NONEXCLUSIVE: "Non-exclusive" as InfluencerRolesType,
};

export const MANAGER_ROLES = {
  OWNER: "Owner" as ManagerRolesType,
  TALENT: "Talent" as ManagerRolesType,
  CAMPAIGN: "Campaign" as ManagerRolesType,
  FINANCE: "Finance" as ManagerRolesType,
};
