import React, { useState } from "react";
import Alert from "../Alert";
import Button from "../Button";
import Icon from "../Icon";
import DisplayStat from "../DisplayStat";
import { getIconLink } from "@/utils/functions/iconLinks";
import { openGoogleMaps } from "@/utils/functions/util.functions";
import {
  formatListWithComma,
  formatUrl,
} from "@/utils/functions/format.functions";
import "./styles/index.scss";

const AgencyInfo: React.FC<AgencyInfoProp> = ({
  agencyName,
  agencyLogo,
  agencyAddress,
  agencyCity,
  agencyState,
  agencyCountry,
  agencyBio,
  agencyEmail,
  agencyPhone,
  agencyWebsite,
  agencyDateFounded,
  managerCount,
  talentCount,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  return (
    <div className="agency-info">
      <img
        src={
          agencyLogo ||
          "https://res.cloudinary.com/dqfvqkqhe/image/upload/v1720151320/grey.png"
        }
        alt={agencyName}
        className="display-image-image"
        loading="lazy"
        style={{ width: "100px", height: "auto" }}
      />
      <div className="agency-info-right">
        <div className="agency-info-top-row">
          <div className="agency-info-header-container">
            <div className="agency-info-header">
              <h1 className="h1 agency-info-name">{agencyName}</h1>
              {(agencyCity || agencyState) && (
                <div className="agency-info-location">
                  <Icon
                    link={getIconLink("Location")}
                    size={20}
                    color="#737373"
                  />

                  {agencyCity && <span className="p2">{agencyCity}</span>}
                  {agencyCity && agencyState && <span className="p2">,</span>}
                  {agencyState && <span className="p2"> {agencyState}</span>}
                </div>
              )}
            </div>
          </div>
          <div className="agency-info-button-container">
            {agencyAddress && (agencyCity || agencyState) && (
              <Button
                icon={getIconLink("location")}
                color="#775FFF"
                borderColor="#775FFF"
                width="40px"
                height="40px"
                borderRadius="100px"
                textClass="h3"
                onClick={() =>
                  openGoogleMaps({
                    address: agencyAddress,
                    city: agencyCity,
                    state: agencyState,
                    country: agencyCountry,
                  })
                }
                tooltipText={formatListWithComma([
                  agencyAddress,
                  agencyCity,
                  agencyState,
                  agencyCountry,
                ])}
              />
            )}
            {agencyWebsite && (
              <Button
                icon={getIconLink("website")}
                color="#775FFF"
                borderColor="#775FFF"
                width="40px"
                height="40px"
                borderRadius="100px"
                textClass="h3"
                onClick={() => window.open(formatUrl(agencyWebsite))}
                tooltipText={agencyWebsite}
              />
            )}

            {agencyPhone && (
              <Button
                icon={getIconLink("phone")}
                color="#775FFF"
                borderColor="#775FFF"
                width="40px"
                height="40px"
                borderRadius="100px"
                textClass="h3"
                onClick={() => {
                  navigator.clipboard.writeText(agencyPhone);
                  setShowAlert(true);
                }}
                tooltipText={agencyPhone}
              />
            )}
            {agencyEmail && (
              <Button
                icon={getIconLink("email")}
                color="#775FFF"
                borderColor="#775FFF"
                width="40px"
                height="40px"
                borderRadius="100px"
                textClass="h3"
                onClick={() => {
                  navigator.clipboard.writeText(agencyEmail);
                  setShowAlert(true);
                }}
                tooltipText={agencyEmail}
              />
            )}
          </div>
        </div>
        <p className="p2 agency-info-bio">{agencyBio}</p>
        {agencyDateFounded && (
          <p className="p2 text-black">Founded {agencyDateFounded}</p>
        )}
        {/* <div className="agency-info-button-container">
          {influencerCount && (
            <Pill
              label={`${influencerCount} Influencers`}
              backgroundColor="#E4DFFF"
              color="#775FFF"
              textClass="p3"
            />
          )}
          {managementCount && (
            <Pill
              label={`${managementCount} Employees`}
              backgroundColor="#FFEECD"
              color="#FFAB05"
              textClass="p3"
            />
          )}
        </div> */}
        <div className="agency-info-stats-container">
          <DisplayStat title="Managers" number={managerCount || 0} />

          <DisplayStat title="Influencers" number={talentCount || 0} />
        </div>
      </div>
      {showAlert && (
        <Alert
          text={"Copied!"}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
    </div>
  );
};
export default AgencyInfo;

type AgencyInfoProp = {
  agencyName: string;
  agencyLogo: string;
  agencyAddress: string;
  agencyCity: string;
  agencyState: string;
  agencyCountry: string;
  agencyBio: string;
  agencyEmail: string;
  agencyPhone: string;
  agencyWebsite: string;
  agencyDateFounded: string;
  managerCount?: number;
  talentCount?: number;
};
