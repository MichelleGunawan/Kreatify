import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { formatString } from "@/utils/functions/format.functions";
import "./styles/index.scss";
const InputSelect: React.FC<InputSelectProps> = ({
  label,
  placeholder = "",
  value,
  onChange,
  options,
  error,
  width = "100%",
  height = "auto",
}) => {
  const formattedOptions = options.map((option) => formatString(option));

  return (
    <div className="select-input-container" style={{ width, height }}>
      {label && <label className="h2 select-input-label">{label}</label>}
      <Autocomplete
        disablePortal
        options={formattedOptions}
        value={formatString(value)} // Set the selected value
        onChange={(event, newValue) => onChange(newValue as string)}
        sx={{
          width: "100%",
          height: "55px",
          borderRadius: "10px", // Apply the border-radius
          "& .MuiOutlinedInput-root": {
            height: "55px",
            borderRadius: "10px", // Ensure the input field has rounded borders
          },
        }}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} />
        )}
        isOptionEqualToValue={(option, value) => {
          if (!value) return false;
          return option === value;
        }}
      />
      {error && <span className="p2 select-input-error-text">{error}</span>}
    </div>
  );
};

export default InputSelect;

interface InputSelectProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  error?: string;
  width?: string;
  height?: string;
}
