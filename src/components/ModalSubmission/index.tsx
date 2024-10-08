import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "../Modal";
import InputSelect from "../InputSelect";
import InputText from "../InputText";
import InputFile from "../InputFile";
import Button from "@/components/Button";

import { createMilestoneSubmission } from "@/services/deliverables/post_actions";
import { MilestoneStatusType, SubmissionType } from "@/types/campaign.type";
import { formatUrl } from "@/utils/functions/format.functions";
import { getIconLink } from "@/utils/functions/iconLinks";
import "./styles/index.scss";
import Separator from "../Separator";

const ModalSubmission: React.FC<ModalSubmissionProps> = ({
  milestoneId,
  title,
  setOpen,
  submission,
  setSubmission,
  setStatus,
  setShowAlert,
  setIsModalTextOpen,
  createMilestoneSubmissionNotification,
}) => {
  const [submissionType, setSubmissionType] = useState<SubmissionType>();
  const [newSubmission, setNewSubmission] = useState<any>(null);
  const [newDescription, setNewDescription] = useState<string | null>(null);

  const [submissionTypeError, setSubmissionTypeError] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const submissionTypeOptions = ["File", "Link", "Text"];

  const handleSave = async () => {
    if (submissionType === null) {
      setSubmissionTypeError("Submission type is required");
      return;
    }

    if (!newSubmission) {
      setSubmissionError("Submission is required");
      return;
    }

    try {
      await createMilestoneSubmission(
        milestoneId,
        submissionType as SubmissionType,
        newSubmission,
        newDescription
      );
      createMilestoneSubmissionNotification(title.toLowerCase());
      setSubmission({ type: submissionType, submission: newSubmission });
      setStatus("pending");
      setOpen(false);
      setShowAlert(true);
    } catch (error) {
      console.error("Error saving submission:", error);
      setSubmissionError("Failed to save submission.");
    }
  };

  return (
    <Modal
      setOpen={setOpen}
      title={title}
      noButtonText="Cancel"
      onNoButtonClick={() => setOpen(false)}
      goButtonText="Submit" //TODO: add function props
      onGoButtonClick={handleSave}
      scroll={false}
    >
      <div className="modal-invite-body">
        {submission?.submission && (
          <>
            {/* <div className="h2 text-black full-width">Current Submission</div> */}
            {submission.type === "File" ? (
              <Button
                icon={getIconLink("download")}
                color="#775fff"
                borderColor="#775fff"
                borderRadius="10px"
                label="Current Submission"
                compress={false}
                onClick={() => {}}
              />
            ) : submission.type === "Link" ? (
              <Button
                icon={getIconLink("link")}
                color="#775fff"
                borderColor="#775fff"
                borderRadius="10px"
                label="Current Submission"
                compress={false}
                onClick={() =>
                  window.open(formatUrl(submission.submission), "_blank")
                }
              />
            ) : (
              <Button
                icon={getIconLink("visible")}
                color="#775fff"
                borderColor="#775fff"
                borderRadius="10px"
                label="Current Submission"
                compress={false}
                onClick={() => setIsModalTextOpen(true)}
              />
            )}
          </>
        )}
        {submission?.description && (
          <InputText
            value={submission?.description}
            onChange={() => {}}
            maxRows={3}
            disabled={true}
          />
        )}

        {(submission?.submission || submission?.description) && <Separator />}
        <InputSelect
          label="Submission Type"
          value={submissionType as string}
          onChange={(value) => {
            setSubmissionType(value as SubmissionType);
            setNewSubmission("");
          }}
          options={submissionTypeOptions}
          error={submissionTypeError}
        />
        {submissionType === "File" && (
          <InputFile
            file={newSubmission}
            onChange={(file) => setNewSubmission(file)}
            error={submissionError}
          />
        )}
        {submissionType === "Link" && (
          <InputText
            placeholder="Enter link"
            value={newSubmission}
            onChange={setNewSubmission}
            error={submissionError}
          />
        )}
        {submissionType === "Text" && (
          <InputText
            placeholder="Enter text"
            value={newSubmission}
            onChange={setNewSubmission}
            maxRows={15}
            error={submissionError}
          />
        )}
        {(submissionType === "File" ||
          submissionType === "Link" ||
          submissionType === "Text") && (
          <InputText
            placeholder="Captions, descriptions, etc."
            value={newDescription}
            onChange={setNewDescription}
            maxRows={3}
            error={submissionError}
          />
        )}
      </div>
    </Modal>
  );
};

export default ModalSubmission;

type ModalSubmissionProps = {
  milestoneId: number;
  title: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  submission: any;
  setSubmission: Dispatch<SetStateAction<any>>;
  setStatus: Dispatch<SetStateAction<MilestoneStatusType>>;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  setIsModalTextOpen: Dispatch<SetStateAction<boolean>>;
  createMilestoneSubmissionNotification: (milestoneType: string) => void;
};
