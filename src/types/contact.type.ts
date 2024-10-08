import { Type, Static } from "@sinclair/typebox";

// Define each notification type with its specific required fields
export const Contact = Type.Object({
  agency_id: Type.String(),
  manager_id: Type.String(),
  name: Type.String(),
  email: Type.String(),
  brand: Type.String(),
  type: Type.Union([
    Type.Literal("Brand"),
    Type.Literal("Agency"),
    Type.Literal("Music"),
  ]),
  position: Type.String(),
});

export type ContactType = Static<typeof Contact>;
