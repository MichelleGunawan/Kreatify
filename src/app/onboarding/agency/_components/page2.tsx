"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DisplayImage from "@/components/DisplayImage";
import DisplayText from "@/components/DisplayText";
import Button from "@/components/Button";

// Styles imports
import "@/styles/onboarding.page.scss";
import { formatListWithComma } from "@/utils/functions/format.functions";
import { COLORS } from "@/utils/constants";

const AgencyOnboarding2: React.FC<any> = ({
  img,
  name,
  address,
  city,
  state,
  country,
  website,
  bio,
  dateFounded,
  agencyCommission,
  influencerCommission,
  managerCommission,
  payments,
  email,
  phone,
  prevStep,
  submit,
  isSubmitting,
}) => {
  const router = useRouter();
  const [errors, setErrors] = useState({
    owner_email: "",
  });

  return (
    <div className="onboarding-form">
      <div className="onboarding-summary-box">
        <DisplayImage data={img} size={"100px"} />
        <DisplayText label="Agency Name" value={name} line={true} />
        <DisplayText label="About" value={bio} line={true} />
        <DisplayText
          label="Location"
          value={formatListWithComma([address, city, state, country])}
          line={true}
        />
        <DisplayText label="Website" value={website} line={true} />
        <DisplayText label="Founded Date" value={dateFounded} line={true} />
        <DisplayText label="Agency Email" value={email} line={true} />
        <DisplayText label="Agency Phone" value={phone} line={true} />
        <DisplayText
          label="Agency Commission"
          value={agencyCommission}
          line={true}
        />
        <DisplayText
          label="Influencer Commission"
          value={influencerCommission}
          line={true}
        />
        <DisplayText
          label="Manager Commission"
          value={managerCommission}
          line={true}
        />
        <DisplayText label="Payment" value={payments.join(", ")} line={true} />
      </div>
      {/* <div className="onboarding-summary-box">
        <InputText
          label="Account Owner"
          placeholder="Account owner email"
          value={owner_email}
          onChange={(value) => handleChange(value)}
          error={errors.owner_email}
          type="email"
        />
      </div> */}

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
          backgroundColor={isSubmitting ? COLORS.GREY300 : COLORS.PRIMARY}
          type="submit"
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
};

export default AgencyOnboarding2;
