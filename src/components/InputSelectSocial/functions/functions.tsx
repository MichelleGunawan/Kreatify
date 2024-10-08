import React, { SetStateAction, Dispatch } from "react";
import {
  createFilterOptions,
  FilterOptionsState,
  AutocompleteInputChangeReason,
} from "@mui/material";
import { UserPreviewType } from "@/types/user.type";

const filter = createFilterOptions<UserPreviewType>();

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
  onChange: (id: number) => void
) => {
  // When x pressed
  if (reason === "clear" && newInputValue === "") {
    onChange(-1);
    return;
  }
};
