"use client";
import React, { useState, useRef } from "react";

// Component imports
import InputText from "@/components/InputText";
import InputSelect from "@/components/InputSelect";
import InputMultiselect from "@/components/InputMultiselect";
import Button from "@/components/Button";
import { OnboardingCampaignMatchingFormType } from "@/types/user.onboarding.types";
import {
  CampaignMatchingAnswerType,
  CampaignMatchingType,
} from "@/types/campaignMatching.type";
import { COLORS } from "@/utils/constants";
import "@/styles/onboarding.page.scss";
import useAgencyCampaignMatchingData from "@/hooks/useAgencyCampaignMatchingData";
import { UUID } from "crypto";
import CardCampaignMatching from "@/components/CardCampaignMatching";
import { convertToUUID } from "@/utils/functions/converter.functions";

const TalentOnboarding4: React.FC<OnboardingCampaignMatchingFormType> = ({
  campaignMatching,
  setCampaignMatching,
  prevStep,
  nextStep,
  agencyId,
}) => {
  const [errors, setErrors] = useState({
    missingQuestion: "",
  });
  const isAllQuestionsAnswered = campaignMatching.every(
    ({ answer }: CampaignMatchingAnswerType) =>
      answer !== "" && answer !== undefined && answer !== null
  );

  const { campaignMatchingQuestions } = useAgencyCampaignMatchingData({
    agencyId: convertToUUID(agencyId),
  });
  setCampaignMatching(
    campaignMatching.length > 0 ? campaignMatching : campaignMatchingQuestions
  );

  const handleNext = () => {
    if (!isAllQuestionsAnswered) {
      setErrors({
        missingQuestion: !isAllQuestionsAnswered
          ? "Answer all campaign matching questions"
          : "",
      });
      return;
    }
    nextStep();
  };

  return (
    <div className="onboarding-form">
      {campaignMatching?.length < 1 && (
        <p className="p2 text-black">
          No campaign matching questions at this time
        </p>
      )}
      {campaignMatching?.map(
        (
          { question, options, id, type }: CampaignMatchingAnswerType,
          index: number
        ) => (
          <>
            {type.toLowerCase() == "text" && (
              <InputText
                label={question}
                value={campaignMatching[index].answer as string}
                onChange={(value) => {
                  const newCampaignMatching = [...campaignMatching];
                  newCampaignMatching[index].answer = value;
                  setCampaignMatching(newCampaignMatching);
                }}
              />
            )}
            {type.toLowerCase() == "select" && (
              <InputSelect
                label={question}
                value={campaignMatching[index].answer as string}
                options={options as string[]}
                onChange={(value) => {
                  const newCampaignMatching = [...campaignMatching];
                  newCampaignMatching[index].answer = value;
                  setCampaignMatching(newCampaignMatching);
                }}
              />
            )}
            {type.toLowerCase() == "multiselect" && (
              <InputMultiselect
                label={question}
                value={campaignMatching[index].answer as string[]}
                options={options as string[]}
                onChange={(value) => {
                  const newCampaignMatching = [...campaignMatching];
                  newCampaignMatching[index].answer = value.join(",");
                  setCampaignMatching(newCampaignMatching);
                }}
              />
            )}
          </>
        )
      )}

      {errors.missingQuestion && (
        <span className="p2 onboarding-error-text">
          Must answer all campaign matching questions
        </span>
      )}
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

export default TalentOnboarding4;
