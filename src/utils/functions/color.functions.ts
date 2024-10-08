export const getCampaignColor = (campaignStatus: string) => {
  const campaignStatusLower = campaignStatus.toLowerCase();
  if (campaignStatusLower === "pending") return "#775fff"; //purple
  if (campaignStatusLower === "ongoing") return "#6ACAD0"; //blue #6AD1DE
  if (campaignStatusLower === "completed") return "#FF4D67"; //pink
  if (campaignStatusLower === "rejected") return "#D4C123"; //yellow
  return "var(--background-color)";
};

export const getPaymentStatusColor = (paymentStatus: string) => {
  const paymentStatusLower = paymentStatus.toLowerCase();
  if (paymentStatusLower === "pending") return "#FF3A36";
  if (paymentStatusLower === "agency paid") return "#FFAB05";
  if (paymentStatusLower === "manager paid") return "#3C5BFF";
  if (paymentStatusLower === "influencer paid") return "#0ABC5D";
  return "#d5d5d5";
};

// Function to convert hex color to RGBA with a given alpha
export const formatHexToRgba = (hex: string, opacity: number) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
