"use client";
import React, { useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../Button";
import { ReactSVG } from "react-svg";
import { useSidebarContext } from "@/context";
import { getIconLink } from "@/utils/functions/iconLinks";
import { useGlobalContext } from "@/context";
import {
  managementMainRoutes,
  talentMainRoutes,
} from "@/utils/variables/sidebar";
import "./styles/index.scss";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";
import { UserPermission } from "@/types/enum.types";

function Sidebar({ user }: SidebarProps) {
  const { isOpen, setIsOpen } = useSidebarContext();
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const router = useRouter();
  const pathname = usePathname();

  // Determine main and other routes based on user type
  const mainRoutes = useMemo(() => {
    return M3Permission ? managementMainRoutes : talentMainRoutes;
  }, [M3Permission]);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      // Get the last part of the pathname
      const pathParts = pathname.split("/");
      const lastPathPart = pathParts[1];

      // Get the last part of the routeName
      const routeParts = routeName.split("/");
      const lastRoutePart = routeParts[1];

      // Compare the last segment with the routeName
      return lastPathPart === lastRoutePart;
      //return pathname?.includes(routeName);
    },
    [pathname]
  );

  // SIDEBAR
  return (
    <div className={`sidebar ${isOpen ? "ontop" : "inline"}`}>
      {isOpen && (
        <div className="sidebar-ex-container">
          <Button
            color="#ffffff"
            icon={getIconLink("remove")}
            onClick={() => setIsOpen(false)}
            width="24px"
            height="24px"
            borderColor="transparent"
          />
        </div>
      )}
      <div
        className="sidebar-logo-container"
        onClick={() => {
          router.push("/home");
        }}
      >
        <ReactSVG src={getIconLink("kreatifyLogoFull")} />
      </div>
      {(I1Permission || M3Permission) && (
        <div className="sidebar-content-container">
          {mainRoutes.map((route, key) => (
            <Link
              key={key}
              href={route.path}
              className={`p sidebar-item ${
                activeRoute(route.path.toLowerCase()) ? "active" : ""
              }`}
            >
              <ReactSVG
                src={route.icon}
                beforeInjection={(svg: any) => {
                  svg.setAttribute(
                    "style",
                    "width: 24px; height: 24px; color:inherit;"
                  );
                  const paths = svg.querySelectorAll("path");
                  paths.forEach((path: any) => {
                    if (activeRoute(route.path.toLowerCase())) {
                      path.setAttribute("stroke", "white");
                      path.setAttribute("stroke-width", "1.5"); // Thicker stroke for active
                    } else {
                      path.setAttribute("stroke", "currentColor");
                      path.setAttribute("stroke-width", "1"); // Default thickness
                    }
                  });
                }}
              />
              <div>{route.name}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sidebar;

interface SidebarProps {
  user: string;
}
