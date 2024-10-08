import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import PillNiche from "@/components/PillNiche";
import PillFollowers from "@/components/PillFollowers";
import DisplayImage from "@/components/DisplayImage";
import { getIconLink } from "@/utils/functions/iconLinks";
import { SocialFollowingsType } from "@/types/social.type";
import "./styles/index.scss";
import { COLORS } from "@/utils/constants";
const UserRow: React.FC<UserRowProps> = ({
  name,
  profileImage,
  socials,
  niches,
  userRole,
  rate,
  editRate,
  removeUser,
}) => {
  return (
    <div className="user-row">
      <div className="user-row-ex-container">
        <Button
          icon={getIconLink("remove")}
          color={COLORS.GREY500}
          onClick={removeUser}
        />
      </div>
      <DisplayImage data={profileImage} size="40px" />
      <div className="user-row-user-info">
        <div className="user-row-user-info-header">
          <p className="h3 text-black">{name}</p>
          {userRole && <p className="p2 user-row-usertype">({userRole})</p>}
        </div>
        {niches && (
          <div className="user-row-pills-container hide-scrollbar">
            {niches.map((niche) => (
              <PillNiche key={niche} label={niche} />
            ))}
          </div>
        )}
        {socials && (
          <div className="user-row-pills-container hide-scrollbar">
            {socials?.map((social, index) => (
              <PillFollowers key={index} {...social} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRow;

type UserRowProps = {
  name: string;
  profileImage?: string;
  socials?: SocialFollowingsType[];
  niches?: string[];
  userRole?: string;
  rate?: number;
  editRate?: (rate: number) => void;
  removeUser: () => void;
};
