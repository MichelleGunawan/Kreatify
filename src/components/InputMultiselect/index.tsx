import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";
import "./styles/index.scss";

interface InputSelectProps {
  label?: string;
  placeholder?: string;
  value: string[]; // The current selected values
  onChange: (value: string[]) => void;
  options: string[]; // The available options
  error?: string;
}

const InputMultiselect: React.FC<InputSelectProps> = ({
  label,
  placeholder,
  value,
  onChange,
  options,
  error,
}) => {
  const [selected, setSelected] = useState<string[]>(value);

  // Sync the internal selected state with external `value` prop
  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <div className="multiselect-input-container">
      {label && <div className="h2 multiselect-input-label">{label}</div>}
      <Autocomplete
        multiple
        id="fixed-tags-demo"
        value={selected} // Bind the selected state
        onChange={(event, newValue) => {
          setSelected(newValue); // Update the internal state
          onChange(newValue); // Trigger the external onChange callback
        }}
        options={options} // Available options for autocomplete
        getOptionLabel={(option) => option} // Display the label for each option
        renderTags={(tagValue, getTagProps) => (
          <div className="chips-container">
            {tagValue.map((option, index) => (
              <div key={index}>
                <Chip label={option} {...getTagProps({ index })} />
              </div>
            ))}
          </div>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            // label="Select options"
            placeholder={placeholder}
          />
        )}
        sx={{
          width: "100%",
          height: "55px",
          borderRadius: "10px", // Apply the border-radius
          "& .MuiOutlinedInput-root": {
            height: "55px",
            borderRadius: "10px", // Ensure the input field has rounded borders
          },
        }}
      />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
};

export default InputMultiselect;
