"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import DisplayImage from "@/components/DisplayImage";
import Checkbox from "@/components/Checkbox";
import { Tooltip } from "@mui/material";

// Custom components
import "../styles/cells.scss";
import { UserPreviewType } from "@/types/user.type";
import { UUID } from "crypto";
import useAgencyLogo from "@/hooks/useAgencyLogo";
import { formatUrl } from "@/utils/functions/format.functions";

const AgencyPreviewCell: React.FC<AgencyPreviewCellProp> = ({ agencyId }) => {
  const { agencyName, agencyLogo, agencyWebsite } = useAgencyLogo({
    agencyId,
  });
  const router = useRouter();

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Tooltip title={agencyName}>
        <div
          className="flex flex-row justify-start items-center gap-2 cursor-pointer"
          onClick={() => {
            router.push(formatUrl(agencyWebsite || ""));
            // router.push(`/profile/${content?.user_type}/${content?.id}`);
          }}
        >
          {agencyLogo && <DisplayImage size="30px" data={agencyLogo} />}
          <div>{agencyName}</div>
        </div>
      </Tooltip>
    </div>
  );
};

export default AgencyPreviewCell;

type AgencyPreviewCellProp = {
  agencyId: UUID;
};
