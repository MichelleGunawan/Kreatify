"use client";
import React from "react";
import { Tooltip } from "@mui/material";
import "./styles/index.scss";
import { getIconLink } from "@/utils/functions/iconLinks";
import Icon from "../Icon";
import { COLORS } from "@/utils/constants";

const Pill: React.FC<PillProp> = ({
  label,
  color = COLORS.GREY500,
  backgroundColor = "transparent",
  borderColor = backgroundColor,
  tooltip = false,
  textClass = "p3",
  onClick = () => {},
  onRemove,
}) => {
  return (
    <Tooltip title={tooltip ?? label}>
      <div
        className="pill"
        style={{
          color,
          backgroundColor,
          borderColor,
        }}
        onClick={onClick}
      >
        <p className={textClass}>{label}</p>
        {onRemove && (
          <Icon
            link={getIconLink("remove")}
            onClick={onRemove}
            size={20}
            color="var(--grey-color-500)"
          />
        )}
      </div>
    </Tooltip>
  );
};

export default Pill;

type PillProp = {
  label: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  tooltip?: boolean;
  textClass?: string;
  onClick?: () => void;
  onRemove?: () => void;
};
