import React from "react";
import Separator from "../Separator";
import "./styles/index.scss";
const DisplayText: React.FC<DisplayTextProps> = ({
  label,
  value,
  line = false,
  labelColor = "#555555",
  valueColor = "#292929",
}) => (
  <div className="display-text-container">
    <div className="display-text-text">
      <div className="p2 display-text-label" style={{ color: labelColor }}>
        {label}
      </div>
      <p className="h2 display-text-value" style={{ color: valueColor }}>
        {value}
      </p>
    </div>
    {line && <Separator />}
  </div>
);

export default DisplayText;

interface DisplayTextProps {
  label: string;
  value: string;
  line?: boolean;
  labelColor?: string;
  valueColor?: string;
}
