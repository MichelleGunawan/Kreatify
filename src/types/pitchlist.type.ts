import { Type, Static } from "@sinclair/typebox";
import { SocialFollowings } from "./social.type";
import { AgencyInfo } from "./agency.type";

export const Pitchlist = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  agencyInfo: AgencyInfo,
});

const MediakitPreview = Type.Object({
  id: Type.String(),
  user_id: Type.String(),
  profile_image: Type.Optional(Type.String()),
  name: Type.String(),
  location: Type.String(),
  niches: Type.Array(Type.String()),
  social_following: Type.Array(SocialFollowings),
});

export type PitchlistType = Static<typeof Pitchlist>;
export type MediakitPreviewType = Static<typeof MediakitPreview>;
