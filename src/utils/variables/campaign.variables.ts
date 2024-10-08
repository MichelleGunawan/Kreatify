import {
  CampaignCategoriesType,
  PartnershipTypeType,
  PaymentStatusType,
} from "@/types/campaign.type";

export const partnershipTypeOptions: PartnershipTypeType[] = [
  "UGC",
  "Brand sponsorship",
  "Song collab",
  "Affiliate",
  "Gifting for content",
  "Gifting w/o posting obligations",
  "Events",
  "Press inquiries",
  "Features",
  "Other",
];

export const campaignCategoryOptions: CampaignCategoriesType[] = [
  "Alcohol",
  "App",
  "Baby",
  "Beauty",
  "Beverage",
  "Cleaning",
  "Cooking",
  "Education",
  "Entertainment",
  "Events",
  "Fashion",
  "Finance",
  "Fitness",
  "Food",
  "Furniture",
  "Haircare",
  "Health & Wellness",
  "Home",
  "Jewelery",
  "Kitchen",
  "Men's Fashion",
  "Movies",
  "Music",
  "Outdoors",
  "Pets",
  "Plants",
  "Shopping",
  "Skincare",
  "Sports",
  "Tech",
  "Transportation",
  "Travel",
  "Vegan & Vegetarian",
  "Other",
];

export const platforms = ["Instagram", "Tiktok", "Youtube", "Twitch"];

export const milestoneTypes = [
  "Contract",
  "Script",
  "Draft",
  "Post",
  // "Repost",
];

export const postType = [
  "IG post",
  "IG carousel",
  "IG story",
  "IG reel",
  "Tiktok post",
  "Tiktok Story",
  "Youtube Video",
  "Youtube Shorts",
  "Twitch",
];

export const paymentStatusOptions: PaymentStatusType[] = [
  "Pending",
  "Agency Paid",
  "Manager Paid",
  "Influencer Paid",
];
