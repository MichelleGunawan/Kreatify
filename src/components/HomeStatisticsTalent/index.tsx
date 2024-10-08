"use client";
import React, { useEffect, useState, useRef } from "react";
import { formatNumber } from "@/utils/functions/format.functions";

//Component import
import HomeStatisticsCard from "@/components/HomeStatisticsCard";

//CSS import
import "./styles/index.scss";

const HomeStatisticsTalent: React.FC<StatisticsSectionProps> = ({
  firstStat,
  secondStat,
  thirdStat,
}) => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [earningsThisMonth, setEarningsThisMonth] = useState(0);
  const [ongoingCampaignsCount, setOngoingCampaignsCount] = useState(0);

  useEffect(() => {
    if (firstStat) {
      setTotalEarnings(firstStat);
    }
    if (secondStat) {
      setEarningsThisMonth(secondStat);
    }
    if (thirdStat) {
      setOngoingCampaignsCount(thirdStat);
    }
  }, [firstStat, secondStat, thirdStat]);

  return (
    <div className="home-page-stats-section">
      <HomeStatisticsCard
        title={"Total Earnings"}
        amount={`$${formatNumber(totalEarnings)}`}
        icon={"wallet"}
        iconBoxColor="#D44056"
        cardStyle={{
          backgroundColor: "#FF4D67",
          boxShadow: "5px 10px 50px 0px rgba(255, 77, 103, 0.45)",
        }}
      />
      <HomeStatisticsCard
        title={"Earnings This Month"}
        amount={`$${formatNumber(earningsThisMonth)}`}
        icon={"coin"}
        iconBoxColor="#58AEB9"
        cardStyle={{
          backgroundColor: "#6AD1DE",
          boxShadow: "5px 10px 50px 0px rgba(106, 209, 222, 0.60)",
        }}
      />
      <HomeStatisticsCard
        title={"Ongoing Campaigns"}
        amount={`${ongoingCampaignsCount}`}
        icon={"ongoingCampaigns"}
        iconBoxColor="#634FD4"
        cardStyle={{
          backgroundColor: "#775FFF",
          boxShadow: "5px 10px 50px 0px rgba(119, 95, 255, 0.65)",
        }}
      />
    </div>
  );
};

export default HomeStatisticsTalent;

type StatisticsSectionProps = {
  firstStat: number;
  secondStat: number;
  thirdStat: number;
};
