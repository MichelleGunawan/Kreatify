"use client";
import React, { useState } from "react";
import { UUID } from "crypto";
import { PageIdPropsType } from "@/types/utils.type";
import ManagerOnboarding from "./_manager/page";

const OnboardingPage: React.FC<PageIdPropsType> = ({ params }) => {
  return (
    <>
      <ManagerOnboarding />
    </>
  );
};

export default OnboardingPage;
