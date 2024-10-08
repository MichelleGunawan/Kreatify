"use client";
import React, { useState, Dispatch, SetStateAction } from "react";

// Custom components
import Button from "../Button";
import ModalEditPassword from "./component/ModalEditPassword";
import { getIconLink } from "@/utils/functions/iconLinks";

import "./styles/index.scss";
import { COLORS } from "@/utils/constants";

const SettingsCardSecurity: React.FC<SettingsCardSecurityProps> = ({
  title,
  email,
}) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);

  return (
    <div className="settings-card">
      <div className="settings-card-row">
        <h2 className="h2 text-black">{title}</h2>
      </div>
      <div className="settings-card-row">
        <p className="p2 text-black">Email</p>
        <div className="settings-card-row-right">
          <h3 className="h3 text-black">{email}</h3>
        </div>
      </div>
      <div className="settings-card-row">
        <p className="p2 text-black">Password</p>
        <div className="settings-card-row-right">
          <h3 className="h3 text-black">{"*******"}</h3>
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
      </div>

      {modalEditOpen && <ModalEditPassword setOpen={setModalEditOpen} />}
    </div>
  );
};

export default SettingsCardSecurity;

type SettingsCardSecurityProps = {
  title: string;
  email: string;
};
