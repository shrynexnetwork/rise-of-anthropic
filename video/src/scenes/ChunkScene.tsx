import React from "react";
import { ScriptChunk, TimingEntry } from "../types";
import { SceneRenderer } from "./SceneRenderer";
import { getSceneConfig } from "./visualConfig";

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
  const config = getSceneConfig(chunk.id);

  return (
    <SceneRenderer
      timing={timing}
      audioSrc={audioSrc}
      config={config}
    />
  );
};
