"use client";
import React from "react";
import { Tooltip } from "@mui/material";
import "../styles/cells.scss";

const PillCell: React.FC<PillCellProp> = ({
  content,
  color = "#838383",
  backgroundColor = "transparent",
}) => {
  return (
    <Tooltip title={content}>
      <div
        style={{
          color,
          backgroundColor,
          padding: backgroundColor ? "2px 8px" : "0px",
          borderRadius: backgroundColor ? "20px" : "0px",
        }}
      >
        {content}
      </div>
    </Tooltip>
  );
};

export default PillCell;

type PillCellProp = {
  content: string;
  color?: string;
  backgroundColor?: string;
};
