import { Type, Static } from "@sinclair/typebox";
import { PaymentOptionsDB } from "./enum.types";

export const PaymentOptionsInput = Type.Union([
  Type.Literal("Paypal"),
  Type.Literal("Zelle"),
  Type.Literal("Direct Deposit"),
  Type.Literal("Wise"),
  Type.Optional(Type.Literal("")),
]);

export const Payment = Type.Object({
  type: PaymentOptionsInput,
  email: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  phone: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  bank_name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  acct_holder_name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  acct_number: Type.Optional(Type.Union([Type.Number(), Type.Null()])),
  routing_number: Type.Optional(Type.Union([Type.Number(), Type.Null()])),
  swift_code: Type.Optional(Type.Union([Type.Number(), Type.Null()])),
});

export const PaymentInput = Type.Object({
  type: PaymentOptionsInput,
  email: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  phone: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  bank_name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  acct_holder_name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  acct_number: Type.Optional(Type.Union([Type.Number(), Type.Null()])),
  routing_number: Type.Optional(Type.Union([Type.Number(), Type.Null()])),
  swift_code: Type.Optional(Type.Union([Type.Number(), Type.Null()])),
});

// If you need to use the static types, you can do so as follows:
export type PaymentType = Static<typeof Payment>;
export type PaymentInputType = Static<typeof PaymentInput>;
export type PaymentOptionsInputType = Static<typeof PaymentOptionsInput>;
