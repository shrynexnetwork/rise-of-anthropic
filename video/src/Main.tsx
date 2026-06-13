import React from "react";
import { Composition } from "remotion";
import { FPS, WIDTH, HEIGHT } from "./config";
import { scriptChunks, getChunkDurationFrames } from "./script";
import { MainVideo } from "./MainVideo";
import { TimingEntry } from "./types";
import rawTimings from "../../timings.json";

const timingOverrides = rawTimings as Record<string, TimingEntry> | undefined;

export const Main: React.FC = () => {
  const totalFrames = timingOverrides
    ? scriptChunks.reduce((acc, chunk) => {
        const override = timingOverrides[chunk.id];
        return acc + (override ? override.durationInFrames : getChunkDurationFrames(chunk));
      }, 0)
    : scriptChunks.reduce((acc, chunk) => acc + getChunkDurationFrames(chunk), 0);

  return (
    <>
      <Composition
        id="Main"
        component={MainVideo}
        durationInFrames={totalFrames}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{ timingOverrides }}
      />

    </>
  );
};
