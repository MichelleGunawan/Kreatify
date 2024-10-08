export const getNotificationColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "acceptcampaign":
      return "#0ABC5D";
    case "rejectcampaign":
      return "#FF4D67";
    case "pendingcampaign":
      return "#FFAB05";
    case "milestonedue":
      return "#FF4D67";
    case "milestonesubmission":
      return "#775fff";
    case "milestoneupdate":
      return "#6ad1de";
    default:
      return "#d5d5d5";
  }
};
