"use client";
import React, { useState, Dispatch, SetStateAction } from "react";

// Custom components
import Button from "../Button";
import { COLORS } from "@/utils/constants";
import Card from "@/components/Card";
import "./styles/index.scss";

const CardOnboardAgency: React.FC<CardOnboardAgencyProps> = ({
  setModalEditOpen,
}) => {
  return (
    <Card
      style={{
        padding: "40px",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <p className="h1 onboarding-text text-black">
        Onboard your agency to unlock all of Kreatify&apos;s features!
      </p>
      <ul className="agency-list">
        <li>Add managers onto your team</li>
        <li>Sort talents by custom campaign matching questins</li>
        <li>Add custom logo to your pitch lists</li>
      </ul>

      <Button
        color={COLORS.PRIMARY}
        borderColor={COLORS.PRIMARY}
        label="Onboard Agency"
        width="200px"
        borderRadius="10px"
        onClick={() => {
          setModalEditOpen(true);
        }}
      />
    </Card>
  );
};

export default CardOnboardAgency;

type CardOnboardAgencyProps = {
  setModalEditOpen: Dispatch<SetStateAction<boolean>>;
};
