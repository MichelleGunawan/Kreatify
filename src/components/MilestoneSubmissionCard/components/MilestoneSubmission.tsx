import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "@/components/Button";
import { getIconLink } from "@/utils/functions/iconLinks";

import {
  MilestoneStatusType,
  MilestoneSubmissionType,
} from "@/types/campaign.type";
import "../styles/index.scss";
import { formatUrl } from "@/utils/functions/format.functions";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";

/**
 * Renders a dropdown to select a milestone status.
 *
 * @param {MilestoneStatusType} milestoneStatus - The current milestone status. Can be "incomplete", "denied", "pending", or "approved".
 * @param {Dispatch<SetStateAction<MilestoneStatusType>>} setMilestoneStatus - A function to update the milestone status.
 * @param {Dispatch<SetStateAction<boolean>>} setShowAlert - A function to show or hide an alert.
 *
 * @return {ReactElement} A select element with options for different milestone statuses.
 */
const MilestoneSubmission: React.FC<MilestoneSubmissionProp> = ({
  milestoneId,
  milestoneStatus,
  milestoneSubmission,
  setIsSubmitModalOpen,
  setIsModalTextOpen,
}) => {
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  return (
    <>
      {!I1Permission && milestoneStatus === "incomplete" && (
        <div className="p2 milestone-file-pending">Awaiting Submission</div>
      )}
      {!I1Permission &&
        milestoneStatus !== "incomplete" &&
        (milestoneSubmission?.type == "File" ? (
          <Button
            icon={getIconLink("download")}
            label="Download File"
            color="#a4a4a4"
            borderColor="#a4a4a4"
            onClick={() => {}}
            borderRadius="10px"
            textClass="p2"
            compress={false}
            tooltipText={milestoneSubmission?.description}
          />
        ) : milestoneSubmission?.type == "Link" ? (
          <Button
            icon={getIconLink("link")}
            label="Open Link"
            color="#a4a4a4"
            borderColor="#a4a4a4"
            onClick={() => {
              window.open(formatUrl(milestoneSubmission?.submission), "_blank");
            }}
            borderRadius="10px"
            textClass="p2"
            compress={false}
            tooltipText={milestoneSubmission?.description}
          />
        ) : milestoneSubmission?.type == "Text" ? (
          <Button
            icon={getIconLink("text")}
            label="View Text"
            color="#a4a4a4"
            borderColor="#a4a4a4"
            onClick={() => {
              setIsModalTextOpen(true);
            }}
            borderRadius="10px"
            textClass="p2"
            compress={false}
            tooltipText={milestoneSubmission?.description}
          />
        ) : (
          <div className="p2 milestone-file-pending">Awaiting Submission</div>
        ))}
      {I1Permission &&
        (milestoneStatus === "pending" || milestoneStatus === "denied") && (
          <Button
            icon={getIconLink("upload")}
            label="Resubmit"
            color="#a4a4a4"
            borderColor="#a4a4a4"
            onClick={() => {
              setIsSubmitModalOpen(true);
            }}
            borderRadius="10px"
            textClass="p2"
            compress={false}
          />
        )}
      {I1Permission && milestoneStatus === "incomplete" && (
        <Button
          icon={getIconLink("upload")}
          label="Submit"
          color="#a4a4a4"
          borderColor="#a4a4a4"
          onClick={() => {
            setIsSubmitModalOpen(true);
          }}
          borderRadius="10px"
          textClass="p2"
          compress={false}
        />
      )}
      {I1Permission &&
        milestoneStatus !== "incomplete" &&
        milestoneStatus !== "pending" &&
        milestoneStatus !== "denied" &&
        (milestoneSubmission?.type == "File" ? (
          <Button
            icon={getIconLink("download")}
            label="Download File"
            color="#a4a4a4"
            borderColor="#a4a4a4"
            onClick={() => {}}
            borderRadius="10px"
            textClass="p2"
            compress={false}
            tooltipText={milestoneSubmission?.description}
          />
        ) : milestoneSubmission?.type == "Link" ? (
          <Button
            icon={getIconLink("link")}
            label="Open Link"
            color="#a4a4a4"
            borderColor="#a4a4a4"
            onClick={() => {
              window.open(formatUrl(milestoneSubmission?.submission), "_blank");
            }}
            borderRadius="10px"
            textClass="p2"
            compress={false}
            tooltipText={milestoneSubmission?.description}
          />
        ) : milestoneSubmission?.type == "Text" ? (
          <Button
            icon={getIconLink("text")}
            label="View Text"
            color="#a4a4a4"
            borderColor="#a4a4a4"
            onClick={() => {
              setIsModalTextOpen(true);
            }}
            borderRadius="10px"
            textClass="p2"
            compress={false}
            tooltipText={milestoneSubmission?.description}
          />
        ) : (
          <Button
            icon={getIconLink("upload")}
            label="Submit"
            color="#a4a4a4"
            borderColor="#a4a4a4"
            onClick={() => {
              setIsSubmitModalOpen(true);
            }}
            borderRadius="10px"
            textClass="p2"
            compress={false}
          />
        ))}
    </>
  );
};

export default MilestoneSubmission;

interface MilestoneSubmissionProp {
  milestoneId: number;
  milestoneStatus: MilestoneStatusType;
  milestoneSubmission: MilestoneSubmissionType;
  setIsSubmitModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsModalTextOpen: Dispatch<SetStateAction<boolean>>;
}
