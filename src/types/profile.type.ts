import { Type, Static } from "@sinclair/typebox";
import { SocialFollowings } from "./social.type";

export const ProfileBasicInfo = Type.Object({
  userPermission: Type.String(),
  email: Type.String(),
  phone: Type.String(),
  managing: Type.Optional(Type.String()),
  manager: Type.Optional(Type.String()),
  birth_date: Type.String(),
  gender: Type.String(),
  ethnicity: Type.Array(Type.String()),
  sexuality: Type.String(),
});

export const ProfileInfo = Type.Object({
  id: Type.String(),
  profile_image: Type.Optional(Type.String()),
  name: Type.String(),
  location: Type.String(),
  bio: Type.Optional(Type.String()),
  niches: Type.Optional(Type.Array(Type.String())),
  totalReach: Type.Optional(Type.Number()),
  social_following: Type.Optional(Type.Array(SocialFollowings)),
});

export const UserProfile = Type.Object({
  profileId: Type.String(),
  name: Type.String(),
  bio: Type.Optional(Type.String()),
  niches: Type.Optional(Type.Array(Type.String())),
  location: Type.String(),
  socialFollowing: Type.Optional(Type.Array(SocialFollowings)),
  profileImage: Type.Optional(Type.String()),
  setProfileImage: Type.Optional(Type.Any()),
  setNiches: Type.Optional(Type.Any()),
  setBio: Type.Optional(Type.Any()),
  notes: Type.Optional(Type.String()),
});

export type UserProfileType = Static<typeof UserProfile>;
export type ProfileInfoType = Static<typeof ProfileInfo>;
