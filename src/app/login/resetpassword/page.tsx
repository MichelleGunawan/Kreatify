"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import { getPasswordError } from "@/utils/functions/validation.functions";

import "@/styles/login.page.scss";
import { COLORS } from "@/utils/constants";
import Card from "@/components/Card";

const ResetPasswordScreen = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleResetPassword = () => {
    const errors = getPasswordError(password, confirmPassword);
    const passwordError = errors.password;
    const confirmPasswordError = errors.confirmPassword;
    if (passwordError) {
      setPasswordError(passwordError);
    }

    if (confirmPasswordError) {
      setPasswordError(confirmPasswordError);
    }

    // go to login page
    if (!passwordError && !confirmPasswordError) {
      router.push(`/login`);
    }
  };

  return (
    <div className="login-form">
      <Card style={{ padding: "60px", gap: "20px" }}>
        <div className="login-form-header-container">
          <h1 className="h1 login-header">Reset Password</h1>
          <p className="p2 login-subheader">Enter your details below</p>
        </div>
        <InputText
          label="Password"
          value={password}
          onChange={(value) => setPassword(value)}
          error={passwordError}
          type="text"
        />
        <InputText
          label="Confirm New Password"
          value={confirmPassword}
          onChange={(value) => setConfirmPassword(value)}
          error={passwordError}
          type="password"
        />

        <div className="login-buttons-container">
          <Button
            label="Next"
            onClick={handleResetPassword}
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

export default ResetPasswordScreen;
