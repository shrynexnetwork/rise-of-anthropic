import React from "react";
import { COLORS, FONTS } from "../config";

interface FundingEvent {
  date: string;
  amount: string;
  label: string;
}

interface FundingTimelineProps {
  events: FundingEvent[];
}

export const FundingTimeline: React.FC<FundingTimelineProps> = ({ events }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
        maxWidth: 600,
      }}
    >
      {events.map((event, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "8px 16px",
            backgroundColor: "rgba(255,255,255,0.03)",
            borderRadius: 8,
            borderLeft: `3px solid ${COLORS.accent}`,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 13,
              color: COLORS.textDim,
              minWidth: 100,
            }}
          >
            {event.date}
          </span>
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: 16,
              color: COLORS.accent,
              fontWeight: 700,
              minWidth: 80,
            }}
          >
            {event.amount}
          </span>
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: 14,
              color: COLORS.text,
            }}
          >
            {event.label}
          </span>
        </div>
      ))}
    </div>
  );
};
