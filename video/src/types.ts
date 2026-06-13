export interface ScriptChunk {
  id: string;
  text: string;
  visual: string;
  approxDurationSec: number;
}

export interface TimingEntry {
  chunkId: string;
  durationInFrames: number;
  audioFile: string;
}

export interface SceneProps {
  chunk: ScriptChunk;
  timing: TimingEntry;
  frame: number;
}
