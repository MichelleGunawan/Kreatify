"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/index";
import { useSidebarContext } from "@/context/index";
import Icon from "../Icon";
import HeaderImage from "./components/HeaderImage";
import HeaderNotifications from "./components/HeaderNotifications";
import ButtonIcon from "../ButtonIcon";
import Separator from "../Separator";
import { getIconLink } from "@/utils/functions/iconLinks";
import "@/styles/header.scss";
import "./styles/index.scss";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";

function Header(props: { title: string }) {
  const { firstName } = useGlobalContext();
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const { isOpen, setIsOpen } = useSidebarContext();
  const router = useRouter();

  // SIDEBAR
  return (
    <div className="header main">
      <div className="header-left">
        <div className="header-drawer-icon-container">
          <Icon
            link={getIconLink("menu")}
            size={20}
            onClick={() => setIsOpen(true)}
          />
        </div>
        <div className="h1 header-page-name">{props.title}</div>
      </div>
      <div className="header-right">
        <div className="header-buttons-container">
          <div className="header-buttons-flex main-right">
            {M3Permission && (
              <>
                <ButtonIcon
                  icon="addcampaign"
                  onClick={() => {
                    router.push("/campaign/edit/new");
                  }}
                />
                {/* <Separator direction="vertical" height="30px" /> */}
              </>
            )}
            <HeaderNotifications />
            <Separator direction="vertical" height="30px" />
          </div>
        </div>
        <div className="header-right-text-container">
          <h3 className="p2 header-text">
            Hi <b>{firstName}</b>
          </h3>
          <div className="p2 header-subtext">
            {I1Permission ? "Creator" : "Manager"}
          </div>
        </div>
        <HeaderImage
          profilePic={
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          }
        />
      </div>
    </div>
  );
}

export default Header;
