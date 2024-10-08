"use client";
import React from "react";
import { useRouter } from "next/navigation";

//Component import
import Button from "@/components/Button";
import Icon from "../Icon";
import { ReactSVG } from "react-svg";
import { getIconLink } from "@/utils/functions/iconLinks";

//CSS import
import "./styles/index.scss";

const FooterKreatify: React.FC = ({}) => {
  const router = useRouter();

  return (
    <div className="footer">
      <div className="footer-logo">
        Powered By
        <div
          onClick={() => {
            router.push("https://kreatify.io");
          }}
        >
          <ReactSVG
            src={getIconLink("kreatifylogofullblack")}
            beforeInjection={(svg: any) => {
              svg.setAttribute("style", `width: ${100}px; height: ${50}px;`);
              // const paths = svg.querySelectorAll("path");
              // paths.forEach((path) => {
              //   if (color) path.setAttribute("stroke", color ?? "#000");
              //   if (strokeWidth) path.setAttribute("stroke-width", strokeWidth);
              // });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FooterKreatify;
