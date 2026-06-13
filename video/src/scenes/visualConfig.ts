import { backgrounds, logos, people, icons as iconAssets } from "../assets/index";

export type SceneType =
  | "hero" | "narrative" | "investor-cards" | "timeline"
  | "process-diagram" | "convergence" | "tier-cards"
  | "chart-benchmark" | "chart-revenue" | "chart-stat"
  | "investment-stack" | "thinking" | "record-reveal"
  | "crown-reveal" | "shutdown" | "ipo-filing"
  | "philosophy-pillars" | "power-web" | "journey"
  | "cosmic" | "split-tension";

export interface BackgroundConfig {
  image: string;
  gradient?: string;
}

export interface TextOverlay {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  delay: number;
  animation: "fade" | "spring-up" | "spring-scale" | "slide-left" | "slide-right";
  color?: string;
  fontWeight?: number;
}

export interface VisualElement {
  type: "logo" | "image" | "icon" | "card" | "counter";
  src?: string;
  label?: string;
  sublabel?: string;
  x: number;
  y: number;
  width?: number;
  delay: number;
  animation: "spring-up" | "spring-scale" | "fade" | "slide-left" | "slide-right";
  color?: string;
}

export interface SceneConfig {
  sceneType: SceneType;
  background: BackgroundConfig;
  textOverlays?: TextOverlay[];
  elements?: VisualElement[];
  specialConfig?: Record<string, unknown>;
}

