import { ContactPreviewType, UserPreviewType } from "@/types/user.type";

export const manager1: UserPreviewType = {
  id: "1",
  user_id: "1",
  name: "Natasha Smith",
  profile_image: "https://picsum.photos/100",
  user_type: "manager",
};
export const manager2: UserPreviewType = {
  id: "3",
  user_id: "3",
  name: "Michelle Smith",
  profile_image: "https://picsum.photos/300",
  user_type: "manager",
};
export const manager3: UserPreviewType = {
  id: "5",
  user_id: "5",
  name: "Sam Smith",
  profile_image: "https://picsum.photos/500",
  user_type: "manager",
};

export const talent1: UserPreviewType = {
  id: "0",
  user_id: "0",
  name: "Jane Doe",
  profile_image: "https://picsum.photos/000",
  user_type: "influencer",
};
export const talent2: UserPreviewType = {
  id: "2",
  user_id: "2",
  name: "Jake Doe",
  profile_image: "https://picsum.photos/200",
  user_type: "influencer",
};
export const talent3: UserPreviewType = {
  id: "4",
  user_id: "4",
  name: "Josh Doe",
  profile_image: "https://picsum.photos/400",
  user_type: "influencer",
};

export const talents: UserPreviewType[] = [talent1, talent2, talent3];

export const managers: UserPreviewType[] = [manager1, manager2, manager3];

export const contacts: ContactPreviewType[] = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane@email.com",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@email.com",
  },
];

export const agencyInfluencers: UserPreviewType[] = [talent1, talent2, talent3];

export const handles = [
  "johndoe",
  "jahndoe",
  "natasha",
  "natalie",
  "sarah",
  "sarah",
  "sarah",
];
