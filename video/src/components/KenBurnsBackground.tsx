import React from "react";
import { interpolate } from "remotion";
import { COLORS, WIDTH, HEIGHT } from "../config";

interface KenBurnsBackgroundProps {
  frame: number;
  durationInFrames: number;
  gradientColors?: [string, string, string];
  pattern?: "grid" | "dots" | "none";
}

export const KenBurnsBackground: React.FC<KenBurnsBackgroundProps> = ({
  frame,
  durationInFrames,
  gradientColors = [COLORS.bg, COLORS.bgLight, "#1a1a3a"],
  pattern = "grid",
}) => {
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.03], {
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [0, durationInFrames], [0.3, 0.6], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        width: WIDTH,
        height: HEIGHT,
        transform: `scale(${scale})`,
        background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]})`,
      }}
    >
      {pattern === "grid" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            opacity,
          }}
        />
      )}
      {pattern === "dots" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            opacity,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)`,
        }}
      />
    </div>
  );
};
