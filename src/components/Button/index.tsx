import React from "react";
import { ReactSVG } from "react-svg";
import { Tooltip } from "@mui/material";
import { COLORS } from "@/utils/constants";
import "./styles/index.scss";

const Button: React.FC<DisplayTextProps> = ({
  icon,
  label,
  width = "100%",
  height = "50px",
  borderRadius = "10px",
  textClass = "h",
  tooltipText = "",
  color = COLORS.PRIMARY,
  backgroundColor = "transparent",
  borderColor = backgroundColor,
  hoverColor,
  type = "button",
  compress = true,
  disabled = false,
  onClick,
}) => {
  return (
    <Tooltip title={tooltipText}>
      <button
        className={`${
          compress && icon ? "button-with-icon" : "button"
        } ${textClass}`}
        style={{
          width: width,
          height: height,
          borderRadius: borderRadius,
          color: color,
          backgroundColor: disabled ? "#d5d5d5" : backgroundColor,
          borderColor: disabled ? "#d5d5d5" : borderColor,
        }}
        onClick={(e) => {
          if (onClick) {
            onClick();
            e.stopPropagation();
          }
        }}
        onMouseEnter={(e) => {
          if (hoverColor) {
            e.currentTarget.style.backgroundColor = hoverColor;
            e.currentTarget.style.borderColor = hoverColor;
          }
        }}
        onMouseLeave={(e) => {
          if (hoverColor) {
            e.currentTarget.style.backgroundColor = backgroundColor;
            e.currentTarget.style.borderColor = borderColor;
          }
        }}
        type={type}
        disabled={disabled}
      >
        {icon && (
          <div className="button-icon">
            <ReactSVG
              src={icon}
              beforeInjection={(svg: any) => {
                svg.setAttribute("style", "width: 24px; height: 24px;");
                const paths = svg.querySelectorAll("path");
                paths.forEach((path: any) => {
                  path.setAttribute("stroke", color);
                  path.setAttribute("stroke-width", "1.5");
                });
              }}
            />
          </div>
        )}

        {label && (
          <div
            className={
              compress && icon ? "button-with-icon-label" : "button-label"
            }
          >
            {label}
          </div>
        )}
      </button>
    </Tooltip>
  );
};

export default Button;

interface DisplayTextProps {
  icon?: string;
  label?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  color: string;
  backgroundColor?: string;
  borderColor?: string;
  hoverColor?: string;
  textClass?: string;
  tooltipText?: string;
  type?: "button" | "submit" | "reset";
  compress?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
