"use client";
import React from "react";
// Component imports
import DisplayImage from "@/components/DisplayImage";
import DisplayText from "@/components/DisplayText";
import Button from "@/components/Button";
import { COLORS } from "@/utils/constants";
import { OnboardingManagerPreviewType } from "@/types/user.onboarding.types";

// Styles imports
import "@/styles/onboarding.page.scss";

const ManagementOnboarding3: React.FC<OnboardingManagerPreviewType> = ({
  data,
  prevStep,
  submit,
}) => {
  return (
    <div className="full-width">
      <div className="onboarding-summary-box">
        <DisplayImage data={data.img} size={"100px"} />
        <div className="grid grid-col-2">
          <DisplayText label="First Name" value={data.firstName} line={true} />
          <DisplayText label="Last Name" value={data.lastName} line={true} />
        </div>
        <DisplayText label="Role" value={data.role} line={true} />
        <DisplayText label={"Email"} value={data.email} line={true} />
        <DisplayText label={"Phone Number"} value={data.phone} line={true} />
        <DisplayText
          label={"Address"}
          value={[data.address, data.country].join(", ")}
          line={true}
        />
        <DisplayText
          label={"Date of Birth"}
          value={data.dateOfBirth}
          line={true}
        />
        <DisplayText
          label={"Ethnicity"}
          value={[data.ethnicities].join(", ")}
          line={true}
        />
        <DisplayText label={"Gender"} value={data.gender} line={true} />
        <DisplayText label={"Sexuality"} value={data.sexuality} line={true} />
        {/* <DisplayText
          label={"Contract"}
          value={data.signedContract?.name || "None"}
          line={true}
        /> */}
      </div>
      <div className="onboarding-buttons-container">
        <Button
          label="Previous"
          onClick={prevStep}
          width=" 216px"
          height=" 45px"
          color={COLORS.PRIMARY}
          borderRadius="10px"
          borderColor={COLORS.PRIMARY}
          backgroundColor="transparent"
        />
        <Button
          label="Submit"
          onClick={submit}
          width=" 216px"
          height=" 45px"
          color="#ffffff"
          borderRadius="10px"
          backgroundColor={COLORS.PRIMARY}
          type="submit"
        />
      </div>
    </div>
  );
};

export default ManagementOnboarding3;
