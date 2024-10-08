"use client";
import React, { useState } from "react";
import { useGlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import { UUID } from "crypto";
import Stepper from "@/components/Stepper";
import ManagerOnboarding0 from "./_components/page0";
import ManagerOnboarding1 from "./_components/page1";
import ManagerOnboarding2 from "./_components/page2";
import { nextStep, prevStep } from "../_functions";
import { isExistingEmail } from "@/services/auth/fetch_actions";
import { createManager, createOwner } from "@/services/managers/post_actions";
import { ManagerOnboardingInfoType } from "@/types/user.onboarding.types";
import "@/styles/onboarding.page.scss";

const ManagerOnboarding: React.FC<{
  inviteId?: UUID | null;
  agencyId?: UUID | null;
  role?: string;
  inviteEmail?: string;
}> = ({ inviteId, agencyId, role, inviteEmail }) => {
  const {
    setAgencyId,
    setManagerId,
    setUserId,
    setFirstName,
    setLastName,
    setUserPermission,
  } = useGlobalContext();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [firstNameForm, setFirstNameForm] = useState("");
  const [lastNameForm, setLastNameForm] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(inviteEmail || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [img, setImg] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [sexuality, setSexuality] = useState("");
  const [ethnicities, setEthnicities] = useState<string[]>([]);
  const [signedContract, setSignedContract] = useState<File | null>(null);

  const formData: ManagerOnboardingInfoType = {
    firstName: firstNameForm,
    lastName: lastNameForm,
    phone,
    email,
    password,
    confirmPassword,

    img,
    role: role || "Owner",
    dateOfBirth,
    address,
    state,
    city,
    country,
    gender,
    sexuality,
    ethnicities,
  };

  const submit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    isExistingEmail(email).then((res) => {
      if (res) {
        alert("Email already exists");
        setIsSubmitting(false);
        return;
      }
    });

    if (!inviteId) {
      createOwner({
        userData: formData,
      })
        .then(({ userId, managerId, agencyId }) => {
          if (!agencyId || !managerId || !userId) {
            setIsSubmitting(false);
            alert("Something went wrong. Please try loggin in.");
            return;
          }
          setAgencyId(agencyId);
          setManagerId(managerId);
          setUserId(userId);
          setFirstName(firstNameForm);
          setLastName(lastNameForm);
          setUserPermission("Owner");

          router.push("/onboarding/success");
        })
        .catch((err) => {
          alert(err);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }

    if (agencyId) {
      createManager({
        inviteID: inviteId,
        agency_id: agencyId,
        userData: formData,
      })
        .then(({ userId, managerId }) => {
          if (!agencyId || !managerId || !userId) {
            setIsSubmitting(false);
            router.push("/login");
            return;
          }
          setAgencyId(agencyId); // Ensure prev is an array of UUIDs
          setManagerId(managerId);
          setUserId(userId);
          setFirstName(firstNameForm);
          setLastName(lastNameForm);
          setUserPermission("Manager");

          router.push("/home");
        })
        .catch((err) => {
          alert(err);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  // Define the steps using the Steps type
  const steps: { [key: number]: JSX.Element } = {
    0: (
      <ManagerOnboarding0
        inviteId={inviteId}
        firstName={firstNameForm}
        lastName={lastNameForm}
        phone={phone}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        setFirstName={setFirstNameForm}
        setLastName={setLastNameForm}
        setPhone={setPhone}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        nextStep={() => nextStep(setCurrentStep, 5)}
      />
    ),
    1: (
      <ManagerOnboarding1
        img={img}
        role={role ?? "Owner"}
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
      <ManagerOnboarding2
        data={formData as ManagerOnboardingInfoType}
        prevStep={() => prevStep(setCurrentStep)}
        submit={submit}
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
            { id: 1, text: "Account Info" },
            { id: 2, text: "Profile Info" },
            { id: 3, text: "Review Info" },
          ]}
          completed={currentStep + 1}
        />
      </div>
      <div className="onboarding-page-form">{steps[currentStep]}</div>
    </div>
  );
};

export default ManagerOnboarding;
