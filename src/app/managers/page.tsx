"use client";
import React from "react";

// Component import
import LoggedinLayout from "@/layouts/LoggedinLayout";
import HeaderManagers from "@/components/HeaderManagers";
import TableManagers from "@/components/TableManagers";
import useManagersData from "@/hooks/useManagersData";

// CSS import
import "@/styles/managers.page.scss";

// Data import (will be replaced with API)
import { useGlobalContext } from "@/context";
import { useSession } from "@/hooks/useSession";

const ManagersPage = () => {
  const { sessionLoading } = useSession({});
  const { agencyId } = useGlobalContext();
  const { agencyManagers } = useManagersData({ agencyId });

  return (
    <LoggedinLayout headerTitle="Managers">
      <HeaderManagers />
      <div className="grid grid-col-1">
        <TableManagers title="" data={agencyManagers} />
      </div>
    </LoggedinLayout>
  );
};

export default ManagersPage;
