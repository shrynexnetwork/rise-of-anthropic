import React from "react";
import { AbsoluteFill, Audio, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, WIDTH, HEIGHT } from "../config";
import { ScriptChunk, TimingEntry } from "../types";
import { KenBurnsBackground } from "../components/KenBurnsBackground";
import { HighlighterText } from "../components/HighlighterText";
import { SpringEntry } from "../components/SpringEntry";

interface ChunkSceneProps {
  chunk: ScriptChunk;
  timing: TimingEntry;
  audioSrc?: string;
}

export const ChunkScene: React.FC<ChunkSceneProps> = ({
  chunk,
  timing,
  audioSrc,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = timing;
  const isIntro = chunk.id === "s00";
  const isOutro = chunk.id === "s27";

  const showLogo = chunk.visual.toLowerCase().includes("logo");
  const showChart = chunk.visual.toLowerCase().includes("chart") || chunk.visual.toLowerCase().includes("graph");
  const showTier = chunk.visual.toLowerCase().includes("tier") || chunk.visual.toLowerCase().includes("three");
  const isFounding = chunk.id === "s01" || chunk.id === "s02" || chunk.id === "s03";
  const isFunding = chunk.visual.toLowerCase().includes("funding") || chunk.visual.toLowerCase().includes("money") || chunk.visual.toLowerCase().includes("dollar");

  const exitOpacity = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <KenBurnsBackground frame={frame} durationInFrames={durationInFrames} />

      {audioSrc && <Audio src={audioSrc} />}

      {isIntro && <IntroOverlay frame={frame} durationInFrames={durationInFrames} chunk={chunk} />}
      {isOutro && <OutroOverlay frame={frame} durationInFrames={durationInFrames} chunk={chunk} />}
      {isFounding && <FoundingVisual frame={frame} durationInFrames={durationInFrames} chunk={chunk} />}
      {showTier && <TierVisual frame={frame} durationInFrames={durationInFrames} chunk={chunk} />}
      {showChart && <ChartVisual frame={frame} durationInFrames={durationInFrames} chunk={chunk} />}
      {showLogo && <LogoVisual frame={frame} durationInFrames={durationInFrames} chunk={chunk} />}
      {isFunding && <FundingVisual frame={frame} durationInFrames={durationInFrames} chunk={chunk} />}

      {!isIntro && !isOutro && !isFounding && !showTier && !showChart && !showLogo && !isFunding && (
        <DefaultVisual frame={frame} durationInFrames={durationInFrames} chunk={chunk} />
      )}
    </AbsoluteFill>
  );
};

const IntroOverlay: React.FC<{ frame: number; durationInFrames: number; chunk: ScriptChunk }> = ({
  frame,
  durationInFrames,
  chunk,
}) => {
  const titleOpacity = interpolate(frame, [0, 20, durationInFrames - 20, durationInFrames], [0, 1, 1, 0]);
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
      <SpringEntry frame={frame} delay={5} direction="scale">
        <div style={{ fontSize: 80, fontFamily: FONTS.sans, fontWeight: 900, color: COLORS.accent, textShadow: "0 0 40px rgba(240,192,64,0.3)", letterSpacing: 2 }}>
          ANTHROPIC
        </div>
      </SpringEntry>
      <SpringEntry frame={frame} delay={15} direction="up">
        <div style={{ fontSize: 28, fontFamily: FONTS.sans, fontWeight: 300, color: COLORS.textDim, maxWidth: 800, textAlign: "center", lineHeight: 1.5 }}>
          {chunk.text}
        </div>
      </SpringEntry>
    </div>
  );
};

const OutroOverlay: React.FC<{ frame: number; durationInFrames: number; chunk: ScriptChunk }> = ({
  frame,
  durationInFrames,
  chunk,
}) => {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
      <div style={{ fontSize: 100, fontFamily: FONTS.sans, fontWeight: 900, color: COLORS.accent, textShadow: "0 0 60px rgba(240,192,64,0.2)" }}>
        ANTHROPIC
      </div>
      <div style={{ width: 100, height: 3, backgroundColor: COLORS.accent, opacity: 0.5 }} />
      <SpringEntry frame={frame} delay={10} direction="up">
        <div style={{ fontSize: 24, fontFamily: FONTS.sans, fontWeight: 300, color: COLORS.textDim, maxWidth: 900, textAlign: "center", lineHeight: 1.6, padding: "0 40px" }}>
          {chunk.text}
        </div>
      </SpringEntry>
      <SpringEntry frame={frame} delay={20} direction="up">
        <div style={{ fontSize: 16, fontFamily: FONTS.sans, color: COLORS.textMuted, marginTop: 20 }}>
          Subscribe for more stories
        </div>
      </SpringEntry>
    </div>
  );
};

const FoundingVisual: React.FC<{ frame: number; durationInFrames: number; chunk: ScriptChunk }> = ({
  frame,
  durationInFrames,
  chunk,
}) => {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 800, textAlign: "center", padding: 40 }}>
        <HighlighterText
          text={chunk.text}
          frame={frame}
          startFrame={0}
          durationInFrames={durationInFrames}
          fontSize={32}
          asOverlay
        />
      </div>
    </div>
  );
};

