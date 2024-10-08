"use client";
import React, { useState } from "react";

import InputPayments from "@/components/InputPayments";
import Separator from "@/components/Separator";
import Button from "@/components/Button";
import { OnboardingPaymentFormTypeInfluencer } from "@/types/user.onboarding.types";
import { PaymentType } from "@/types/payments.type";
import { COLORS } from "@/utils/constants";
import "@/styles/onboarding.page.scss";

const TalentOnboarding3: React.FC<OnboardingPaymentFormTypeInfluencer> = ({
  payments,
  setPayments,
  prevStep,
  nextStep,
}) => {
  const [errors, setErrors] = useState({
    payments: "",
  });

  const handleChange = (newPayment: PaymentType[]) => {
    setErrors({ payments: "" });
    setPayments(newPayment);
  };

  /**
   * Handles the form submission and calls the nextStep function if all
   * requirements are met.
   */
  const handleNext = () => {
    // Filter out duplicate payment methods and empty strings
    const filteredPayments = payments.filter(
      (payment) => payment.type !== null
    );

    // Check if at least one payment method is provided
    if (filteredPayments.length < 1) {
      setErrors({
        payments:
          filteredPayments.length < 1
            ? "At least one payment method is required"
            : "",
      });
      return;
    }

    // Call the nextStep function if the requirements are met
    nextStep();
  };

  return (
    <div className="onboarding-form">
      <InputPayments
        payments={payments}
        setPayments={handleChange}
        error={errors.payments}
      />

      <Separator />

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

export default TalentOnboarding3;
