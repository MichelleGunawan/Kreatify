import { Type, Static } from "@sinclair/typebox";

export const NotificationType = Type.Union([
  Type.Literal("acceptcampaign"),
  Type.Literal("rejectcampaign"),
  Type.Literal("pendingcampaign"),
  Type.Literal("milestonedue"),
  Type.Literal("milestoneupdate"),
  Type.Literal("milestonesubmission"),
]);

// Define each notification type with its specific required fields
const MilestoneDueNotification = Type.Object({
  type: Type.Literal("milestonedue"),
  campaignId: Type.Number(),
  campaignName: Type.String(),
  milestoneType: Type.String(),
  dueDate: Type.String(),
});

const MilestoneUpdateNotification = Type.Object({
  type: Type.Literal("milestoneupdate"),
  campaignId: Type.Number(),
  campaignName: Type.String(),
  milestoneType: Type.String(),
  user: Type.String(),
});

const MilestoneSubmissionNotification = Type.Object({
  type: Type.Literal("milestonesubmission"),
  campaignId: Type.Number(),
  campaignName: Type.String(),
  milestoneType: Type.String(),
  user: Type.String(),
});

const CampaignPendingNotification = Type.Object({
  type: Type.Literal("pendingcampaign"),
  campaignId: Type.Number(),
  campaignName: Type.String(),
  dueDate: Type.String(),
});

const CampaignRejectNotification = Type.Object({
  type: Type.Literal("rejectcampaign"),
  campaignId: Type.Number(),
  campaignName: Type.String(),
  user: Type.String(),
});

const CampaignAcceptNotification = Type.Object({
  type: Type.Literal("acceptcampaign"),
  campaignId: Type.Number(),
  campaignName: Type.String(),
  user: Type.String(),
});

// Combine the individual notification types into a single type
// export const Notification = Type.Union([
//   MilestoneDueNotification,
//   MilestoneUpdateNotification,
//   MilestoneSubmissionNotification,
//   CampaignPendingNotification,
//   CampaignRejectNotification,
//   CampaignAcceptNotification,
// ]);

export const Notification = Type.Object({
  id: Type.Number(),
  type: Type.String(),
  header_text: Type.String(),
  body_text: Type.String(),
  routing: Type.String(),
  created_at: Type.String(),
  recipient_id: Type.Optional(Type.String()),
});

// Export the type
export type MilestoneDueNotificationType = Static<
  typeof MilestoneDueNotification
>;
export type MilestoneUpdateNotificationType = Static<
  typeof MilestoneUpdateNotification
>;
export type MilestoneSubmissionNotificationType = Static<
  typeof MilestoneSubmissionNotification
>;
export type CampaignPendingNotificationType = Static<
  typeof CampaignPendingNotification
>;
export type CampaignRejectNotificationType = Static<
  typeof CampaignRejectNotification
>;
export type CampaignAcceptNotificationType = Static<
  typeof CampaignAcceptNotification
>;
export type NotificationType = Static<typeof Notification>;
export type NotificationTypeType = Static<typeof NotificationType>;
