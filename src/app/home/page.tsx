"use client";
import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "@/context";
import { monthOptions, yearOptions } from "@/utils/variables/date.variables";

//Component imports
import LoggedinLayout from "@/layouts/LoggedinLayout";
import HomeStatisticsManagement from "@/components/HomeStatisticsManagement";
import HomeStatisticsTalent from "@/components/HomeStatisticsTalent";
import BarChartCard from "@/components/BarChartCard";
import TableManagers from "@/components/TableManagers";
import TableCampaigns from "@/components/TableCampaigns";

// Permission stuff
import { USER_PERMISSIONS } from "@/utils/constants";
import usePermission from "@/hooks/usePermission";
import { useSession } from "@/hooks/useSession";

// Data imports
import useManagersData from "@/hooks/useManagersData";
import useCampaignsData from "@/hooks/useCampaignsData";
import useEarningsData from "@/hooks/useEarningsData";
import {
  fetchTalentMonthEarnings,
  fetchTalentAlltimeEarnings,
} from "@/services/finance/talent_actions";

//CSS import
import "@/styles/home.page.scss";

const HomePage = () => {
  const { sessionLoading } = useSession({});
  const { talentId, managerId, agencyId } = useGlobalContext();
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const [myEarningsYear, setMyEarningsYear] = useState(
    new Date().getFullYear().toString()
  );
  const [agencyEarningsYear, setAgencyEarningsYear] = useState(
    new Date().getFullYear().toString()
  );
  const { influencerManagers } = useManagersData({ talentId });

  const {
    pendingCampaignsData,
    ongoingCampaignsData,
    completedCampaignsData,
    rejectedCampaignsData,
    ongoingCampaignsCount,
  } = useCampaignsData({ talentId, managerId });
  const {
    myMonthlyEarnings,
    agencyMonthlyEarnings,
    myYtdEarnings,
    agencyYtdEarnings,
  } = useEarningsData({
    myEarningsYear: Number(myEarningsYear),
    agencyEarningsYear: Number(agencyEarningsYear),

    talentId,
    managerId,
    agencyId,
  });

  // TODO: will put this in a custom hook when i separate the talent and manager pages
  const [alltimeEarnings, setAlltimeEarnings] = useState(0);
  const [monthEarnings, setMonthEarnings] = useState(0);

  useEffect(() => {
    if (I1Permission && talentId) {
      fetchTalentMonthEarnings(talentId).then(setMonthEarnings);
      fetchTalentAlltimeEarnings(talentId).then(setAlltimeEarnings);
    }
  }, [I1Permission, talentId]);

  return (
    <LoggedinLayout headerTitle="Home">
      <div className=" z-0 home-page-stats hide-scrollbar">
        {M3Permission ? (
          <HomeStatisticsManagement
            firstStat={pendingCampaignsData.length}
            secondStat={ongoingCampaignsData.length}
            thirdStat={ongoingCampaignsCount}
          />
        ) : (
          <HomeStatisticsTalent
            firstStat={alltimeEarnings}
            secondStat={monthEarnings}
            thirdStat={ongoingCampaignsData.length}
          />
        )}
      </div>
      <div
        className={`home-page-second-row home-page-grid ${
          I1Permission ? `home-page-grid-col-2` : "home-page-grid-col-2"
        } z-1`}
      >
        <BarChartCard
          title={`My Earnings from ${myEarningsYear ?? "..."}`}
          subTitle={`YTD Earnings: $${myYtdEarnings.toFixed(2)}`}
          colLabels={monthOptions}
          dataLabel="Earnings"
          data={myMonthlyEarnings}
          options={yearOptions}
          selected={myEarningsYear}
          setSelected={setMyEarningsYear}
        />
        {I1Permission && (
          <div className="max-h-500">
            <TableCampaigns
              title="Campaigns"
              pendingCampaignsData={pendingCampaignsData}
              ongoingCampaignsData={ongoingCampaignsData}
              completedCampaignsData={completedCampaignsData}
              rejectedCampaignsData={[]}
            />
          </div>
        )}
        {M3Permission && (
          <BarChartCard
            title={`Agency Earnings from ${agencyEarningsYear ?? "..."}`}
            subTitle={`YTD Earnings: $${agencyYtdEarnings.toFixed(2)}`}
            colLabels={monthOptions}
            dataLabel="Earnings"
            data={agencyMonthlyEarnings}
            options={yearOptions}
            selected={agencyEarningsYear}
            setSelected={setAgencyEarningsYear}
          />
        )}
      </div>
      <div className="grid grid-col-1 z-2">
        {I1Permission && (
          <TableManagers title="Team" data={influencerManagers} />
        )}
        {M3Permission && (
          <TableCampaigns
            title="Campaigns"
            pendingCampaignsData={pendingCampaignsData}
            ongoingCampaignsData={ongoingCampaignsData}
            completedCampaignsData={completedCampaignsData}
            rejectedCampaignsData={rejectedCampaignsData}
          />
        )}
      </div>
    </LoggedinLayout>
  );
};

export default HomePage;
