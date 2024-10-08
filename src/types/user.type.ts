import { Type, Static } from "@sinclair/typebox";
import { SocialFollowings } from "./social.type";

export const ManagerRoles = Type.Union([
  Type.Literal("Owner"),
  Type.Literal("Talent"),
  Type.Literal("Campaign"),
  Type.Literal("Finance"),
]);

export const InfluencerRoles = Type.Union([
  Type.Literal("Exclusive"),
  Type.Literal("Non-exclusive"),
]);

export const UserPreview = Type.Object({
  id: Type.String(),
  user_id: Type.String(),
  name: Type.String(),
  profile_image: Type.Optional(Type.String()),
  user_type: Type.Enum({
    manager: "manager",
    influencer: "influencer",
  }),
  user_role: Type.Optional(Type.String()),
  social_following: Type.Optional(Type.Array(SocialFollowings)),
  niches: Type.Optional(Type.Array(Type.String())),
  location: Type.Optional(Type.String()),
});

export const ContactPreview = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  email: Type.String(),
});

export const PitchlistUser = Type.Object({
  id: Type.String(),
  rate: Type.Number(),
});

export type UserPreviewType = Static<typeof UserPreview>;
export type ContactPreviewType = Static<typeof ContactPreview>;
export type ManagerRolesType = Static<typeof ManagerRoles>;
export type InfluencerRolesType = Static<typeof InfluencerRoles>;
export type PitchlistUserType = Static<typeof PitchlistUser>;
