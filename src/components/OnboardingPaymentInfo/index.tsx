"use client";
import React from "react";
import DisplayText from "../DisplayText";
import { PaymentType } from "@/types/payments.type";
import "./styles/index.scss";

const OnboardingPaymentInfo: React.FC<OnboardingPaymentInfoProps> = ({
  payment,
}) => {
  return (
    <div className="display-payment-container">
      <DisplayText label={"Type"} value={payment.type} line={true} />
      {payment.type === "Zelle" && (
        <DisplayText label="Phone" value={payment.phone || ""} line={true} />
      )}
      {payment.type === "Paypal" && (
        <DisplayText label={"Email"} value={payment.email || ""} line={true} />
      )}
      {(payment.type === "Direct Deposit" || payment.type === "Wise") && (
        <>
          <DisplayText
            label={"Account Holder Name"}
            value={payment.acct_holder_name || ""}
            line={true}
          />
          <DisplayText
            label={"Account Number"}
            value={payment.acct_number?.toString() || ""}
            line={true}
          />
          <DisplayText
            label={"Routing Number"}
            value={payment.routing_number?.toString() || ""}
            line={true}
          />
          <DisplayText
            label={"Swift Code"}
            value={payment.swift_code?.toString() || ""}
            line={true}
          />
        </>
      )}
    </div>
  );
};

export default OnboardingPaymentInfo;

type OnboardingPaymentInfoProps = {
  payment: PaymentType;
};
