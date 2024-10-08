"use client";
import React from "react";
import Icon from "@/components/Icon";
import { SocialDBType } from "@/types/social.type";
import { getIconLink } from "@/utils/functions/iconLinks";

// Custom components
import "../styles/index.scss";
import { COLORS } from "@/utils/constants";

const SocialCell: React.FC<SocialCellProp> = ({ content }) => {
  return (
    <>
      {content?.map((item, index) => (
        <React.Fragment key={index}>
          <Icon
            link={getIconLink(item?.platform?.toLocaleLowerCase())}
            size={24}
            color={COLORS.PRIMARY}
            tooltipText={item.handle}
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default SocialCell;

type SocialCellProp = {
  content: SocialDBType[];
};
