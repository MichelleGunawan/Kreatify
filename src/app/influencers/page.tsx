"use client";
import React, { useState } from "react";
import { useGlobalContext } from "@/context";
//Component import
import LoggedinLayout from "@/layouts/LoggedinLayout";
import HeaderInfluencers from "@/components/HeaderInfluencers";
import TableInfluencers from "@/components/TableInfluencers";

//CSS import
import "@/styles/talent.page.scss";

import useInfluencerData from "@/hooks/useInfluencerData";

import { useSession } from "@/hooks/useSession";

const InfluencersPage = () => {
  const { sessionLoading } = useSession({});
  const [tab, setTab] = useState(0);
  const { agencyId, managerId } = useGlobalContext();
  const { myInfluencersData, allInfluencersData } = useInfluencerData({
    role: "management",
    managerId,
    agencyId,
  });

  return (
    <LoggedinLayout headerTitle="Creators">
      <HeaderInfluencers tab={tab} setTab={setTab} />
      <div className="grid grid-col-1">
        <TableInfluencers
          title=""
          basicInfoData={tab == 0 ? myInfluencersData : allInfluencersData}
        />
      </div>
    </LoggedinLayout>
  );
};

export default InfluencersPage;
