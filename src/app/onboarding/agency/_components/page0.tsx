"use client";
import React, { useState, useRef } from "react";
// Component imports
import InputText from "@/components/InputText";
import ImageUpload from "@/components/ImageUpload";
import Button from "@/components/Button";
import { getIconLink } from "@/utils/functions/iconLinks";
import InputSelect from "@/components/InputSelect";
import {
  usCitiesOptions,
  usStatesOptions,
} from "@/utils/variables/onboarding.variables";
import InputSelectCountry from "@/components/InputSelectCountry";
// Styles imports
import "@/styles/onboarding.page.scss";
import { COLORS } from "@/utils/constants";
import { OnboardingAgencyInfoFormType } from "@/types/agency.onboarding.types";

const AgencyOnboarding0: React.FC<OnboardingAgencyInfoFormType> = ({
  logo,
  setLogo,
  name,
  setName,
  bio,
  setBio,
  address,
  setAddress,
  city,
  setCity,
  state,
  setState,
  country,
  setCountry,
  website,
  setWebsite,
  dateFounded,
  setDateFounded,
  email,
  setEmail,
  phone,
  setPhone,
  nextStep,
}) => {
  const [errors, setErrors] = useState({
    logo: "",
    name: "",
    country: "",
    email: "",
    phone: "",
  });

  const handleNext = () => {
    const newErrors = {
      logo: !logo ? "Agency logo is required" : "",
      name: !name ? "Agency name is required" : "",
      country: !country ? "Agency country is required" : "",
      email: !email ? "Agency email is required" : "",
      phone: !phone ? "Agency phone is required" : "",
    };

    setErrors(newErrors);

    // Check if there are any errors by looking for non-empty error messages
    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (!hasErrors) {
      nextStep();
    }
  };

  return (
    <div className="onboarding-form">
      <ImageUpload
        data={logo}
        handleChange={(field, value) => {
          setErrors({
            ...errors,
            logo: "",
          });
          setLogo(value);
        }}
        icon={getIconLink("person")}
        label="Agency Logo*"
        color={COLORS.PRIMARY}
        error={errors.logo}
      />
      <InputText
        label="Agency Name*"
        value={name}
        onChange={(value) => {
          setErrors({ ...errors, name: "" });
          setName(value);
        }}
        error={errors.name}
        placeholder=""
      />
      <InputText
        label="About"
        value={bio}
        onChange={(value) => setBio(value)}
        maxRows={20}
        placeholder=""
      />
      <InputText
        label="Website"
        value={website}
        onChange={(value) => setWebsite(value)}
        placeholder=""
      />
      <InputText
        label="Address"
        value={address}
        onChange={(e) => {
          setAddress(e);
        }}
        // error={errors.address}
      />
      <InputText
        label="Founded Date"
        value={dateFounded}
        onChange={(value) => setDateFounded(value)}
        placeholder=""
        type="date"
      />
      <InputSelect
        label="State"
        value={state || ""}
        onChange={(e) => {
          setState(e);
        }}
        options={usStatesOptions}
        // error={errors.state}
      />
      <InputSelect
        label="City"
        value={city || ""}
        onChange={(e) => {
          setCity(e);
        }}
        options={usCitiesOptions}
        // error={errors.city}
      />
      <InputSelectCountry
        label="Country*"
        value={country || ""}
        onChange={(e) => {
          setErrors({ ...errors, country: "" });
          setCountry(e);
        }}
        error={errors.country}
      />
      <InputText
        label="Agency Email*"
        value={email}
        onChange={(value) => {
          setErrors({ ...errors, email: "" });
          setEmail(value);
        }}
        error={errors.email}
        placeholder=""
      />
      <InputText
        label="Agency Phone Number*"
        value={phone}
        onChange={(value) => {
          setErrors({ ...errors, phone: "" });
          setPhone(value);
        }}
        error={errors.phone}
        placeholder=""
        type="tel"
      />

      <div className="onboarding-buttons-container">
        <div></div>
        <Button
          label="Next"
          onClick={handleNext}
          width=" 216px"
          height=" 45px"
          color="#ffffff"
          borderRadius="10px"
          borderColor={COLORS.PRIMARY}
          backgroundColor={COLORS.PRIMARY}
        />
      </div>
    </div>
  );
};

export default AgencyOnboarding0;
