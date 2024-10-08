import React, { Dispatch, SetStateAction, useState } from "react";
import { UUID } from "crypto";
import DisplayText from "@/components/DisplayText";
import Button from "@/components/Button";
import ModalEditQuestion from "./components/ModalEditQuestion";
import { getIconLink } from "@/utils/functions/iconLinks";
import useCampaignMatchingData from "@/hooks/useCampaignMatchingData";
import "./styles/index.scss";
import "@/styles/card.scss";
import { COLORS } from "@/utils/constants";

const CardCampaignMatching: React.FC<CampaignMatchingCardProps> = ({
  questionId,
  question,
  type = "select",
  options,
  talentId,
}) => {
  const [edit, setEdit] = useState(false);

  const { answerId, answer, setAnswer } = useCampaignMatchingData({
    talentId,
    questionId,
  });

  const handleEditSave = ({ answer }: { answer: string }) => {
    setAnswer(answer);
  };

  return (
    <>
      <div className="card">
        <div className="campaign-matching-card-header">
          <div className="p2" style={{ color: "#555" }}>
            {question}
          </div>
          <Button
            icon={getIconLink("edit")}
            onClick={() => setEdit(!edit)}
            width="30px"
            height="30px"
            color={COLORS.PRIMARY}
            borderRadius="100px"
            borderColor="transparent"
          />
        </div>

        <p className="h2 text-black">{answer}</p>
      </div>
      {edit && (
        <ModalEditQuestion
          questionId={questionId}
          answerId={answerId}
          question={question}
          talentId={talentId}
          type={type}
          options={options}
          answer={answer}
          setOpen={setEdit}
          handleEditSave={handleEditSave}
        />
      )}
    </>
  );
};

export default CardCampaignMatching;

type CampaignMatchingCardProps = {
  questionId: number;
  question: string;
  type?: string;
  options?: string[];
  talentId: UUID | null;
};
