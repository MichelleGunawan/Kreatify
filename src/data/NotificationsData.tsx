import { NotificationType } from "@/types/notifications.type";
export const notificationsData: NotificationType[] = [
  {
    id: 1,
    type: "milestonedue",
    header_text: "Campaign Name",
    body_text: "Due Date: 01/01/2024",
    routing: "/campaigns/1",
    created_at: "01/01/2024",
  },
  {
    id: 2,
    type: "milestonedue",
    header_text: "Campaign Name",
    body_text: "Due Date: 01/01/2024",
    routing: "/campaigns/2",
    created_at: "01/01/2024",
  },
  {
    id: 3,
    type: "milestoneupdate",
    header_text: "Campaign Name",
    body_text: "Your campaign has been updated.",
    routing: "/campaigns/3",
    created_at: "01/01/2024",
  },
  {
    id: 4,
    type: "pendingcampaign",
    header_text: "Campaign Name",
    body_text: "Your campaign has been updated.",
    routing: "/campaigns/4",
    created_at: "01/01/2024",
  },
  {
    type: "rejectcampaign",
    id: 5,
    header_text: "Campaign Name",
    body_text: "Your campaign has been rejected.",
    routing: "/campaigns/5",
    created_at: "01/01/2024",
  },
  {
    type: "acceptcampaign",
    id: 6,
    header_text: "Campaign Name",
    body_text: "Your campaign has been accepted.",
    routing: "/campaigns/6",
    created_at: "01/01/2024",
  },
];
