"use client";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalContext } from "@/context";
import Link from "next/link";
import Icon from "@/components/Icon";
import Checkbox from "@/components/Checkbox";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";

// Custom components
import "../styles/cells.scss";

const ContactsCell: React.FC<ContactsCellProp> = ({
  content,
  id,
  selected,
  onSelect,
}) => {
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

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

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

      <Link href={``} className="cell">
        <p className="p2">{content}</p>
      </Link>
    </div>
  );
};

export default ContactsCell;

type ContactsCellProp = {
  content: string;
  id: number;
  selected: number[];
  onSelect: Dispatch<SetStateAction<number[]>>;
};
