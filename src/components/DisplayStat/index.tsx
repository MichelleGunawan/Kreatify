"use client";
import React from "react";
// Custom components
import Icon from "../Icon";
import { formatNumber } from "@/utils/functions/format.functions";
import { getIconLink } from "@/utils/functions/iconLinks";
import { SocialFollowingsType } from "@/types/social.type";
import "./styles/index.scss";
import { openSocialProfile } from "@/utils/functions/util.functions";
import { set } from "lodash";

const DisplayStat: React.FC<DisplayStatProps> = ({
  icon,
  title,
  number,
  type,
}) => {
  const [mouseEnter, setMouseEnter] = React.useState(false);
  return (
    <div className="display-stat">
      <div
        className={`display-stat-header`}
        onClick={() => {
          if (type && type.toLowerCase() === "social") {
            openSocialProfile(icon, title);
          }
        }}
        onMouseEnter={() => {
          if (type && type.toLowerCase() === "social") {
            setMouseEnter(true);
          }
        }}
        onMouseLeave={() => setMouseEnter(false)}
      >
        {icon && (
          <Icon
            link={getIconLink(icon)}
            size={20}
            color={mouseEnter ? "#775FFF" : "#000"}
          />
        )}
        <h3
          className="p2"
          style={{ color: mouseEnter ? "#775FFF" : "#000", cursor: "pointer" }}
        >
          {title}
        </h3>
      </div>
      <p className="h2 text-black">{formatNumber(number) ?? "?"}</p>
    </div>
  );
};

export default DisplayStat;

type DisplayStatProps = {
  icon?: string;
  title: string;
  number: number;
  type?: string;
};
