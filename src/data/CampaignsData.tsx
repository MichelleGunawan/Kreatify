import { DeliverableType } from "@/types/campaign.type";
import {
  ManagementPendingCampaignTableRowType,
  ManagementOngoingCampaignTableRowType,
  ManagementCompletedCampaignTableRowType,
  ManagementRejectedCampaignTableRowType,
  TalentPendingCampaignTableRowType,
  TalentOngoingCampaignTableRowType,
  TalentCompletedCampaignTableRowType,
} from "@/types/table.type";
import {
  manager1,
  manager2,
  manager3,
  talent1,
  talent2,
  talent3,
} from "./UserData";

export const managementPendingCampaignsData: ManagementPendingCampaignTableRowType[] =
  [
    {
      id: "1",
      campaign_name: "Campaign 1",
      brand: { brand_name: "Zara", brand_link: "http://www.apple.com" },
      category: "Tech",
      talentManager: manager2,
      campaignManager: manager2,
      influencer: talent1,
      campaign_rate: 2000,
      confirmByDate: "01/01/24",
    },
    {
      id: "2",
      campaign_name: "Campaign 2",
      brand: { brand_name: "Zara", brand_link: "http://www.zara.com" },
      category: "Fashion",
      talentManager: manager1,
      campaignManager: manager2,
      influencer: talent1,
      campaign_rate: 1100,
      confirmByDate: "01/02/24",
    },
    {
      id: "3",
      campaign_name: "Campaign 2",
      brand: {
        brand_name: "Spot & Tango",
        brand_link: "http://www.spotandtango.com",
      },
      category: "Pets",
      talentManager: manager3,
      campaignManager: manager2,
      influencer: talent2,
      campaign_rate: 1100,
      confirmByDate: "02/01/24",
    },
    {
      id: "4",
      campaign_name: "Campaign 2",
      brand: { brand_name: "Google", brand_link: "http://www.google.com" },
      category: "Tech",
      talentManager: manager2,
      campaignManager: manager1,
      influencer: talent3,
      campaign_rate: 1100,
      confirmByDate: "01/01/25",
    },
  ];

export const managementOngoingCampaignsData: ManagementOngoingCampaignTableRowType[] =
  [
    {
      id: "1",
      campaign_name: "Campaign 1",
      brand: { brand_name: "Zara", brand_link: "http://www.zara.com" },
      category: "Fashion",
      talentManager: manager1,
      campaignManager: manager2,
      influencer: talent1,

      campaign_progress: 50,
      nextMilestoneDate: "01/01/24",
    },
    {
      id: "2",
      campaign_name: "Campaign 2",
      brand: { brand_name: "Zara", brand_link: "http://www.zara.com" },
      category: "Fitness",
      talentManager: manager1,
      campaignManager: manager2,
      influencer: talent1,

      campaign_progress: 50,
      nextMilestoneDate: "01/01/24",
    },
    {
      id: "3",
      campaign_name: "Campaign 3",
      brand: { brand_name: "Discover", brand_link: "http://www.discover.com" },
      category: "Finance",
      talentManager: manager2,
      campaignManager: manager2,
      influencer: talent1,

      campaign_progress: 30,
      nextMilestoneDate: "01/01/24",
    },
    {
      id: "4",
      campaign_name: "Campaign 4",
      brand: { brand_name: "Zara", brand_link: "http://www.zara.com" },
      category: "Skincare",
      talentManager: manager3,
      campaignManager: manager2,
      influencer: talent2,

      campaign_progress: 40,
      nextMilestoneDate: "01/01/24",
    },
    {
      id: "5",
      campaign_name: "Campaign 5",
      brand: { brand_name: "Zara", brand_link: "http://www.zara.com" },
      category: "Pets",
      talentManager: manager1,
      campaignManager: manager2,
      influencer: talent2,

      campaign_progress: 80,
      nextMilestoneDate: "01/01/24",
    },
  ];

