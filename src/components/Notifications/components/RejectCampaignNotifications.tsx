"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { getIconLink } from "@/utils/functions/iconLinks";
import { CampaignRejectNotificationType } from "@/types/notifications.type";
import "../styles/index.scss";

const RejectCampaignNotification: React.FC<NotificationPropsType> = ({
  notification,
}) => {
  const router = useRouter();

  return (
    <div
      className="notification"
      onClick={() => {
        router.push(`/campaigns`);
      }}
    >
      <div
        className="notification-icon-container"
        style={{ backgroundColor: "#FF4D67" }}
      >
        <Icon link={getIconLink("remove")} color="#ffffff" />
      </div>
      <div className="notification-text">
        <h3 className="h3 text-black">{notification.campaignName}</h3>
        <div className="p2 text-grey-500">
          {notification.user} has rejected the campaign.
        </div>
      </div>
    </div>
  );
};

export default RejectCampaignNotification;

type NotificationPropsType = {
  notification: CampaignRejectNotificationType;
};
