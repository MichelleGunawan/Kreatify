import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context";
import { renderCell } from "./functions";
import {
  getCampaignColor,
  formatHexToRgba,
} from "@/utils/functions/color.functions";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";
import "./styles/index.scss";
import "@/styles/card.scss";

const CardCampaignInfo: React.FC<DisplayCampaignInfoProps> = ({
  campaignStatus,
  data,
  textColor = "#fff",
}) => {
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);

  // Will be used for modal for info feature
  const [selectedCell, setSelectedCell] = useState<{
    header: string;
    cellContent: string;
  } | null>(null);
  const [modalInfo, setModalInfo] = useState(false);
  const [color, setColor] = useState(getCampaignColor(campaignStatus));
  useEffect(() => {
    setColor(getCampaignColor(campaignStatus));
  }, [campaignStatus]);

  const [campaignData, setCampaignData] = useState<any[]>([]);

  useEffect(() => {
    setCampaignData([
      {
        label: I1Permission ? "My Payout" : "Rate",
        value: data.payout,
        type: "money",
      },
      { label: "Brand", value: data.brand, type: "brand" },
      {
        label: "Creator",
        value: data.influencer,
        type: "userpreview",
      },
      {
        label: "Campaign Manager",
        value: data.campaign_manager,
        type: "userpreview",
      },
      {
        label: "Partnership Type",
        value: data.partnership_type,
        type: "text",
      },
      { label: "Usage", value: data.usage, type: "text" },
      {
        label: "Exclusivity",
        value: data.exclusivity,
        type: "text",
      },
      {
        label: "Category",
        value: data.category,
        type: "text",
      },
    ]);
  }, [data, I1Permission]);

  return (
    <div
      className="card"
      style={{
        backgroundColor: color,
        boxShadow: `5px 10px 50px 0px ${formatHexToRgba(color, 0.5)}`,
      }}
    >
      <div className="info-card-info-container">
        {campaignData.map(
          ({ label, type, value }: CellProps, index: number) => (
            <div key={index} className="info-card-text">
              <div className="p2 " style={{ color: textColor }}>
                {label}
              </div>
              <div className="h2 info-card-value" style={{ color: textColor }}>
                {renderCell(type, value, setSelectedCell, setModalInfo)}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CardCampaignInfo;

type DisplayCampaignInfoProps = {
  campaignStatus: string;
  data: any;
  cols?: number;
  textColor?: string;
};

type CellProps = {
  label: string;
  value: any;
  type: string;
};
