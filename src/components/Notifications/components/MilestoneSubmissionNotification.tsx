"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { getIconLink } from "@/utils/functions/iconLinks";
import { MilestoneSubmissionNotificationType } from "@/types/notifications.type";
import "../styles/index.scss";

const MilestoneSubmissionNotification: React.FC<NotificationPropsType> = ({
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
        style={{ backgroundColor: "#6ad1de" }}
      >
        <Icon link={getIconLink("campaign")} color="#ffffff" />
      </div>
      <div className="notification-text">
        <h3 className="h3 text-black">{notification.campaignName}</h3>
        <div className="p2 text-grey-500">
          {notification.user} has submitted a {notification.milestoneType}.
        </div>
      </div>
    </div>
  );
};

export default MilestoneSubmissionNotification;

type NotificationPropsType = {
  notification: MilestoneSubmissionNotificationType;
};
