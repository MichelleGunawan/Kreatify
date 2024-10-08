import React from "react";
import "./styles/index.scss";

const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  onClick,
  label,
  color = "#616161",
  width = "20px",
  height = "20px",
  borderRadius = "5px",
}) => {
  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        style={{ width, height, borderRadius }}
        checked={isChecked}
        onChange={onClick}
      />
      <label className="p2" style={{ color: color }}>
        {label}
      </label>
    </div>
  );
};
export default Checkbox;

type CheckboxProps = {
  isChecked: boolean;
  onClick: () => void;
  label?: string;
  color?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
};
