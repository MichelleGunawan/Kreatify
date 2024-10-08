import React, { SetStateAction, Dispatch } from "react";
import {
  createFilterOptions,
  FilterOptionsState,
  AutocompleteInputChangeReason,
} from "@mui/material";
import { UserPreviewType } from "@/types/user.type";
import { UUID } from "crypto";
import { convertToUUID } from "@/utils/functions/converter.functions";

const filter = createFilterOptions<UserPreviewType>();

export const handleChange = (
  event: React.SyntheticEvent<Element, Event>,
  newValue: string | UserPreviewType | null,
  onChange: (id: UUID | null) => void
) => {
  if (!newValue) {
    onChange(null);
  }
  if (newValue && typeof newValue === "object" && newValue.id != undefined) {
    onChange(convertToUUID(newValue.id));
  }
};

export const handlefilterOptions = (
  options: UserPreviewType[],
  params: FilterOptionsState<UserPreviewType>
) => {
  const filtered = filter(options, params);

  return filtered;
};

export const getOptionLabel = (option: UserPreviewType | string) => {
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
  onChange: (id: UUID | null) => void
) => {
  // When x pressed
  if (reason === "clear" && newInputValue === "") {
    onChange(null);
    return;
  }
};