export const managementCompletedCampaignsData: ManagementCompletedCampaignTableRowType[] =
  [
    {
      id: "1",
      campaign_name: "Campaign 1",
      brand: {
        brand_name: "Redbull",
        brand_link: "http://www.redbull.com",
      },
      category: "Food",
      talentManager: manager3,
      campaignManager: manager2,
      influencer: talent2,
      campaign_rate: 1100,
      payment_status: "Pending",
    },
    {
      id: "2",
      campaign_name: "Campaign 2",
      brand: {
        brand_name: "Apple",
        brand_link: "http://www.apple.com",
      },
      category: "Tech",
      talentManager: manager3,
      campaignManager: manager2,
      influencer: talent3,
      campaign_rate: 1100,
      payment_status: "Agency Paid",
    },
    {
      id: "3",
      campaign_name: "Campaign 3",
      brand: {
        brand_name: "Visa",
        brand_link: "http://www.visa.com",
      },
      category: "Finance",
      talentManager: manager1,
      campaignManager: manager3,
      influencer: talent3,
      campaign_rate: 1100,
      payment_status: "Manager Paid",
    },
    {
      id: "4",
      campaign_name: "Campaign 4",
      brand: { brand_name: "Nike", brand_link: "http://www.nike.com" },
      category: "Fitness",
      talentManager: manager1,
      campaignManager: manager1,
      influencer: talent1,
      campaign_rate: 1100,
      payment_status: "Influencer Paid",
    },
    {
      id: "5",
      campaign_name: "Campaign 5",
      brand: {
        brand_name: "Capital One",
        brand_link: "http://www.capitalone.com",
      },
      category: "Finance",
      talentManager: manager1,
      campaignManager: manager2,
      influencer: talent1,
      campaign_rate: 1100,
      payment_status: "Pending",
    },
    {
      id: "6",
      campaign_name: "Campaign 6",
      brand: {
        brand_name: "Redit",
        brand_link: "http://www.reddit.com",
      },
      category: "Tech",
      talentManager: manager1,
      campaignManager: manager2,
      influencer: talent3,
      campaign_rate: 1100,
      payment_status: "Agency Paid",
    },
    {
      id: "7",
      campaign_name: "Campaign 7",
      brand: { brand_name: "Addidas", brand_link: "http://www.addidas.com" },
      category: "Fitness",
      talentManager: manager1,
      campaignManager: manager3,
      influencer: talent1,
      campaign_rate: 1100,
      payment_status: "Influencer Paid",
    },
    {
      id: "8",
      campaign_name: "Campaign 8",
      brand: { brand_name: "Vons", brand_link: "http://www.vons.com" },
      category: "Food",
      talentManager: manager2,
      campaignManager: manager2,
      influencer: talent1,
      campaign_rate: 1100,
      payment_status: "Manager Paid",
    },
    {
      id: "9",
      campaign_name: "Campaign 9",
      brand: {
        brand_name: "Apple",
        brand_link: "http://www.apple.com",
      },
      category: "Tech",
      talentManager: manager1,
      campaignManager: manager1,
      influencer: talent3,
      campaign_rate: 1100,
      payment_status: "Agency Paid",
    },
    {
      id: "10",
      campaign_name: "Campaign 10",
      brand: {
        brand_name: "ON Running",
        brand_link: "http://www.onrunning.com",
      },
      category: "Fitness",
      talentManager: manager1,
      campaignManager: manager2,
      influencer: talent1,
      campaign_rate: 1100,
      payment_status: "Influencer Paid",
    },
    {
      id: "11",
      campaign_name: "Campaign 11",
      brand: { brand_name: "Ramp", brand_link: "http://www.ramp.com" },
      category: "Finance",
      talentManager: manager1,
      campaignManager: manager2,
      influencer: talent1,
      campaign_rate: 1100,
      payment_status: "Manager Paid",
    },
  ];

export const managementRejectedCampaignsData: ManagementRejectedCampaignTableRowType[] =
  [
    {
      id: "1",
      campaign_name: "Campaign 1",
      brand: {
        brand_name: "Yoplait",
        brand_link: "http://www.yoplait.com",
      },
      category: "Food",
      talentManager: manager3,
      campaignManager: manager2,
      influencer: talent2,
      campaign_rate: 1100,
      date_rejected: "03/01/24",
    },
    {
      id: "2",
      campaign_name: "Campaign 2",
      brand: {
        brand_name: "Erehwon",
        brand_link: "http://www.erehwon.com",
      },
      category: "Health & Wellness",
      talentManager: manager3,
      campaignManager: manager2,
      influencer: talent3,
      campaign_rate: 1100,
      date_rejected: "01/03/25",
    },
    {
      id: "3",
      campaign_name: "Campaign 3",
      brand: {
        brand_name: "Stripe",
        brand_link: "http://www.stripe.com",
      },
      category: "Tech",
      talentManager: manager1,
      campaignManager: manager2,
      influencer: talent3,
      campaign_rate: 1100,
      date_rejected: "01/02/24",
    },
    {
      id: "4",
      campaign_name: "Campaign 4",
      brand: { brand_name: "Nike", brand_link: "http://www.nike.com" },
      category: "Fitness",
      talentManager: manager1,
      campaignManager: manager2,
      influencer: talent1,
      campaign_rate: 1100,
      date_rejected: "01/01/24",
    },
    {
      id: "5",
      campaign_name: "Campaign 5",
      brand: {
        brand_name: "The North Face",
        brand_link: "http://www.thenorthface.com",
      },
      category: "Fitness",
      talentManager: manager1,
      campaignManager: manager2,
      influencer: talent1,
      campaign_rate: 1100,
      date_rejected: "01/01/24",
    },
  ];

