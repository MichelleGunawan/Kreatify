"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

//Component import
import Button from "@/components/Button";
import ModalPitchList from "../ModalPitchList";
import Alert from "../Alert";
import { getIconLink } from "@/utils/functions/iconLinks";

//CSS import
import "@/styles/header.scss";
import { formatUrl } from "@/utils/functions/format.functions";
import { UUID } from "crypto";

const HeaderPitchList: React.FC<HeaderPitchListProps> = ({
  id,
  name,
  email,
  whatsapp,
  phone,
  website,
  view,
}) => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleEditButtonClick = () => {
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="header">
        <div className="header-left">
          <h1 className="h1 text-black">{name}</h1>
        </div>
        <div className="header-right">
          {website && (
            <Button
              icon={getIconLink("website")}
              color="#775FFF"
              borderColor="#775FFF"
              width="40px"
              height="40px"
              borderRadius="100px"
              textClass="h3"
              onClick={() => window.open(formatUrl(website))}
              tooltipText={website}
            />
          )}
          {whatsapp && (
            <Button
              icon={getIconLink("whatsapp")}
              color="#775FFF"
              borderColor="#775FFF"
              width="40px"
              height="40px"
              borderRadius="100px"
              textClass="h3"
              onClick={() => {
                navigator.clipboard.writeText(whatsapp);
                setShowAlert(true);
              }}
              tooltipText={whatsapp}
            />
          )}
          {phone && (
            <Button
              icon={getIconLink("phone")}
              color="#775FFF"
              borderColor="#775FFF"
              width="40px"
              height="40px"
              borderRadius="100px"
              textClass="h3"
              onClick={() => {
                navigator.clipboard.writeText(phone);
                setShowAlert(true);
              }}
              tooltipText={phone}
            />
          )}
          {email && (
            <Button
              icon={getIconLink("email")}
              color="#775FFF"
              borderColor="#775FFF"
              width="40px"
              height="40px"
              borderRadius="100px"
              textClass="h3"
              onClick={() => {
                navigator.clipboard.writeText(email);
                setShowAlert(true);
              }}
              tooltipText={email}
            />
          )}
          {id && (
            <Button
              icon={getIconLink("link")}
              color="#775FFF"
              borderColor="#775FFF"
              width="40px"
              height="40px"
              borderRadius="100px"
              textClass="h3"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://kreatify.io/pitchlist/${id}`
                );
                setShowAlert(true);
              }}
              tooltipText="Copy Link"
            />
          )}
          {view === "internal" && (
            <Button
              label="Edit Pitch List"
              icon={getIconLink("edit")}
              color="#775FFF"
              borderColor="#775FFF"
              width="150px"
              height="40px"
              borderRadius="10px"
              textClass="h3"
              onClick={handleEditButtonClick}
            />
          )}
        </div>
      </div>

      {isEditModalOpen && (
        <ModalPitchList
          title="Edit Pitch List"
          setOpen={setIsEditModalOpen}
          id={id}
        />
      )}

      {showAlert && (
        <Alert
          text={"Copied!"}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
    </>
  );
};

export default HeaderPitchList;

type HeaderPitchListProps = {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  website?: string;
  view: "internal" | "external";
};
