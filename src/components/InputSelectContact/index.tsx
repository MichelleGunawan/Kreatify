import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import ModalContact from "../ModalContact";
import {
  handleChange,
  handlefilterOptions,
  getOptionLabel,
  handleInputChange,
} from "./functions/functions";
import { ContactType } from "@/types/contact.type";
import { ContactPreviewType } from "@/types/user.type";
import "./styles/index.scss";
import { addNewContact } from "@/services/contacts/contact_actions";

const InputSelectContact: React.FC<InputSelectContactProps> = ({
  label,
  value,
  onChange,
  options,
  error,
  width = "100%",
  height = "auto",
  placeholder = "Select an option",
}) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const selected = options.find((option) => option.id == value) || null;
  const name = selected ? selected.name : "";

  const onCreateContact = (newContact: ContactType) => {
    addNewContact({ id: -1, ...newContact }).then((data) => {
      if (data && data.id && data.name && data.email) {
        options.push({ id: data.id, name: data.name, email: data.email });
        onChange(data.id);
      }
    });
  };

  return (
    <div className="select-input-container" style={{ width, height }}>
      {label && <label className="h2 select-input-label">{label}</label>}
      <Autocomplete
        value={name}
        onChange={(event, newValue) =>
          handleChange(event, newValue, onChange, setIsContactModalOpen)
        }
        filterOptions={(options, params) =>
          handlefilterOptions(options, params)
        }
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="contact-select"
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

      {isContactModalOpen && (
        <ModalContact
          setOpen={setIsContactModalOpen}
          title={"Create Contact"}
          onCreate={onCreateContact}
        />
      )}
    </div>
  );
};

export default InputSelectContact;

interface InputSelectContactProps {
  label?: string;
  value: number;
  onChange: (id: number) => void;
  options: ContactPreviewType[];
  error?: string;
  width?: string;
  height?: string;
  placeholder?: string;
}
