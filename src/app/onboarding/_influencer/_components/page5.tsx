"use client";
import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import DisplayImage from "@/components/DisplayImage";
import DisplayText from "@/components/DisplayText";
import OnboardingPaymentInfo from "@/components/OnboardingPaymentInfo";
import Button from "@/components/Button";
import { getIconLink } from "@/utils/functions/iconLinks";
import { OnboardingInfluencerPreviewType } from "@/types/user.onboarding.types";
import "@/styles/onboarding.page.scss";

const TalentOnboarding5: React.FC<OnboardingInfluencerPreviewType> = ({
  data,
  prevStep,
  submit,
}) => {
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isCampaignMatchingOpen, setIsCampaignMatchingOpen] = useState(false);

  const handleSocialClick = () => {
    setIsSocialOpen(!isSocialOpen);
  };
  const handlePaymentClick = () => {
    setIsPaymentOpen(!isPaymentOpen);
  };
  const handleCampaignMatchingClick = () => {
    setIsCampaignMatchingOpen(!isCampaignMatchingOpen);
  };

  return (
    <div className="full-width">
      <div className="onboarding-summary-box">
        <div className="grid grid-col-1">
          <DisplayImage data={data?.img} size={"100px"} />
        </div>

        <div className="grid grid-col-2">
          <DisplayText label="First Name" value={data.firstName} line={true} />
          <DisplayText label="Last Name" value={data.lastName} line={true} />
        </div>
        <DisplayText label="Role" value={data.role} line={true} />
        <DisplayText label={"Email"} value={data.email} line={true} />
        <DisplayText label={"Phone Number"} value={data.phone} line={true} />
        <DisplayText
          label={"Address"}
          value={[data.address, data.city, data.country].join(", ")}
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
          value={data.signed_contract_url?.name || "None"}
          line={true}
        /> */}
      </div>
      <div className="onboarding-summary-box">
        <div
          className="onboarding-summary-header-container"
          onClick={handleSocialClick}
        >
          <p className="h1 onboarding-summary-header-text">Social Info</p>
          <div className={isSocialOpen ? "onboarding-open" : ""}>
            <ReactSVG
              src={getIconLink("down")}
              beforeInjection={(svg) => {
                svg.setAttribute(
                  "style",
                  "width: 24px; height: 24px; transition: transform 0.3s;"
                );
                const paths = svg.querySelectorAll("path");
                paths.forEach((path) => {
                  path.setAttribute("stroke", "#a4a4a4");
                });
              }}
            />
          </div>
        </div>
        {isSocialOpen &&
          data?.socials?.map(({ platform, handle }, index) => (
            <>
              {platform && (
                <DisplayText
                  key={index}
                  label={platform}
                  value={handle}
                  line={true}
                />
              )}
            </>
          ))}
      </div>
      <div className="onboarding-summary-box">
        <div
          className="onboarding-summary-header-container"
          onClick={handlePaymentClick}
        >
          <p className="h1 onboarding-summary-header-text">Payment Info</p>
          <div className={isPaymentOpen ? "onboarding-open" : ""}>
            <ReactSVG
              src={getIconLink("down")}
              beforeInjection={(svg) => {
                svg.setAttribute(
                  "style",
                  "width: 24px; height: 24px; transition: transform 0.3s;"
                );
                const paths = svg.querySelectorAll("path");
                paths.forEach((path) => {
                  path.setAttribute("stroke", "#a4a4a4");
                });
              }}
            />
          </div>
        </div>
        {isPaymentOpen &&
          data.payment_info.map((payment, index) => {
            return <OnboardingPaymentInfo key={index} payment={payment} />;
          })}
      </div>

      {data.campaignMatchingAnswers.length > 0 && (
        <div className="onboarding-summary-box">
          <div
            className="onboarding-summary-header-container"
            onClick={handleCampaignMatchingClick}
          >
            <p className="h1 onboarding-summary-header-text">
              Campaign Matching Info
            </p>
            <div className={isCampaignMatchingOpen ? "onboarding-open" : ""}>
              <ReactSVG
                src={getIconLink("down")}
                beforeInjection={(svg) => {
                  svg.setAttribute(
                    "style",
                    "width: 24px; height: 24px; transition: transform 0.3s;"
                  );
                  const paths = svg.querySelectorAll("path");
                  paths.forEach((path) => {
                    path.setAttribute("stroke", "#a4a4a4");
                  });
                }}
              />
            </div>
          </div>
          {isCampaignMatchingOpen &&
            data.campaignMatchingAnswers.map((question, index) => (
              <DisplayText
                key={index}
                label={question?.question || `Question ${index + 1}`}
                value={
                  Array.isArray(question.answer)
                    ? question.answer.join(", ")
                    : question.answer
                }
                line={true}
              />
            ))}
        </div>
      )}

      <div className="onboarding-buttons-container">
        <Button
          label="Previous"
          onClick={prevStep}
          width=" 216px"
          height=" 45px"
          color="#775fff"
          borderRadius="10px"
          borderColor="#775fff"
          backgroundColor="transparent"
        />

        <Button
          label="Submit"
          onClick={submit}
          width=" 216px"
          height=" 45px"
          color="#ffffff"
          borderRadius="10px"
          borderColor="#775fff"
          backgroundColor="#775fff"
          type="submit"
        />
      </div>
    </div>
  );
};

export default TalentOnboarding5;
