import { CampaignMatchingAnswerType } from "../../types/campaignMatching.type";
import { SocialFollowingsType } from "../../types/social.type";

export const formatDateForDisplay = (date: string): string => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return date; // TODO: Return empty string if the date is invalid
  }

  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  const day = parsedDate.getDate().toString().padStart(2, "0");
  const year = parsedDate.getFullYear();

  // Use year.slice(2) for 2-digit year, or year for 4-digit year
  const formattedDate = `${month}/${day}/${year.toString().slice(2)}`;

  return formattedDate;
};

export const formatDateForDB = (date: string) => {
  const [month, day, year] = date.split("/");
  let formattedDueDate = "";
  if (year && month && day) {
    formattedDueDate = `20${year}-${month}-${day}`;
  }
  return formattedDueDate;
};

export const formatListWithComma = (list: (string | null)[]): string => {
  const filteredList = list.filter((item) => item && item.trim() !== "");

  if (filteredList.length === 0) {
    return "";
  }

  if (filteredList.length === 1 && filteredList[0] !== null) {
    return filteredList[0];
  }

  return (
    filteredList.slice(0, -1).join(", ") + ", " + filteredList.slice(-1)[0]
  );
};

export const formatCampaignMatchingAnswer = (
  campaignMatching: CampaignMatchingAnswerType
) => {
  if (
    campaignMatching.type === "select" ||
    campaignMatching.type === "multiselect"
  ) {
    return formatListWithComma(campaignMatching.answer);
  }

  return campaignMatching.answer;
};

export const formatNumber = (number: number) => {
  if (!number) {
    return number;
  }
  let displayNumber: string;

  if (number >= 1000000) {
    displayNumber = `${(number / 1000000).toFixed(1)}m`;
  } else if (number >= 10000) {
    displayNumber = `${(number / 1000).toFixed(1)}k`;
  } else {
    displayNumber = number.toString();
  }

  return displayNumber;
};

export const formatString = (string: any) => {
  if (!string) {
    return string;
  }
  // Capitalize first letter
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Converts HEX to RGB
export const formatHexToRgb = (hex: string): [number, number, number] => {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse the r, g, b values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
};

// Converts RGB to HEX
export const formatRgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
};

export const formatUrl = (url: string): string => {
  if (!url) {
    return url;
  }
  // Check if the URL already starts with "http://" or "https://"
  if (!/^https?:\/\//i.test(url)) {
    // If not, prepend "http://"
    return `http://${url}`;
  }
  // Return the URL as is if it already starts with "http://" or "https://"
  return url;
};

export const formatHandleToString = (str: string) => {
  if (str.charAt(0) === "@") {
    return str.slice(1); // Removes the first character
  }
  return str; // Return original string if no '@' at the start
};

export const getTotalReach = (
  socialFollowing: SocialFollowingsType[]
): number => {
  return socialFollowing.reduce(
    (total, current) => total + current.followers,
    0
  );
};

export const formatFilename = (fileName: string): string => {
  if (!fileName) return fileName;

  // Extract the file extension
  const fileParts = fileName.split(".");
  const fileType = fileParts.length > 1 ? fileParts.pop() : "";

  // Extract the filename without extension and truncate to 5 characters
  const baseName = fileParts.join(".").slice(0, 11);

  // Return formatted string with file type
  return `${baseName}...${fileType}`;
};
