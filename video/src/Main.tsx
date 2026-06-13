import React from "react";
import { Composition, continueRender, delayRender } from "remotion";
import { FPS, WIDTH, HEIGHT } from "./config";
import { scriptChunks, getChunkDurationFrames } from "./script";
import { MainVideo } from "./MainVideo";
import { TimingEntry } from "./types";

export const Main: React.FC = () => {
  const [handle] = React.useState(() => delayRender("load-timings"));
  const [timingOverrides, setTimingOverrides] = React.useState<
    Record<string, TimingEntry> | undefined
  >(undefined);
  const [timingsLoaded, setTimingsLoaded] = React.useState(false);

  React.useEffect(() => {
    fetch("/timings.json")
      .then((r) => {
        if (!r.ok) throw new Error("No timings file");
        return r.json();
      })
      .then((data: Record<string, TimingEntry>) => {
        setTimingOverrides(data);
      })
      .catch(() => {
        // use estimates
      })
      .finally(() => {
        setTimingsLoaded(true);
        continueRender(handle);
      });
  }, [handle]);

  const totalFrames = timingsLoaded
    ? scriptChunks.reduce((acc, chunk) => {
        const override = timingOverrides?.[chunk.id];
        return acc + (override ? override.durationInFrames : getChunkDurationFrames(chunk));
      }, 0)
    : scriptChunks.reduce((acc, chunk) => acc + getChunkDurationFrames(chunk), 0);

  return (
    <Composition
      id="Main"
      component={MainVideo}
      durationInFrames={totalFrames}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{ timingOverrides }}
    />
  );
};
