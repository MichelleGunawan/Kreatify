import { Type, Static } from "@sinclair/typebox";
import { PaymentStatus, CampaignCategories } from "./campaign.type";
import { SocialFollowings, Brand, SocialDB } from "./social.type";
import { ContactInfo } from "./utils.type";
import { UserPreview } from "./user.type";

// Table Types
export const TableColumn = Type.Object({
  headerText: Type.String(),
  tooltipText: Type.Optional(Type.String()),
  dataId: Type.Array(Type.String()), // maybe [0]: value, [1]: id, [2]: img
  type: Type.String(),
});

export const TalentTableRow = Type.Object({
  id: Type.Number(),
  user: UserPreview,

  role: Type.String(),
  manager: Type.Optional(Type.String()),

  contact: ContactInfo,
  socials: Type.Array(SocialFollowings, { default: [] }),
  niches: Type.Optional(Type.Array(Type.String())),
  total_reach: Type.Number(),
  instagram_followers: Type.Number(),
  tiktok_followers: Type.Number(),
  youtube_followers: Type.Number(),

  address: Type.String(),
  city: Type.String(),
  state: Type.String(),
  dob: Type.String(), // Date of birth
  gender: Type.String(),
  sexuality: Type.String(),

  total_earnings: Type.Number(),
  agency_earnings: Type.Number(),
  influencer_earnings: Type.Number(),
  manager_earnings: Type.Number(),
  avg_partnership_value: Type.Number(),
  total_partnerships: Type.Number(),
});

export const ManagersTableRow = Type.Object({
  id: Type.String(),
  user: UserPreview,
  contact_info: ContactInfo,
  role: Type.String(),
  agency: Type.Optional(Type.String()),
  num_campaigns_created: Type.Optional(Type.Number()),
  num_campaigns_managed: Type.Optional(Type.Number()),
  value_campaigns_created: Type.Optional(Type.Number()),
  value_campaigns_managed: Type.Optional(Type.Number()),
});

// Campaigns
export const ManagementCampaignTableRowBase = Type.Object({
  id: Type.String(),
  campaign_name: Type.String(),
  brand: Brand,
  category: CampaignCategories,

  talentManager: Type.Optional(UserPreview),
  campaignManager: Type.Optional(UserPreview),
  influencer: UserPreview,
});

export const ManagementPendingCampaignTableRow = Type.Intersect([
  ManagementCampaignTableRowBase,
  Type.Object({
    campaign_rate: Type.Number(),
    confirmByDate: Type.String(),
  }),
]);

export const ManagementOngoingCampaignTableRow = Type.Intersect([
  ManagementCampaignTableRowBase,
  Type.Object({
    nextMilestoneDate: Type.Optional(Type.String()),
    campaign_progress: Type.Number(),
  }),
]);

export const ManagementCompletedCampaignTableRow = Type.Intersect([
  ManagementCampaignTableRowBase,
  Type.Object({
    campaign_rate: Type.Number(),
    payment_status: PaymentStatus,
  }),
]);

export const ManagementRejectedCampaignTableRow = Type.Intersect([
  ManagementCampaignTableRowBase,
  Type.Object({
    campaign_rate: Type.Number(),
    date_rejected: Type.String(),
  }),
]);

export const TalentCampaignTableRowBase = Type.Object({
  id: Type.String(),
  campaign_name: Type.String(),
  brand: Brand,
  category: CampaignCategories,

  campaignManager: UserPreview,
  socials: Type.Array(SocialDB, { default: [] }),
});

export const TalentPendingCampaignTableRow = Type.Intersect([
  TalentCampaignTableRowBase,
  Type.Object({
    influencer_rate: Type.Number(),
    confirmByDate: Type.String(),
  }),
]);

export const TalentOngoingCampaignTableRow = Type.Intersect([
  TalentCampaignTableRowBase,
  Type.Object({
    nextMilestoneDate: Type.String(),
    campaign_progress: Type.Number(),
  }),
]);

export const TalentCompletedCampaignTableRow = Type.Intersect([
  TalentCampaignTableRowBase,
  Type.Object({
    influencer_rate: Type.Number(),
    payment_status: PaymentStatus,
  }),
]);

export const CampaignTableRow = Type.Union([
  ManagementPendingCampaignTableRow,
  TalentPendingCampaignTableRow,
  ManagementOngoingCampaignTableRow,
  TalentOngoingCampaignTableRow,
  ManagementCompletedCampaignTableRow,
  TalentCompletedCampaignTableRow,
  ManagementRejectedCampaignTableRow,
]);

