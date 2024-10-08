"use client";
import React from "react";
import { useRouter } from "next/navigation";
// Custom components
import { Tooltip } from "@mui/material";
import Button from "../Button";
import Icon from "../Icon";
import { getIconLink } from "@/utils/functions/iconLinks";
import { ReactSVG } from "react-svg";

import "./styles/index.scss";

const HomeStatisticsCard: React.FC<StatisticsProps> = ({
  title,
  amount,
  icon,
  tooltipText,
  cardStyle,
  iconBoxColor,
}) => {
  const router = useRouter();
  return (
    <div className="home-statistics-card" style={{ ...cardStyle }}>
      <div className="home-statistics-content">
        <Button
          icon={getIconLink(icon)}
          color="#ffffff"
          backgroundColor={iconBoxColor}
          width="40px"
          height="40px"
          borderRadius="100px"
          onClick={() => router.push("/campaign")}
        />
        <div className="home-statistics-text-container">
          <div className="home-statistics-title z-1">
            <h2 className="p1 home-statistics-heading">{title}</h2>
            {tooltipText && (
              <Icon
                link={getIconLink("info")}
                size={30}
                color="#fff"
                tooltipText={tooltipText}
              />
            )}
          </div>

          <h1 className=" home-statistics-text">{amount}</h1>
        </div>
      </div>
      <div className="home-statistics-logo-container">
        <ReactSVG
          src={getIconLink("kreatifyLogoBackwards")}
          beforeInjection={(svg: any) => {
            svg.setAttribute(
              "style",
              "width: 100%; height: 100%; opacity: 0.6;"
            );
            const paths = svg.querySelectorAll("path");
            paths.forEach((path: any) => path.setAttribute("fill", "#fff"));
          }}
        />
      </div>
    </div>
  );
};

export default HomeStatisticsCard;

interface StatisticsProps {
  title: string;
  amount: string;
  icon: string;
  tooltipText?: string;
  cardStyle: React.CSSProperties;
  iconBoxColor: string;
}
