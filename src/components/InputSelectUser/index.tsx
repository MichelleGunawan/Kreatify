import React from "react";
import { TextField, Autocomplete, createFilterOptions } from "@mui/material";
import {
  handleChange,
  handlefilterOptions,
  getOptionLabel,
  handleInputChange,
} from "./functions/functions";
import "./styles/index.scss";
import { UserPreviewType } from "@/types/user.type";
import { UUID } from "crypto";

const InputSelectUser: React.FC<InputSelectUserProps> = ({
  label,
  value,
  onChange,
  options,
  error,
  width = "100%",
  height = "auto",
  placeholder = "Select an option",
}) => {
  const selected = options.find((option) => option.id == value);
  const name = selected ? selected.name : "";

  return (
    <div className="select-input-container" style={{ width, height }}>
      {label && <label className="h2 select-input-label">{label}</label>}
      <Autocomplete
        value={name}
        onChange={(event, newValue) => {
          handleChange(event, newValue, onChange);
        }}
        filterOptions={(options, params) =>
          handlefilterOptions(options, params)
        }
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="user-select"
        options={options}
        getOptionLabel={(option) => getOptionLabel(option)}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              {option.name}
            </li>
          );
        }}
        sx={{
          width: "100%",
          height: "55px",
          borderRadius: "10px", // Apply the border-radius
          "& .MuiOutlinedInput-root": {
            height: "55px",
            borderRadius: "10px", // Ensure the input field has rounded borders
          },
        }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} />
        )}
        onInputChange={(event, newInputValue, reason) =>
          handleInputChange(event, newInputValue, reason, onChange)
        }
      />
      {error && <span className="p2 select-input-error-text">{error}</span>}
    </div>
  );
};

export default InputSelectUser;

interface InputSelectUserProps {
  label?: string;
  value: UUID | null;
  onChange: (id: UUID | null) => void;
  options: UserPreviewType[];
  error?: string;
  width?: string;
  height?: string;
  placeholder?: string;
}
