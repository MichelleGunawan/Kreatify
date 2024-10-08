import { PaymentOptionsDBType } from "@/types/enum.types";

export const paymentOptions: PaymentOptionsDBType[] = [
  "Zelle",
  "Paypal",
  "Wise",
  "Direct Deposit",
];

export const paymentStatusOptions = [
  "Pending",
  "Agency Paid",
  "Manager Paid",
  "Influencer Paid",
];
