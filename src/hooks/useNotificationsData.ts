import { useState, useEffect } from "react";
import { UUID } from "crypto";
import { NotificationType } from "@/types/notifications.type";
import {
  fetchInfluencerNotifications,
  fetchManagerNotifications,
} from "@/services/notifications/fetch_actions";
import { isValidUUID } from "@/utils/functions/validation.functions";
import usePermission from "./usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";

type useAgencyProps = {
  userId?: UUID | null;
  talentId?: UUID | null;
  managerId?: UUID | null;
  agencyId?: UUID | null;
};

function useNotificationsData({
  userId,
  talentId,
  managerId,
  agencyId,
}: useAgencyProps) {
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    if (I1Permission && talentId && isValidUUID(talentId)) {
      fetchInfluencerNotifications(talentId).then(
        (data: NotificationType[]) => {
          setNotifications(data);
        }
      );
    }
  }, [talentId, I1Permission]);

  useEffect(() => {
    if (M3Permission && managerId && isValidUUID(managerId)) {
      fetchManagerNotifications(managerId).then((data: NotificationType[]) => {
        setNotifications(data);
      });
    }
  }, [managerId, M3Permission]);

  return {
    notifications,
    setNotifications,
  };
}

export default useNotificationsData;
