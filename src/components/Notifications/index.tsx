"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import Notification from "./components/Notification";
import { deleteNotification } from "@/services/notifications/delete_actions";
import { NotificationType } from "@/types/notifications.type";
import "./styles/index.scss";

const Notifications: React.FC<NotificationsProps> = ({
  isOpen,
  setIsOpen,
  notifications,
  setNotifications,
}) => {
  const handleDeleteNotification = async (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    await deleteNotification(id);
  };
  return (
    <div
      className={`notifications${isOpen ? " open" : ""}`}
      onMouseLeave={() => setIsOpen(false)}
    >
      {notifications.map(
        ({ id, type, created_at, header_text, body_text, routing }, index) => (
          <React.Fragment key={index}>
            <Notification
              id={id}
              type={type}
              header_text={header_text}
              body_text={body_text}
              routing={routing}
              created_at={created_at}
              handleDeleteNotification={handleDeleteNotification}
            />
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default Notifications;

type NotificationsProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  notifications: NotificationType[];
  setNotifications: Dispatch<SetStateAction<NotificationType[]>>;
};
