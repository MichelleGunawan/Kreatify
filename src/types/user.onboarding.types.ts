import { Static, Type } from "@sinclair/typebox";
import { File, UUIDType } from "./utils.type";
import { Payment } from "./payments.type";
import { SocialInput } from "./social.type";
import { CampaignMatchingAnswer } from "./campaignMatching.type";
import { CampaignCategories } from "./campaign.type";

//// User Onboarding Types ////
const UserLoginInfo = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  phone: Type.String(),
  email: Type.String(),
  password: Type.String(),
  confirmPassword: Type.String(),
});

const UserProfileInfo = Type.Object({
  img: Type.Union([Type.String(), Type.Null()]),
  role: Type.String(),
  dateOfBirth: Type.String(),
  address: Type.String(),
  country: Type.String(),
  state: Type.String(),
  city: Type.String(),
  gender: Type.Union([Type.String()]),
  sexuality: Type.Union([Type.String()]),
  ethnicities: Type.Array(Type.Union([Type.String()])),
});

const InfluencerOnboardingInfo = Type.Intersect([
  UserLoginInfo,
  UserProfileInfo,
  Type.Object({
    payment_info: Type.Array(Payment, { default: [] }),
    socials: Type.Array(SocialInput, { default: [] }),
    campaignMatchingAnswers: Type.Array(CampaignMatchingAnswer, {
      default: [],
    }),
    niches: Type.Optional(CampaignCategories),
  }),
]);

const ManagerOnboardingInfo = Type.Intersect([UserLoginInfo, UserProfileInfo]);

/// Onboarding Form Types ///
const OnboardingLoginForm = Type.Intersect([
  UserLoginInfo,
  Type.Object({
    setFirstName: Type.Any(), // Using Type.Any() as a placeholder for Dispatch<SetStateAction>
    setLastName: Type.Any(), // Same for other setState functions
    setEmail: Type.Any(),
    setPhone: Type.Any(),
    setPassword: Type.Any(),
    setConfirmPassword: Type.Any(),
    nextStep: Type.Function([], Type.Void()),

    inviteId: Type.Optional(Type.Union([UUIDType, Type.Null()])),
  }),
]);

const OnboardingProfileForm = Type.Intersect([
  UserProfileInfo,
  Type.Object({
    setImg: Type.Any(), // Using Type.Any() as a placeholder for Dispatch<SetStateAction>
    setDateOfBirth: Type.Any(), // Same for other setState functions
    setAddress: Type.Any(),
    setCountry: Type.Any(),
    setState: Type.Any(),
    setCity: Type.Any(),
    setGender: Type.Any(),
    setSexuality: Type.Any(),
    setEthnicities: Type.Any(),
    prevStep: Type.Function([], Type.Void()),
    nextStep: Type.Function([], Type.Void()),
  }),
]);

const OnboardingSocialForm = Type.Object({
  socials: Type.Array(SocialInput, { default: [] }),
  setSocials: Type.Any(),
  prevStep: Type.Function([], Type.Void()),
  nextStep: Type.Function([], Type.Void()),
});

export const OnboardingPaymentFormInfluencer = Type.Object({
  payments: Type.Array(Payment, { default: [] }),
  setPayments: Type.Any(),
  prevStep: Type.Function([], Type.Void()),
  nextStep: Type.Function([], Type.Void()),
});

export const OnboardingCampaignMatchingForm = Type.Object({
  campaignMatching: Type.Array(CampaignMatchingAnswer, { default: [] }),
  setCampaignMatching: Type.Any(),
  prevStep: Type.Function([], Type.Void()),
  nextStep: Type.Function([], Type.Void()),
  agencyId: Type.Union([UUIDType, Type.Null()]),
});

export const OnboardingInfluencerPreview = Type.Object({
  data: InfluencerOnboardingInfo,
  prevStep: Type.Function([], Type.Void()),
  submit: Type.Function([], Type.Void()),
});

export const OnboardingManagerPreview = Type.Object({
  data: ManagerOnboardingInfo,
  prevStep: Type.Function([], Type.Void()),
  submit: Type.Function([], Type.Void()),
});

//// User Onboarding Types //
export type UserLoginInfoType = Static<typeof UserLoginInfo>;
export type UserProfileInfoType = Static<typeof UserProfileInfo>;
export type InfluencerOnboardingInfoType = Static<
  typeof InfluencerOnboardingInfo
>;
export type ManagerOnboardingInfoType = Static<typeof ManagerOnboardingInfo>;

//// Onboarding Form Types ///
export type OnboardingLoginFormType = Static<typeof OnboardingLoginForm>;
export type OnboardingProfileFormType = Static<typeof OnboardingProfileForm>;
export type OnboardingSocialFormType = Static<typeof OnboardingSocialForm>;
export type OnboardingPaymentFormTypeInfluencer = Static<
  typeof OnboardingPaymentFormInfluencer
>;
export type OnboardingCampaignMatchingFormType = Static<
  typeof OnboardingCampaignMatchingForm
>;
export type OnboardingInfluencerPreviewType = Static<
  typeof OnboardingInfluencerPreview
>;
export type OnboardingManagerPreviewType = Static<
  typeof OnboardingManagerPreview
>;
