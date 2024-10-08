import { Type, Static } from "@sinclair/typebox";
import { SocialInput } from "./social.type";
import { UUIDType } from "./utils.type";

export const CampaignStatus = Type.Union([
  Type.Literal("pending"),
  Type.Literal("ongoing"),
  Type.Literal("completed"),
  Type.Literal("rejected"),
]);

export const PaymentStatus = Type.Union([
  Type.Literal("Pending"),
  Type.Literal("Agency Paid"),
  Type.Literal("Manager Paid"),
  Type.Literal("Influencer Paid"),
]);

export const MilestoneStatus = Type.Union([
  Type.Literal("incomplete"),
  Type.Literal("pending"),
  Type.Literal("denied"),
  Type.Literal("approved"),
]);

export const PartnershipType = Type.Union([
  Type.Literal("UGC"),
  Type.Literal("Brand sponsorship"),
  Type.Literal("Affiliate"),
  Type.Literal("Health & Wellness"),
  Type.Literal("Gifting for content"),
  Type.Literal("Gifting w/o posting obligations"),
  Type.Literal("Press inquiries"),
  Type.Literal("Features"),
  Type.Literal("Events"),
  Type.Literal("Song collab"),
  Type.Literal("Other"),
]);

export const CampaignCategories = Type.Union([
  Type.Literal("Fashion"),
  Type.Literal("Beauty"),
  Type.Literal("Skincare"),
  Type.Literal("Health & Wellness"),
  Type.Literal("Fitness"),
  Type.Literal("Sports"),
  Type.Literal("Tech"),
  Type.Literal("App"),
  Type.Literal("Finance"),
  Type.Literal("Haircare"),
  Type.Literal("Shopping"),
  Type.Literal("Furniture"),
  Type.Literal("Jewelery"),
  Type.Literal("Movies"),
  Type.Literal("Events"),
  Type.Literal("Cleaning"),
  Type.Literal("Home"),
  Type.Literal("Baby"),
  Type.Literal("Travel"),
  Type.Literal("Pets"),
  Type.Literal("Education"),
  Type.Literal("Food"),
  Type.Literal("Entertainment"),
  Type.Literal("Music"),
  Type.Literal("Plants"),
  Type.Literal("Outdoors"),
  Type.Literal("Transportation"),
  Type.Literal("Food"),
  Type.Literal("Beverage"),
  Type.Literal("Alcohol"),
  Type.Literal("Cooking"),
  Type.Literal("Kitchen"),
  Type.Literal("Sports"),
  Type.Literal("Men's Fashion"),
  Type.Literal("Vegan & Vegetarian"),
  Type.Literal("Other"),
]);

export const SubmissionType = Type.Union([
  Type.Literal("Text"),
  Type.Literal("File"),
  Type.Literal("Link"),
]);

export const MilestoneNote = Type.Object({
  id: Type.Number(),
  milestone_id: Type.Number(),
  note: Type.String(),
  created_at: Type.String(),
  created_by: Type.String(),
  seen: Type.Boolean({ default: false }),
});

export const MilestoneSubmission = Type.Object({
  type: SubmissionType,
  submission: Type.Any(),
  description: Type.Optional(Type.String()),
});

export const Milestone = Type.Object({
  id: Type.Number(),
  type: Type.String(),
  // Type.Union([
  //   Type.Literal("Contract"),
  //   Type.Literal("Script"),
  //   Type.Literal("Draft"),
  //   Type.Literal("Post"),
  // ]),
  status: MilestoneStatus,
  due_date: Type.String(),
  social: Type.Optional(SocialInput),
  submission: Type.Optional(MilestoneSubmission),
  unread_note: Type.Boolean({ default: false }),
});

export const MilestoneSubmit = Type.Object({
  id: Type.Number(),
  type: Type.String(),
  // Type.Union([
  //   Type.Literal("Contract"),
  //   Type.Literal("Script"),
  //   Type.Literal("Draft"),
  //   Type.Literal("Post"),
  // ]),
  status: MilestoneStatus,
  due_date: Type.String(),
  social_id: Type.Optional(Type.Union([UUIDType, Type.Null()])),
  unread_note: Type.Boolean({ default: false }),
});

export const Deliverable = Type.Object({
  id: Type.Optional(Type.Number()),
  milestones: Type.Array(Milestone),
  attachments: Type.Optional(Type.Array(Type.Any())),
  note: Type.String(),
  order: Type.Optional(Type.Number()),
});

export const DeliverableEdit = Type.Object({
  id: Type.Optional(Type.Number()),
  milestones: Type.Array(MilestoneSubmit),
  attachments: Type.Optional(Type.Array(Type.Any())),
  note: Type.String(),
  order: Type.Optional(Type.Number()),
});

export const Checkpoint = Type.Object({
  id: Type.Number(),
  text: Type.String(),
  subText: Type.Optional(Type.String()),
  icon: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  tooltipText: Type.Optional(Type.String()),
  details: Type.Optional(Type.Boolean({ default: false })),
  file: Type.Optional(Type.Any()),
});

export type CampaignStatusType = Static<typeof CampaignStatus>;
export type PaymentStatusType = Static<typeof PaymentStatus>;
export type CampaignCategoriesType = Static<typeof CampaignCategories>;
export type MilestoneStatusType = Static<typeof MilestoneStatus>;
export type MilestoneSubmitType = Static<typeof MilestoneSubmit>;
export type MilestoneNoteType = Static<typeof MilestoneNote>;
export type MilestoneSubmissionType = Static<typeof MilestoneSubmission>;
export type MilestoneType = Static<typeof Milestone>;
export type DeliverableType = Static<typeof Deliverable>;
export type DeliverableEditType = Static<typeof DeliverableEdit>;
export type CheckpointType = Static<typeof Checkpoint>;
export type SubmissionType = Static<typeof SubmissionType>;
export type PartnershipTypeType = Static<typeof PartnershipType>;
