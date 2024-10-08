"use client";
import React, { useEffect } from "react";
import { Tooltip } from "@mui/material";
import "../styles/index.scss";

const ProgressBarCell: React.FC<ProgressBarProp> = ({
  content,
  tooltipText,
  incompleteColor = "#FFEECD",
  completeColor = "#FFAB05",
}) => {
  return (
    <Tooltip title={tooltipText}>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            backgroundColor: incompleteColor,
          }}
        >
          <div
            className="progress-bar-complete"
            style={{
              width: `${content}%`, // 100%
              backgroundColor: completeColor,
            }}
          ></div>
        </div>
        <div className="p2 text-black progress-bar-text">{content}%</div>
      </div>
    </Tooltip>
  );
};

export default ProgressBarCell;

type ProgressBarProp = {
  content: number;
  tooltipText?: string;
  incompleteColor?: string;
  completeColor?: string;
};
