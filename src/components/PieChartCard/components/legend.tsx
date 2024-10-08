"use client";
import dynamic from "next/dynamic";
import "../styles/index.scss";

interface LegendProps {
  label: string;
  value: number;
  color?: string;
}

const Legend: React.FC<LegendProps> = ({ label, value, color = "#775fff" }) => {
  return (
    <div className="pie-chart-card-label-section">
      <div className="pie-chart-card-chart-label">
        <div className="pie-chart-card-chart-label-title">
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "100%",
              backgroundColor: color,
            }}
          ></div>
          <div className="p2 text-black">{label}</div>
        </div>
        <div className="h2 text-black">{value}%</div>
      </div>
    </div>
  );
};

export default Legend;
