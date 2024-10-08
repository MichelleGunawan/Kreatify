"use client";
import React, { useState } from "react";

import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import Button from "@/components/Button";
import {
  PaymentOptionsInputType,
  PaymentInputType,
} from "@/types/payments.type";
import { paymentOptions } from "@/utils/variables/payments.variables";

import "./styles/index.scss";
import { COLORS } from "@/utils/constants";

const InputPayments: React.FC<InputPaymentsProps> = ({
  payments,
  setPayments,
  error,
}) => {
  const addPayment = () => {
    setPayments([...payments, { type: "" }]); // Add a new empty payment
  };

  return (
    <div className="input-payments">
      {payments.map((payment, index) => (
        <div key={index} className="input-payments-container">
          <InputSelect
            label="How would you like to receive payment?"
            value={payment.type}
            onChange={(value) => {
              const newPayments = [...payments];
              newPayments[index] = {
                type: value as PaymentOptionsInputType,
                email: "",
                phone: "",
                bank_name: "",
                acct_holder_name: "",
                acct_number: null,
                routing_number: null,
                swift_code: null,
              };
              setPayments(newPayments);
            }}
            options={paymentOptions}
          />

          {payment.type == "Paypal" && (
            <>
              <InputText
                label="Email"
                value={payment.email}
                onChange={(value) => {
                  const newPayments = [...payments];
                  newPayments[index] = {
                    ...newPayments[index],
                    email: value,
                  };
                  setPayments(newPayments);
                }}
                type="email"
              />
            </>
          )}
          {payment.type == "Zelle" && (
            <>
              <InputText
                label="Phone Number"
                value={payment.phone}
                onChange={(value) => {
                  const newPayments = [...payments];
                  newPayments[index] = {
                    ...newPayments[index],
                    phone: value,
                  };
                  setPayments(newPayments);
                }}
                type="tel"
              />
            </>
          )}
          {(payment.type == "Direct Deposit" || payment.type == "Wise") && (
            <>
              <InputText
                label="Bank Name"
                value={payment.bank_name}
                onChange={(value) => {
                  const newPayments = [...payments];
                  newPayments[index] = {
                    ...newPayments[index],
                    email: "",
                    phone: "",
                    bank_name: value,
                  };
                  setPayments(newPayments);
                }}
                type="text"
              />
              <InputText
                label="Account Holder Name"
                value={payment.acct_holder_name}
                onChange={(value) => {
                  const newPayments = [...payments];
                  newPayments[index] = {
                    ...newPayments[index],
                    email: "",
                    phone: "",
                    acct_holder_name: value,
                  };
                  setPayments(newPayments);
                }}
                type="text"
              />
              <InputText
                label="Account Number"
                value={payment.acct_number}
                onChange={(value) => {
                  const newPayments = [...payments];
                  newPayments[index] = {
                    ...newPayments[index],
                    email: "",
                    phone: "",
                    acct_number: Number(value),
                  };
                  setPayments(newPayments);
                }}
                type="number"
              />
              <InputText
                label="Routing Number"
                value={payment.routing_number}
                onChange={(value) => {
                  const newPayments = [...payments];
                  newPayments[index] = {
                    ...newPayments[index],
                    email: "",
                    phone: "",
                    routing_number: Number(value),
                  };
                  setPayments(newPayments);
                }}
                type="number"
              />
              <InputText
                label="Swift Code"
                value={payment.swift_code}
                onChange={(value) => {
                  const newPayments = [...payments];
                  newPayments[index] = {
                    ...newPayments[index],
                    email: "",
                    phone: "",
                    swift_code: Number(value),
                  };
                  setPayments(newPayments);
                }}
                type="number"
              />
            </>
          )}
        </div>
      ))}

      {payments.length <= paymentOptions.length - 1 && (
        <Button
          label="+ Add Payment"
          color={COLORS.PRIMARY}
          borderColor={COLORS.PRIMARY}
          width="216px"
          borderRadius="10px"
          textClass="p2"
          onClick={addPayment}
        />
      )}
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
};

export default InputPayments;

type InputPaymentsProps = {
  payments: PaymentInputType[];
  setPayments: (newpayments: PaymentInputType[]) => void;
  error?: string;
};
