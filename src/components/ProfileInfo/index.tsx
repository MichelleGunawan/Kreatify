import React from "react";
import DisplayImage from "../DisplayImage";
import Icon from "../Icon";
import PillNiche from "../PillNiche";
import DisplayStat from "../DisplayStat";
import { getIconLink } from "@/utils/functions/iconLinks";
import { getTotalReach } from "@/utils/functions/format.functions";
import { SocialFollowingsType } from "@/types/social.type";
import "./styles/index.scss";
import { COLORS } from "@/utils/constants";

const ProfileInfo: React.FC<ProfileInfoProp> = ({
  name,
  location,
  profileImage,
  bio,
  niches,
  totalReach,
  socialFollowing,
  buttons,
  imageSize = "100px",
}) => {
  return (
    <div className="profile-info">
      <div>
        <DisplayImage data={profileImage} size={imageSize} />
      </div>
      <div className="profile-info-right">
        <div className="profile-info-top-row">
          <div className="profile-info-header-container">
            <div className="profile-info-header">
              <h1 className="h1 profile-name ">{name}</h1>
              {location && (
                <div className="profile-info-location">
                  <Icon
                    link={getIconLink("Location")}
                    size={20}
                    color={COLORS.GREY400}
                  />
                  <p className="p2">{location}</p>
                </div>
              )}
            </div>
          </div>
          <div className="profile-info-button-container">{buttons}</div>
        </div>
        {bio && <p className="p2 text-black">{bio}</p>}
        <div className="profile-info-niche-container">
          {niches && (
            <>
              {niches.map((niche, index) => (
                <PillNiche key={index} label={niche} />
              ))}
            </>
          )}
        </div>

        {socialFollowing && (
          <div className="profile-info-follow-container">
            <DisplayStat
              title={"Total Reach"}
              number={getTotalReach(socialFollowing)}
            />

            {socialFollowing.map(({ platform, handle, followers }, index) => (
              <DisplayStat
                key={index}
                icon={platform}
                title={handle}
                number={followers}
                type="social"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfileInfo;

type ProfileInfoProp = {
  name: string;
  location?: string;
  profileImage?: string;
  bio?: string;
  niches?: string[];
  totalReach?: number;
  socialFollowing?: SocialFollowingsType[];

  buttons?: React.ReactNode;
  imageSize?: string;
};
