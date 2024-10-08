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
import { USER_PERMISSIONS } from "@/utils/constants";
import usePermission from "@/hooks/usePermission";

const UserCell: React.FC<userCellProp> = ({
  content,
  id,
  selected,
  onSelect,
}) => {
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const router = useRouter();

  const [showCheckbox, setShowCheckbox] = useState(selected.length > 0);
  useEffect(() => {
    setShowCheckbox(selected.length > 0);
  }, [selected]);

  const handleMouseEnter = () => {
    setShowCheckbox(true);
  };

  const handleMouseLeave = () => {
    if (selected.length <= 0) setShowCheckbox(false);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {M3Permission && showCheckbox && (
        <div className="checkbox-wrapper">
          <Checkbox
            isChecked={selected.includes(id)}
            onClick={() =>
              onSelect(
                selected.includes(id)
                  ? selected.filter((item) => item !== id)
                  : [...selected, id]
              )
            }
          />
        </div>
      )}
      <Tooltip key={content.user_id} title={content.name}>
        <div
          className="flex flex-row justify-start items-center gap-2 cursor-pointer"
          key={content.user_id}
          onClick={() => {
            router.push(`/profile/${content?.user_type}/${content?.id}`);
          }}
        >
          {content.profile_image ? (
            <>
              <DisplayImage size="30px" data={content.profile_image} />
              <div>{content.name}</div>
            </>
          ) : (
            <div>{content.name}</div>
          )}
        </div>
      </Tooltip>
    </div>
  );
};

export default UserCell;

type userCellProp = {
  content: UserPreviewType;
  id: UUID;
  selected: UUID[];
  onSelect: Dispatch<SetStateAction<UUID[]>>;
};
