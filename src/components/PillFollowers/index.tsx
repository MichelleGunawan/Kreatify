"use client";
import React from "react";
import Icon from "@/components/Icon";
import { Tooltip } from "@mui/material";
import { getIconLink } from "@/utils/functions/iconLinks";
import { formatNumber } from "@/utils/functions/format.functions";
import "./styles/index.scss";
import { SocialFollowingsType } from "@/types/social.type";
import { COLORS } from "@/utils/constants";

const PillFollowers: React.FC<SocialFollowingsType> = ({
  handle,
  platform,
  followers,
}) => {
  return (
    <Tooltip title={handle}>
      <div className="pill-social-following">
        <Icon link={getIconLink(platform)} size={24} color={COLORS.BLACK} />
        <p className="p3">{formatNumber(followers)}</p>
      </div>
    </Tooltip>
  );
};

export default PillFollowers;
