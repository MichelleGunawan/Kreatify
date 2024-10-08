import { ContactsTableRowType } from "@/types/table.type";

export const contactsData: ContactsTableRowType[] = [
  {
    id: 1,
    name: "John Doe",
    brand: "Nike",
    contact_info: {
      email: "johndoe@example.com",
    },
    position: "Manager",
    type: "Brand",
    last_partnership_date: "10/10/2022",
    avg_partnership_value: 10000,
    num_of_partnerships: 9,
    niches: ["Clothing", "Footwear"],
  },

  {
    id: 2,
    name: "Jane Doe",
    brand: "Adidas",
    contact_info: {
      email: "janedoe@example.com",
    },
    position: "Manager",
    type: "Agency",
    num_of_partnerships: 10,
    last_partnership_date: "10/10/2022",
    avg_partnership_value: 10100,
    niches: ["Clothing", "Footwear"],
  },
];
