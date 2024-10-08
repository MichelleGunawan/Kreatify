"use client";
import React, { Dispatch, SetStateAction } from "react";
import { useGlobalContext } from "@/context/index";
import HeaderMenuItem from "./components/HeaderMenuItem";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";
import "./styles/index.scss";

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);

  return (
    <div
      className={`header-menu${isMenuOpen ? " open" : ""}`}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <HeaderMenuItem
        text="Profile"
        icon="profile"
        route={`/profile${I1Permission ? "/influencer" : "/manager"}`}
      />
      <HeaderMenuItem text="Agency" icon="agency" route={`/agency`} />
      <HeaderMenuItem text="Settings" icon="settings" route={`/settings`} />
    </div>
  );
};

export default HeaderMenu;

type HeaderMenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};
