"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Separator from "@/components/Separator";
import ButtonGoogleLogin from "@/components/ButtonGoogleLogin";
import Card from "@/components/Card";
import "@/styles/login.page.scss";
import { isExistingEmail, loginUser } from "@/services/auth/fetch_actions";
import { COLORS } from "@/utils/constants";
import { useSession } from "@/hooks/useSession";

const LoginScreen = () => {
  const {
    setFirstName,
    setLastName,
    setUserId,
    setTalentId,
    setManagerId,
    setAgencyId,
    setUserPermission,
  } = useGlobalContext();
  const { sessionLoading } = useSession({});
  const router = useRouter();
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      setErrors({
        ...errors,
        email: !email ? "Please enter email" : "",
        password: !password ? "Please enter password" : "",
      });
      return;
    }

    if (!isExistingEmail(email)) {
      setErrors({
        ...errors,
        email: "Email does not exist",
      });

      return;
    }

    await loginUser({ email, password }).then(
      ({
        firstName,
        lastName,
        userId,
        influencerId,
        managerId,
        userPermission,
        agencyId,
      }) => {
        if (
          !userId &&
          (!influencerId || !managerId) &&
          !userPermission &&
          !agencyId
        ) {
          setErrors({
            email: "Invalid credentials",
            password: "Invalid credentials",
          });
          return;
        }
        if (firstName) setFirstName(firstName);
        if (lastName) setLastName(lastName);
        if (userId) setUserId(userId);
        if (influencerId) setTalentId(influencerId);
        if (managerId) setManagerId(managerId);
        if (agencyId) setAgencyId(agencyId);
        setUserPermission(userPermission);

        router.push(`/home`);
      }
    );
  };

  return (
    <div className="login-form">
      <Card style={{ padding: "60px", gap: "20px", maxHeight: "none" }}>
        <div className="login-form-header-container">
          <h1 className="h1 login-header">Login</h1>
          <p className="p2 login-subheader">
            New to Kreatify?
            <a href="/onboarding" className="login-link">
              Create an account
            </a>
          </p>
        </div>
        <InputText
          label="Email"
          value={formData.email}
          onChange={(value) => {
            setFormData({
              ...formData,
              email: value,
            });
          }}
          error={errors.email}
          type="text"
        />
        <InputText
          label="Password"
          value={formData.password}
          onChange={(value) => {
            setFormData({
              ...formData,
              password: value,
            });
          }}
          error={errors.password}
          type="password"
        />
        <div className="login-form-footer">
          <p></p>
          <p
            className="p2 login-link"
            onClick={() => {
              router.push(`/login/forgotpassword`);
            }}
          >
            Forgot Password?
          </p>
        </div>

        <div className="login-buttons-container">
          <Button
            label="Next"
            onClick={handleLogin}
            height=" 45px"
            color="#ffffff"
            borderRadius="10px"
            borderColor={COLORS.PRIMARY}
            backgroundColor={COLORS.PRIMARY}
          />
        </div>
        <div className="login-button-separator">
          <Separator />
          <div className="p2 text-black ml-2 mr-2">OR</div>
          <Separator />
        </div>
        <ButtonGoogleLogin />
      </Card>
    </div>
  );
};

export default LoginScreen;
