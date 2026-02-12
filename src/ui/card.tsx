import React from "react";

export default function Card({
  children,
  icon,
  title,
  bgGradientAngle,
  bgGradientColor1,
  bgGradientColor2,
}: {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
  bgGradientAngle?: number;
  bgGradientColor1?: string;
  bgGradientColor2?: string;
}) {
  return (
    <div
      className="flex w-sm flex-col items-center justify-center gap-4 p-8 rounded-xl"
      style={{
        background: `linear-gradient(${bgGradientAngle}deg, ${bgGradientColor1} 0%, ${bgGradientColor2} 100%)`,
      }}
    >
      <h2>{title}</h2>
      {children}
    </div>
  );
}
