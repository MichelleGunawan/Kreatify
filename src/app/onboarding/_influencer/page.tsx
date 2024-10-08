"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UUID } from "crypto";
import { useGlobalContext } from "@/context";
import Stepper from "@/components/Stepper";
import InfluencerOnboarding0 from "../_influencer/_components/page0";
import InfluencerOnboarding1 from "../_influencer/_components/page1";
import InfluencerOnboarding2 from "../_influencer/_components/page2";
import InfluencerOnboarding3 from "../_influencer/_components/page3";
import InfluencerOnboarding4 from "../_influencer/_components/page4";
import InfluencerOnboarding5 from "../_influencer/_components/page5";
import { nextStep, prevStep } from "../_functions";
import { SocialInputType } from "@/types/social.type";
import { PaymentType } from "@/types/payments.type";
import { CampaignMatchingAnswerType } from "@/types/campaignMatching.type";
import {
  createInfluencer,
  updateNonexclusiveInfluencer,
} from "@/services/influencers/post_actions";
import { InfluencerOnboardingInfoType } from "@/types/user.onboarding.types";
import { getInfluencerDataFromEmail } from "@/services/influencers/fetch_actions";

// Style imports
import "@/styles/onboarding.page.scss";
import ModalText from "@/components/ModalText";
import { INFLUENCER_ROLES } from "@/utils/constants";

// Define the data structure for the form data

const InfluencerOnboarding: React.FC<{
  inviteId: UUID | null;
  agencyId: UUID | null;
  role: string;
  inviteEmail: string;
}> = ({ inviteId, agencyId, role, inviteEmail }) => {
  const router = useRouter();
  const {
    setFirstName: setFirstNameGlobal,
    setLastName: setLastNameGlobal,
    talentId,
    userId,
    setTalentId,
    setUserId,
    setUserPermission,
  } = useGlobalContext();

  useEffect(() => {
    getInfluencerDataFromEmail({ email: inviteEmail }).then(
      ({ userID, influencerID, agencyID, userRole }) => {
        // Check if user already exists in this agency
        if (agencyID === agencyId) {
          setModalText("User already exists in this agency");
          setIsModalOpen(true);
          return;
        }

        // If user is exclusive influencer at another agency, user should not be able to onboard. Redirect to login
        if (agencyID !== agencyId && userID && influencerID) {
          if (userRole === INFLUENCER_ROLES.EXCLUSIVE) {
            setModalText("User is an exclusive influencer at another agency");
            setIsModalOpen(true);
            return;
          }
        }
      }
    );
  }, [inviteEmail]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(inviteEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [img, setImg] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [sexuality, setSexuality] = useState<string>("");
  const [ethnicities, setEthnicities] = useState<string[]>([]);

  const [socials, setSocials] = useState<SocialInputType[]>([
    { id: null, platform: "", handle: "" },
  ]);
  const [payments, setPayments] = useState<PaymentType[]>([{ type: "" }]);
  const [campaignMatching, setCampaignMatching] = useState<
    CampaignMatchingAnswerType[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const formData: InfluencerOnboardingInfoType = {
    firstName,
    lastName,
    phone,
    email,
    password,
    confirmPassword,

    img,
    role: role,
    dateOfBirth,
    address,
    country,
    state,
    city,
    gender,
    sexuality,
    ethnicities,

    payment_info: payments as PaymentType[],
    socials: socials as SocialInputType[],
    campaignMatchingAnswers: campaignMatching as CampaignMatchingAnswerType[],
  };

  /**
   * Submit the onboarding form and create a new influencer.
   * NOTE: This currently does not upload the signed contract and instead
   * hardcodes the signed_contract_url to "google.com". This should be replaced
   * with the actual upload logic.
   */
  const submit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    createInfluencer({
      inviteID: inviteId,
      agencyID: agencyId,
      userData: formData,
    })
      .then(({ influencerId, userId }) => {
        if (!influencerId || !userId) {
          setIsSubmitting(false);
          router.push("/login");
          return;
        }

        setTalentId(influencerId);
        setUserId(userId);
        setFirstNameGlobal(firstName);
        setLastNameGlobal(lastName);
        setUserPermission("Influencer");
        router.push("/home");
      })
      .finally(() => setIsSubmitting(false));
  };

  // Define the steps using the Steps type
  const steps: { [key: number]: JSX.Element } = {
    0: (
      <InfluencerOnboarding0
        firstName={firstName}
        lastName={lastName}
        phone={phone}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setPhone={setPhone}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        nextStep={() => nextStep(setCurrentStep, 5)}
      />
    ),
    1: (
      <InfluencerOnboarding1
        img={img}
        role={role}
        dateOfBirth={dateOfBirth}
        address={address}
        country={country}
        state={state}
        city={city}
        gender={gender}
        sexuality={sexuality}
        ethnicities={ethnicities}
        setImg={setImg}
        setDateOfBirth={setDateOfBirth}
        setAddress={setAddress}
        setCountry={setCountry}
        setState={setState}
        setCity={setCity}
        setGender={setGender}
        setSexuality={setSexuality}
        setEthnicities={setEthnicities}
        prevStep={() => prevStep(setCurrentStep)}
        nextStep={() => nextStep(setCurrentStep, 5)}
      />
    ),
    2: (
      <InfluencerOnboarding2
        socials={socials}
        setSocials={setSocials}
        prevStep={() => prevStep(setCurrentStep)}
        nextStep={() => nextStep(setCurrentStep, 5)}
      />
    ),
    3: (
      <InfluencerOnboarding3
        payments={payments}
        setPayments={setPayments}
        prevStep={() => prevStep(setCurrentStep)}
        nextStep={() => nextStep(setCurrentStep, 5)}
      />
    ),
    4: (
      <InfluencerOnboarding4
        campaignMatching={campaignMatching}
        setCampaignMatching={setCampaignMatching}
        prevStep={() => prevStep(setCurrentStep)}
        nextStep={() => nextStep(setCurrentStep, 5)}
        agencyId={agencyId}
      />
    ),
    5: (
      <InfluencerOnboarding5
        data={formData}
        prevStep={() => prevStep(setCurrentStep)}
        submit={submit}
      />
    ),
  };

  return (
    <>
      <div className="onboarding-page-container">
        <div className="onboarding-page-stepper">
          <Stepper
            color={"var(--Primary-Main, #775FFF)"}
            inactiveColor={"var(--Primary-Border, #D2CAFF)"}
            checkpoints={[
              { id: 1, text: "Account Info" },
              { id: 2, text: "Profile Info" },
              { id: 3, text: "Social Info" },
              { id: 4, text: "Payment Info" },
              { id: 5, text: "Campaign Matching" },
              { id: 6, text: "Review Info" },
            ]}
            completed={currentStep + 1}
          />
        </div>
        <div className="onboarding-page-form">{steps[currentStep]}</div>
      </div>
      {isModalOpen && (
        <ModalText
          title={modalText}
          setOpen={() => {}}
          text="Please login to continue"
          goButtonText="Login"
          onGoButtonClick={() => {
            router.push("/login");
          }}
        />
      )}
    </>
  );
};

export default InfluencerOnboarding;
