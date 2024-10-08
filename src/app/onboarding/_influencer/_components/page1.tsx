"use client";
import React, { useState } from "react";

// Component imports
import ImageUpload from "@/components/ImageUpload";
import InputText from "@/components/InputText";
import InputSelect from "@/components/InputSelect";
import InputMultiselect from "@/components/InputMultiselect";
import Button from "@/components/Button";
import InputSelectCountry from "@/components/InputSelectCountry";
import { COLORS } from "@/utils/constants";
import { OnboardingProfileFormType } from "@/types/user.onboarding.types";
import {
  genderOptions,
  sexualityOptions,
  ethnicityOptions,
  usCitiesOptions,
  usStatesOptions,
} from "@/utils/variables/onboarding.variables";
import { getIconLink } from "@/utils/functions/iconLinks";
import "@/styles/onboarding.page.scss";

const TalentOnboarding1: React.FC<OnboardingProfileFormType> = ({
  img,
  role,
  dateOfBirth,
  address,
  country,
  state,
  city,
  gender,
  sexuality,
  ethnicities,
  setImg,
  setDateOfBirth,
  setAddress,
  setCountry,
  setState,
  setCity,
  setGender,
  setSexuality,
  setEthnicities,

  prevStep,
  nextStep,
}) => {
  const [errors, setErrors] = useState({
    img: "",
    role: "",
    dateOfBirth: "",
    address: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    sexuality: "",
    ethnicities: "",
    contract: "",
  });

  const handleNext = () => {
    if (!role) {
      alert("Role not loaded. Please reload page and try again");
      return;
    }

    if (!img || !dateOfBirth || !address || !country) {
      setErrors({
        ...errors,
        img: !img ? "Please upload an image" : "",
        // role: !role ? "role not loaded. Please reload page and try again" : "",
        dateOfBirth: !dateOfBirth ? "Please enter a date of birth" : "",
        address: !address ? "Please enter an address" : "",
        country: !country ? "Please select a country" : "",
      });
      return;
    }

    nextStep();
  };

  return (
    <div className="onboarding-form">
      <ImageUpload
        data={img}
        handleChange={(field, value) => setImg(value)}
        label="Profile Pic"
        error={errors?.img}
        color={COLORS.PRIMARY}
        icon={getIconLink("person")}
      />
      {/* TODO: value should be taken from email link, onChange should return null  */}
      <InputText
        label="Exclusive/Non-exclusive"
        value={role}
        onChange={() => {}}
        error={errors?.role}
        disabled={true}
      />
      <InputText
        label="Address"
        value={address}
        onChange={(value) => setAddress(value)}
        error={errors?.address}
      />
      <div className="grid grid-col-2">
        <InputSelect
          label="City"
          value={city}
          onChange={(value) => setCity(value)}
          options={usCitiesOptions}
          error={errors?.city}
        />
        <InputSelect
          label="State"
          value={state}
          onChange={(value) => setState(value)}
          options={usStatesOptions}
          error={errors?.state}
        />
      </div>
      <InputSelectCountry
        label="Country"
        value={country}
        onChange={(value) => setCountry(value)}
        error={errors?.country}
      />
      <InputText
        label="Date of Birth"
        value={dateOfBirth}
        onChange={(value) => setDateOfBirth(value)}
        error={errors?.dateOfBirth}
        placeholder="Date of Birth"
        type="date"
      />
      <InputMultiselect
        label="Ethnicity"
        value={ethnicities}
        onChange={(value) => setEthnicities(value)}
        options={ethnicityOptions}
        error={errors?.ethnicities}
      />
      <div className="grid grid-col-2">
        <InputSelect
          label="Gender"
          value={gender}
          onChange={(value) => setGender(value)}
          options={genderOptions}
          error={errors?.gender}
        />
        <InputSelect
          label="Sexuality"
          value={sexuality}
          onChange={(value) => setSexuality(value)}
          options={sexualityOptions}
          error={errors?.sexuality}
        />
      </div>
      {/* <InputFile
        label="Signed Contract"
        file={signedContract}
        onChange={(value) => setSignedContract(value)}
        error={errors?.contract}
        accept=".pdf"
      /> */}
      <div className="onboarding-buttons-container">
        <Button
          label="Previous"
          onClick={prevStep}
          width="216px"
          height="45px"
          color={COLORS.PRIMARY}
          borderRadius="10px"
          borderColor={COLORS.PRIMARY}
          backgroundColor="transparent"
        />

        <Button
          label="Next"
          onClick={handleNext}
          width=" 216px"
          height=" 45px"
          color="#ffffff"
          borderRadius="10px"
          backgroundColor={COLORS.PRIMARY}
        />
      </div>
    </div>
  );
};

export default TalentOnboarding1;
