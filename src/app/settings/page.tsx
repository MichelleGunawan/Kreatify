"use client";
import React from "react";
import { useGlobalContext } from "@/context";
import dynamic from "next/dynamic";

//Component import
import LoggedinLayout from "@/layouts/LoggedinLayout";
import SettingsCardSecurity from "@/components/SettingsCardSecurity";
import SettingsCardContact from "@/components/SettingsCardContact";
import SettingsCardLocation from "@/components/SettingsCardLocation";
import useSettingsData from "@/hooks/useSettingsData";

//CSS import
import "@/styles/settings.page.scss";
import { useSession } from "@/hooks/useSession";
import { handleLogout } from "@/services/auth/post_actions";

const Button = dynamic(() => import("@/components/Button"), {
  ssr: false,
});

const SettingsPage = () => {
  const { sessionLoading } = useSession({});
  const { userId } = useGlobalContext();
  const {
    firstName,
    lastName,
    phone,
    whatsapp,
    setFirstName,
    setLastName,
    setPhone,
    setWhatsapp,

    address,
    state,
    city,
    country,
    setAddress,
    setState,
    setCity,
    setCountry,
    email,
  } = useSettingsData({ userId });

  return (
    <LoggedinLayout headerTitle="Settings">
      <SettingsCardContact
        title="Contact"
        firstName={firstName}
        lastName={lastName}
        phone={phone}
        whatsapp={whatsapp}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setPhone={setPhone}
        setWhatsapp={setWhatsapp}
      />
      <SettingsCardLocation
        title="Location"
        address={address}
        city={city}
        state={state}
        country={country}
        setAddress={setAddress}
        setCity={setCity}
        setState={setState}
        setCountry={setCountry}
      />
      <SettingsCardSecurity title="Security" email={email} />
      <div className="settings-page-buttons-container">
        <Button
          borderColor="blue"
          color={"blue"}
          label="Logout"
          textClass="p3"
          width="120px"
          onClick={() => {
            handleLogout();
            window.location.pathname = "/";
          }}
        />
        <Button
          backgroundColor="red"
          color={"white"}
          label="Delete Account"
          textClass="p3"
          width="120px"
        />
      </div>
    </LoggedinLayout>
  );
};

export default SettingsPage;
