import { Type, Static } from "@sinclair/typebox";
import { UUIDType } from "./utils.type";
import { SocialPlatformsDB } from "./enum.types";

export const SocialPlatforms = Type.Union([
  Type.Literal("Tiktok"),
  Type.Literal("Instagram"),
  Type.Literal("Youtube"),
  Type.Literal("X"),
  Type.Literal("Twitch"),
  Type.Literal("Facebook"),
  Type.Literal("Threads"),
  Type.Literal(""),
]);

export const SocialPlatforsmDB = Type.Union([
  Type.Literal("Tiktok"),
  Type.Literal("Instagram"),
  Type.Literal("Youtube"),
  Type.Literal("X"),
  Type.Literal("Twitch"),
  Type.Literal("Facebook"),
  Type.Literal("Threads"),
  Type.Literal(""),
]);

export const SocialDB = Type.Object({
  id: Type.Union([UUIDType, Type.Null()]),
  platform: SocialPlatformsDB,
  handle: Type.String(),
});

export const SocialInput = Type.Object({
  id: Type.Union([UUIDType, Type.Null()]),
  platform: SocialPlatforms,
  handle: Type.String(),
});

export const SocialFollowings = Type.Intersect([
  SocialDB,
  Type.Object({
    followers: Type.Number(),
  }),
]);

export const Brand = Type.Object({
  brand_name: Type.String(),
  brand_link: Type.String(),
});

export type SocialPlatformsType = Static<typeof SocialPlatforms>;
export type SocialDBType = Static<typeof SocialDB>;
export type SocialInputType = Static<typeof SocialInput>;
export type SocialFollowingsType = Static<typeof SocialFollowings>;
export type BrandType = Static<typeof Brand>;
