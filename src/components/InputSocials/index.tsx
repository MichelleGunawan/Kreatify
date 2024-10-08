"use client";
import React, { useState } from "react";

import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import Button from "@/components/Button";

import { socialPlatformOptions } from "@/utils/variables/socials.variables";
import { SocialPlatformsType, SocialInputType } from "@/types/social.type";
import { getIconLink } from "@/utils/functions/iconLinks";
import { formatHandleToString } from "@/utils/functions/format.functions";
import "./styles/index.scss";
import { COLORS } from "@/utils/constants";

const InputSocials: React.FC<InputSocialsProps> = ({
  socials,
  setSocials,
  error,
}) => {
  const addSocial = () => {
    setSocials([...socials, { id: null, platform: "", handle: "" }]); // Add a new empty payment
  };

  const onLinkButtonClick = (platform: string) => {
    window.open(getIconLink(platform), "_blank");
  };

  return (
    <div className="input-socials">
      {socials?.map((social, index) => (
        <div key={index} className="input-socials-container">
          <InputSelect
            label="Platform"
            value={social.platform ?? ""}
            onChange={(value) => {
              const newSocials = [...socials];
              newSocials[index] = {
                id: null,
                platform: value as SocialPlatformsType,
                handle: "",
              };
              setSocials(newSocials);
            }}
            options={socialPlatformOptions}
          />
          <InputText
            label="Handle"
            placeholder="@michelle"
            value={`@${formatHandleToString(social.handle)}`}
            onChange={(value) => {
              const newSocials = [...socials];
              newSocials[index] = {
                id: null,
                platform: newSocials[index].platform,
                handle: value,
              };
              setSocials(newSocials);
            }}
            type="text"
          />
          {social.platform && (
            <Button
              icon={getIconLink(social.platform)}
              label={`Link ${social.platform}`}
              color={COLORS.PRIMARY}
              borderColor={COLORS.PRIMARY}
              compress={false}
              borderRadius="10px"
            />
          )}
        </div>
      ))}
      {(!socials || socials?.length <= 5) && (
        <Button
          label="+ Add Social"
          color={COLORS.PRIMARY}
          borderColor={COLORS.PRIMARY}
          width="216px"
          borderRadius="10px"
          textClass="p2"
          onClick={addSocial}
        />
      )}
      {error && <span className="p2 onboarding-error-text">{error}</span>}
    </div>
  );
};

export default InputSocials;

type InputSocialsProps = {
  socials: SocialInputType[];
  setSocials: (newSocials: SocialInputType[]) => void;
  error?: string;
};
