"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useGlobalContext } from "@/context/index";
import { usePathname, useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { getIconLink } from "@/utils/functions/iconLinks";
import { CampaignAcceptNotificationType } from "@/types/notifications.type";
import "../styles/index.scss";

const AcceptCampaignNotification: React.FC<NotificationPropsType> = ({
  notification,
}) => {
  const router = useRouter();

  return (
    <div
      className="notification"
      onClick={() => {
        router.push(`/campaign/1`);
      }}
    >
      <div
        className="notification-icon-container"
        style={{ backgroundColor: "#0ABC5D" }}
      >
        <Icon link={getIconLink("checkmark")} color="#ffffff" />
      </div>
      <div className="notification-text">
        <h3 className="h3 text-black">{notification.campaignName}</h3>
        <div className="p2 text-grey-500">
          {notification.user} has accepted the campaign!
        </div>
      </div>
    </div>
  );
};

export default AcceptCampaignNotification;

type NotificationPropsType = {
  notification: CampaignAcceptNotificationType;
};