export const PitchlistTableRow = Type.Object({
  id: Type.String(),
  name: Type.String(),
  created_at: Type.String(),
  created_by: UserPreview,
  agency_id: Type.String(),
  influencer_count: Type.Number(),
  influencer_previews: Type.Array(UserPreview),
  manager: UserPreview,
});

export const ContactsTableRow = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  brand: Type.String(),
  contact_info: ContactInfo,
  position: Type.String(),
  type: Type.String(),
  num_of_partnerships: Type.Optional(Type.Number()),
  last_partnership_date: Type.Optional(Type.String()),
  avg_partnership_value: Type.Optional(Type.Number()),
  niches: Type.Optional(Type.Array(Type.String())),
});

export type TableColumnType = Static<typeof TableColumn>;
export type TalentTableRowType = Static<typeof TalentTableRow>;
export type ManagersTableRowType = Static<typeof ManagersTableRow>;
export type ManagementPendingCampaignTableRowType = Static<
  typeof ManagementPendingCampaignTableRow
>;
export type ManagementOngoingCampaignTableRowType = Static<
  typeof ManagementOngoingCampaignTableRow
>;
export type ManagementCompletedCampaignTableRowType = Static<
  typeof ManagementCompletedCampaignTableRow
>;
export type ManagementRejectedCampaignTableRowType = Static<
  typeof ManagementRejectedCampaignTableRow
>;
export type TalentPendingCampaignTableRowType = Static<
  typeof TalentPendingCampaignTableRow
>;
export type TalentOngoingCampaignTableRowType = Static<
  typeof TalentOngoingCampaignTableRow
>;
export type TalentCompletedCampaignTableRowType = Static<
  typeof TalentCompletedCampaignTableRow
>;
export type CampaignTableRowType = Static<typeof CampaignTableRow>;
export type PitchlistTableRowType = Static<typeof PitchlistTableRow>;
export type ContactsTableRowType = Static<typeof ContactsTableRow>;

// Filter Types
export const ContactsFilters = Type.Object({
  partnershipCountLowerBound: Type.Union([Type.Number(), Type.Null()]),
  partnershipCountUpperBound: Type.Union([Type.Number(), Type.Null()]),
  partnershipStartDate: Type.Union([Type.String(), Type.Null()]),
  partnershipEndDate: Type.Union([Type.String(), Type.Null()]),
  valueLowerBound: Type.Union([Type.Number(), Type.Null()]),
  valueUpperBound: Type.Union([Type.Number(), Type.Null()]),
  typeFilters: Type.Array(Type.String(), { default: [] }),
  nichesFilters: Type.Array(Type.String(), { default: [] }),
});

export const ContactFilterFunctionParams = Type.Intersect([
  ContactsFilters,
  Type.Object({
    tableData: Type.Array(ContactsTableRow),
    setFilteredTableData: Type.Any(), // Type for React's Dispatch<SetStateAction>
    search: Type.String(),
    sortBy: Type.String(),
    sortOrder: Type.String(),
  }),
]);

export const CampaignsFilters = Type.Object({
  talentManagerFilters: Type.Array(Type.String(), { default: [] }),
  campaignManagerFilters: Type.Array(Type.String(), { default: [] }),
  influencerFilters: Type.Array(Type.String(), { default: [] }),
  paymentStatusFilters: Type.Array(Type.String(), { default: [] }),
  categoryFilters: Type.Array(Type.String(), { default: [] }), // Assuming category is an array of strings
});

export const CampaignsFilterParams = Type.Intersect([
  CampaignsFilters,
  Type.Object({
    tableData: Type.Array(Type.Any()), // Assuming tableData is an array of any type
    setFilteredTableData: Type.Any(),
    search: Type.Union([Type.String(), Type.Null()]),
    sortBy: Type.Union([Type.String(), Type.Null()]),
    sortOrder: Type.String(),
  }),
]);

export const ManagersFilters = Type.Object({
  roleFilters: Type.Array(Type.String()),
});

export const ManagersFilterParams = Type.Intersect([
  ManagersFilters,
  Type.Object({
    tableData: Type.Array(ManagersTableRow),
    setFilteredTableData: Type.Any(),
    search: Type.Union([Type.String(), Type.Null()]),
    sortBy: Type.Union([Type.String(), Type.Null()]),
    sortOrder: Type.String(),
  }),
]);

export type ContactsFiltersType = Static<typeof ContactsFilters>;
export type ContactFilterFunctionParamsType = Static<
  typeof ContactFilterFunctionParams
>;
export type CampaignsFiltersType = Static<typeof CampaignsFilters>;
export type CampaignsFilterParamsType = Static<typeof CampaignsFilterParams>;
export type ManagersFiltersType = Static<typeof ManagersFilters>;
export type ManagersFilterParamsType = Static<typeof ManagersFilterParams>;
