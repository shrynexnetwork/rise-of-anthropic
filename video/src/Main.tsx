import React from "react";
import { Composition, continueRender, delayRender } from "remotion";
import { FPS, WIDTH, HEIGHT } from "./config";
import { scriptChunks } from "./script";
import { MainVideo } from "./MainVideo";

export const Main: React.FC = () => {
  const totalFrames = scriptChunks.reduce(
    (acc, chunk) => acc + Math.round(chunk.approxDurationSec * FPS),
    0
  );

  return (
    <Composition
      id="Main"
      component={MainVideo}
      durationInFrames={totalFrames}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{}}
    />
  );
};
