import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import "./styles/index.scss";

import { styled } from "@mui/material/styles";
import { COLORS, COLORS_RGB } from "@/utils/constants";

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  tab,
  setTab,
  color = COLORS.PRIMARY,
  inactiveColor = `rgba(${COLORS_RGB.PRIMARY}, 0.6)`,
  icons = [],
}) => {
  const StyledTab = styled(Tab)({
    color: COLORS.GREY400,
    fontFamily: "var(--font-plus-jakarta-sans)",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "150%",
    borderBottom: "1px solid #E0E0E0",
    textTransform: "none",
    letterSpacing: "-0.5px",
    padding: "4px 8px",

    "&.Mui-selected": {
      color: color,
    },

    "&:hover": {
      "&:not(.Mui-selected)": {
        color: inactiveColor,
      },
    },
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Tabs
      value={tab}
      onChange={handleChange}
      TabIndicatorProps={{ style: { background: color } }}
      variant="scrollable"
      scrollButtons={false}
    >
      {tabs.map((tab, index) => (
        <StyledTab
          label={tab}
          key={tab}
          iconPosition="start"
          icon={icons[index]}
        />
      ))}
    </Tabs>
  );
};

export default CustomTabs;

type CustomTabsProps = {
  tabs: string[];
  tab: number;
  setTab: (tab: number) => void;
  color?: string;
  inactiveColor?: string;
  icons?: any[];
};
