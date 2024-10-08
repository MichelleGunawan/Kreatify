export const ManagersTableColsInfluencerView = [
  { headerText: "Name", dataId: ["user"], type: "user" },
  {
    headerText: "Contact",
    dataId: ["contact_info"],
    type: "contact",
  },
  { headerText: "Role", dataId: ["role"], type: "text" },
];

export const ManagersTableColsManagerView = [
  { headerText: "Name", dataId: ["user"], type: "user" },
  {
    headerText: "Contact",
    dataId: ["contact_info"],
    type: "contact",
  },
  { headerText: "Role", dataId: ["role"], type: "text" },

  {
    headerText: "# Campaigns Created",
    tooltipText: "Total number of campaigns created",
    dataId: ["num_campaigns_created"],
    type: "number",
  },
  {
    headerText: "# Campaigns Managed",
    tooltipText: "Total number of campaigns managed",
    dataId: ["num_campaigns_managed"],
    type: "number",
  },
  {
    headerText: "Value Created",
    tooltipText: "Total value of campaigns created",
    dataId: ["total_value_campaigns_created"],
    type: "money",
  },
  {
    headerText: "Value Managed",
    tooltipText: "Total value of campaigns managed",
    dataId: ["total_value_campaigns_managed"],
    type: "money",
  },
];
