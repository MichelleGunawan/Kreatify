"use client";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context";
import { Tooltip } from "@mui/material";
import {
  formatHexToRgba,
  getPaymentStatusColor,
} from "@/utils/functions/color.functions";
import { updateCampaignPaymentStatus } from "@/services/campaign/post_actions";
import "../styles/cells.scss";
import { PaymentStatusType } from "@/types/campaign.type";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";
import { convertToUUID } from "@/utils/functions/converter.functions";
import { paymentStatusOptions } from "@/utils/variables/campaign.variables";

const PaymentStatusCell: React.FC<PaymentStatusCellProp> = ({
  id,
  content,
}) => {
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const [selectedOption, setSelectedOption] = useState(content);
  const [statusColor, setStatusColor] = useState(
    getPaymentStatusColor(content)
  );

  const handleStatusChange = (status: string) => {
    updateCampaignPaymentStatus(convertToUUID(id), status as PaymentStatusType);
    setSelectedOption(status);
    setStatusColor(getPaymentStatusColor(status));
  };

  useEffect(() => {
    setSelectedOption(content);
    setStatusColor(getPaymentStatusColor(content));
  }, [content]);

  return (
    <>
      {I1Permission ? (
        <Tooltip title={content}>
          <div
            className="pill-cell h3"
            style={{
              color: statusColor,
              backgroundColor: formatHexToRgba(statusColor, 0.2),
            }}
          >
            {content}
          </div>
        </Tooltip>
      ) : (
        <select
          className="pill-cell h3"
          style={{
            color: statusColor,
            backgroundColor: formatHexToRgba(statusColor, 0.2),
          }}
          value={selectedOption}
          onChange={(event) => handleStatusChange(event.target.value)}
        >
          {paymentStatusOptions.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default PaymentStatusCell;

type PaymentStatusCellProp = {
  id: string;
  content: string;
};