const TierVisual: React.FC<{ frame: number; durationInFrames: number; chunk: ScriptChunk }> = ({
  frame,
  durationInFrames,
  chunk,
}) => {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-end" }}>
        {[
          { name: "Haiku", color: COLORS.accentGreen, desc: "Speed", delay: 5 },
          { name: "Sonnet", color: COLORS.accentBlue, desc: "Balance", delay: 10 },
          { name: "Opus", color: COLORS.accent, desc: "Power", delay: 15 },
        ].map((tier, i) => (
          <SpringEntry key={i} frame={frame} delay={tier.delay} direction="up">
            <div style={{
              width: 200,
              padding: "20px",
              backgroundColor: COLORS.cardBg,
              border: `2px solid ${tier.color}50`,
              borderRadius: 12,
              textAlign: "center",
            }}>
              <div style={{ fontSize: 12, fontFamily: FONTS.mono, color: tier.color, textTransform: "uppercase", letterSpacing: 2 }}>Claude 3</div>
              <div style={{ fontSize: 32, fontFamily: FONTS.sans, fontWeight: 800, color: COLORS.text, margin: "8px 0" }}>{tier.name}</div>
              <div style={{ fontSize: 14, fontFamily: FONTS.sans, color: COLORS.textDim }}>{tier.desc}</div>
            </div>
          </SpringEntry>
        ))}
      </div>
      <SpringEntry frame={frame} delay={20} direction="up">
        <div style={{ fontSize: 22, fontFamily: FONTS.sans, color: COLORS.text, maxWidth: 700, textAlign: "center", lineHeight: 1.5 }}>
          {chunk.text}
        </div>
      </SpringEntry>
    </div>
  );
};

const ChartVisual: React.FC<{ frame: number; durationInFrames: number; chunk: ScriptChunk }> = ({
  frame,
  durationInFrames,
  chunk,
}) => {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-end", height: 300 }}>
        {[
          { label: "Jan '24", value: 0.1, color: COLORS.accent },
          { label: "Dec '24", value: 1, color: COLORS.accentBlue },
          { label: "Feb '26", value: 14, color: COLORS.accentGreen },
          { label: "Apr '26", value: 30, color: COLORS.accent },
          { label: "May '26", value: 47, color: "#f06040" },
        ].map((point, i) => {
          const barHeight = (point.value / 50) * 280;
          return (
            <SpringEntry key={i} frame={frame} delay={5 + i * 5} direction="up">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ height: 300, width: 60, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <div style={{
                    height: barHeight,
                    width: "100%",
                    backgroundColor: point.color,
                    borderRadius: "4px 4px 0 0",
                    boxShadow: `0 0 15px ${point.color}40`,
                  }} />
                </div>
                <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.textDim }}>{point.label}</span>
                <span style={{ fontFamily: FONTS.mono, fontSize: 14, color: COLORS.text, fontWeight: 700 }}>${point.value}B</span>
              </div>
            </SpringEntry>
          );
        })}
      </div>
      <SpringEntry frame={frame} delay={35} direction="up">
        <div style={{ fontSize: 22, fontFamily: FONTS.sans, color: COLORS.text, maxWidth: 700, textAlign: "center", lineHeight: 1.5 }}>
          {chunk.text}
        </div>
      </SpringEntry>
    </div>
  );
};

const LogoVisual: React.FC<{ frame: number; durationInFrames: number; chunk: ScriptChunk }> = ({
  frame,
  durationInFrames,
  chunk,
}) => {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
      <SpringEntry frame={frame} delay={5} direction="scale">
        <div style={{ fontSize: 22, fontFamily: FONTS.sans, color: COLORS.text, maxWidth: 800, textAlign: "center", lineHeight: 1.6, padding: "0 40px" }}>
          {chunk.text}
        </div>
      </SpringEntry>
    </div>
  );
};

const FundingVisual: React.FC<{ frame: number; durationInFrames: number; chunk: ScriptChunk }> = ({
  frame,
  durationInFrames,
  chunk,
}) => {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <SpringEntry frame={frame} delay={5} direction="scale">
        <div style={{ maxWidth: 700, textAlign: "center" }}>
          <HighlighterText
            text={chunk.text}
            frame={frame}
            startFrame={0}
            durationInFrames={durationInFrames}
            fontSize={28}
            asOverlay
          />
        </div>
      </SpringEntry>
    </div>
  );
};

const DefaultVisual: React.FC<{ frame: number; durationInFrames: number; chunk: ScriptChunk }> = ({
  frame,
  durationInFrames,
  chunk,
}) => {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 900, padding: 40 }}>
        <HighlighterText
          text={chunk.text}
          frame={frame}
          startFrame={0}
          durationInFrames={durationInFrames}
          fontSize={30}
          asOverlay
        />
      </div>
    </div>
  );
};
