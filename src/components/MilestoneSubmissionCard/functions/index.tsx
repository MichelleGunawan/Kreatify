export const getColor = (milestoneStatus?: string) => {
  milestoneStatus = milestoneStatus?.toLowerCase();
  if (milestoneStatus === "approved" || milestoneStatus === "approve") {
    return "#0ABC5D";
  }
  if (milestoneStatus === "denied" || milestoneStatus === "deny") {
    return "#FF3A36";
  }
  if (milestoneStatus === "pending") {
    return "#FFAB05";
  }

  return "#A4A4A4";
};

export const getBackgroundColor = (milestoneStatus?: string) => {
  milestoneStatus = milestoneStatus?.toLowerCase();
  if (milestoneStatus === "approved" || milestoneStatus === "approve") {
    return "#CEF2DF";
  }
  if (milestoneStatus === "denied" || milestoneStatus === "deny") {
    return "#FFD8D7";
  }
  if (milestoneStatus === "pending") {
    return "#FFEECD";
  }

  return "#EDEDED";
};

export const getLabelTalent = (milestoneStatus?: string) => {
  milestoneStatus = milestoneStatus?.toLowerCase();
  if (milestoneStatus === "approved") {
    return "Approved";
  }
  if (milestoneStatus === "denied") {
    return "Denied";
  }
  if (milestoneStatus === "pending") {
    return "Pending";
  }

  return "--";
};

export const getLabelManager = (milestoneStatus?: string) => {
  milestoneStatus = milestoneStatus?.toLowerCase();
  if (milestoneStatus === "approved") {
    return "Approve";
  }
  if (milestoneStatus === "denied") {
    return "Deny";
  }
  if (milestoneStatus === "pending") {
    return "Pending";
  }
};

export const getDatabaseValue = (milestoneStatus?: string) => {
  milestoneStatus = milestoneStatus?.toLowerCase();
  if (milestoneStatus === "approve") {
    return "approved";
  }
  if (milestoneStatus === "deny") {
    return "denied";
  }
  if (milestoneStatus === "pending") {
    return "pending";
  }
  return "incomplete";
};
