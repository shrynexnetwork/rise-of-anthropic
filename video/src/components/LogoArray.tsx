import React from "react";
import { COLORS, FONTS } from "../config";

interface LogoItem {
  name: string;
  url?: string;
  color: string;
}

interface LogoArrayProps {
  logos: LogoItem[];
  title?: string;
}

export const LogoArray: React.FC<LogoArrayProps> = ({ logos, title }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 30,
      }}
    >
      {title && (
        <span
          style={{
            fontFamily: FONTS.sans,
            fontSize: 24,
            color: COLORS.textDim,
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          {title}
        </span>
      )}
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {logos.map((logo, i) => (
          <div
            key={i}
            style={{
              width: 160,
              height: 80,
              backgroundColor: "rgba(255,255,255,0.05)",
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 16px",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.sans,
                fontSize: 22,
                fontWeight: 800,
                color: logo.color || COLORS.text,
                letterSpacing: 1,
              }}
            >
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
