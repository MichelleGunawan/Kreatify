export const getCampaignStatus = (tab: number) => {
  if (tab === 1) {
    return "ongoing";
  }
  if (tab === 2) {
    return "completed";
  }
  if (tab === 3) {
    return "rejected";
  }
  return "pending";
};
