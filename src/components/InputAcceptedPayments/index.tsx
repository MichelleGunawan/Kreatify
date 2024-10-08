"use client";
import React, { useState } from "react";

import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";

import { paymentOptions } from "@/utils/variables/payments.variables";
import { PaymentOptionsInputType } from "@/types/payments.type";
import { COLORS } from "@/utils/constants";
import "./styles/index.scss";

const InputAcceptedPayments: React.FC<InputAcceptedPaymentsProps> = ({
  payments,
  setPayments,
  error,
}) => {
  const addPayment = () => {
    setPayments([...payments, "" as PaymentOptionsInputType]); // Add a new empty payment
  };

  return (
    <div className="input-accepted-payments">
      <div className="h2 input-accepted-payments-label">
        How would you like to pay your influencers?
      </div>
      {payments.map((payment, index) => (
        <InputSelect
          key={index}
          value={payment}
          onChange={(value) => {
            const newPayments = [...payments];
            newPayments[index] = value as PaymentOptionsInputType;
            setPayments(newPayments);
          }}
          options={paymentOptions}
        />
      ))}
      {payments.length <= 3 && (
        <Button
          label="+ Add Payment"
          color={COLORS.PRIMARY}
          borderColor={COLORS.PRIMARY}
          borderRadius="10px"
          width="216px"
          textClass="p2"
          onClick={addPayment}
        />
      )}

      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
};

export default InputAcceptedPayments;

type InputAcceptedPaymentsProps = {
  payments: string[];
  setPayments: (newPayments: string[]) => void;
  error?: string;
};
