import { interpolate, spring, SpringConfig } from "remotion";
import { FPS } from "./config";

export function calcDurationFromSpeech(text: string, wpm: number = 155): number {
  const wordCount = text.split(" ").length;
  const seconds = (wordCount / wpm) * 60;
  return Math.max(seconds, 2);
}

export function frameFromSeconds(seconds: number): number {
  return Math.round(seconds * FPS);
}

export function useKenBurns(
  frame: number,
  durationInFrames: number,
  scaleRange: [number, number] = [1, 1.05],
  translateRange: [number, number] = [0, 15]
) {
  const scale = interpolate(frame, [0, durationInFrames], scaleRange, {
    extrapolateRight: "clamp",
  });
  const translateX = interpolate(frame, [0, durationInFrames], [0, translateRange[0]], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, durationInFrames], [0, translateRange[1]], {
    extrapolateRight: "clamp",
  });
  return { scale, translateX, translateY };
}

export function useSpringEntrance(
  frame: number,
  delay: number = 0,
  config?: Partial<SpringConfig>
) {
  return spring({
    frame: frame - delay,
    fps: FPS,
    config: {
      damping: 12,
      mass: 0.5,
      stiffness: 100,
      ...config,
    },
  });
}

export function useFadeIn(frame: number, duration: number = 15) {
  return interpolate(frame, [0, duration], [0, 1], {
    extrapolateRight: "clamp",
  });
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function formatLargeNumber(num: number): string {
  if (num >= 1e12) return (num / 1e12).toFixed(1) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
}
