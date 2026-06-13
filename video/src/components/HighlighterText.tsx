import React from "react";
import { interpolate, spring } from "remotion";
import { COLORS, FONTS, FPS } from "../config";

interface HighlighterTextProps {
  text: string;
  frame: number;
  startFrame: number;
  durationInFrames: number;
  highlightColor?: string;
  fontSize?: number;
  style?: React.CSSProperties;
  asOverlay?: boolean;
}

export const HighlighterText: React.FC<HighlighterTextProps> = ({
  text,
  frame,
  startFrame,
  durationInFrames,
  highlightColor = COLORS.accent,
  fontSize = 48,
  style,
  asOverlay = false,
}) => {
  const localFrame = frame - startFrame;
  const textOpacity = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const highlightProgress = spring({
    frame: localFrame - 15,
    fps: FPS,
    config: { damping: 15, mass: 0.8, stiffness: 80 },
  });

  const textStyle: React.CSSProperties = {
    fontFamily: FONTS.sans,
    fontSize,
    fontWeight: 700,
    color: COLORS.text,
    opacity: textOpacity,
    position: "relative",
    lineHeight: 1.3,
    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
    ...style,
  };

  if (asOverlay) {
    return (
      <div style={textStyle}>
        <span style={{ position: "relative", zIndex: 2 }}>{text}</span>
        <span
          style={{
            position: "absolute",
            left: 0,
            bottom: 4,
            width: `${highlightProgress * 100}%`,
            height: "40%",
            backgroundColor: highlightColor,
            opacity: 0.3,
            transformOrigin: "left",
            zIndex: 1,
          }}
        />
      </div>
    );
  }

  return (
    <div style={textStyle}>
      {text.split("").map((char, i) => {
        const charDelay = i * 0.02;
        const charOpacity = interpolate(
          localFrame,
          [charDelay * FPS, charDelay * FPS + 5],
          [0, 1],
          { extrapolateRight: "clamp" }
        );
        return (
          <span
            key={i}
            style={{
              opacity: charOpacity,
              display: char === " " ? "inline" : "inline-block",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
