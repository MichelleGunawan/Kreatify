"use client";
import React, { useState } from "react";

import InputSocials from "@/components/InputSocials";
import Separator from "@/components/Separator";
import Button from "@/components/Button";
import { SocialInputType } from "@/types/social.type";
import { COLORS } from "@/utils/constants";
import { OnboardingSocialFormType } from "@/types/user.onboarding.types";
import "@/styles/onboarding.page.scss";

const TalentOnboarding2: React.FC<OnboardingSocialFormType> = ({
  socials,
  setSocials,
  prevStep,
  nextStep,
}) => {
  const [errors, setErrors] = useState({
    socials: "",
  });

  const handleChange = (newSocial: SocialInputType[]) => {
    setErrors({ socials: "" });
    setSocials(newSocial);
  };

  /**
   * Handles the form submission and calls the nextStep function if all
   * requirements are met.
   */
  const handleNext = () => {
    // Filter out duplicate socials and empty strings
    const filteredSocials = socials.filter(
      (social: SocialInputType) =>
        social.platform !== null && social.handle !== ""
    );

    // Check if at least one social is provided
    if (filteredSocials.length < 1) {
      setErrors({
        socials:
          filteredSocials.length < 1 ? "At least one social is required" : "",
      });
      return;
    }

    // Call the nextStep function if the requirements are met
    nextStep();
  };

  return (
    <div className="onboarding-form">
      <InputSocials
        socials={socials as SocialInputType[]}
        setSocials={handleChange}
        error={errors.socials}
      />
      <Separator />

      <div className="onboarding-buttons-container">
        <Button
          label="Previous"
          onClick={prevStep}
          width=" 216px"
          height=" 45px"
          color={COLORS.PRIMARY}
          borderColor={COLORS.PRIMARY}
          backgroundColor="transparent"
        />

        <Button
          label="Next"
          onClick={handleNext}
          width=" 216px"
          height=" 45px"
          color="#ffffff"
          backgroundColor={COLORS.PRIMARY}
        />
      </div>
    </div>
  );
};

export default TalentOnboarding2;
