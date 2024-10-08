"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { PieChart } from "@mui/x-charts";
import Legend from "./components/legend";
import { formatHexToRgb } from "@/utils/functions/format.functions";
import "./styles/index.scss";

interface PieChartCardProps {
  title: string;
  labels: string[];
  data: number[];
  color?: string;
}

const PieChartCard: React.FC<PieChartCardProps> = ({
  title,
  labels,
  data,
  color = "#775fff",
}) => {
  const [red, blue, green] = formatHexToRgb(color);
  const chartData = data.map((datapoint, index) => ({
    id: index,
    //label: labels[index],
    value: datapoint ?? 0,
    color: `rgba(${red}, ${blue}, ${green}, ${index / data.length + 0.2})`,
  }));

  return (
    <div className="pie-chart-card">
      <div className="pie-chart-header-container">
        <div className="pie-chart-header-title">
          <div className="h1 text-black">{title}</div>
          {/* <div className="p2">YTD Earnings: $100,000</div> */}
        </div>
      </div>
      <div className="pie-chart-card-chart-body">
        <div className="pie-chart-card-chart-view">
          <div className="pie-chart-card-chart-container">
            <PieChart
              series={[
                {
                  data: chartData,
                  innerRadius: "50px",
                  cornerRadius: 10,
                },
              ]}
              width={400}
              height={200}
            />
          </div>
        </div>

        <div className="pie-chart-card-label-container">
          {labels.length > 0 &&
            labels.map((label, index) => (
              <Legend
                key={index}
                label={label}
                value={chartData[index].value}
                color={chartData[index].color}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartCard;
