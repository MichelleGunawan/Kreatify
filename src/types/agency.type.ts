import { Type, Static } from "@sinclair/typebox";

export const AgencyInfo = Type.Object({
  agency_logo: Type.String(),
  name: Type.String(),
  address: Type.String(),
  bio: Type.Optional(Type.String()),
  influencer_count: Type.Optional(Type.Number()),
  manager_count: Type.Optional(Type.Number()),
  total_reach: Type.Optional(Type.Number()),
  website_url: Type.Optional(Type.String()),
  phone: Type.String(),
  email: Type.String(),
  date_founded: Type.Optional(Type.String()),
});

export type AgencyInfoType = Static<typeof AgencyInfo>;
