import React, { useMemo } from "react";
import { useSpringEntrance } from "../utils";

interface SpringEntryProps {
  frame: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const SpringEntry: React.FC<SpringEntryProps> = ({
  frame,
  delay = 0,
  direction = "scale",
  children,
  style,
}) => {
  const progress = useSpringEntrance(frame, delay);

  const transform = useMemo(() => {
    const value = 50 * (1 - progress);
    switch (direction) {
      case "up":
        return `translateY(${value}px)`;
      case "down":
        return `translateY(${-value}px)`;
      case "left":
        return `translateX(${value}px)`;
      case "right":
        return `translateX(${-value}px)`;
      case "scale":
        return `scale(${progress})`;
      default:
        return `scale(${progress})`;
    }
  }, [progress, direction]);

  return (
    <div
      style={{
        opacity: progress,
        transform,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
