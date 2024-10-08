"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { getIconLink } from "@/utils/functions/iconLinks";
import "../styles/index.scss";

const HeaderMenuItem: React.FC<HeaderMenuItemProps> = ({
  text,
  icon,
  route,
}) => {
  const router = useRouter();

  return (
    <div
      className="header-menu-item"
      onClick={() => {
        router.push(route);
      }}
    >
      <Icon link={getIconLink(icon)} size={24} color="#737373" />
      <div className="p2 header-menu-text">{text}</div>
    </div>
  );
};

export default HeaderMenuItem;

type HeaderMenuItemProps = {
  text: string;
  icon: string;
  route: string;
};
