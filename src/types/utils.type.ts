import { Type, Static } from "@sinclair/typebox";

// Define the UUID as a string with a pattern to validate its format
export const UUIDType = Type.String({ format: "uuid" });

export const PageIdProps = Type.Object({
  params: Type.Object({
    id: Type.String(),
  }),
});

export const File = Type.Object({
  name: Type.String(),
});

export const ContactInfo = Type.Object({
  chat: Type.Optional(Type.Number()),
  email: Type.String(),
  phone: Type.Optional(Type.String()),
  whatsapp: Type.Optional(Type.String()),
});

export const Link = Type.Object({
  text: Type.String(),
  link: Type.String(),
});

export const PagePermission = Type.Union([
  Type.Literal("Admin"),
  Type.Literal("Guest"),
]);

// Export the type
export type FileType = Static<typeof File>;
export type PageIdPropsType = Static<typeof PageIdProps>;
export type ContactInfoType = Static<typeof ContactInfo>;
export type LinkType = Static<typeof Link>;
export type PagePermissionType = Static<typeof PagePermission>;
