"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import {
  getIconLink,
  getNotificationIconLink,
} from "@/utils/functions/iconLinks";
import { getNotificationColor } from "../functions/notification.functions";
import { formatDateForDisplay } from "@/utils/functions/format.functions";
import "../styles/index.scss";

const Notification: React.FC<NotificationProps> = ({
  id,
  type,
  header_text,
  body_text,
  routing,
  created_at,
  handleDeleteNotification,
}) => {
  const router = useRouter();

  return (
    <div
      className="notification"
      onClick={() => {
        router.push(routing);
      }}
    >
      <div className="notification-remove-button">
        <Button
          icon={getIconLink("remove")}
          color="#d5d5d5"
          onClick={() => {
            handleDeleteNotification(id);
          }}
        />
      </div>
      <div className="notification-content">
        <div
          className="notification-icon-container"
          style={{ backgroundColor: getNotificationColor(type) }}
        >
          <Icon
            link={getNotificationIconLink(type)}
            color="#ffffff"
            size={24}
          />
        </div>
        <div className="notification-text">
          <h3 className="h3 text-black">{header_text}</h3>
          <div className="p2 text-grey-500">{body_text}</div>
        </div>
      </div>
      <div className="p notification-date">
        {formatDateForDisplay(created_at)}
      </div>
    </div>
  );
};

export default Notification;

type NotificationProps = {
  id: number;
  type: string;
  header_text?: string;
  body_text?: string;
  routing: string;
  created_at: string;
  handleDeleteNotification: (id: number) => void;
};
