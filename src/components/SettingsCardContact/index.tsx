"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

// Custom components
import Button from "../Button";
import ModalEditContact from "./component/ModalEditContact";
import { getIconLink } from "@/utils/functions/iconLinks";

import "./styles/index.scss";
import { COLORS } from "@/utils/constants";

const SettingsCardContact: React.FC<SettingsCardContactProps> = ({
  title,
  firstName,
  lastName,
  phone,
  whatsapp,
  setFirstName,
  setLastName,
  setPhone,
  setWhatsapp,
}) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState(firstName);
  const [lastNameInput, setLastNameInput] = useState(lastName);
  const [phoneInput, setPhoneInput] = useState(phone);
  const [whatsappInput, setWhatsappInput] = useState(whatsapp);

  // Update state variables when props change
  useEffect(() => {
    setFirstNameInput(firstName);
  }, [firstName]);

  useEffect(() => {
    setLastNameInput(lastName);
  }, [lastName]);

  useEffect(() => {
    setPhoneInput(phone);
  }, [phone]);

  useEffect(() => {
    setWhatsappInput(whatsapp);
  }, [whatsapp]);

  const updateFrontend = ({
    newFirstName,
    newLastName,
    newPhone,
    newWhatsapp,
  }: any) => {
    setFirstName(newFirstName);
    setLastName(newLastName);
    setPhone(newPhone);
    setWhatsapp(newWhatsapp);
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
        <p className="p2 text-black">Name</p>
        <div className="settings-card-row-right">
          <h3 className="h3 text-black">
            {firstName} {lastName}
          </h3>
        </div>
      </div>
      <div className="settings-card-row">
        <p className="p2 text-black">Phone</p>
        <div className="settings-card-row-right">
          <h3 className="h3 text-black">{phone}</h3>
        </div>
      </div>
      <div className="settings-card-row">
        <p className="p2 text-black">Whatsapp</p>
        <div className="settings-card-row-right">
          <h3 className="h3 text-black">{whatsapp}</h3>
        </div>
      </div>

      {modalEditOpen && (
        <ModalEditContact
          setOpen={setModalEditOpen}
          firstName={firstNameInput}
          lastName={lastNameInput}
          phone={phoneInput}
          whatsapp={whatsappInput}
          setFirstName={setFirstNameInput}
          setLastName={setLastNameInput}
          setPhone={setPhoneInput}
          setWhatsapp={setWhatsappInput}
          updateFrontend={updateFrontend}
        />
      )}
    </div>
  );
};

export default SettingsCardContact;

type SettingsCardContactProps = {
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  whatsapp: string;

  setFirstName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
  setPhone: Dispatch<SetStateAction<string>>;
  setWhatsapp: Dispatch<SetStateAction<string>>;
};
