import { Type, Static } from "@sinclair/typebox";

export const PaymentOptionsDB = Type.Union([
  Type.Literal("Paypal"),
  Type.Literal("Zelle"),
  Type.Literal("Direct Deposit"),
  Type.Literal("Wise"),
]);

export const SocialPlatformsDB = Type.Union([
  Type.Literal("Tiktok"),
  Type.Literal("Instagram"),
  Type.Literal("Youtube"),
  Type.Literal("X"),
  Type.Literal("Twitch"),
  Type.Literal("Facebook"),
  Type.Literal("Threads"),
]);

export const UserPermission = Type.Union([
  Type.Literal("Influencer"),
  Type.Literal("Manager"),
  Type.Literal("Admin"),
  Type.Literal("Owner"),
]);

export type PaymentOptionsDBType = Static<typeof PaymentOptionsDB>;
export type SocialPlatformsDBType = Static<typeof SocialPlatformsDB>;
export type UserPermissionType = Static<typeof UserPermission>;
