"use client";
import React from "react";
import Button from "../Button";
import { getIconLink } from "@/utils/functions/iconLinks";

const ButtonIcon: React.FC<ButtonIconProps> = ({
  icon,
  onClick,
  tooltipText,
}) => {
  return (
    <Button
      icon={getIconLink(icon)}
      color="#775FFF"
      borderColor="#D2CAFF"
      borderRadius="100px"
      width="30px"
      height="30px"
      onClick={onClick}
      tooltipText={tooltipText}
    />
  );
};

export default ButtonIcon;

type ButtonIconProps = {
  icon: string;
  onClick?: () => void;
  tooltipText?: string;
};
