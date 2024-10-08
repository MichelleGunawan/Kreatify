import { NUM_ROWS_PER_PAGE } from "@/utils/constants";

export const getEmptyRows = (data: any[]) => {
  const numEmptyRows = NUM_ROWS_PER_PAGE - (data.length % NUM_ROWS_PER_PAGE);
  if (numEmptyRows != 0) {
    return [...data, ...Array.from({ length: numEmptyRows }, () => ({}))];
  }
  return data;
};
