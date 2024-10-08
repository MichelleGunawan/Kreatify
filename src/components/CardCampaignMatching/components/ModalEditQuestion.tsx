import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "@/components/Modal";
import InputText from "@/components/InputText";
import InputSelect from "@/components/InputSelect";
import InputMultiselect from "@/components/InputMultiselect";
import { handles } from "@/data/UserData";
import { createOrEditCampaignMatchingAnswer } from "@/services/campaignMatching/post_actions";
import { UUID } from "crypto";

const ModalEdit: React.FC<ModalEditProps> = ({
  questionId,
  answerId,
  talentId,
  question,
  type = "text",
  options = [],
  answer = "",
  setOpen,
  handleEditSave,
}) => {
  // Initialize newAnswer as an array if the type is multiselect
  const [newAnswer, setNewAnswer] = useState<string[]>(
    type.toLowerCase() === "multiselect"
      ? answer.includes(",")
        ? answer.split(",")
        : []
      : [answer]
  );

  const handleSave = () => {
    createOrEditCampaignMatchingAnswer({
      questionId,
      answerId,
      answer: newAnswer.join(","),
      talentId,
    });
    handleEditSave({
      answer:
        type.toLowerCase() === "multiselect"
          ? newAnswer.join(",")
          : newAnswer[0],
    });
    setOpen(false);
  };

  return (
    <Modal
      title={question}
      setOpen={setOpen}
      noButtonText="Cancel"
      onNoButtonClick={() => setOpen(false)}
      goButtonText="Save"
      onGoButtonClick={handleSave}
    >
      {type.toLowerCase() === "text" && (
        <InputText
          value={newAnswer[0]}
          onChange={(value) => setNewAnswer([value])}
        />
      )}
      {type.toLowerCase() === "select" && (
        <InputSelect
          value={newAnswer[0]}
          onChange={(value) => {
            setNewAnswer([value]);
          }}
          options={options}
        />
      )}
      {type.toLowerCase() === "multiselect" && (
        <InputMultiselect
          value={newAnswer} // Directly use the array
          onChange={(value) => setNewAnswer(value)} // Expecting the new value to be an array
          options={options}
        />
      )}
    </Modal>
  );
};

export default ModalEdit;

type ModalEditProps = {
  questionId: number;
  answerId: number | null;
  talentId: UUID | null;
  question: string;
  type?: string;
  options?: string[];
  answer?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleEditSave: ({ answer }: { answer: string }) => void;
};
