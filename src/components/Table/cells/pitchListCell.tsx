"use client";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/Checkbox";

// Custom components
import "../styles/cells.scss";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";

const PitchListCell: React.FC<PitchListCellProp> = ({
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
    if (M3Permission) setShowCheckbox(true);
  };

  const handleMouseLeave = () => {
    if (selected.length <= 0) setShowCheckbox(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    router.push(`/pitchlist/${id}`);
    e.stopPropagation();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      {showCheckbox && (
        <div>
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

      <div className="cell">
        <p className="p2">{content}</p>
      </div>
    </div>
  );
};

export default PitchListCell;

type PitchListCellProp = {
  content: string;
  id: UUID;
  selected: UUID[];
  onSelect: Dispatch<SetStateAction<UUID[]>>;
};
