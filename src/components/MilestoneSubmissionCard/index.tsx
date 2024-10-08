"use client";
import React, { useState } from "react";
import MilestoneStatus from "../MilestoneSubmissionCard/components/MilestoneStatus";
import MilestoneStatusSelect from "../MilestoneSubmissionCard/components/MilestoneStatusSelect";
import ModalSubmission from "../ModalSubmission";
import ModalText from "../ModalText";
import Alert from "../Alert";
import MilestoneSubmission from "./components/MilestoneSubmission";
import { formatString } from "@/utils/functions/format.functions";
import useMilestoneData from "@/hooks/useMilestoneData";
import usePermission from "@/hooks/usePermission";

import "./styles/index.scss";
import { USER_PERMISSIONS } from "@/utils/constants";

const MilstoneSubmissionCard: React.FC<MilstoneSubmissionCardProps> = ({
  milestoneId,
  createMilestoneSubmissionNotification,
}) => {
  const {
    milestoneType,
    milestoneSubmission,
    milestoneStatus,

    setMilestoneSubmission,
    setMilestoneStatus,
  } = useMilestoneData(milestoneId);
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isModalTextOpen, setIsModalTextOpen] = useState(false);

  return (
    <div className="milestone-container">
      <div className="milestone-title">
        <h2 className="h2 text-black">{formatString(milestoneType)}</h2>
      </div>
      <div className="milestone-file">
        <MilestoneSubmission
          milestoneId={milestoneId}
          milestoneStatus={milestoneStatus}
          milestoneSubmission={milestoneSubmission}
          setIsSubmitModalOpen={setIsSubmitModalOpen}
          setIsModalTextOpen={setIsModalTextOpen}
        />
      </div>
      <div className="milestone-status">
        {I1Permission && <MilestoneStatus milestoneStatus={milestoneStatus} />}
        {!I1Permission && (
          <MilestoneStatusSelect
            milestoneId={milestoneId}
            milestoneStatus={milestoneStatus}
            setMilestoneStatus={setMilestoneStatus}
            setShowAlert={setShowAlert}
          />
        )}
      </div>

      {isSubmitModalOpen && (
        <ModalSubmission
          title={`${milestoneType} Submission`}
          milestoneId={milestoneId}
          setOpen={setIsSubmitModalOpen}
          submission={milestoneSubmission}
          setSubmission={setMilestoneSubmission}
          setStatus={setMilestoneStatus}
          setShowAlert={setShowAlert}
          setIsModalTextOpen={setIsModalTextOpen}
          createMilestoneSubmissionNotification={
            createMilestoneSubmissionNotification
          }
        />
      )}

      {isModalTextOpen && (
        <ModalText
          title={milestoneType}
          setOpen={setIsModalTextOpen}
          text={milestoneSubmission?.submission}
        />
      )}

      {showAlert && (
        <Alert
          text="Saved!"
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
    </div>
  );
};

export default MilstoneSubmissionCard;

interface MilstoneSubmissionCardProps {
  milestoneId: number;
  createMilestoneSubmissionNotification: (milestoneType: string) => void;
}
