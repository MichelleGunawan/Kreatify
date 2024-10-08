import { Dispatch, SetStateAction } from "react";

export const nextStep = (
  setCurrentStep: Dispatch<SetStateAction<number>>,
  maxPageIndex: number
) => {
  setCurrentStep((prev) => Math.min(prev + 1, maxPageIndex));
};

export const prevStep = (setCurrentStep: Dispatch<SetStateAction<number>>) => {
  setCurrentStep((prev) => Math.max(prev - 1, 0));
};

export const resetErrors = (
  setErrors: Dispatch<SetStateAction<any>>,
  field: string
) => {
  setErrors((prevErrors: any) => ({
    ...prevErrors,
    [field]: "",
  }));
};
