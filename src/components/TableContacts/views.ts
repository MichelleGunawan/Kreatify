export const ContactsTableCols = [
  { headerText: "Name", dataId: ["name"], type: "contacts" },
  {
    headerText: "Contact",
    dataId: ["contact_info"],
    type: "contact",
  },
  { headerText: "Brand", dataId: ["brand"], type: "text" },
  { headerText: "Position", dataId: ["position"], type: "text" },
  { headerText: "Type", dataId: ["type"], type: "text" },
  {
    headerText: "# of Partnerships",
    tooltipText: "Total number of partnerships",
    dataId: ["num_of_partnerships"],
    type: "number",
  },
  {
    headerText: "Last Partnership Date",
    tooltipText: "Last partnership date",
    dataId: ["last_partnership_date"],
    type: "text",
  },
  {
    headerText: "Avg Partnership Value",
    tooltipText: "Average partnership value",
    dataId: ["avg_partnership_value"],
    type: "number",
  },
  { headerText: "Niche", dataId: ["niches"], type: "textMultiselect" },
];
