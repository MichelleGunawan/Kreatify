import React, { SetStateAction, Dispatch } from "react";
import {
  createFilterOptions,
  FilterOptionsState,
  AutocompleteInputChangeReason,
} from "@mui/material";
import { ContactPreviewType } from "@/types/user.type";

const filter = createFilterOptions<ContactPreviewType>();

export const handleChange = (
  event: React.SyntheticEvent<Element, Event>,
  newValue: string | ContactPreviewType | null,
  onChange: (id: number) => void,
  setIsContactModalOpen: Dispatch<SetStateAction<boolean>>
) => {
  if (newValue && typeof newValue === "object" && newValue.id != -1) {
    onChange(newValue.id);
  }
  // If the user is creating a new contact
  else if (newValue && typeof newValue === "object" && newValue.id == -1) {
    setIsContactModalOpen(true);
  }
};

export const handlefilterOptions = (
  options: ContactPreviewType[],
  params: FilterOptionsState<ContactPreviewType>
) => {
  const filteredParams = {
    ...params,
    getOptionLabel: (option: ContactPreviewType) =>
      `${option.name} ${option.email}`,
  };
  const filtered = filter(options, filteredParams);

  const { inputValue } = params;

  // Suggest the creation of a new value
  const isExisting = options.some(
    (option) => inputValue === option.name || inputValue === option.email
  );

  if (inputValue !== "" && !isExisting) {
    filtered.push({
      id: -1,
      name: `+ Add Contact`,
      email: "",
    });
  }

  return filtered;
};

export const getOptionLabel = (option: ContactPreviewType | string) => {
  // Value selected with enter, right from the input
  if (typeof option === "string") {
    return option;
  }

  // Regular option
  return option.name;
};

export const handleInputChange = (
  event: React.SyntheticEvent<Element, Event>,
  newInputValue: string,
  reason: AutocompleteInputChangeReason,
  onChange: (id: number) => void
) => {
  // When x pressed
  if (reason === "clear" && newInputValue === "") {
    onChange(-1);
    return;
  }
};
