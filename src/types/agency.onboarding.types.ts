import { Type, Static } from "@sinclair/typebox";
import { UUIDType } from "./utils.type";

export const AgencyInfo = Type.Object({
  logo: Type.Union([Type.String(), Type.Null()]),
  name: Type.Union([Type.String(), Type.Null()]),
  address: Type.Union([Type.String(), Type.Null()]),
  city: Type.Union([Type.String(), Type.Null()]),
  state: Type.Union([Type.String(), Type.Null()]),
  country: Type.Union([Type.String(), Type.Null()]),
  website: Type.Union([Type.String(), Type.Null()]),
  bio: Type.Union([Type.String(), Type.Null()]),
  dateFounded: Type.Union([Type.String(), Type.Null()]),
  email: Type.Union([Type.String(), Type.Null()]),
  phone: Type.Union([Type.String(), Type.Null()]),
});

export const AgencyPaymentInfo = Type.Object({
  agencyCommission: Type.Union([Type.Number(), Type.Null()]),
  influencerCommission: Type.Union([Type.Number(), Type.Null()]),
  managerCommission: Type.Union([Type.Number(), Type.Null()]),
  payments: Type.Array(Type.String(), { default: [] }),
});

export const AgencyPreview = Type.Intersect([AgencyInfo, AgencyPaymentInfo]);

const OnboardingAgencyInfoForm = Type.Intersect([
  AgencyInfo,
  Type.Object({
    setLogo: Type.Any(), // Using Type.Any() as a placeholder for Dispatch<SetStateAction>
    setName: Type.Any(), // Same for other setState functions
    setBio: Type.Any(),
    setAddress: Type.Any(),
    setCountry: Type.Any(),
    setState: Type.Any(),
    setCity: Type.Any(),
    setWebsite: Type.Any(),
    setEmail: Type.Any(),
    setPhone: Type.Any(),
    setDateFounded: Type.Any(),
    nextStep: Type.Function([], Type.Void()),
  }),
]);

const OnboardingAgencyPaymentInfoForm = Type.Intersect([
  AgencyPaymentInfo,
  Type.Object({
    setAgencyCommission: Type.Any(), // Using Type.Any() as a placeholder for Dispatch<SetStateAction>
    setInfluencerCommission: Type.Any(), // Same for other setState functions
    setManagerCommission: Type.Any(),
    setPayments: Type.Any(),
    prevStep: Type.Function([], Type.Void()),
    nextStep: Type.Function([], Type.Void()),
  }),
]);

export const OnboardingAgencyPreview = Type.Intersect([
  OnboardingAgencyInfoForm,
  OnboardingAgencyPaymentInfoForm,
  Type.Object({
    submit: Type.Function([], Type.Void()),
    isSubmitting: Type.Boolean(),
  }),
]);

//// Agency Info Types ////
export type AgencyInfoType = Static<typeof AgencyInfo>;
export type AgencyPaymentInfoType = Static<typeof AgencyPaymentInfo>;
export type AgencyPreviewType = Static<typeof AgencyPreview>;

/// Agency Onboarding Types ///
export type OnboardingAgencyInfoFormType = Static<
  typeof OnboardingAgencyInfoForm
>;
export type OnboardingAgencyPaymentInfoFormType = Static<
  typeof OnboardingAgencyPaymentInfoForm
>;
export type OnboardingAgencyPreviewType = Static<
  typeof OnboardingAgencyPreview
>;

/// Backend Types ///
export const CreateAgencyProp = Type.Intersect([
  Type.Object({
    agencyID: Type.Union([UUIDType, Type.Null()]),
    agencyCommission: Type.Union([Type.Number(), Type.Null()]),
    influencerCommission: Type.Union([Type.Number(), Type.Null()]),
    managerCommission: Type.Union([Type.Number(), Type.Null()]),
  }),
  AgencyInfo,
]);

/// Backend Types ///
export type CreateAgencyPropType = Static<typeof CreateAgencyProp>;
