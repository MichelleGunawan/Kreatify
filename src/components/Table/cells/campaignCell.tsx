"use client";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context";
import Link from "next/link";
import Icon from "@/components/Icon";
import Checkbox from "@/components/Checkbox";
import { getCampaignIconLink } from "@/utils/functions/iconLinks";
import { BrandType } from "@/types/social.type";
import { Tooltip } from "@mui/material";
import { formatString, formatUrl } from "@/utils/functions/format.functions";
import "../styles/cells.scss";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";

const CampaignCell: React.FC<CampaignCellProp> = ({
  category,
  brand,
  content,
  id,
  selected,
  onSelect,
}) => {
  const router = useRouter();
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const { brand_name, brand_link } = brand as BrandType;
  const formattedBrandName = formatString(brand_name);
  const formattedBrandLink = formatUrl(brand_link);
  const [imageError, setImageError] = useState(false);

  const [showCheckbox, setShowCheckbox] = useState(selected.length > 0);
  useEffect(() => {
    setShowCheckbox(selected.length > 0);
  }, [selected]);

  const handleMouseEnter = () => {
    if (M3Permission) setShowCheckbox(true);
  };

  const handleMouseLeave = () => {
    if (selected.length <= 0) setShowCheckbox(false);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showCheckbox && (
        <div>
          <Checkbox
            isChecked={selected.includes(id)}
            onClick={() =>
              onSelect(
                selected.includes(id)
                  ? selected.filter((item) => item !== id)
                  : [...selected, id]
              )
            }
          />
        </div>
      )}

      <div className="cell">
        <Tooltip title={formattedBrandName}>
          {formattedBrandName && !imageError ? (
            <div
              className="cell-icon-container cell-icon-container-brand"
              onClick={() => {
                if (I1Permission) {
                  window.open(
                    formattedBrandName,
                    "_blank",
                    "noopener noreferrer"
                  );
                }
                if (M3Permission) router.push(`/campaign/${id}`);
              }}
              style={{
                cursor: I1Permission ? "pointer" : "default",
              }}
            >
              <img
                src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${formattedBrandLink}&size=64`}
                alt={`${brand_name} logo`}
                onError={() => setImageError(true)} // Handle image load failure
                loading="lazy"
              />
            </div>
          ) : (
            <div className="cell-icon-container cell-icon-container-icon">
              <Icon
                link={getCampaignIconLink(category)}
                color="#ffffff"
                size={30}
              />
            </div>
          )}
        </Tooltip>
        <Link href={`/campaign/${id}`}>
          <Tooltip title={content}>
            <p className="p2">{content}</p>
          </Tooltip>
        </Link>
      </div>
    </div>
  );
};

export default CampaignCell;

type CampaignCellProp = {
  category: string;
  brand: BrandType;
  content: string;
  id: UUID;
  selected: UUID[];
  onSelect: Dispatch<SetStateAction<UUID[]>>;
};
