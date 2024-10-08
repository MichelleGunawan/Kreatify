import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Icon from "../Icon";
import { SocialInputType } from "@/types/social.type";
import { getIconLink } from "@/utils/functions/iconLinks";
import "./styles/index.scss";

export default function InputSelectSocial({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
}: InputSelectSocialProps) {
  // Find the selected social object based on the value (which is the id in this case)
  const selectedSocial = options.find((social) => social?.id === value) || null;

  return (
    <div className="full-width">
      {label && (
        <label className="h2 select-input-label mui-select-label">
          {label}
        </label>
      )}
      <Autocomplete
        id="social-select-demo"
        sx={{ width: "100%" }}
        options={options}
        autoHighlight
        getOptionLabel={(option) => option.handle} // This will only return the handle for display
        value={selectedSocial} // Set the value to the corresponding SocialType object
        onChange={(e, newValue) => onChange(newValue ? newValue.id : null)} // Pass the id as the value
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={option.id}
              component="li"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
                "& > img": { flexShrink: 0 },
              }}
              {...optionProps}
            >
              <Icon
                link={getIconLink(option.platform ?? "")}
                size={20}
                color="#000"
              />
              {option.handle}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            placeholder={placeholder}
            {...params}
            sx={{
              width: "100%",
              height: "55px",
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": {
                height: "55px",
                borderRadius: "10px",
              },
            }}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: selectedSocial && (
                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                  <Icon
                    link={getIconLink(selectedSocial.platform ?? "")}
                    size={20}
                    color="#000"
                  />
                  {/* <span style={{ marginLeft: 8 }}>{selectedSocial.handle}</span> */}
                </Box>
              ),
            }}
          />
        )}
      />
      {error && <span className="p2 mui-select-input-error-text">{error}</span>}
    </div>
  );
}

// Props for the InputSelectSocial component
interface InputSelectSocialProps {
  label?: string;
  value: string | null; // Value is the id of the selected option
  onChange: (newValue: string | null) => void;
  options: SocialInputType[];
  placeholder?: string;
  error?: string;
}
