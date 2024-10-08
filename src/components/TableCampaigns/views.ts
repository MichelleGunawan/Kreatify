import { UserPermissionType } from "@/types/enum.types";
import { TableColumnType } from "@/types/table.type";

export const getCampaignCols = (
  view: "pending" | "ongoing" | "completed" | "rejected",
  I1Permission: boolean,
  M3Permission: boolean
) => {
  let colInfo: TableColumnType[] = [];
  if (M3Permission) {
    colInfo = [
      { headerText: "Name", dataId: ["campaign_name"], type: "campaign" },
      view === "ongoing"
        ? {
            headerText: "Next Milestone",
            dataId: ["next_milestone"],
            type: "date",
          }
        : { headerText: "Rate", dataId: ["campaign_rate"], type: "money" },
      {
        headerText: "Owned By",
        dataId: ["talent_manager"],
        type: "userpreview",
      },
      {
        headerText: "Managed By",
        dataId: ["campaign_manager"],
        type: "userpreview",
      },
      {
        headerText: "Influencer",
        dataId: ["influencer"],
        type: "userpreview",
      },
      // { headerText: "Brand", dataId: ["brand"], type: "brand" },
    ];
  } else if (I1Permission) {
    colInfo = [
      { headerText: "Name", dataId: ["campaign_name"], type: "campaign" },
      view === "ongoing"
        ? {
            headerText: "Next Milestone",
            dataId: ["next_milestone"],
            type: "date",
          }
        : {
            headerText: "My Payout",
            dataId: ["influencer_rate"],
            type: "money",
          },

      {
        headerText: "Managed By",
        dataId: ["campaign_manager"],
        type: "userpreview",
      },
      {
        headerText: "Managed By",
        dataId: ["campaign_manager"],
        type: "userpreview",
      },
      { headerText: "Platforms", dataId: ["platforms"], type: "social" },
    ];
  }

  if (view === "pending") {
    colInfo = [
      ...colInfo,
      {
        headerText: "Confirm By",
        dataId: ["confirm_by"],
        type: "date",
      },
    ];
  }

  if (view === "ongoing") {
    colInfo = [
      ...colInfo,
      {
        headerText: "Progress",
        dataId: ["campaign_progress", "next_milestone_type"],
        type: "progressBar",
      },
    ];
  }

  if (view === "completed") {
    colInfo = [
      ...colInfo,
      {
        headerText: "Status",
        dataId: ["payment_status"],
        type: "paymentStatus",
      },
    ];
  }

  if (view === "rejected") {
    colInfo = [
      ...colInfo,
      {
        headerText: "Date Rejected",
        dataId: ["date_rejected"],
        type: "date",
      },
    ];
  }

  return colInfo;
};

export const getCampaignTabs = (
  I1Permission: boolean,
  M3Permission: boolean
): string[] => {
  if (I1Permission) {
    return ["Pending Campaigns", "Ongoing Campaigns", "Completed Campaigns"];
  }
  if (M3Permission) {
    return [
      "Pending Campaigns",
      "Ongoing Campaigns",
      "Completed Campaigns",
      "Rejected Campaigns",
    ];
  }

  return [];
};
