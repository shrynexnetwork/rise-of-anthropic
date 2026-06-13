import React from "react";
import { AbsoluteFill, Audio, interpolate, useCurrentFrame, spring as springFn, Img } from "remotion";
import { COLORS, FONTS } from "../config";
import { TimingEntry } from "../types";
import { SceneConfig } from "./visualConfig";

interface SceneRendererProps {
  timing: TimingEntry;
  audioSrc?: string;
  config: SceneConfig;
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({ timing, audioSrc, config }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = timing;
  const exitOpacity = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <KenBurnsBackground image={config.background.image} gradient={config.background.gradient} frame={frame} durationInFrames={durationInFrames} />

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
      {config.sceneType === "crown-reveal" && <CrownGlow frame={frame} />}
    </AbsoluteFill>
  );
};

const KenBurnsBackground: React.FC<{ image: string; gradient?: string; frame: number; durationInFrames: number }> = ({ image, gradient, frame, durationInFrames }) => {
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const translateY = interpolate(frame, [0, durationInFrames], [0, -15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Img
        src={image}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale}) translateY(${translateY}px)` }}
      />
      {gradient && (
        <AbsoluteFill style={{ background: gradient }} />
      )}
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

  let animStyle: React.CSSProperties = { opacity: 0 };

  if (overlay.animation === "fade") {
    const opacity = interpolate(progress, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    animStyle = { opacity };
  } else if (overlay.animation === "spring-up") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 12, stiffness: 100 } });
    animStyle = { opacity: s, transform: `translateY(${(1 - s) * 40}px)` };
  } else if (overlay.animation === "spring-scale") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 10, stiffness: 120 } });
    animStyle = { opacity: s, transform: `scale(${s})` };
  } else if (overlay.animation === "slide-left") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 15, stiffness: 80 } });
    animStyle = { opacity: s, transform: `translateX(${(1 - s) * 60}px)` };
  } else if (overlay.animation === "slide-right") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 15, stiffness: 80 } });
    animStyle = { opacity: s, transform: `translateX(${(s - 1) * 60}px)` };
  }

  return (
    <div
      style={{
        position: "absolute",
        left: `${overlay.x}%`,
        top: `${overlay.y}%`,
        transform: "translate(-50%, -50%)",
        fontSize: overlay.fontSize,
        fontFamily: FONTS.sans,
        fontWeight: overlay.fontWeight || 400,
        color: overlay.color || COLORS.text,
        textAlign: "center",
        maxWidth: overlay.maxWidth ? `${overlay.maxWidth}px` : "80%",
        textShadow: `0 2px 20px rgba(0,0,0,0.5)`,
        letterSpacing: overlay.fontSize > 30 ? "0.02em" : "0.01em",
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

  let animStyle: React.CSSProperties = { opacity: 0 };

  if (element.animation === "fade") {
    const opacity = interpolate(progress, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    animStyle = { opacity };
  } else if (element.animation === "spring-up") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 12, stiffness: 100 } });
    animStyle = { opacity: s, transform: `translateY(${(1 - s) * 50}px)` };
  } else if (element.animation === "spring-scale") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 10, stiffness: 120 } });
    animStyle = { opacity: s, transform: `scale(${s})` };
  } else if (element.animation === "slide-left") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 15, stiffness: 80 } });
    animStyle = { opacity: s, transform: `translateX(${(1 - s) * 60}px)` };
  } else if (element.animation === "slide-right") {
    const s = springFn({ frame: progress, fps: 30, config: { damping: 15, stiffness: 80 } });
    animStyle = { opacity: s, transform: `translateX(${(s - 1) * 60}px)` };
  }

  if (element.type === "card") {
    return (
      <div
        style={{
          position: "absolute",
          left: `${element.x}%`,
          top: `${element.y}%`,
          transform: "translate(-50%, -50%)",
          width: element.width || 200,
          padding: "20px 16px",
          backgroundColor: "rgba(20,20,50,0.85)",
          border: `2px solid ${element.color || COLORS.accent}60`,
          borderRadius: 12,
          textAlign: "center",
          backdropFilter: "blur(5px)",
          ...animStyle,
        }}
      >
        {element.src && (
          <Img src={element.src} style={{ height: 30, marginBottom: 8, filter: "brightness(0) invert(1) opacity(0.8)" }} />
        )}
        <div style={{ fontSize: 18, fontFamily: FONTS.sans, fontWeight: 700, color: element.color || COLORS.text, marginBottom: 4 }}>
          {element.label}
        </div>
        <div style={{ fontSize: 13, fontFamily: FONTS.sans, color: COLORS.textDim }}>
          {element.sublabel}
        </div>
      </div>
    );
  }

  if (element.type === "logo" || element.type === "image") {
    return (
      <div
        style={{
          position: "absolute",
          left: `${element.x}%`,
          top: `${element.y}%`,
          transform: "translate(-50%, -50%)",
          width: element.width || 60,
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

  if (element.type === "icon") {
    return (
      <div
        style={{
          position: "absolute",
          left: `${element.x}%`,
          top: `${element.y}%`,
          transform: "translate(-50%, -50%)",
          width: element.width || 40,
          ...animStyle,
        }}
      >
        <Img src={element.src || ""} style={{ width: "100%", height: "auto", filter: "brightness(0) invert(1) opacity(0.7)" }} />
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
  const chartW = 600;
  const chartH = 250;
  const barW = chartW / points.length - 20;

  return (
    <div style={{ position: "absolute", left: "50%", top: "45%", transform: "translate(-50%, -50%)", display: "flex", gap: 12, alignItems: "flex-end", height: chartH }}>
      {points.map((p, i) => {
        const delay = 10 + i * 5;
        const progress = Math.max(0, frame - delay);
        const s = springFn({ frame: progress, fps: 30, config: { damping: 15, stiffness: 80 } });
        const barH = (p.value / maxVal) * chartH;
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: barW }}>
            <div style={{ height: chartH, width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div style={{ height: barH * s, width: "100%", backgroundColor: i === points.length - 1 ? "#40f0a0" : "#f0c040", borderRadius: "4px 4px 0 0", boxShadow: i === points.length - 1 ? "0 0 20px rgba(64,240,160,0.4)" : "0 0 10px rgba(240,192,64,0.2)", minWidth: 60 }} />
            </div>
            <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textDim }}>{p.label}</span>
            <span style={{ fontFamily: FONTS.mono, fontSize: 13, color: COLORS.text, fontWeight: 700 }}>${p.value}B</span>
          </div>
        );
      })}
    </div>
  );
};

const ProcessDiagram: React.FC<{ frame: number }> = ({ frame }) => {
  const steps = ["GENERATE", "CRITIQUE", "REVISE"];
  const delays = [8, 14, 20];
  return (
    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        {steps.map((step, i) => {
          const progress = Math.max(0, frame - delays[i]);
          const s = springFn({ frame: progress, fps: 30, config: { damping: 12, stiffness: 100 } });
          const colors = ["#4080f0", "#f0c040", "#40f0a0"];
          return (
            <React.Fragment key={i}>
              <div style={{ opacity: s, transform: `scale(${s})`, padding: "20px 30px", backgroundColor: "rgba(20,20,50,0.8)", border: `2px solid ${colors[i]}60`, borderRadius: 12, textAlign: "center", minWidth: 140 }}>
                <div style={{ fontSize: 14, fontFamily: FONTS.sans, color: colors[i], fontWeight: 700, marginBottom: 4 }}>{step}</div>
                <div style={{ fontSize: 11, fontFamily: FONTS.mono, color: COLORS.textDim }}>{["Response", "Analysis", "Improved"][i]}</div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ fontSize: 24, color: COLORS.textDim, opacity: Math.max(0, frame - (delays[i] + 10)) > 0 ? 1 : 0 }}>→</div>
              )}
            </React.Fragment>
          );
        })}
      </div>
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
        const opacity = interpolate(progress, [0, 10], [0, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <line key={i} x1={960} y1={410} x2={(sat.x / 100) * 1920} y2={(sat.y / 100) * 1080} stroke={COLORS.accent} strokeWidth={1} opacity={opacity} strokeDasharray="8 4" />
        );
      })}
    </svg>
  );
};

const TensionMeter: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = Math.max(0, frame - 3);
  const meterPos = interpolate(progress, [0, 20], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: "50%", top: "52%", transform: "translate(-50%, -50%)", width: 200, height: 20, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ width: `${meterPos}%`, height: "100%", background: "linear-gradient(90deg, #40f0a0, #f0c040, #f04040)", borderRadius: 10, transition: "width 0.1s" }} />
    </div>
  );
};

const JourneyPath: React.FC<{ frame: number; durationInFrames: number }> = ({ frame, durationInFrames }) => {
  const progress = interpolate(frame, [10, durationInFrames - 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <svg style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }} viewBox="0 0 1920 1080">
      <defs>
        <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f0c040" />
          <stop offset="1" stopColor="#40f0a0" />
        </linearGradient>
      </defs>
      <path
        d="M 100 540 Q 400 440, 700 540 T 1300 540 T 1820 540"
        fill="none"
        stroke="url(#pathGrad)"
        strokeWidth={3}
        strokeDasharray="8 8"
        opacity={0.5}
      />
      <circle cx={100 + progress * 1720} cy={540} r={6} fill="#f0c040" />
    </svg>
  );
};

const StampAnimation: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = Math.max(0, frame - 20);
  const s = springFn({ frame: progress, fps: 30, config: { damping: 8, stiffness: 200 } });
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "48%",
        transform: "translate(-50%, -50%)",
        opacity: s,
        padding: "20px 60px",
        border: "4px solid #f04040",
        borderRadius: 8,
        transform: `translate(-50%, -50%) rotate(-12deg) scale(${s})`,
      }}
    >
      <div style={{ fontSize: 48, fontFamily: FONTS.sans, fontWeight: 900, color: "#f04040", letterSpacing: 8 }}>DISABLED</div>
    </div>
  );
};

const CrownGlow: React.FC<{ frame: number }> = ({ frame }) => {
  const pulse = interpolate(frame, [0, 60, 120], [1, 1.05, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "16%",
        transform: "translate(-50%, -50%)",
        fontSize: 48,
        color: "#f0c040",
        opacity: interpolate(Math.max(0, frame - 3), [0, 10], [0, 1]),
        textShadow: `0 0 ${30 * pulse}px rgba(240,192,64,0.5)`,
        transform: `translate(-50%, -50%) scale(${pulse})`,
      }}
    >
      👑
    </div>
  );
};
