import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { scriptChunks, getChunkDurationFrames } from "./script";
import { ChunkScene } from "./scenes/ChunkScene";
import { TimingEntry } from "./types";
import { audioFiles } from "./audioAssets";

interface MainVideoProps {
  timingOverrides?: Record<string, TimingEntry>;
}

export const MainVideo: React.FC<MainVideoProps> = ({ timingOverrides }) => {
  let currentFrame = 0;

  const sequences = scriptChunks.map((chunk) => {
    const timing = timingOverrides?.[chunk.id];
    const durationInFrames = timing
      ? timing.durationInFrames
      : getChunkDurationFrames(chunk);

    const from = currentFrame;
    currentFrame += durationInFrames;

    return (
      <Sequence key={chunk.id} from={from} durationInFrames={durationInFrames}>
        <ChunkScene
          chunk={chunk}
          timing={{ chunkId: chunk.id, durationInFrames, audioFile: timing?.audioFile || "" }}
          audioSrc={audioFiles[chunk.id]}
        />
      </Sequence>
    );
  });

  return <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>{sequences}</AbsoluteFill>;
};
