"use client";
import React, { useEffect, useState } from "react";

//Component import
import LoggedinLayout from "@/layouts/LoggedinLayout";
import HeaderPitchLists from "@/components/HeaderPitchLists";
import TablePitchLists from "@/components/TablePitchLists";
import usePitchlistsData from "@/hooks/usePitchlistsData";

//CSS import
import "@/styles/talent.page.scss";
import { useGlobalContext } from "@/context";
import { useSession } from "@/hooks/useSession";

//Data import (will be replaced with api)

const PitchListsPage = () => {
  const { sessionLoading } = useSession({ privatePage: true });
  const { agencyId, managerId } = useGlobalContext();
  const [tab, setTab] = useState(0);
  const { managerPitchLists } = usePitchlistsData({
    managerId,
  });
  const { agencyPichLists } = usePitchlistsData({ agencyId });

  return (
    <LoggedinLayout headerTitle="Pitch Lists">
      <HeaderPitchLists tab={tab} setTab={setTab} />
      <div className="grid grid-col-1">
        <TablePitchLists
          title=""
          data={tab === 0 ? managerPitchLists : agencyPichLists}
        />
      </div>
    </LoggedinLayout>
  );
};

export default PitchListsPage;
