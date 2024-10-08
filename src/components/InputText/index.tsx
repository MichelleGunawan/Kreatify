import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import "./styles/index.scss";

const InputText: React.FC<InputTextProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  minRow = 3,
  maxRows = 1,
  type = "text",
  width = "100%",
  height = "auto",
  disabled = false,
}) => (
  <div className="text-input-container">
    {label && <label className="h2 text-input-label">{label}</label>}
    {maxRows === 1 && (
      <input
        className="p2 text-input-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={{ width: width, height: height }}
        disabled={disabled}
      />
    )}
    {maxRows > 1 && (
      <TextareaAutosize
        className="p2 text-input-input"
        minRows={minRow}
        maxRows={maxRows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      />
    )}
    {error && <span className="input-error-text">{error}</span>}
  </div>
);

export default InputText;

interface InputTextProps {
  label?: string;
  value: any;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  minRow?: number;
  maxRows?: number;
  width?: string;
  height?: string;
  type?: string;
  inputHeight?: string;
  disabled?: boolean;
}
