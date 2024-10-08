"use client";
import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "@/context";

//Component import
import HomeStatisticsCard from "@/components/HomeStatisticsCard";

//CSS import
import "./styles/index.scss";

const HomeStatisticsManagement: React.FC<StatisticsSectionProps> = ({
  firstStat,
  secondStat,
  thirdStat,
}) => {
  const [pendingCampaignsCount, setPendingCampaignsCount] = useState(0);
  const [ongoingCampaignsCount, setOngoingCampaignsCount] = useState(0);
  const [urgentCampaignsCount, setUrgentCampaignsCount] = useState(0);

  useEffect(() => {
    if (firstStat) {
      setPendingCampaignsCount(firstStat);
    }
    if (secondStat) {
      setOngoingCampaignsCount(secondStat);
    }
    if (thirdStat) {
      setUrgentCampaignsCount(thirdStat);
    }
  }, [firstStat, secondStat, thirdStat]);

  return (
    <div className="home-page-stats-section">
      <HomeStatisticsCard
        title={"Pending Campaigns"}
        amount={`${pendingCampaignsCount}`}
        icon={"pendingCampaigns"}
        iconBoxColor="#D44056"
        cardStyle={{
          backgroundColor: "#FF4D67",
          boxShadow: "5px 10px 50px 0px rgba(255, 77, 103, 0.45)",
        }}
      />
      <HomeStatisticsCard
        title={"Ongoing Campaigns"}
        amount={`${ongoingCampaignsCount}`}
        icon={"ongoingCampaigns"}
        iconBoxColor="#58AEB9"
        cardStyle={{
          backgroundColor: "#6AD1DE",
          boxShadow: "5px 10px 50px 0px rgba(106, 209, 222, 0.60)",
        }}
      />
      <HomeStatisticsCard
        title={"Urgent Campaigns"}
        amount={`${urgentCampaignsCount}`}
        icon={"urgentCampaigns"}
        iconBoxColor="#634FD4"
        cardStyle={{
          backgroundColor: "#775FFF",
          boxShadow: "5px 10px 50px 0px rgba(119, 95, 255, 0.65)",
        }}
        tooltipText={"Campaigns with a milestone due within the next 7 days"}
      />
    </div>
  );
};

export default HomeStatisticsManagement;

type StatisticsSectionProps = {
  firstStat: number | null;
  secondStat: number | null;
  thirdStat: number | null;
};
