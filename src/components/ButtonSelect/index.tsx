import React from "react";
import { Tooltip } from "@mui/material";
import "./styles/index.scss";
const ButtonSelect: React.FC<ButtonSelectProps> = ({
  value = "",
  options = [],
  handleSelect = () => {},
  icon,
  width = "100%",
  height = "100%",
  borderRadius = "10px",
  padding = "8px",
  color = "#fff",
  backgroundColor = "transparent",
  borderColor = backgroundColor,
  textClass = "h3",
  tooltipText = "",
}) => {
  return (
    <Tooltip title={tooltipText}>
      <select
        className={textClass}
        style={{
          color,
          borderColor,
          backgroundColor,
          width,
          height,
          borderRadius,
          padding,
        }}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          handleSelect(event.target.value)
        }
      >
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Tooltip>
  );
};

export default ButtonSelect;

interface ButtonSelectProps {
  value: string;
  options: string[];
  handleSelect?: (event: string) => void;
  icon?: string;
  width?: string;
  height?: string;
  padding?: string;
  borderRadius?: string;
  color: string;
  backgroundColor?: string;
  borderColor?: string;
  hoverColor?: string;
  textClass?: string;
  tooltipText?: string;
}
