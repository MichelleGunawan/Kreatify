import React from "react";
import "@/styles/card.scss";

type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <div className="card" style={style}>
      {children}
    </div>
  );
};

export default Card;
