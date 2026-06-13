import React from "react";
import { interpolate, spring } from "remotion";
import { COLORS, FONTS, FPS, HEIGHT } from "../config";

interface AnimatedBarProps {
  frame: number;
  startFrame: number;
  durationInFrames: number;
  value: number;
  maxValue: number;
  label: string;
  color?: string;
  width?: number;
  delay?: number;
}

export const AnimatedBar: React.FC<AnimatedBarProps> = ({
  frame,
  startFrame,
  durationInFrames,
  value,
  maxValue,
  label,
  color = COLORS.accent,
  width = 80,
  delay = 0,
}) => {
  const localFrame = frame - startFrame;
  const barHeight = 400;
  const targetHeight = (value / maxValue) * barHeight;

  const growProgress = spring({
    frame: Math.max(0, localFrame - delay),
    fps: FPS,
    config: { damping: 15, mass: 0.6, stiffness: 120 },
  });

  const currentHeight = targetHeight * growProgress;

  const labelOpacity = interpolate(
    Math.max(0, localFrame - delay - 10),
    [0, 10],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width,
      }}
    >
      <div
        style={{
          height: barHeight,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: currentHeight,
            backgroundColor: color,
            borderRadius: "4px 4px 0 0",
            boxShadow: `0 0 20px ${color}40`,
            transition: "height 0.1s",
          }}
        />
      </div>
      <span
        style={{
          fontFamily: FONTS.sans,
          fontSize: 16,
          color: COLORS.textDim,
          marginTop: 8,
          opacity: labelOpacity,
          textAlign: "center",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: 20,
          color: COLORS.text,
          fontWeight: 700,
          opacity: labelOpacity,
        }}
      >
        {value}%
      </span>
    </div>
  );
};
