import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";
import { UserPreviewType } from "@/types/user.type";
import "./styles/index.scss";

const InputMultiselectUser: React.FC<InputSelectProps> = ({
  label,
  value,
  onChange,
  options,
  error,
}) => {
  // Format options to match Autocomplete's expectation
  const formattedOptions = options?.map((option) => ({
    label: option.name,
    value: option.id,
  }));

  const [selected, setSelected] = useState(
    value.map((id) => ({
      label: options.find((option) => option.id === id)?.name || "",
      value: id,
    }))
  );

  // Sync external value changes with internal state
  useEffect(() => {
    const newValues = value.map((id) => ({
      label: options.find((option) => option.id === id)?.name || "",
      value: id,
    }));

    setSelected(newValues);
  }, [value, options]);

  return (
    <div className="multiselect-input-container">
      <div className="h2 multiselect-input-label">{label}</div>
      <Autocomplete
        multiple
        id="user-autocomplete"
        options={formattedOptions} // Available options for the autocomplete
        value={selected} // Bind the selected values
        getOptionLabel={(option) => option.label} // Show the user's name in the dropdown
        onChange={(event, newValue) => {
          setSelected(newValue); // Update internal state

          // Extract selected user IDs and pass to onChange
          const selectedUserIds = newValue.map(
            (selectedOption) => selectedOption.value
          );
          onChange(selectedUserIds);
        }}
        isOptionEqualToValue={(option, value) => option.value === value.value} // Ensure unique selection by comparing IDs
        renderTags={(tagValue, getTagProps) => (
          <div className="chips-container">
            {tagValue.map((option, index) => (
              <div key={index}>
                <Chip label={option.label} {...getTagProps({ index })} />
              </div>
            ))}
          </div>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search users..."
            error={Boolean(error)}
            helperText={error || ""}
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
    </div>
  );
};

export default InputMultiselectUser;

interface InputSelectProps {
  label: string;
  value: string[]; // Now just an array of user IDs
  onChange: (value: string[]) => void; // Pass an array of IDs
  options: UserPreviewType[];
  error?: string;
}
