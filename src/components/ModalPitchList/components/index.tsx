import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import PillNiche from "@/components/PillNiche";
import PillFollowers from "@/components/PillFollowers";
import DisplayImage from "@/components/DisplayImage";
import { getIconLink } from "@/utils/functions/iconLinks";
import { SocialFollowingsType } from "@/types/social.type";
import "../styles/userRow.scss";
import InputText from "@/components/InputText";

const UserRow: React.FC<UserRowProps> = ({
  name,
  profileImage,
  socials,
  niches,
  userRole,
  rate,
  removeUser,
  editRate,
}) => {
  return (
    <div className="user-row">
      <div className="user-row-ex-container">
        <Button
          icon={getIconLink("remove")}
          color="#555555"
          onClick={removeUser}
        />
      </div>
      <DisplayImage data={profileImage} size="40px" />
      <div className="user-row-user-info">
        <div className="user-row-user-info-header">
          <p className="h3 text-black">{name}</p>
          {userRole && <p className="p2 user-row-usertype">({userRole})</p>}
        </div>
        <div className="user-row-body">
          <div className="user-row-pills">
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
          {editRate && (
            <div className="user-row-rate-container">
              <InputText
                label="Rate ($)"
                type="number"
                value={rate}
                onChange={(e) => editRate(Number(e))}
              />
            </div>
          )}
        </div>
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
  removeUser: () => void;
  editRate?: (rate: number) => void;
};
