import { Type, Static } from "@sinclair/typebox";

export const CampaignMatching = Type.Object({
  id: Type.Number(),
  question: Type.String(),
  type: Type.String(),
  options: Type.Optional(Type.Array(Type.String())),
});

export const CampaignMatchingAnswer = Type.Object({
  id: Type.Number(),
  question_id: Type.Number(),
  question: Type.Optional(Type.String()),
  type: Type.String(),
  options: Type.Optional(Type.Array(Type.String())),
  answer: Type.Any(),
});

export type CampaignMatchingType = Static<typeof CampaignMatching>;
export type CampaignMatchingAnswerType = Static<typeof CampaignMatchingAnswer>;