export const talentPendingCampaignsData: TalentPendingCampaignTableRowType[] = [
  {
    id: "1",
    campaign_name: "Campaign 1",
    brand: { brand_name: "Zara", brand_link: "http://www.zara.com" },
    category: "Fashion",
    campaignManager: manager2,
    socials: [
      { id: "2", platform: "Tiktok", handle: "@johndoe" },
      { id: "2", platform: "Instagram", handle: "@johndoe" },
    ],
    influencer_rate: 2000,
    confirmByDate: "01/01/24",
  },
  {
    id: "2",
    campaign_name: "Campaign 2",
    brand: { brand_name: "Gap", brand_link: "http://www.gap.com" },
    category: "Beauty",
    campaignManager: manager2,
    socials: [
      { id: "2", platform: "Tiktok", handle: "@johndoe" },
      { id: "2", platform: "Instagram", handle: "@johndoe" },
    ],
    influencer_rate: 1100,
    confirmByDate: "01/01/24",
  },
  {
    id: "3",
    campaign_name: "Campaign 3",
    brand: { brand_name: "Apple", brand_link: "http://www.apple.com" },
    category: "Tech",
    campaignManager: manager2,
    socials: [
      { id: "2", platform: "Tiktok", handle: "@johndoe" },
      { id: "2", platform: "Instagram", handle: "@johndoe" },
    ],
    influencer_rate: 1000,
    confirmByDate: "01/01/24",
  },
  {
    id: "5",
    campaign_name: "Campaign 5",
    brand: { brand_name: "Nike", brand_link: "http://www.nike.com" },
    category: "Finance",
    campaignManager: manager1,
    socials: [
      { id: "2", platform: "Tiktok", handle: "@johndoe" },
      { id: "2", platform: "Instagram", handle: "@johndoe" },
    ],
    influencer_rate: 1100,
    confirmByDate: "01/01/24",
  },
];

export const talentOngoingCampaignsData: TalentOngoingCampaignTableRowType[] = [
  {
    id: "1",
    campaign_name: "Campaign 1",
    brand: { brand_name: "Columbia", brand_link: "http://www.columbia.com" },
    category: "Outdoors",
    campaignManager: manager2,
    socials: [
      { id: "2", platform: "Tiktok", handle: "@johndoe" },
      { id: "2", platform: "Instagram", handle: "@johndoe" },
    ],

    nextMilestoneDate: "01/01/24",
    campaign_progress: 50,
  },
  {
    id: "2",
    campaign_name: "Campaign 2",
    brand: { brand_name: "Zara", brand_link: "http://www.zara.com" },
    category: "Fashion",
    campaignManager: manager3,
    socials: [
      { id: "2", platform: "Tiktok", handle: "@johndoe" },
      { id: "2", platform: "Instagram", handle: "@johndoe" },
    ],

    nextMilestoneDate: "01/01/24",
    campaign_progress: 50,
  },
  {
    id: "3",
    campaign_name: "Campaign 3",
    brand: { brand_name: "Bilt", brand_link: "http://www.biltrewards.com" },
    category: "Finance",
    campaignManager: manager1,
    socials: [
      { id: "2", platform: "Tiktok", handle: "@johndoe" },
      { id: "2", platform: "Instagram", handle: "@johndoe" },
    ],

    nextMilestoneDate: "01/01/24",
    campaign_progress: 30,
  },
  {
    id: "4",
    campaign_name: "Campaign 4",
    brand: { brand_name: "Amazon", brand_link: "http://www.amazon.com" },
    category: "Tech",
    campaignManager: manager2,
    socials: [
      { id: "2", platform: "Tiktok", handle: "@johndoe" },
      { id: "2", platform: "Instagram", handle: "@johndoe" },
    ],
    nextMilestoneDate: "01/01/24",
    campaign_progress: 40,
  },
  {
    id: "5",
    campaign_name: "Campaign 5",
    brand: { brand_name: "Zara", brand_link: "http://www.zara.com" },
    category: "Fashion",
    campaignManager: manager2,
    socials: [
      { id: "2", platform: "Tiktok", handle: "@johndoe" },
      { id: "2", platform: "Instagram", handle: "@johndoe" },
    ],
    nextMilestoneDate: "01/01/24",
    campaign_progress: 80,
  },
];

