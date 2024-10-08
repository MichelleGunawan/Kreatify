import React, { useState } from "react";
import { Tooltip } from "@mui/material";
import Icon from "../Icon";
import { CheckpointType } from "@/types/campaign.type";
import { getIconLink } from "@/utils/functions/iconLinks";
import "./styles/index.scss";
import { formatString } from "@/utils/functions/format.functions";

interface StepperProps {
  color: string;
  inactiveColor: string;
  checkpoints: CheckpointType[];
  completed: number;
  onCheckpointClick?: (index: number) => void;
}

const Stepper: React.FC<StepperProps> = ({
  color,
  inactiveColor,
  checkpoints,
  completed,
  onCheckpointClick,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCheckpointClick = (index: number) => {
    if (onCheckpointClick) {
      onCheckpointClick(index);
    }
  };

  const getBackgroundColor = (index: number) => {
    if (index === hoveredIndex) {
      return index < completed ? inactiveColor : color;
    }
    return index < completed ? color : inactiveColor;
  };

  const getIconColor = (index: number) => {
    if (index === hoveredIndex) {
      return index < completed ? color : inactiveColor;
    }
    return index < completed ? inactiveColor : color;
  };

  return (
    <div className="stepper-container hide-scrollbar">
      {checkpoints.map((milestone, index) => (
        <div key={index} className="stepper-circle-and-line">
          {index !== 0 && (
            <div
              className="stepper-line-before"
              style={{
                backgroundColor: index < completed ? color : inactiveColor,
              }}
            />
          )}

          <div className="stepper-circle-label-container">
            <Tooltip title={milestone.tooltipText}>
              <div
                className="stepper-circle"
                style={{ backgroundColor: getBackgroundColor(index) }}
                onClick={() => handleCheckpointClick(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {milestone.icon && (
                  <Icon
                    link={getIconLink(milestone.icon)}
                    color={getIconColor(index)}
                    size={20}
                  />
                )}
              </div>
            </Tooltip>

            <div key={index} className="p2 stepper-label">
              <React.Fragment key={index}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    position: "relative",
                  }}
                >
                  <div
                    className="stepper-label-text"
                    style={{ position: "relative" }}
                  >
                    {milestone.text.split(" ").map((item, index) => (
                      <h3 key={index} className="h3">
                        {formatString(item)}
                      </h3>
                    ))}

                    {milestone?.details && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-10px", // Adjust the top position to move the dot higher
                          right: "-16px", // Adjust the left position to move the dot to the left corner
                        }}
                      >
                        <Icon
                          link={getIconLink("dot")}
                          color={color}
                          size={24}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {milestone.subText && (
                  <div className="p2 stepper-label-subtext">
                    {milestone.subText}
                  </div>
                )}
              </React.Fragment>
            </div>
          </div>

          {index !== checkpoints.length - 1 && (
            <div
              className="stepper-line-after"
              style={{
                backgroundImage:
                  index === completed - 1
                    ? `linear-gradient(90deg, ${color} 0%, ${color} 50%, ${inactiveColor} 100%)`
                    : "none",
                backgroundColor: index < completed - 1 ? color : inactiveColor,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