export const sceneConfigs: Record<string, SceneConfig> = {
  s00: {
    sceneType: "hero",
    background: { image: backgrounds.neuralNetwork, gradient: "radial-gradient(ellipse at center, rgba(10,10,26,0.3) 0%, rgba(10,10,26,0.8) 100%)" },
    textOverlays: [
      { text: "THE RISE OF", x: 50, y: 38, fontSize: 32, delay: 10, animation: "fade", color: "#8888aa", fontWeight: 300 },
      { text: "ANTHROPIC", x: 50, y: 50, fontSize: 80, delay: 15, animation: "spring-scale", color: "#f0c040", fontWeight: 900 },
      { text: "From $0 to $965B in Five Years", x: 50, y: 62, fontSize: 22, delay: 25, animation: "fade", color: "#8888aa", fontWeight: 300 },
    ],
  },
  s01: {
    sceneType: "split-tension",
    background: { image: backgrounds.office, gradient: "linear-gradient(90deg, rgba(200,50,50,0.3) 0%, rgba(10,10,26,0.6) 50%, rgba(200,50,50,0.3) 100%)" },
    textOverlays: [
      { text: "2021: TENSIONS AT OPENAI", x: 50, y: 12, fontSize: 20, delay: 0, animation: "fade", color: "#f04040", fontWeight: 700 },
      { text: "Dario Amodei", x: 25, y: 60, fontSize: 24, delay: 15, animation: "fade", color: "#ffffff", fontWeight: 600 },
      { text: "VP of Research", x: 25, y: 67, fontSize: 16, delay: 18, animation: "fade", color: "#8888aa", fontWeight: 300 },
      { text: "Daniela Amodei", x: 75, y: 60, fontSize: 24, delay: 20, animation: "fade", color: "#ffffff", fontWeight: 600 },
      { text: "Safety & Policy Lead", x: 75, y: 67, fontSize: 16, delay: 23, animation: "fade", color: "#8888aa", fontWeight: 300 },
    ],
    elements: [
      { type: "logo", src: logos.openai, x: 50, y: 35, width: 120, delay: 5, animation: "fade" },
    ],
  },
  s02: {
    sceneType: "narrative",
    background: { image: backgrounds.dawnSky, gradient: "linear-gradient(180deg, rgba(10,10,26,0.2) 0%, rgba(10,10,26,0.7) 100%)" },
    textOverlays: [
      { text: "JANUARY 2021", x: 50, y: 12, fontSize: 20, delay: 0, animation: "fade", color: "#f0c040", fontWeight: 700 },
      { text: "9 Researchers Walked Out", x: 50, y: 22, fontSize: 36, delay: 5, animation: "spring-up", color: "#ffffff", fontWeight: 800 },
      { text: "Founded Anthropic", x: 50, y: 85, fontSize: 28, delay: 25, animation: "spring-up", color: "#f0c040", fontWeight: 700 },
      { text: "Public Benefit Corporation", x: 50, y: 92, fontSize: 18, delay: 30, animation: "fade", color: "#8888aa", fontWeight: 400 },
    ],
  },
  s03: {
    sceneType: "cosmic",
    background: { image: backgrounds.hubbleSpace, gradient: "linear-gradient(180deg, rgba(10,10,26,0.3) 0%, rgba(10,10,26,0.9) 100%)" },
    textOverlays: [
      { text: "ANTHROPIC", x: 50, y: 40, fontSize: 64, delay: 5, animation: "spring-scale", color: "#f0c040", fontWeight: 900 },
      { text: "from Greek 'anthropos' — human", x: 50, y: 52, fontSize: 22, delay: 15, animation: "fade", color: "#8888aa", fontWeight: 300 },
      { text: "The Anthropic Principle", x: 50, y: 65, fontSize: 26, delay: 22, animation: "fade", color: "#4080f0", fontWeight: 600 },
      { text: "Intelligence needs careful stewardship", x: 50, y: 75, fontSize: 18, delay: 28, animation: "fade", color: "#8888aa", fontWeight: 300 },
    ],
  },
  s04: {
    sceneType: "investor-cards",
    background: { image: backgrounds.stockTicker, gradient: "linear-gradient(180deg, rgba(10,10,26,0.4) 0%, rgba(10,10,26,0.85) 100%)" },
    textOverlays: [
      { text: "$124 MILLION", x: 50, y: 18, fontSize: 42, delay: 0, animation: "spring-scale", color: "#40f0a0", fontWeight: 900 },
      { text: "SEED ROUND — MAY 2021", x: 50, y: 28, fontSize: 18, delay: 5, animation: "fade", color: "#8888aa", fontWeight: 600 },
    ],
    elements: [
      { type: "card", label: "Jaan Tallinn", sublabel: "Skype Co-founder", src: logos.skype, x: 15, y: 50, width: 180, delay: 10, animation: "spring-up", color: "#4080f0" },
      { type: "card", label: "Dustin Moskovitz", sublabel: "Facebook Co-founder", src: logos.meta, x: 41, y: 50, width: 180, delay: 15, animation: "spring-up", color: "#4080f0" },
      { type: "card", label: "Eric Schmidt", sublabel: "Former Google CEO", src: logos.google, x: 67, y: 50, width: 180, delay: 20, animation: "spring-up", color: "#4080f0" },
    ],
  },
  s05: {
    sceneType: "timeline",
    background: { image: backgrounds.binaryCode, gradient: "linear-gradient(180deg, rgba(10,10,26,0.5) 0%, rgba(10,10,26,0.9) 100%)" },
    textOverlays: [
      { text: "THE CLAUDE ERA", x: 50, y: 10, fontSize: 24, delay: 0, animation: "fade", color: "#f0c040", fontWeight: 700 },
      { text: "Named after Claude Shannon", x: 50, y: 20, fontSize: 18, delay: 5, animation: "fade", color: "#8888aa", fontWeight: 300 },
      { text: "2022", x: 25, y: 45, fontSize: 22, delay: 10, animation: "spring-up", color: "#40f0a0", fontWeight: 700 },
      { text: "Series B: $580M", x: 25, y: 52, fontSize: 16, delay: 13, animation: "fade", color: "#aaffcc", fontWeight: 400 },
      { text: "Lead: FTX", x: 25, y: 58, fontSize: 14, delay: 16, animation: "fade", color: "#8888aa", fontWeight: 300 },
      { text: "FTX COLLAPSED", x: 75, y: 45, fontSize: 22, delay: 22, animation: "spring-up", color: "#f04040", fontWeight: 800 },
      { text: "One of biggest frauds in history", x: 75, y: 52, fontSize: 14, delay: 25, animation: "fade", color: "#ff8888", fontWeight: 400 },
    ],
    elements: [
      { type: "image", src: people.claudeShannon, x: 50, y: 24, width: 50, delay: 3, animation: "fade" },
      { type: "logo", src: logos.ftx, x: 75, y: 58, width: 60, delay: 19, animation: "slide-right", color: "#f04040" },
    ],
  },
  s06: {
    sceneType: "narrative",
    background: { image: backgrounds.stormClouds, gradient: "linear-gradient(180deg, rgba(10,10,26,0.3) 0%, rgba(10,10,26,0.85) 100%)" },
    textOverlays: [
      { text: "FTX BUYBACK", x: 50, y: 20, fontSize: 36, delay: 0, animation: "spring-up", color: "#f0c040", fontWeight: 800 },
      { text: "A Near-Death Experience", x: 50, y: 30, fontSize: 20, delay: 8, animation: "fade", color: "#ff8888", fontWeight: 400 },
      { text: "But They Survived", x: 50, y: 70, fontSize: 32, delay: 20, animation: "spring-up", color: "#40f0a0", fontWeight: 700 },
      { text: "And kept building", x: 50, y: 78, fontSize: 18, delay: 25, animation: "fade", color: "#8888aa", fontWeight: 300 },
    ],
    elements: [
      { type: "logo", src: logos.anthropic, x: 50, y: 50, width: 80, delay: 15, animation: "spring-scale", color: "#f0c040" },
    ],
  },
  s07: {
    sceneType: "process-diagram",
    background: { image: backgrounds.parchment, gradient: "linear-gradient(180deg, rgba(10,10,26,0.3) 0%, rgba(10,10,26,0.8) 100%)" },
    textOverlays: [
      { text: "CONSTITUTIONAL AI", x: 50, y: 10, fontSize: 36, delay: 0, animation: "spring-up", color: "#f0c040", fontWeight: 900 },
      { text: "GENERATE", x: 50, y: 40, fontSize: 18, delay: 8, animation: "fade", color: "#4080f0", fontWeight: 700 },
      { text: "CRITIQUE", x: 50, y: 55, fontSize: 18, delay: 14, animation: "fade", color: "#f0c040", fontWeight: 700 },
      { text: "REVISE", x: 50, y: 70, fontSize: 18, delay: 20, animation: "fade", color: "#40f0a0", fontWeight: 700 },
      { text: "Helpful · Honest · Harmless", x: 50, y: 88, fontSize: 20, delay: 28, animation: "fade", color: "#ffffff", fontWeight: 600 },
    ],
  },
  s08: {
    sceneType: "convergence",
    background: { image: backgrounds.library, gradient: "linear-gradient(180deg, rgba(10,10,26,0.3) 0%, rgba(10,10,26,0.8) 100%)" },
    textOverlays: [
      { text: "INSPIRED BY", x: 50, y: 12, fontSize: 18, delay: 0, animation: "fade", color: "#8888aa", fontWeight: 600 },
      { text: "UN Declaration of Human Rights", x: 25, y: 45, fontSize: 18, delay: 8, animation: "fade", color: "#4080f0", fontWeight: 600 },
      { text: "Apple's Terms of Service", x: 75, y: 45, fontSize: 18, delay: 14, animation: "fade", color: "#4080f0", fontWeight: 600 },
      { text: "ANTHROPIC CONSTITUTION", x: 50, y: 75, fontSize: 24, delay: 22, animation: "spring-scale", color: "#f0c040", fontWeight: 800 },
      { text: "First AI company to publish model principles", x: 50, y: 85, fontSize: 16, delay: 28, animation: "fade", color: "#8888aa", fontWeight: 300 },
    ],
    elements: [
      { type: "logo", src: logos.un, x: 25, y: 35, width: 60, delay: 5, animation: "fade" },
      { type: "logo", src: logos.apple, x: 75, y: 35, width: 60, delay: 12, animation: "fade" },
    ],
  },
  s09: {
    sceneType: "tier-cards",
    background: { image: backgrounds.launchpad, gradient: "linear-gradient(180deg, rgba(10,10,26,0.3) 0%, rgba(10,10,26,0.85) 100%)" },
    textOverlays: [
      { text: "CLAUDE 1", x: 30, y: 25, fontSize: 48, delay: 0, animation: "spring-up", color: "#f0c040", fontWeight: 900 },
      { text: "100K Token Context", x: 30, y: 35, fontSize: 18, delay: 8, animation: "fade", color: "#8888aa", fontWeight: 400 },
      { text: "H-H-H Principles", x: 30, y: 42, fontSize: 16, delay: 12, animation: "fade", color: "#40f0a0", fontWeight: 600 },
      { text: "$1.3B", x: 70, y: 28, fontSize: 36, delay: 15, animation: "spring-scale", color: "#40f0a0", fontWeight: 900 },
      { text: "$2B", x: 85, y: 28, fontSize: 36, delay: 22, animation: "spring-scale", color: "#4080f0", fontWeight: 900 },
    ],
    elements: [
      { type: "logo", src: logos.amazon, x: 70, y: 42, width: 50, delay: 17, animation: "fade" },
      { type: "logo", src: logos.google, x: 85, y: 42, width: 50, delay: 24, animation: "fade" },
    ],
  },
  s10: {
    sceneType: "timeline",
    background: { image: backgrounds.codeScreen, gradient: "linear-gradient(180deg, rgba(10,10,26,0.5) 0%, rgba(10,10,26,0.9) 100%)" },
    textOverlays: [
      { text: "JUL 2023", x: 25, y: 40, fontSize: 22, delay: 0, animation: "spring-up", color: "#f0c040", fontWeight: 700 },
      { text: "Claude 2", x: 25, y: 50, fontSize: 28, delay: 5, animation: "fade", color: "#ffffff", fontWeight: 700 },
      { text: "Reasoning + Coding++", x: 25, y: 60, fontSize: 14, delay: 8, animation: "fade", color: "#40f0a0", fontWeight: 400 },
      { text: "LATE 2023", x: 50, y: 40, fontSize: 22, delay: 12, animation: "spring-up", color: "#f0c040", fontWeight: 700 },
      { text: "Claude 2.1", x: 50, y: 50, fontSize: 28, delay: 17, animation: "fade", color: "#ffffff", fontWeight: 700 },
      { text: "Tool Use + Reduced Hallucinations", x: 50, y: 60, fontSize: 14, delay: 20, animation: "fade", color: "#40f0a0", fontWeight: 400 },
    ],
  },
  s11: {
    sceneType: "tier-cards",
    background: { image: backgrounds.geometricPattern, gradient: "linear-gradient(180deg, rgba(10,10,26,0.3) 0%, rgba(10,10,26,0.85) 100%)" },
    textOverlays: [
      { text: "MARCH 4, 2024", x: 50, y: 10, fontSize: 20, delay: 0, animation: "fade", color: "#f0c040", fontWeight: 700 },
      { text: "CLAUDE 3 FAMILY", x: 50, y: 20, fontSize: 36, delay: 5, animation: "spring-up", color: "#ffffff", fontWeight: 800 },
      { text: "Opus beat GPT-4 on every benchmark", x: 50, y: 85, fontSize: 16, delay: 30, animation: "fade", color: "#40f0a0", fontWeight: 400 },
    ],
    elements: [
      { type: "card", label: "HAIKU", sublabel: "Speed", x: 15, y: 45, width: 200, delay: 10, animation: "spring-up", color: "#40f0a0" },
      { type: "card", label: "SONNET", sublabel: "Balance", x: 50, y: 45, width: 200, delay: 15, animation: "spring-up", color: "#4080f0" },
      { type: "card", label: "OPUS", sublabel: "Power", x: 85, y: 45, width: 200, delay: 20, animation: "spring-up", color: "#f0c040" },
    ],
  },
  s12: {
    sceneType: "tier-cards",
    background: { image: backgrounds.minimalGrid, gradient: "linear-gradient(180deg, rgba(10,10,26,0.3) 0%, rgba(10,10,26,0.85) 100%)" },
    textOverlays: [
      { text: "CHOOSE THE RIGHT MODEL", x: 50, y: 10, fontSize: 28, delay: 0, animation: "fade", color: "#ffffff", fontWeight: 700 },
      { text: "Democratized Access to Frontier AI", x: 50, y: 85, fontSize: 18, delay: 30, animation: "fade", color: "#f0c040", fontWeight: 400 },
    ],
    elements: [
      { type: "card", label: "HAIKU", sublabel: "Real-time Chat", x: 15, y: 45, width: 200, delay: 8, animation: "spring-up", color: "#40f0a0" },
      { type: "card", label: "SONNET", sublabel: "Daily Work", x: 50, y: 45, width: 200, delay: 14, animation: "spring-up", color: "#4080f0" },
      { type: "card", label: "OPUS", sublabel: "Tough Problems", x: 83, y: 45, width: 200, delay: 20, animation: "spring-up", color: "#f0c040" },
    ],
  },
  s13: {
    sceneType: "chart-revenue",
    background: { image: backgrounds.oscilloscope, gradient: "linear-gradient(180deg, rgba(10,10,26,0.3) 0%, rgba(10,10,26,0.85) 100%)" },
    textOverlays: [
      { text: "SONNET 3.5 SHOCKED THE INDUSTRY", x: 50, y: 10, fontSize: 24, delay: 0, animation: "fade", color: "#f0c040", fontWeight: 700 },
      { text: "Opus-level performance at fraction of the cost", x: 50, y: 20, fontSize: 16, delay: 5, animation: "fade", color: "#8888aa", fontWeight: 300 },
      { text: "1,000% Revenue Growth", x: 50, y: 78, fontSize: 24, delay: 25, animation: "spring-scale", color: "#40f0a0", fontWeight: 900 },
      { text: "Jun '24 — Dec '24", x: 50, y: 88, fontSize: 14, delay: 30, animation: "fade", color: "#8888aa", fontWeight: 300 },
    ],
  },
  s14: {
    sceneType: "investment-stack",
    background: { image: backgrounds.citySkyline, gradient: "linear-gradient(180deg, rgba(10,10,26,0.2) 0%, rgba(10,10,26,0.8) 100%)" },
    textOverlays: [
      { text: "$8 BILLION", x: 50, y: 25, fontSize: 48, delay: 0, animation: "spring-scale", color: "#f0c040", fontWeight: 900 },
      { text: "Amazon Total Investment", x: 50, y: 35, fontSize: 18, delay: 8, animation: "fade", color: "#8888aa", fontWeight: 400 },
      { text: "ANTHROPIC", x: 50, y: 60, fontSize: 36, delay: 18, animation: "spring-up", color: "#ffffff", fontWeight: 800 },
      { text: "No longer a startup — A Powerhouse", x: 50, y: 68, fontSize: 18, delay: 22, animation: "fade", color: "#f0c040", fontWeight: 400 },
    ],
    elements: [
      { type: "logo", src: logos.amazon, x: 50, y: 45, width: 80, delay: 5, animation: "spring-scale" },
    ],
  },
  s15: {
    sceneType: "thinking",
    background: { image: backgrounds.circuitBoard, gradient: "linear-gradient(180deg, rgba(10,10,26,0.3) 0%, rgba(10,10,26,0.85) 100%)" },
    textOverlays: [
      { text: "FEB 2025", x: 50, y: 10, fontSize: 20, delay: 0, animation: "fade", color: "#f0c040", fontWeight: 700 },
      { text: "Claude 3.7 Sonnet", x: 50, y: 22, fontSize: 32, delay: 5, animation: "spring-up", color: "#ffffff", fontWeight: 800 },
      { text: "Extended Thinking — Chain of Thought", x: 50, y: 32, fontSize: 16, delay: 10, animation: "fade", color: "#40f0a0", fontWeight: 400 },
      { text: "MAY 2025", x: 50, y: 50, fontSize: 20, delay: 18, animation: "fade", color: "#f0c040", fontWeight: 700 },
      { text: "Claude 4 + Claude Code", x: 50, y: 60, fontSize: 32, delay: 22, animation: "spring-up", color: "#ffffff", fontWeight: 800 },
      { text: "Coding Agent — Revenue Juggernaut", x: 50, y: 70, fontSize: 16, delay: 26, animation: "fade", color: "#40f0a0", fontWeight: 400 },
    ],
  },
  s16: {
    sceneType: "timeline",
    background: { image: backgrounds.financialPaper, gradient: "linear-gradient(180deg, rgba(10,10,26,0.3) 0%, rgba(10,10,26,0.85) 100%)" },
    textOverlays: [
      { text: "FUNDING MILESTONES", x: 50, y: 10, fontSize: 24, delay: 0, animation: "fade", color: "#f0c040", fontWeight: 700 },
      { text: "SEP 2025", x: 20, y: 40, fontSize: 20, delay: 5, animation: "spring-up", color: "#40f0a0", fontWeight: 700 },
      { text: "Series F: $13B", x: 20, y: 50, fontSize: 16, delay: 8, animation: "fade", color: "#ffffff", fontWeight: 600 },
      { text: "Valuation: $183B", x: 20, y: 58, fontSize: 14, delay: 11, animation: "fade", color: "#8888aa", fontWeight: 400 },
      { text: "FEB 2026", x: 50, y: 40, fontSize: 20, delay: 14, animation: "spring-up", color: "#f0c040", fontWeight: 700 },
      { text: "$14B ARR", x: 50, y: 50, fontSize: 16, delay: 17, animation: "fade", color: "#ffffff", fontWeight: 600 },
      { text: "Revenue Run Rate", x: 50, y: 58, fontSize: 14, delay: 20, animation: "fade", color: "#8888aa", fontWeight: 400 },
    ],
  },
  s17: {
    sceneType: "record-reveal",
    background: { image: backgrounds.redCarpet, gradient: "linear-gradient(180deg, rgba(10,10,26,0.3) 0%, rgba(10,10,26,0.85) 100%)" },
    textOverlays: [
      { text: "FEBRUARY 2026", x: 50, y: 10, fontSize: 20, delay: 0, animation: "fade", color: "#f0c040", fontWeight: 700 },
      { text: "SERIES G", x: 50, y: 25, fontSize: 52, delay: 5, animation: "spring-scale", color: "#ffffff", fontWeight: 900 },
      { text: "$30 BILLION", x: 50, y: 40, fontSize: 40, delay: 10, animation: "spring-up", color: "#f0c040", fontWeight: 900 },
      { text: "Valuation: $380 Billion", x: 50, y: 52, fontSize: 22, delay: 15, animation: "fade", color: "#40f0a0", fontWeight: 600 },
      { text: "2nd Largest Private Round in History", x: 50, y: 62, fontSize: 18, delay: 20, animation: "fade", color: "#8888aa", fontWeight: 400 },
    ],
  },
  s18: {
    sceneType: "chart-stat",
    background: { image: backgrounds.financialGrid, gradient: "linear-gradient(180deg, rgba(10,10,26,0.3) 0%, rgba(10,10,26,0.85) 100%)" },
    textOverlays: [
      { text: "APRIL 2026", x: 50, y: 8, fontSize: 18, delay: 0, animation: "fade", color: "#f0c040", fontWeight: 700 },
      { text: "$30B ARR", x: 50, y: 22, fontSize: 42, delay: 5, animation: "spring-scale", color: "#40f0a0", fontWeight: 900 },
      { text: "80x Growth in 16 Months", x: 50, y: 34, fontSize: 20, delay: 10, animation: "fade", color: "#ffffff", fontWeight: 600 },
      { text: "300K+", x: 25, y: 55, fontSize: 36, delay: 15, animation: "spring-up", color: "#4080f0", fontWeight: 900 },
      { text: "Business Customers", x: 25, y: 63, fontSize: 14, delay: 18, animation: "fade", color: "#8888aa", fontWeight: 400 },
      { text: "8 of Fortune 10", x: 75, y: 55, fontSize: 36, delay: 22, animation: "spring-up", color: "#f0c040", fontWeight: 900 },
      { text: "Use Anthropic", x: 75, y: 63, fontSize: 14, delay: 25, animation: "fade", color: "#8888aa", fontWeight: 400 },
    ],
  },
  s19: {
    sceneType: "tier-cards",
    background: { image: backgrounds.geometricPattern, gradient: "linear-gradient(180deg, rgba(10,10,26,0.3) 0%, rgba(10,10,26,0.85) 100%)" },
    textOverlays: [
      { text: "CLAUDE OPUS 4.7", x: 20, y: 22, fontSize: 22, delay: 0, animation: "spring-up", color: "#f0c040", fontWeight: 800 },
      { text: "Coding + Vision + Reasoning", x: 20, y: 30, fontSize: 13, delay: 5, animation: "fade", color: "#8888aa", fontWeight: 400 },
      { text: "CLAUDE DESIGN", x: 50, y: 22, fontSize: 22, delay: 12, animation: "spring-up", color: "#4080f0", fontWeight: 800 },
      { text: "Text to Prototype", x: 50, y: 30, fontSize: 13, delay: 17, animation: "fade", color: "#8888aa", fontWeight: 400 },
      { text: "OPUS 4.8 DYNAMIC WORKFLOWS", x: 80, y: 22, fontSize: 20, delay: 24, animation: "spring-up", color: "#40f0a0", fontWeight: 800 },
      { text: "Up to 1,000 parallel sub-agents", x: 80, y: 30, fontSize: 13, delay: 28, animation: "fade", color: "#8888aa", fontWeight: 400 },
    ],
  },
  s20: {
    sceneType: "crown-reveal",
    background: { image: backgrounds.marbleTexture, gradient: "linear-gradient(180deg, rgba(10,10,26,0.2) 0%, rgba(10,10,26,0.8) 100%)" },
    textOverlays: [
      { text: "JUNE 9, 2026", x: 50, y: 8, fontSize: 18, delay: 0, animation: "fade", color: "#f0c040", fontWeight: 700 },
      { text: "MYTHOS CLASS", x: 50, y: 22, fontSize: 36, delay: 5, animation: "spring-scale", color: "#f0c040", fontWeight: 900 },
      { text: "CLAUDE FABLE 5", x: 50, y: 34, fontSize: 44, delay: 10, animation: "spring-up", color: "#ffffff", fontWeight: 900 },
      { text: "80% on SWE-bench Pro", x: 50, y: 46, fontSize: 22, delay: 18, animation: "fade", color: "#40f0a0", fontWeight: 600 },
      { text: "11 pts ahead of next best", x: 50, y: 54, fontSize: 16, delay: 22, animation: "fade", color: "#8888aa", fontWeight: 400 },
      { text: "Stripe: 50M lines migrated in 1 day", x: 50, y: 68, fontSize: 20, delay: 28, animation: "fade", color: "#4080f0", fontWeight: 600 },
      { text: "(was 2 months for a team)", x: 50, y: 76, fontSize: 14, delay: 32, animation: "fade", color: "#8888aa", fontWeight: 300 },
    ],
    elements: [
      { type: "logo", src: logos.stripe, x: 50, y: 62, width: 50, delay: 26, animation: "fade" },
    ],
  },
  s21: {
    sceneType: "shutdown",
    background: { image: backgrounds.stormClouds, gradient: "linear-gradient(180deg, rgba(180,20,20,0.2) 0%, rgba(10,10,26,0.9) 100%)" },
    textOverlays: [
      { text: "JUNE 12, 2026", x: 50, y: 10, fontSize: 18, delay: 0, animation: "fade", color: "#f04040", fontWeight: 700 },
      { text: "EXPORT CONTROL DIRECTIVE", x: 50, y: 25, fontSize: 28, delay: 5, animation: "spring-up", color: "#f04040", fontWeight: 800 },
      { text: "FABLE 5", x: 50, y: 45, fontSize: 36, delay: 15, animation: "fade", color: "#ffffff", fontWeight: 700 },
      { text: "DISABLED", x: 50, y: 55, fontSize: 48, delay: 20, animation: "spring-scale", color: "#f04040", fontWeight: 900 },
      { text: "First time a government pulled an AI model", x: 50, y: 68, fontSize: 16, delay: 25, animation: "fade", color: "#ff8888", fontWeight: 400 },
      { text: "Anthropic: working to restore access", x: 50, y: 78, fontSize: 16, delay: 30, animation: "fade", color: "#f0c040", fontWeight: 400 },
    ],
  },
  s22: {
    sceneType: "ipo-filing",
    background: { image: backgrounds.stockExchange, gradient: "linear-gradient(180deg, rgba(10,10,26,0.3) 0%, rgba(10,10,26,0.85) 100%)" },
    textOverlays: [
      { text: "JUNE 1, 2026", x: 50, y: 10, fontSize: 18, delay: 0, animation: "fade", color: "#f0c040", fontWeight: 700 },
      { text: "CONFIDENTIAL IPO FILING", x: 50, y: 22, fontSize: 28, delay: 5, animation: "spring-up", color: "#ffffff", fontWeight: 800 },
      { text: "$965 BILLION", x: 50, y: 40, fontSize: 48, delay: 12, animation: "spring-scale", color: "#f0c040", fontWeight: 900 },
      { text: "Valuation", x: 50, y: 50, fontSize: 16, delay: 18, animation: "fade", color: "#8888aa", fontWeight: 400 },
      { text: "Series H: $65B", x: 50, y: 62, fontSize: 22, delay: 22, animation: "fade", color: "#40f0a0", fontWeight: 600 },
      { text: "5 Years: $0 → $965 Billion", x: 50, y: 76, fontSize: 20, delay: 28, animation: "fade", color: "#ffffff", fontWeight: 600 },
    ],
    elements: [
      { type: "logo", src: logos.sec, x: 50, y: 32, width: 40, delay: 3, animation: "fade" },
    ],
  },
  s23: {
    sceneType: "chart-stat",
    background: { image: backgrounds.citySkyline, gradient: "linear-gradient(180deg, rgba(10,10,26,0.2) 0%, rgba(10,10,26,0.85) 100%)" },
    textOverlays: [
      { text: "ANTHROPIC TODAY", x: 50, y: 8, fontSize: 24, delay: 0, animation: "fade", color: "#f0c040", fontWeight: 700 },
      { text: "2,500+", x: 20, y: 35, fontSize: 42, delay: 5, animation: "spring-up", color: "#4080f0", fontWeight: 900 },
      { text: "Employees", x: 20, y: 47, fontSize: 14, delay: 8, animation: "fade", color: "#8888aa", fontWeight: 400 },
      { text: "+940% from 240 in 2023", x: 20, y: 55, fontSize: 12, delay: 11, animation: "fade", color: "#4080f0", fontWeight: 300 },
      { text: "$100B+", x: 50, y: 35, fontSize: 42, delay: 14, animation: "spring-up", color: "#f0c040", fontWeight: 900 },
      { text: "Total Funding", x: 50, y: 47, fontSize: 14, delay: 17, animation: "fade", color: "#8888aa", fontWeight: 400 },
      { text: "$47B", x: 80, y: 35, fontSize: 42, delay: 22, animation: "spring-up", color: "#40f0a0", fontWeight: 900 },
      { text: "Annual Revenue (ARR)", x: 80, y: 47, fontSize: 14, delay: 25, animation: "fade", color: "#8888aa", fontWeight: 400 },
    ],
  },
  s24: {
    sceneType: "philosophy-pillars",
    background: { image: backgrounds.greekTemple, gradient: "linear-gradient(180deg, rgba(10,10,26,0.2) 0%, rgba(10,10,26,0.8) 100%)" },
    textOverlays: [
      { text: "WHAT MAKES ANTHROPIC DIFFERENT", x: 50, y: 10, fontSize: 24, delay: 0, animation: "fade", color: "#f0c040", fontWeight: 700 },
    ],
    elements: [
      { type: "card", label: "PUBLIC BENEFIT", sublabel: "Legally required to serve public interest", x: 17, y: 50, width: 220, delay: 8, animation: "spring-up", color: "#4080f0" },
      { type: "card", label: "OPEN CONSTITUTION", sublabel: "Published model principles", x: 50, y: 50, width: 220, delay: 14, animation: "spring-up", color: "#f0c040" },
      { type: "card", label: "INTERPRETABILITY", sublabel: "Understanding how models think", x: 83, y: 50, width: 220, delay: 20, animation: "spring-up", color: "#40f0a0" },
    ],
  },
  s25: {
    sceneType: "power-web",
    background: { image: backgrounds.surveillance, gradient: "linear-gradient(180deg, rgba(10,10,26,0.2) 0%, rgba(10,10,26,0.85) 100%)" },
    textOverlays: [
      { text: "THE POWER QUESTION", x: 50, y: 8, fontSize: 28, delay: 0, animation: "fade", color: "#f0c040", fontWeight: 700 },
      { text: "Who holds them accountable?", x: 50, y: 80, fontSize: 22, delay: 25, animation: "fade", color: "#ffffff", fontWeight: 600 },
    ],
    elements: [
      { type: "logo", src: logos.anthropic, x: 50, y: 38, width: 60, delay: 5, animation: "spring-scale", color: "#f0c040" },
      { type: "logo", src: logos.amazon, x: 15, y: 55, width: 50, delay: 10, animation: "fade" },
      { type: "logo", src: logos.google, x: 35, y: 60, width: 50, delay: 13, animation: "fade" },
      { type: "logo", src: logos.microsoft, x: 65, y: 60, width: 50, delay: 16, animation: "fade" },
      { type: "logo", src: logos.nvidia, x: 85, y: 55, width: 50, delay: 19, animation: "fade" },
    ],
  },
  s26: {
    sceneType: "journey",
    background: { image: backgrounds.mountainSunrise, gradient: "linear-gradient(180deg, rgba(10,10,26,0.2) 0%, rgba(10,10,26,0.8) 100%)" },
    textOverlays: [
      { text: "9 People", x: 10, y: 50, fontSize: 24, delay: 0, animation: "fade", color: "#8888aa", fontWeight: 300 },
      { text: "$965 Billion", x: 90, y: 50, fontSize: 24, delay: 15, animation: "fade", color: "#f0c040", fontWeight: 900 },
      { text: "Safety × Scale", x: 50, y: 22, fontSize: 36, delay: 8, animation: "spring-scale", color: "#ffffff", fontWeight: 800 },
      { text: "Dario & Daniela's bet is winning", x: 50, y: 78, fontSize: 20, delay: 25, animation: "fade", color: "#40f0a0", fontWeight: 400 },
    ],
    elements: [
      { type: "logo", src: logos.anthropic, x: 50, y: 45, width: 50, delay: 18, animation: "spring-scale", color: "#f0c040" },
    ],
  },
  s27: {
    sceneType: "hero",
    background: { image: backgrounds.cosmos, gradient: "radial-gradient(ellipse at center, rgba(10,10,26,0.2) 0%, rgba(10,10,26,0.9) 100%)" },
    textOverlays: [
      { text: "ANTHROPIC", x: 50, y: 40, fontSize: 72, delay: 5, animation: "spring-scale", color: "#f0c040", fontWeight: 900 },
      { text: "The story is still being written", x: 50, y: 54, fontSize: 22, delay: 15, animation: "fade", color: "#ffffff", fontWeight: 300 },
      { text: "Fable 5 · IPO · The Race Against OpenAI", x: 50, y: 63, fontSize: 16, delay: 22, animation: "fade", color: "#8888aa", fontWeight: 400 },
      { text: "Subscribe for more stories", x: 50, y: 80, fontSize: 16, delay: 30, animation: "fade", color: "#f0c040", fontWeight: 400 },
    ],
  },
};

export function getSceneConfig(chunkId: string): SceneConfig {
  return sceneConfigs[chunkId] || sceneConfigs.s00;
}
