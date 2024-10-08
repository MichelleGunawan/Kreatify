"use client";
import React, { useState } from "react";
import Notifications from "@/components/Notifications";
import ButtonIcon from "@/components/ButtonIcon";
import { Badge } from "@mui/material";
import "../styles/headerNotifications.scss";
import useNotificationsData from "@/hooks/useNotificationsData";
import { useGlobalContext } from "@/context";

const HeaderNotifications: React.FC<HeaderNotificationsProps> = ({}) => {
  const { talentId, managerId } = useGlobalContext();

  const { notifications, setNotifications } = useNotificationsData({
    talentId,
    managerId,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="header-notifications">
      <Badge badgeContent={notifications.length} color="secondary">
        <ButtonIcon
          icon="notification"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </Badge>

      <Notifications
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </div>
  );
};

// Export the component
export default HeaderNotifications;

// Define prop types for the component
type HeaderNotificationsProps = {};
