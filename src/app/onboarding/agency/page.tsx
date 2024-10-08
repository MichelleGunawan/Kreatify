"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
// Component imports
import Stepper from "@/components/Stepper";
import AgencyOnboarding0 from "./_components/page0";
import AgencyOnboarding1 from "@/app/onboarding/agency/_components/page1";
import AgencyOnboarding2 from "@/app/onboarding/agency/_components/page2";

import { nextStep, prevStep } from "../_functions";
// Styles imports
import "../../../styles/onboarding.page.scss";
import {
  editAgency,
  editAgencyPaymentOptions,
} from "@/services/agency/post_actions";
import {
  PaymentInputType,
  PaymentOptionsInputType,
} from "@/types/payments.type";
import { PaymentOptionsDBType } from "@/types/enum.types";
import { convertToPaymentOptionDBArray } from "@/utils/functions/converter.functions";

const AgencyOnboarding = () => {
  const router = useRouter();
  const { agencyId } = useGlobalContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [logo, setLogo] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [dateFounded, setDateFounded] = useState<string | null>(null);
  const [agencyCommission, setAgencyCommission] = useState(0);
  const [influencerCommission, setInfluencerCommission] = useState(0);
  const [managerCommission, setManagerCommission] = useState(0);
  const [payments, setPayments] = useState<PaymentOptionsInputType[]>([""]);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);

  const submit = async () => {
    if (isSubmitting) return; // Prevent duplicate submissions

    setIsSubmitting(true); // Set state to true when button is pressed

    if (
      logo === null ||
      name === null ||
      country === null ||
      email === null ||
      phone === null
    ) {
      setIsSubmitting(false);
      alert("Please fill in all the required fields");
      return;
    }
    await editAgency({
      agencyID: agencyId,
      logo,
      name,
      address,
      city,
      state,
      country,
      website,
      bio,
      dateFounded,
      agencyCommission,
      influencerCommission,
      managerCommission,
      email,
      phone,
    }).catch((error) => {
      console.error("Agency submission error:", error); // Handle error (optional)
      setIsSubmitting(false); // Reset the state if there’s an error
    });

    editAgencyPaymentOptions({
      agencyID: agencyId,
      payment_options: convertToPaymentOptionDBArray(payments),
    })
      .then((data) => {
        router.push("/home");
      })
      .catch((error) => {
        console.error("Agency payments submission error:", error); // Handle error (optional)
        setIsSubmitting(false); // Reset the state if there’s an error
      });
  };

  // Define the steps using the Steps type
  const steps: { [key: number]: JSX.Element } = {
    0: (
      <AgencyOnboarding0
        logo={logo}
        setLogo={setLogo}
        name={name}
        setName={setName}
        address={address}
        setAddress={setAddress}
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
        country={country}
        setCountry={setCountry}
        website={website}
        setWebsite={setWebsite}
        bio={bio}
        setBio={setBio}
        phone={phone}
        setPhone={setPhone}
        email={email}
        setEmail={setEmail}
        dateFounded={dateFounded}
        setDateFounded={setDateFounded}
        nextStep={() => nextStep(setCurrentStep, 2)}
      />
    ),
    1: (
      <AgencyOnboarding1
        agencyCommission={agencyCommission}
        setAgencyCommission={setAgencyCommission}
        influencerCommission={influencerCommission}
        setInfluencerCommission={setInfluencerCommission}
        managerCommission={managerCommission}
        setManagerCommission={setManagerCommission}
        payments={payments}
        setPayments={setPayments}
        prevStep={() => prevStep(setCurrentStep)}
        nextStep={() => nextStep(setCurrentStep, 2)}
      />
    ),
    2: (
      <AgencyOnboarding2
        logo={logo}
        name={name}
        address={address}
        city={city}
        state={state}
        country={country}
        website={website}
        bio={bio}
        dateFounded={dateFounded}
        agencyCommission={agencyCommission}
        influencerCommission={influencerCommission}
        managerCommission={managerCommission}
        payments={payments}
        email={email}
        phone={phone}
        prevStep={() => prevStep(setCurrentStep)}
        submit={submit}
        isSubmitting={isSubmitting}
      />
    ),
  };

  return (
    <div className="onboarding-page-container">
      <div className="onboarding-page-stepper">
        <Stepper
          color={"var(--Primary-Main, #775FFF)"}
          inactiveColor={"var(--Primary-Border, #D2CAFF)"}
          checkpoints={[
            { id: 1, text: "Agency Info" },
            { id: 2, text: "Payment Info" },
            { id: 3, text: "Review Info" },
          ]}
          completed={Math.min(currentStep, 2)}
        />
      </div>

      <div className="onboarding-page-form">{steps[currentStep]}</div>
    </div>
  );
};

export default AgencyOnboarding;
