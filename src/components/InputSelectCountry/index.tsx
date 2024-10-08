import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { countries } from "./countries";
import "./styles/index.scss";

export default function InputSelectCountry({
  label,
  value,
  onChange,
  error,
}: InputSelectCountryProps) {
  // Find the selected country object based on the label
  const selectedCountry =
    countries.find((country) => country.label === value) || null;

  return (
    <>
      {label && (
        <label className="h2 select-input-label mui-select-label">
          {label}
        </label>
      )}
      <Autocomplete
        id="country-select-demo"
        sx={{ width: "100%" }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        value={selectedCountry} // Set the value to the corresponding CountryType object
        onChange={(e, newValue) => onChange(newValue ? newValue.label : "")} // Pass only the label as a string
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...optionProps}
            >
              <img
                loading="lazy"
                width="20"
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                alt=""
              />
              {option.label} ({option.code}) +{option.phone}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              width: "100%",
              height: "55px",
              borderRadius: "10px", // Apply the border-radius
              "& .MuiOutlinedInput-root": {
                height: "55px",
                borderRadius: "10px", // Ensure the input field has rounded borders
              },
            }}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
        isOptionEqualToValue={(option, value) => {
          if (!value) return false;
          return option.label === value.label;
        }}
      />
      {error && <span className="p2 mui-select-input-error-text">{error}</span>}
    </>
  );
}

interface InputSelectCountryProps {
  label?: string;
  value: string; // Value is a string representing the country label
  onChange: (newValue: string) => void; // onChange receives the new label as a string
  error?: string;
}
