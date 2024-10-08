"use client";
import React from "react";
import { Tooltip } from "@mui/material";
import { formatString } from "@/utils/functions/format.functions";
import "./styles/index.scss";

const PillNiche: React.FC<PillNicheProp> = ({
  label,
  tooltip = false,
  textClass = "p3",
}) => {
  return (
    <Tooltip title={tooltip ?? label}>
      <div className="pill-niche">
        <p className={textClass}>{formatString(label)}</p>
      </div>
    </Tooltip>
  );
};

export default PillNiche;

type PillNicheProp = {
  label: string;
  tooltip?: boolean;
  textClass?: string;
};
