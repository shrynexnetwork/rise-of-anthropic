import React from "react";
import { AbsoluteFill, Audio, interpolate, useCurrentFrame, spring as springFn, Img } from "remotion";
import { COLORS, FONTS } from "../config";
import { TimingEntry } from "../types";
import { SceneConfig } from "./visualConfig";

const SCALE = 1.8;

interface SceneRendererProps {
  timing: TimingEntry;
  audioSrc?: string;
  config: SceneConfig;
  forcedFrame?: number;
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({ timing, audioSrc, config, forcedFrame }) => {
  const currentFrame = useCurrentFrame();
  const frame = forcedFrame ?? currentFrame;
  const { durationInFrames } = timing;
  const exitOpacity = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <KenBurnsBackground image={config.background.image} gradient={config.background.gradient} frame={frame} durationInFrames={durationInFrames} />
      <VignetteOverlay />

      {audioSrc && <Audio src={audioSrc} />}

      {config.textOverlays?.map((overlay, i) => (
        <AnimatedText key={i} overlay={overlay} frame={frame} durationInFrames={durationInFrames} />
      ))}

      {config.elements?.map((element, i) => (
        <AnimatedElement key={i} element={element} frame={frame} />
      ))}

      {config.sceneType === "chart-revenue" && <RevenueChart frame={frame} durationInFrames={durationInFrames} />}
      {config.sceneType === "process-diagram" && <ProcessDiagram frame={frame} />}
      {config.sceneType === "power-web" && <ConnectionLines frame={frame} />}
      {config.sceneType === "split-tension" && <TensionMeter frame={frame} />}
      {config.sceneType === "journey" && <JourneyPath frame={frame} durationInFrames={durationInFrames} />}
      {config.sceneType === "shutdown" && <StampAnimation frame={frame} />}
      
    </AbsoluteFill>
  );
};

const VignetteOverlay: React.FC = () => (
  <AbsoluteFill
    style={{
      background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)",
      pointerEvents: "none",
    }}
  />
);

