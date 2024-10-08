"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import Button from "@/components/Button";

import "./styles/index.scss";
import { CampaignMatchingType } from "@/types/campaignMatching.type";
import { COLORS } from "@/utils/constants";

const InputCampaignMatching: React.FC<InputCampaignMatchingProps> = ({
  questions,
  setQuestions,
  deletedQuestionIds,
  setDeletedQuestionIds,
  error,
}) => {
  const questionTypes = ["Select", "Multiselect"];
  const addQuestion = () => {
    setQuestions([...questions, { id: -1, question: "", type: "" }]); // Add a new empty payment
  };

  const handleRemoveQuestion = (index: number) => {
    setDeletedQuestionIds([...deletedQuestionIds, questions[index].id]);
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  return (
    <div className="input-payments">
      {questions.map((question, index) => (
        <div key={index} className="input-question-container">
          <div className="input-question-header">
            <h3 className="h2 text-black">QUESTION {index + 1}</h3>
            <a
              onClick={() => handleRemoveQuestion(index)}
              className="input-question-close-button"
            >
              x
            </a>
          </div>
          <InputSelect
            label="Type"
            value={question.type}
            onChange={(value) => {
              const newQuestions = [...questions];
              newQuestions[index] = {
                ...newQuestions[index],
                type: value,
                question: "",
                options: [],
              };
              setQuestions(newQuestions);
            }}
            options={questionTypes}
          />

          <InputText
            label="Question"
            value={question.question}
            onChange={(value) => {
              const newQuestions = [...questions];
              newQuestions[index] = {
                ...newQuestions[index],
                question: value,
              };
              setQuestions(newQuestions);
            }}
            type="text"
          />
          <InputText
            label="Options"
            value={question.options?.join(",")}
            onChange={(value) => {
              const newQuestions = [...questions];
              newQuestions[index] = {
                ...newQuestions[index],
                options: value.split(","),
              };
              setQuestions(newQuestions);
            }}
            type="text"
            placeholder="Separate options with comma (ex: Yes, No)"
          />
        </div>
      ))}
      <Button
        label="+ Add Question"
        color={COLORS.PRIMARY}
        borderColor={COLORS.PRIMARY}
        width="216px"
        borderRadius="10px"
        textClass="p2"
        onClick={addQuestion}
      />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
};

export default InputCampaignMatching;

type InputCampaignMatchingProps = {
  questions: CampaignMatchingType[];
  setQuestions: (newquestions: CampaignMatchingType[]) => void;
  deletedQuestionIds: number[];
  setDeletedQuestionIds: Dispatch<SetStateAction<number[]>>;
  error?: string;
};
