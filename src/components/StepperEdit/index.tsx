import React, { useState } from "react";
import { Tooltip } from "@mui/material";
import Icon from "../Icon";
import ModalEditMilestone from "./components/ModalEditMilestone";
import { CheckpointType } from "@/types/campaign.type";
import { getIconLink } from "@/utils/functions/iconLinks";
import "../Stepper/styles/index.scss";
import { formatString } from "@/utils/functions/format.functions";

interface StepperEditProps {
  color: string;
  inactiveColor: string;
  checkpoints: CheckpointType[];
  onCheckpointClick?: (index: number) => void;

  completed: number;
}

const StepperEdit: React.FC<StepperEditProps> = ({
  color,
  inactiveColor,
  checkpoints,
  onCheckpointClick,
  completed,
}) => {
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [iconColor, setIconColor] = useState(color);

  return (
    <div className="stepper-container">
      {[...checkpoints, { id: -1, text: "", subText: "", tooltipText: "" }].map(
        (milestone, index) => (
          <div key={index} className="stepper-circle-and-line">
            {index !== 0 && (
              <div
                className="stepper-line-before"
                style={{
                  backgroundColor: inactiveColor,
                }}
              />
            )}
            <div className="stepper-circle-label-container">
              <Tooltip title={milestone.tooltipText}>
                <div
                  className="stepper-circle"
                  style={{
                    backgroundColor: inactiveColor,
                  }}
                  onClick={(e) => {
                    e.currentTarget.style.backgroundColor = inactiveColor;
                    setIconColor(color);
                    onCheckpointClick?.(index);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = color;
                    setClickedIndex(index);
                    setIconColor(inactiveColor);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = inactiveColor;
                    setIconColor(color);
                  }}
                >
                  <Icon
                    link={
                      index >= checkpoints.length
                        ? getIconLink("add")
                        : milestone.icon
                        ? getIconLink(milestone.icon)
                        : ""
                    }
                    color={index === clickedIndex ? iconColor : color}
                    size={20}
                  />
                </div>
              </Tooltip>
              <div className="p2 stepper-label">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    position: "relative",
                  }}
                >
                  {milestone?.details ? (
                    <div
                      style={{
                        position: "absolute",
                        right: "-14px",
                        top: "-2px",
                      }}
                    >
                      <Icon link={getIconLink("dot")} color={color} size={20} />
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="stepper-label-text">
                    {milestone.text.split(" ").map((item, index) => (
                      <h3 key={index} className="h3 ">
                        {formatString(item)}
                      </h3>
                    ))}
                  </div>
                </div>

                {milestone.subText && (
                  <div className="p2 stepper-label-subtext">
                    {milestone.subText}
                  </div>
                )}
              </div>
            </div>
            {index < checkpoints.length ? (
              <div
                className="stepper-line-after"
                style={{
                  backgroundColor: inactiveColor,
                }}
              />
            ) : (
              <></>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default StepperEdit;
