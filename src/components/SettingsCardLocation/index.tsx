"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

// Custom components
import Button from "../Button";
import ModalEditLocation from "./component/ModalEditLocation";
import { getIconLink } from "@/utils/functions/iconLinks";

import "./styles/index.scss";
import { COLORS } from "@/utils/constants";

const SettingsCardLocation: React.FC<SettingsCardLocationProps> = ({
  title,
  country,
  state,
  city,
  address,
  setCountry,
  setState,
  setCity,
  setAddress,
}) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);

  const [countryInput, setCountryInput] = useState(country);
  const [stateInput, setStateInput] = useState(state);
  const [cityInput, setCityInput] = useState(city);
  const [addressInput, setAddressInput] = useState(address);

  // Update state variables when props change
  useEffect(() => {
    setCountryInput(country);
  }, [country]);

  useEffect(() => {
    setStateInput(state);
  }, [state]);

  useEffect(() => {
    setCityInput(city);
  }, [city]);

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  const updateFrontend = ({
    newAddress,
    newCity,
    newState,
    newCountry,
  }: any) => {
    setCountry(newCountry);
    setState(newState);
    setCity(newCity);
    setAddress(newAddress);
  };

  return (
    <div className="settings-card">
      <div className="settings-card-row">
        <h2 className="h2 text-black">{title}</h2>
        <Button
          icon={getIconLink("edit")}
          color={COLORS.PRIMARY}
          width="30px"
          height="30px"
          borderRadius="100px"
          onClick={() => {
            setModalEditOpen(true);
          }}
        />
      </div>
      <div className="settings-card-row">
        <p className="p2 text-black">Address</p>
        <div className="settings-card-row-right">
          <h3 className="h3 text-black">{address}</h3>
        </div>
      </div>
      <div className="settings-card-row">
        <p className="p2 text-black">City</p>
        <div className="settings-card-row-right">
          <h3 className="h3 text-black">{city}</h3>
        </div>
      </div>
      <div className="settings-card-row">
        <p className="p2 text-black">State</p>
        <div className="settings-card-row-right">
          <h3 className="h3 text-black">{state}</h3>
        </div>
      </div>
      <div className="settings-card-row">
        <p className="p2 text-black">Country</p>
        <div className="settings-card-row-right">
          <h3 className="h3 text-black">{country}</h3>
        </div>
      </div>

      {modalEditOpen && (
        <ModalEditLocation
          setOpen={setModalEditOpen}
          country={countryInput}
          state={stateInput}
          city={cityInput}
          address={addressInput}
          setAddress={setAddressInput}
          setCountry={setCountryInput}
          setState={setStateInput}
          setCity={setCityInput}
          updateFrontend={updateFrontend}
        />
      )}
    </div>
  );
};

export default SettingsCardLocation;

type SettingsCardLocationProps = {
  title: string;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  country: any;
  setCountry: Dispatch<SetStateAction<any>>;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
};
