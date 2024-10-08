import React from "react";
import { ReactSVG } from "react-svg";
import { Tooltip } from "@mui/material";

const Icon: React.FC<IconProps> = ({
  link,
  color,
  size,
  strokeWidth,
  onClick,
  tooltipText,
}) => {
  return (
    <Tooltip title={tooltipText ?? ""}>
      <div style={{ width: size, height: size }} onClick={onClick}>
        <ReactSVG
          src={link}
          beforeInjection={(svg) => {
            svg.setAttribute("style", `width: ${size}px; height: ${size}px;`);
            const paths = svg.querySelectorAll("path");
            paths.forEach((path) => {
              if (color) path.setAttribute("stroke", color ?? "#000");
              if (strokeWidth) path.setAttribute("stroke-width", strokeWidth);
            });
          }}
        />
      </div>
    </Tooltip>
  );
};

export default Icon;

interface IconProps {
  link: string;
  color?: string;
  size?: number;
  strokeWidth?: string;
  onClick?: () => void;
  tooltipText?: string;
}
