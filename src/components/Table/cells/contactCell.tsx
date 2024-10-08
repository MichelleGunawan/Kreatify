"use client";
import React, { useState } from "react";
import Icon from "@/components/Icon";
import Alert from "@/components/Alert";
import { ContactInfoType } from "@/types/utils.type";
import { getIconLink } from "@/utils/functions/iconLinks";

// Custom components
import "../styles/index.scss";
import { COLORS } from "@/utils/constants";

const ContactCell: React.FC<ContactCellProp> = ({ content }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleIconClick = (icon: string, value: string | number) => {
    if (icon !== "chat" && typeof value === "string") {
      setShowAlert(true);
      navigator.clipboard.writeText(value);
    }
  };
  return (
    <>
      {Object.entries(content).map(([key, value]) => (
        <>
          {key && value && (
            <Icon
              key={key}
              link={getIconLink(key)}
              size={24}
              color={COLORS.PRIMARY}
              tooltipText={
                key !== "chat" && typeof value === "string"
                  ? value
                  : "Chat now!"
              }
              onClick={() => handleIconClick(key, value)}
            />
          )}
        </>
      ))}
      {showAlert && (
        <Alert
          text="Copied!"
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
    </>
  );
};

export default ContactCell;

type ContactCellProp = {
  content: ContactInfoType;
};
