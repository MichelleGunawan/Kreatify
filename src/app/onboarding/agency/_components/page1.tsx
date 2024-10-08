"use client";
import React, { useState } from "react";
import InputText from "@/components/InputText";
import Button from "@/components/Button";
import InputAcceptedPayments from "@/components/InputAcceptedPayments";
import {
  getCommissionError,
  getPaymentFormError,
} from "@/utils/functions/validation.functions";
import { OnboardingAgencyPaymentInfoFormType } from "@/types/agency.onboarding.types";
import { COLORS } from "@/utils/constants";
// Styles imports
import "@/styles/onboarding.page.scss";

const AgencyOnboarding1: React.FC<OnboardingAgencyPaymentInfoFormType> = ({
  agencyCommission,
  setAgencyCommission,
  influencerCommission,
  setInfluencerCommission,
  managerCommission,
  setManagerCommission,
  payments,
  setPayments,
  prevStep,
  nextStep,
}) => {
  const [errors, setErrors] = useState({
    payments: "",
    commission: "",
  });

  const handleNext = () => {
    const newErrors = {
      payments: getPaymentFormError(payments),
      commission: getCommissionError(
        agencyCommission,
        influencerCommission,
        managerCommission
      ),
    };

    setErrors(newErrors);

    // Check if there are any errors by looking for non-empty error messages
    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (!hasErrors) {
      nextStep();
    }
  };

  return (
    <div className="onboarding-form">
      <div className="grid grid-col-3">
        <InputText
          label="Agency Commission (%)"
          value={agencyCommission}
          onChange={(value) => setAgencyCommission(value)}
          type="text"
        />
        <InputText
          label="Influencer Commission (%)"
          value={influencerCommission}
          onChange={(value) => setInfluencerCommission(value)}
          type="text"
        />
        <InputText
          label="Manager Commission (%)"
          value={managerCommission}
          onChange={(value) => setManagerCommission(value)}
          type="text"
        />
      </div>
      <InputAcceptedPayments
        payments={payments}
        setPayments={(value) => setPayments(value)}
      />
      {errors.payments ? (
        <span className="p2 onboarding-error-text">{errors.payments}</span>
      ) : errors.commission ? (
        <span className="p2 onboarding-error-text">{errors.commission}</span>
      ) : null}

      <div className="onboarding-buttons-container">
        <Button
          label="Previous"
          onClick={prevStep}
          width=" 216px"
          height=" 45px"
          color={COLORS.PRIMARY}
          borderRadius="10px"
          borderColor={COLORS.PRIMARY}
          backgroundColor="transparent"
        />
        <Button
          label="Next"
          onClick={handleNext}
          width=" 216px"
          height=" 45px"
          color="#ffffff"
          borderRadius="10px"
          backgroundColor={COLORS.PRIMARY}
        />
      </div>
    </div>
  );
};

export default AgencyOnboarding1;
