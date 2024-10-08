"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import InputSelect from "../InputSelect";
import BarChart from "./components/BarChart";

import chartOptions from "./components/chartOptions";

import "./styles/index.scss";
import "@/styles/table.scss";
import { COLORS } from "@/utils/constants";

interface BarChartCardProps {
  title: string;
  subTitle?: string;
  colLabels: string[];
  dataLabel: string;
  data: number[]; //TODO: change
  color?: string;
  options?: any[];
  selected?: string;
  setSelected?: Dispatch<SetStateAction<string>>;
}

const BarChartCard: React.FC<BarChartCardProps> = ({
  title,
  subTitle,
  colLabels,
  dataLabel,
  data,
  color = COLORS.PRIMARY,
  options,
  selected,
  setSelected,
}) => {
  let chartCustomization = chartOptions;
  chartCustomization.xaxis.categories = colLabels;
  chartCustomization.fill.gradient.colorStops = [
    [
      {
        offset: 0,
        color,
        opacity: 1,
      },
      {
        offset: 100,
        color,
        opacity: 0.28,
      },
    ],
  ];

  const chartData = [
    {
      name: dataLabel,
      data: data,
    },
  ];

  return (
    <div className="barchart-card">
      <div className="barchart-card-header-container">
        <div className="barchart-card-header-title">
          <div className="h1 text-black">{title}</div>
          {subTitle && <div className="p2">{subTitle}</div>}
        </div>
        {options && setSelected && (
          <InputSelect
            value={selected || ""}
            onChange={setSelected}
            options={options}
            width="150px"
          />
        )}
      </div>
      <div className="barchart-card-chart-view hide-scrollbar">
        <div
          className="barchart-card-chart-container"
          style={{ minWidth: colLabels.length * 50 }}
        >
          <BarChart chartData={chartData} chartOptions={chartCustomization} />
        </div>
      </div>
    </div>
  );
};

export default BarChartCard;
