import { useState, useEffect } from "react";
import {
  fetchUserContactInfo,
  fetchUserLocation,
  fetchUserSecurityInfo,
} from "@/services/settings/fetch_actions";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";

type useSettingsDataProps = {
  role?: string;
  userId?: UUID | null;
  talentId?: UUID | null;
  managerId?: UUID | null;
  agencyId?: UUID | null;
};

function useSettingsData({
  role,
  userId,
  talentId,
  managerId,
  agencyId,
}: useSettingsDataProps) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");

  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (userId && isValidUUID(userId)) {
      fetchUserContactInfo(userId).then(
        ({ first_name, last_name, phone, whatsapp }) => {
          setFirstName(first_name);
          setLastName(last_name);
          setPhone(phone);
          setWhatsapp(whatsapp);
        }
      );
      fetchUserLocation(userId).then(({ country, city, state, address }) => {
        setCountry(country);
        setCity(city);
        setState(state);
        setAddress(address);
      });

      fetchUserSecurityInfo(userId).then(({ email }) => {
        setEmail(email);
      });
    }
  }, [userId]);

  return {
    firstName,
    lastName,
    phone,
    whatsapp,
    setFirstName,
    setLastName,
    setPhone,
    setWhatsapp,
    country,
    city,
    state,
    address,
    setCountry,
    setCity,
    setState,
    setAddress,
    email,
  };
}

export default useSettingsData;
