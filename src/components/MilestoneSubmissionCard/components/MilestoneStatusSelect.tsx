import React, { Dispatch, SetStateAction, useState } from "react";
import {
  getColor,
  getBackgroundColor,
  getLabelManager,
  getDatabaseValue,
} from "../functions";

import { MilestoneStatusType } from "@/types/campaign.type";
import "../styles/index.scss";
import { updateMilestoneStatus } from "@/services/deliverables/post_actions";

/**
 * Renders a dropdown to select a milestone status.
 *
 * @param {MilestoneStatusType} milestoneStatus - The current milestone status. Can be "incomplete", "denied", "pending", or "approved".
 * @param {Dispatch<SetStateAction<MilestoneStatusType>>} setMilestoneStatus - A function to update the milestone status.
 * @param {Dispatch<SetStateAction<boolean>>} setShowAlert - A function to show or hide an alert.
 *
 * @return {ReactElement} A select element with options for different milestone statuses.
 */
const MilestoneStatusSelect: React.FC<MilestoneStatusSelectProp> = ({
  milestoneId,
  milestoneStatus,
  setMilestoneStatus,
  setShowAlert,
}) => {
  const options = ["", "Approve", "Deny", "Pending"];

  const handleMilestoneStatusChange = (event: any) => {
    const selectedStatus = event.target.value;

    setMilestoneStatus(getDatabaseValue(selectedStatus));

    //Update milestone status on backend
    updateMilestoneStatus(milestoneId, getDatabaseValue(selectedStatus));
    setShowAlert(true);
  };

  return (
    <>
      <select
        className="p2 pill"
        style={{
          color: getColor(milestoneStatus),
          backgroundColor: getBackgroundColor(milestoneStatus),
        }}
        value={getLabelManager(milestoneStatus)}
        onChange={handleMilestoneStatusChange}
      >
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default MilestoneStatusSelect;

interface MilestoneStatusSelectProp {
  milestoneId: number;
  milestoneStatus: MilestoneStatusType;
  setMilestoneStatus: Dispatch<SetStateAction<MilestoneStatusType>>;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
}
