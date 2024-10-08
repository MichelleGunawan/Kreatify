"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Card from "@/components/Card";
import { getEmailError } from "@/utils/functions/validation.functions";
import { COLORS } from "@/utils/constants";
import "@/styles/login.page.scss";

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailSubmit = () => {
    if (getEmailError(email)) {
      setEmailError(getEmailError(email));
      return;
    }

    alert("Please check your email for reset link");
  };

  return (
    <div className="login-form">
      <Card style={{ padding: "60px", gap: "20px" }}>
        <div className="login-form-header-container">
          <h1 className="h1 login-header">Forgot Password?</h1>
          <p className="p2 login-subheader">
            No worries! Just enter your email address below, and we&apos;ll send
            you a link to reset it. Get back on track in no time!
          </p>
        </div>
        <InputText
          label="Email"
          value={email}
          onChange={(value) => {
            setEmail(value);
          }}
          error={emailError}
          type="text"
        />

        <div className="login-buttons-container">
          <Button
            label="Next"
            onClick={handleEmailSubmit}
            height=" 45px"
            color="#ffffff"
            borderRadius="10px"
            borderColor={COLORS.PRIMARY}
            backgroundColor={COLORS.PRIMARY}
          />
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordScreen;
