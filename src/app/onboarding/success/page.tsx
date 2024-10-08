"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import Card from "@/components/Card";
import { getIconLink } from "@/utils/functions/iconLinks";
// Styles imports
import "@/styles/onboarding.page.scss";
import Button from "@/components/Button";
import { COLORS } from "@/utils/constants";

const OnboardingSuccessPage = ({}) => {
  const router = useRouter();
  return (
    <Card>
      <div className="onboarding-success">
        <Icon link={getIconLink("submitsuccess")} size={100} />
        <h1 className="h1 onboarding-title text-black">Congratulations!</h1>
        <p className="p1 onboarding-text text-black">
          You&apos;ve successfully created an account! Onboard your agency to
          unlock all of Kreatify&apos;s features.
        </p>
        <Button
          color={COLORS.PRIMARY}
          borderColor={COLORS.PRIMARY}
          label="Onboard Agency"
          width="200px"
          borderRadius="10px"
          onClick={() => {
            router.push("/onboarding/agency");
          }}
        />

        <Button
          color="var(--grey-color-500)"
          borderColor="var(--grey-color-500)"
          label="Skip for now"
          width="200px"
          borderRadius="10px"
          onClick={() => {
            router.push("/home");
          }}
        />
      </div>
    </Card>
  );
};

export default OnboardingSuccessPage;