export const talentCompletedCampaignsData: TalentCompletedCampaignTableRowType[] =
  [
    {
      id: "1",
      campaign_name: "Campaign 1",
      brand: {
        brand_name: "Apple",
        brand_link: "http://www.apple.com",
      },
      category: "Tech",
      campaignManager: manager2,
      socials: [
        { id: "2", platform: "Tiktok", handle: "@johndoe" },
        { id: "2", platform: "Instagram", handle: "@johndoe" },
      ],
      influencer_rate: 1100,
      payment_status: "Pending",
    },
    {
      id: "2",
      campaign_name: "Campaign 2",
      brand: {
        brand_name: "Chanel",
        brand_link: "http://www.chanel.com",
      },
      category: "Fashion",
      campaignManager: manager2,
      socials: [
        { id: "2", platform: "Tiktok", handle: "@johndoe" },
        { id: "2", platform: "Instagram", handle: "@johndoe" },
      ],
      influencer_rate: 1100,
      payment_status: "Influencer Paid",
    },
    {
      id: "3",
      campaign_name: "Campaign 3",
      brand: {
        brand_name: "Youtue",
        brand_link: "http://www.youtube.com",
      },
      category: "Tech",
      campaignManager: manager2,
      socials: [
        { id: "2", platform: "Tiktok", handle: "@johndoe" },
        { id: "2", platform: "Instagram", handle: "@johndoe" },
      ],
      influencer_rate: 1100,
      payment_status: "Manager Paid",
    },
    {
      id: "4",
      campaign_name: "Campaign 4",
      brand: { brand_name: "Sephora", brand_link: "http://www.sephora.com" },
      category: "Beauty",
      campaignManager: manager2,
      socials: [
        { id: "2", platform: "Tiktok", handle: "@johndoe" },
        { id: "2", platform: "Instagram", handle: "@johndoe" },
      ],
      influencer_rate: 1100,
      payment_status: "Agency Paid",
    },
    {
      id: "5",
      campaign_name: "Campaign 5",
      brand: { brand_name: "Nike", brand_link: "http://www.nike.com" },
      category: "Fitness",
      campaignManager: manager2,
      socials: [
        { id: "2", platform: "Tiktok", handle: "@johndoe" },
        { id: "2", platform: "Instagram", handle: "@johndoe" },
      ],
      influencer_rate: 1100,
      payment_status: "Agency Paid",
    },
  ];

export const campaignData = {
  id: "1",
  name: "Jane x Nike",
  payment_status: "ongoing",
  talentManager: "Sam",
  campaign_manager: manager1,
  influencer: talent1,
  brandContact: {
    id: "1",
    name: "john doe",
    email: "johndoe@email.com",
  },
  brand: { brand_name: "Apple", brand_link: "http://www.apple.com" },
  influencerRate: 1100,
  partnershipType: "UGC",
  usage: "60 days",
  exclusivity: "60 days",
  category: "Fashion",

  campaignRate: 1000,
  influencerCommission: 80,
  agencyCommission: 20,
  managerCommission: 0,
  influencerPayout: 800,
  contract: { name: "filename.pdf", size: 1000 },
};

export const campaignPaymentStatus = { paymentStatus: "Pending" };

export const campaignDeliverablesData: DeliverableType[] = [
  {
    milestones: [
      {
        id: 1,
        type: "Contract",
        status: "approved",
        due_date: "01/01/24",
        unread_note: true,
        submission: { type: "Link", submission: "https://google.com" },
      },
      {
        id: 2,
        type: "Script",
        due_date: "01/01/24",
        status: "denied",
        unread_note: true,
        submission: {
          type: "Text",
          submission:
            "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        },
      },
      {
        id: 3,
        type: "Draft",
        due_date: "01/01/24",
        status: "pending",
        unread_note: false,
        submission: { type: "File", submission: { name: "file2.pdf" } },
      },
      {
        id: 4,
        type: "Post",
        due_date: "01/01/24",
        status: "incomplete",
        social: {
          id: "1",
          platform: "Tiktok",
          handle: "johndoe",
        },
        unread_note: false,
      },
    ],
    attachments: [
      { name: "file1.txt", size: 1000 },
      { name: "file2.pdf", size: 2000 },
    ],
    note: "Some notes about this deliverable",
  },
  {
    milestones: [
      {
        id: 5,
        type: "Script",
        due_date: "01/01/24",
        status: "approved",
        unread_note: false,
        submission: { type: "File", submission: { name: "file.pdf" } },
      },
      {
        id: 6,
        type: "Draft",
        due_date: "01/01/24",
        status: "approved",
        unread_note: false,
        submission: {
          type: "Text",
          submission:
            "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        },
      },
      {
        id: 7,
        type: "Post",
        due_date: "01/01/24",
        status: "denied",
        unread_note: true,
        social: {
          id: "3",
          platform: "Instagram",
          handle: "johndoe",
        },
        submission: { type: "Link", submission: "https://google.com" },
      },
    ],
    attachments: [
      { name: "file3.png", size: 500 },
      { name: "file4.docx", size: 1500 },
    ],
    note: "More notes about this deliverable",
  },
];
