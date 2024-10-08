import bcrypt from "bcryptjs";

const saltRounds = 10;

export async function hashPassword(plainTextPassword: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Password hashing failed");
  }
}

export const openGoogleMaps = ({
  address,
  city,
  state,
  country,
}: {
  address: string;
  city?: string;
  state?: string;
  country?: string;
}) => {
  // Create an array of non-empty address parts
  const queryParts = [address];
  if (city) queryParts.push(city);
  if (state) queryParts.push(state);
  if (country) queryParts.push(country);

  // Join the parts to form the complete query string
  const query = encodeURIComponent(queryParts.join(", "));
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  window.open(googleMapsUrl, "_blank"); // Opens in a new tab
};

export const openSocialProfile = (platform?: string, handle?: string) => {
  let url = "";

  if (!platform || !handle) {
    return;
  }

  switch (platform.toLowerCase()) {
    case "tiktok":
      url = `https://www.tiktok.com/@${handle}`;
      break;
    case "instagram":
      url = `https://www.instagram.com/${handle}`;
      break;
    case "youtube":
      url = `https://www.youtube.com/${handle}`;
      break;
    case "x": // formerly Twitter
    case "twitter": // fallback for 'twitter'
      url = `https://twitter.com/${handle}`;
      break;
    case "facebook":
      url = `https://www.facebook.com/${handle}`;
      break;
    case "threads":
      url = `https://www.threads.net/@${handle}`;
      break;
    case "twitch":
      url = `https://www.twitch.tv/${handle}`;
      break;
    default:
      console.error("Unsupported platform");
      return;
  }

  if (handle) {
    window.open(url, "_blank"); // opens the profile in a new tab
  } else {
    console.error("No handle provided");
  }
};

export const getYearsFrom2024ToNow = () => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = 2024; year <= currentYear; year++) {
    years.push(year.toString());
  }

  return years;
};
