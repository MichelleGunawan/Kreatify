"use client";
import React, { useState, useRef } from "react";

// Component imports
import InputText from "@/components/InputText";
import Separator from "@/components/Separator";
import Button from "@/components/Button";
import ButtonGoogleLogin from "@/components/ButtonGoogleLogin";
import {
  getEmailError,
  getPasswordError,
  getPhoneError,
} from "@/utils/functions/validation.functions";
import { COLORS } from "@/utils/constants";
import { OnboardingLoginFormType } from "@/types/user.onboarding.types";
import "@/styles/onboarding.page.scss";

const TalentOnboarding0: React.FC<OnboardingLoginFormType> = ({
  firstName,
  lastName,
  phone,
  email,
  password,
  confirmPassword,

  setFirstName,
  setLastName,
  setPhone,
  setEmail,
  setPassword,
  setConfirmPassword,
  nextStep,
}) => {
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleNext = () => {
    const emailError = getEmailError(email);
    const phoneError = getPhoneError(phone);
    const passwordErrors = getPasswordError(password, confirmPassword);

    if (
      !firstName ||
      !lastName ||
      emailError ||
      phoneError ||
      passwordErrors?.password ||
      passwordErrors?.confirmPassword
    ) {
      setErrors({
        ...errors,
        firstName: !firstName ? "Please enter first name" : "",
        lastName: !lastName ? "Please enter last name" : "",
        email: getEmailError(email),
        phone: getPhoneError(phone),
        password: passwordErrors?.password || "",
        confirmPassword: passwordErrors?.confirmPassword || "",
      });
      return;
    }
    nextStep();
  };

  return (
    <div className="onboarding-form">
      <div className="grid grid-col-2">
        <InputText
          label="First Name"
          value={firstName}
          onChange={(value) => setFirstName(value)}
          error={errors.firstName}
          placeholder=""
          type="text"
        />
        <InputText
          label="Last Name"
          value={lastName}
          onChange={(value) => setLastName(value)}
          error={errors.lastName}
          placeholder=""
          type="text"
        />
      </div>
      <InputText
        label="Email"
        value={email}
        onChange={(value) => setEmail(value)}
        error={errors.email}
        placeholder=""
        type="email"
        disabled
      />
      <InputText
        label="Phone Number"
        value={phone}
        onChange={(value) => setPhone(value)}
        error={errors.phone}
        placeholder=""
        type="tel"
      />
      <InputText
        label="Password"
        value={password}
        onChange={(value) => setPassword(value)}
        error={errors.password}
        placeholder=""
        type="password"
      />
      <InputText
        label="Confirm Password"
        value={confirmPassword}
        onChange={(value) => setConfirmPassword(value)}
        error={errors.confirmPassword}
        placeholder=""
        type="password"
      />

      <div className="onboarding-buttons-container">
        <Button
          label="Next"
          onClick={handleNext}
          height=" 45px"
          color="#ffffff"
          borderRadius="10px"
          backgroundColor={COLORS.PRIMARY}
        />
      </div>
      <div className="onboarding-button-separator">
        <Separator />
        <div className="p2 text-black ml-2 mr-2">OR</div>
        <Separator />
      </div>
      <ButtonGoogleLogin />
    </div>
  );
};

export default TalentOnboarding0;
