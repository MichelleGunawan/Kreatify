"use client";
import dynamic from "next/dynamic";
//import Chart from "react-apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface BarChartProps {
  chartData: any[]; //TODO: change
  chartOptions: {};
}

const BarChart: React.FC<BarChartProps> = ({ chartData, chartOptions }) => {
  return (
    <Chart
      options={chartOptions}
      type="bar"
      width="100%"
      height="100%"
      series={chartData}
    />
  );
};

export default BarChart;
