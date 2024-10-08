export const talentColInfo = [
  { headerText: "Name", dataId: ["name"], type: "pitchlist" },
  {
    headerText: "Influencers",
    dataId: ["influencer_ids", "influencer_count"], //[0]:content, [1]:totalCount
    type: "userpreviews",
  },
  {
    headerText: "Created By",
    dataId: ["created_by"],
    type: "userpreview",
  },
  {
    headerText: "Actions",
    dataId: ["id"],
    type: "pitchlistactions",
  },
];