const KenBurnsBackground: React.FC<{ image: string; gradient?: string; frame: number; durationInFrames: number }> = ({ image, gradient, frame, durationInFrames }) => {
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const translateY = interpolate(frame, [0, durationInFrames], [0, -15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Img
        src={image}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateY(${translateY}px)`,
          filter: "blur(3px) brightness(0.65) saturate(1.15)",
        }}
      />
      {gradient && <AbsoluteFill style={{ background: gradient }} />}
    </AbsoluteFill>
  );
};

interface AnimatedTextProps {
  overlay: {
    text: string;
    x: number;
    y: number;
    fontSize: number;
    delay: number;
    animation: string;
    color?: string;
    fontWeight?: number;
    maxWidth?: number;
  };
  frame: number;
  durationInFrames: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ overlay, frame, durationInFrames }) => {
  const progress = Math.max(0, frame - overlay.delay);
  const scaledFontSize = Math.round(overlay.fontSize * SCALE);

  let animStyle: React.CSSProperties = { opacity: 0 };

  if (overlay.animation === "fade") {
    const opacity = interpolate(progress, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    animStyle = { opacity, transform: "translate(-50%, -50%)" };
  } else if (overlay.animation === "spring-up") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 11, stiffness: 100, mass: 0.8 } });
    animStyle = { opacity: Math.min(1, s * 1.2), transform: `translate(-50%, calc(-50% + ${(1 - s) * 50}px))` };
  } else if (overlay.animation === "spring-scale") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 9, stiffness: 120, mass: 0.6 } });
    const scaleVal = 0.8 + s * 0.2;
    animStyle = { opacity: Math.min(1, s * 1.3), transform: `translate(-50%, -50%) scale(${scaleVal})` };
  } else if (overlay.animation === "slide-left") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 13, stiffness: 90, mass: 1 } });
    animStyle = { opacity: s, transform: `translate(calc(-50% + ${(1 - s) * 80}px), -50%)` };
  } else if (overlay.animation === "slide-right") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 13, stiffness: 90, mass: 1 } });
    animStyle = { opacity: s, transform: `translate(calc(-50% + ${(s - 1) * 80}px), -50%)` };
  } else if (overlay.animation === "elastic-pop") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 6, stiffness: 160, mass: 0.5 } });
    const scaleVal = s < 1 ? s : 1 + (s - 1) * 0.25;
    animStyle = { opacity: Math.min(1, s * 1.4), transform: `translate(-50%, -50%) scale(${scaleVal})` };
  } else if (overlay.animation === "slide-up") {
    const opacity = interpolate(progress, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const y = interpolate(progress, [0, 12], [35, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    animStyle = { opacity, transform: `translate(-50%, calc(-50% - ${y}px))` };
  }

  return (
    <div
      style={{
        position: "absolute",
        left: `${overlay.x}%`,
        top: `${overlay.y}%`,
        maxWidth: overlay.maxWidth ? `${overlay.maxWidth}%` : "72%",
        textAlign: "center",
        fontSize: scaledFontSize,
        fontFamily: FONTS.sans,
        fontWeight: overlay.fontWeight || 400,
        color: overlay.color || COLORS.text,
        textShadow: "0 2px 4px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)",
        letterSpacing: scaledFontSize > 30 ? "0.03em" : "0.01em",
        lineHeight: 1.35,
        overflowWrap: "break-word",
        ...animStyle,
      }}
    >
      {overlay.text}
    </div>
  );
};

interface AnimatedElementProps {
  element: {
    type: string;
    src?: string;
    label?: string;
    sublabel?: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    delay: number;
    animation: string;
    color?: string;
  };
  frame: number;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ element, frame }) => {
  const progress = Math.max(0, frame - element.delay);
  const scaledWidth = element.width ? Math.round(element.width * SCALE) : undefined;

  let animStyle: React.CSSProperties = { opacity: 0 };

  if (element.animation === "fade") {
    const opacity = interpolate(progress, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    animStyle = { opacity, transform: "translate(-50%, -50%)" };
  } else if (element.animation === "spring-up") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 11, stiffness: 100, mass: 0.8 } });
    animStyle = { opacity: Math.min(1, s * 1.2), transform: `translate(-50%, calc(-50% + ${(1 - s) * 60}px))` };
  } else if (element.animation === "spring-scale") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 8, stiffness: 130, mass: 0.6 } });
    const scaleVal = s < 1 ? s : 1 + (s - 1) * 0.15;
    animStyle = { opacity: Math.min(1, s * 1.4), transform: `translate(-50%, -50%) scale(${scaleVal})` };
  } else if (element.animation === "slide-left") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 13, stiffness: 90, mass: 1 } });
    animStyle = { opacity: s, transform: `translate(calc(-50% + ${(1 - s) * 80}px), -50%)` };
  } else if (element.animation === "slide-right") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 13, stiffness: 90, mass: 1 } });
    animStyle = { opacity: s, transform: `translate(calc(-50% + ${(s - 1) * 80}px), -50%)` };
  } else if (element.animation === "elastic-pop") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 5, stiffness: 160, mass: 0.5 } });
    const scaleVal = s < 1 ? s : 1 + (s - 1) * 0.3;
    animStyle = { opacity: Math.min(1, s * 1.5), transform: `translate(-50%, -50%) scale(${scaleVal})` };
  }

  if (element.type === "logo") {
    const showWhiteBg = !element.color;
    return (
      <div
        style={{
          position: "absolute",
          left: `${element.x}%`,
          top: `${element.y}%`,
          width: scaledWidth || 90,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...(showWhiteBg ? {
            padding: "17px 22px",
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: 14,
            boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)",
          } : {}),
          ...animStyle,
        }}
      >
        <Img
          src={element.src || ""}
          style={{
            width: "100%",
            height: "auto",
            filter: element.color ? `brightness(0) saturate(100%) invert(1) opacity(0.9)` : "none",
          }}
        />
      </div>
    );
  }

  if (element.type === "image") {
    return (
      <div
        style={{
          position: "absolute",
          left: `${element.x}%`,
          top: `${element.y}%`,
          width: scaledWidth || 100,
          borderRadius: "50%",
          overflow: "hidden",
          border: "3px solid rgba(255,255,255,0.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.2)",
          aspectRatio: "1/1",
          ...animStyle,
        }}
      >
        <Img src={element.src || ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    );
  }

  if (element.type === "card") {
    return (
      <div
        style={{
          position: "absolute",
          left: `${element.x}%`,
          top: `${element.y}%`,
          width: scaledWidth || 300,
          padding: "38px 34px",
          backgroundColor: "rgba(20,20,50,0.75)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderTop: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 16,
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
          ...animStyle,
        }}
      >
        {element.src && (
          <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
            <Img src={element.src} style={{ height: 58, filter: "brightness(0) invert(1) opacity(0.85)" }} />
          </div>
        )}
        <div style={{
          fontSize: Math.round(20 * SCALE),
          fontFamily: FONTS.sans,
          fontWeight: 700,
          color: element.color || COLORS.text,
          marginBottom: 6,
          textShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}>
          {element.label}
        </div>
        <div style={{
          fontSize: Math.round(14 * SCALE),
          fontFamily: FONTS.sans,
          color: COLORS.textDim,
          letterSpacing: "0.02em",
          lineHeight: 1.4,
        }}>
          {element.sublabel}
        </div>
      </div>
    );
  }

  if (element.type === "icon") {
    return (
      <div
        style={{
          position: "absolute",
          left: `${element.x}%`,
          top: `${element.y}%`,
          width: scaledWidth || 60,
          padding: "10px",
          backgroundColor: "rgba(255,255,255,0.06)",
          borderRadius: 12,
          ...animStyle,
        }}
      >
        <Img src={element.src || ""} style={{ width: "100%", height: "auto", filter: "brightness(0) invert(1) opacity(0.8)" }} />
      </div>
    );
  }

  return null;
};

const RevenueChart: React.FC<{ frame: number; durationInFrames: number }> = ({ frame, durationInFrames }) => {
  const points = [
    { label: "Jun '24", value: 0.087 },
    { label: "Dec '24", value: 1.0 },
    { label: "Feb '26", value: 14 },
    { label: "Apr '26", value: 30 },
    { label: "May '26", value: 47 },
  ];
  const maxVal = 50;
  const chartH = 350;
  const barW = 100;

  return (
    <div style={{ position: "absolute", left: "50%", top: "46%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ position: "relative", height: chartH + 40, display: "flex", alignItems: "flex-end", gap: 24, paddingLeft: 45 }}>
        {[0, 10, 20, 30, 40, 50].map((v) => (
          <div key={v} style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: `${(v / maxVal) * chartH}px`,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
          }}>
            <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted, position: "absolute", left: -42 }}>${v}B</span>
          </div>
        ))}
        {points.map((p, i) => {
          const delay = 10 + i * 5;
          const progress = Math.max(0, frame - delay);
          const s = springFn({ frame: progress, fps: 30, config: { damping: 12, stiffness: 90, mass: 0.8 } });
          const barH = (p.value / maxVal) * chartH;
          const isLatest = i === points.length - 1;
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: barW }}>
              <div style={{ height: chartH, width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <div style={{
                  height: barH * s,
                  width: "100%",
                  background: isLatest
                    ? "linear-gradient(180deg, #40f0a0, #20c080)"
                    : "linear-gradient(180deg, #f0c040, #d0a020)",
                  borderRadius: "6px 6px 0 0",
                  boxShadow: isLatest ? "0 0 30px rgba(64,240,160,0.3)" : "0 0 15px rgba(240,192,64,0.15)",
                  minWidth: barW,
                }} />
              </div>
              <span style={{ fontFamily: FONTS.mono, fontSize: Math.round(11 * SCALE), color: COLORS.textDim, whiteSpace: "nowrap" }}>{p.label}</span>
              <span style={{ fontFamily: FONTS.mono, fontSize: Math.round(13 * SCALE), color: COLORS.text, fontWeight: 700 }}>${p.value}B</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProcessDiagram: React.FC<{ frame: number }> = ({ frame }) => {
  const steps = ["GENERATE", "CRITIQUE", "REVISE"];
  const delays = [8, 14, 20];
  return (
    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
        {steps.map((step, i) => {
          const progress = Math.max(0, frame - delays[i]);
          const s = springFn({ frame: progress, fps: 30, config: { damping: 10, stiffness: 100, mass: 0.7 } });
          const colors = ["#4080f0", "#f0c040", "#40f0a0"];
          const icons = ["→", "?", "✓"];
          return (
            <React.Fragment key={i}>
              <div style={{
                opacity: s,
                transform: `scale(${s < 1 ? s : 1 + (s - 1) * 0.15})`,
                padding: "32px 44px",
                backgroundColor: "rgba(20,20,50,0.8)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: `2px solid ${colors[i]}60`,
                borderRadius: 14,
                textAlign: "center",
                minWidth: 220,
                boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}>
                <div style={{ fontSize: 28, marginBottom: 8, color: colors[i] }}>{icons[i]}</div>
                <div style={{ fontSize: Math.round(16 * SCALE), fontFamily: FONTS.sans, color: colors[i], fontWeight: 700, marginBottom: 6 }}>{step}</div>
                <div style={{ fontSize: Math.round(12 * SCALE), fontFamily: FONTS.mono, color: COLORS.textDim }}>{["Response", "Analysis", "Improved"][i]}</div>
              </div>
              {i < steps.length - 1 && (
                <ArrowConnector progress={Math.max(0, frame - (delays[i] + 8))} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const ArrowConnector: React.FC<{ progress: number }> = ({ progress }) => {
  const opacity = interpolate(progress, [0, 8], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const arrowBounce = springFn({ frame: progress, fps: 30, config: { damping: 8, stiffness: 120, mass: 0.5 } });
  return (
    <div style={{ fontSize: 36, color: COLORS.textDim, opacity, transform: `translateX(${(1 - arrowBounce) * -10}px)` }}>
      →
    </div>
  );
};

const ConnectionLines: React.FC<{ frame: number }> = ({ frame }) => {
  const satellites = [
    { x: 15, y: 55, delay: 10 },
    { x: 35, y: 60, delay: 13 },
    { x: 65, y: 60, delay: 16 },
    { x: 85, y: 55, delay: 19 },
  ];
  return (
    <svg style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }} viewBox="0 0 1920 1080">
      {satellites.map((sat, i) => {
        const progress = Math.max(0, frame - sat.delay);
        const opacity = interpolate(progress, [0, 10], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <line key={i} x1={960} y1={410} x2={(sat.x / 100) * 1920} y2={(sat.y / 100) * 1080} stroke={COLORS.accent} strokeWidth={1.5} opacity={opacity} strokeDasharray="8 4" />
        );
      })}
    </svg>
  );
};

const TensionMeter: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = Math.max(0, frame - 3);
  const meterPos = interpolate(progress, [0, 20], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: "50%", top: "48%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex", width: 500, justifyContent: "space-between", marginBottom: 2 }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: "#40f0a0" }}>SAFE</span>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: "#f0c040" }}>CONCERNED</span>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: "#f04040" }}>CRITICAL</span>
      </div>
      <div style={{ width: 500, height: 28, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #40f0a0 0%, #f0c040 50%, #f04040 100%)", opacity: 0.25, borderRadius: 14 }} />
        <div style={{
          width: `${meterPos}%`,
          height: "100%",
          background: "linear-gradient(90deg, #40f0a0, #f0c040 50%, #f04040)",
          borderRadius: 14,
          boxShadow: "0 0 24px rgba(240,192,64,0.25)",
        }} />
        <div style={{
          position: "absolute",
          top: -4,
          left: `${meterPos}%`,
          width: 4,
          height: 36,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          transform: "translateX(-50%)",
          boxShadow: "0 0 10px rgba(255,255,255,0.5)",
        }} />
      </div>
      <div style={{
        fontFamily: FONTS.sans,
        fontSize: Math.round(14 * SCALE),
        color: "#ffffff",
        fontWeight: 600,
        opacity: meterPos > 50 ? Math.min(1, (meterPos - 50) / 20) : 0,
        marginTop: 4,
      }}>
        {meterPos > 75 ? "⚡ TENSION CRITICAL" : meterPos > 50 ? "⚠️ TENSION RISING" : ""}
      </div>
    </div>
  );
};

const JourneyPath: React.FC<{ frame: number; durationInFrames: number }> = ({ frame, durationInFrames }) => {
  const progress = interpolate(frame, [10, durationInFrames - 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const waypoints = [
    { label: "2021", x: 0 },
    { label: "2023", x: 0.3 },
    { label: "2024", x: 0.55 },
    { label: "2025", x: 0.75 },
    { label: "2026", x: 1 },
  ];
  return (
    <svg style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }} viewBox="0 0 1920 1080">
      <defs>
        <linearGradient id="pathGradLg2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f0c040" />
          <stop offset="1" stopColor="#40f0a0" />
        </linearGradient>
      </defs>
      <path
        d="M 100 540 Q 400 440, 700 540 T 1300 540 T 1820 540"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={3}
        strokeDasharray="8 8"
      />
      <path
        d="M 100 540 Q 400 440, 700 540 T 1300 540 T 1820 540"
        fill="none"
        stroke="url(#pathGradLg2)"
        strokeWidth={4}
        strokeDasharray={`${progress * 3500} 3500`}
        strokeLinecap="round"
      />
      {waypoints.map((wp, i) => {
        const dotX = 100 + wp.x * 1720;
        const dotY = 540 + (wp.x < 0.5
          ? -100 * Math.sin(wp.x * Math.PI)
          : 100 * Math.sin((wp.x - 0.5) * Math.PI));
        const dotOpacity = progress >= wp.x - 0.05 ? 1 : 0;
        const dotRevealed = progress >= wp.x;
        return (
          <g key={i} opacity={dotOpacity}>
            <circle cx={dotX} cy={dotY} r={8} fill={dotRevealed ? "#40f0a0" : "#f0c040"} stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
            <text x={dotX} y={dotY + 28} fill={COLORS.textDim} fontSize={14} textAnchor="middle" fontFamily={FONTS.mono}>
              {wp.label}
            </text>
          </g>
        );
      })}
      <circle cx={100 + progress * 1720} cy={540} r={12} fill="#40f0a0" opacity={0.9}>
        <animate attributeName="r" values="10;14;10" dur="1.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

const StampAnimation: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = Math.max(0, frame - 20);
  const s = springFn({ frame: progress, fps: 30, config: { damping: 6, stiffness: 200, mass: 0.8 } });
  const shakeX = interpolate(Math.max(0, frame - 20), [0, 3, 6, 9], [0, -8, 6, -4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "48%",
        opacity: s,
        padding: "30px 80px",
        border: "6px solid #f04040",
        borderRadius: 8,
        transform: `translate(-50%, -50%) rotate(-12deg) scale(${s}) translateX(${shakeX}px)`,
        boxShadow: "0 0 40px rgba(240,64,64,0.3), 0 0 80px rgba(240,64,64,0.1)",
      }}
    >
      <div style={{ fontSize: Math.round(48 * SCALE), fontFamily: FONTS.sans, fontWeight: 900, color: "#f04040", letterSpacing: 8, textShadow: "0 0 20px rgba(240,64,64,0.3)" }}>DISABLED</div>
    </div>
  );
};


