import { PaymentType } from "@/types/payments.type";

export const profileData = {
  id: 1,
  image:
    "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  name: "Jane Doe",
  location: "Los Angeles, CA",
  bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nihil quidem voluptatibus quisquam, exercitationem.",
  niches: ["Fashion", "Food", "Travel"],
  agency: "Agency 1",
  totalReach: 100000,
  platforms: [
    { platform: "Tiktok", handle: "@theviralist", followers: 10000 },
    { platform: "Instagram", handle: "@theviralist", followers: 10000 },
  ],
};

export const userInfoData = {
  id: 1,
  role: "Exclusive",
  email: "tempAgencyEmail", //TODO: replace with api
  phone: 1234567890, //TODO: replace with api
  birthday: "2022-03-18",
  gender: "Female",
  sexuality: "Female",
  ethnicity: ["Asian"],
  avg_partnership_value: "$1000",
  manager: "Jane Doe",
};
export const profileNotesData = { notes: "Lorem ipsum dolor sit amet." };

export const campaignMatchingData = [
  {
    id: 1,
    type: "multiselect",
    question: "Primary Platform",
    answer: ["Instagram"],
  },
  {
    id: 2,
    type: "paragraph",
    question: "Bio",
    answer: "blah blah blah blah blah blah",
  },
  {
    id: 3,
    type: "multiselect",
    question: "Active Platforms",
    answer: ["Instagram", "Tiktok"],
  },
  {
    id: 4,
    type: "select",
    question: "Are you comfortable posting about fast fashion?",
    answer: ["Yes"],
  },
];

export const paymentsData: PaymentType[] = [
  { type: "Paypal", email: "email@example.com" },
  { type: "Zelle", phone: "1234567890" },
  {
    type: "Direct Deposit",
    acct_holder_name: "Jane Doe",
    acct_number: 1234567890,
    routing_number: 1234567890,
    swift_code: 1234567890,
  },
  {
    type: "Wise",
    acct_holder_name: "Jane Doe",
    acct_number: 1234567890,
    routing_number: 1234567890,
    swift_code: 1234567890,
  },
];
