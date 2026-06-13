import React from "react";
import { COLORS, FONTS } from "../config";

interface TierData {
  name: string;
  label: string;
  color: string;
  description: string;
  price: string;
}

interface ModelTierCardsProps {
  tiers: TierData[];
}

export const ModelTierCards: React.FC<ModelTierCardsProps> = ({ tiers }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      {tiers.map((tier, i) => (
        <div
          key={i}
          style={{
            width: 280,
            padding: "24px 20px",
            backgroundColor: COLORS.cardBg,
            border: `2px solid ${tier.color}60`,
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            backdropFilter: "blur(10px)",
            boxShadow: `0 10px 40px rgba(0,0,0,0.3), inset 0 0 60px ${tier.color}10`,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontFamily: FONTS.mono,
              color: tier.color,
              textTransform: "uppercase",
              letterSpacing: 3,
              fontWeight: 700,
            }}
          >
            {tier.label}
          </div>
          <div
            style={{
              fontSize: 36,
              fontFamily: FONTS.sans,
              color: COLORS.text,
              fontWeight: 800,
            }}
          >
            {tier.name}
          </div>
          <div
            style={{
              fontSize: 14,
              fontFamily: FONTS.sans,
              color: COLORS.textDim,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            {tier.description}
          </div>
          <div
            style={{
              fontSize: 13,
              fontFamily: FONTS.mono,
              color: tier.color,
              marginTop: 8,
            }}
          >
            {tier.price}
          </div>
        </div>
      ))}
    </div>
  );
};
