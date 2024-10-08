"use client";
import React from "react";
import { useGlobalContext } from "@/context/index";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { getIconLink } from "@/utils/functions/iconLinks";
import { CampaignPendingNotificationType } from "@/types/notifications.type";
import "../styles/index.scss";

const PendingCampaignNotification: React.FC<NotificationPropsType> = ({
  notification,
}) => {
  const router = useRouter();
  const { userId } = useGlobalContext();

  return (
    <div
      className="notification"
      onClick={() => {
        router.push(`/campaigns`);
      }}
    >
      <div
        className="notification-icon-container"
        style={{ backgroundColor: "#FFAB05" }}
      >
        <Icon link={getIconLink("pendingcampaigns")} color="#ffffff" />
      </div>
      <div className="notification-text">
        <h3 className="h3 text-black">{notification.campaignName}</h3>
        <div className="p2 text-grey-500">
          You have a new pending campaign! Check it out before{" "}
          {notification.dueDate}.
        </div>
      </div>
    </div>
  );
};

export default PendingCampaignNotification;

type NotificationPropsType = {
  notification: CampaignPendingNotificationType;
};
