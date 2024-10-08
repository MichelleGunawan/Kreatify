import React from "react";
import Pill from "@/components/Pill";
import { getColor, getBackgroundColor, getLabelTalent } from "../functions";

/**
+ * Renders a milestone status pill based on the provided status.
+ *
+ * @param {MilestoneStatusProp} props - The props object containing the milestone status.
+ * @param {string} props.milestoneStatus - The status of the milestone. Can be "completed", "pending", "rejected", or any other value.
+ * @return {ReactElement} The rendered milestone status pill.
+ */
const MilestoneStatus: React.FC<MilestoneStatusProp> = ({
  milestoneStatus,
}) => {
  return (
    <Pill
      label={getLabelTalent(milestoneStatus)}
      color={getColor(milestoneStatus)}
      backgroundColor={getBackgroundColor(milestoneStatus)}
      textClass="h3"
    />
  );
};

export default MilestoneStatus;

interface MilestoneStatusProp {
  milestoneStatus?: string;
}
