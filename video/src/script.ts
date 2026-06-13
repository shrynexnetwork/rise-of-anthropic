import { ScriptChunk } from "./types";
import rawScript from "../../script.json";

export const scriptChunks: ScriptChunk[] = rawScript as ScriptChunk[];

export function getChunkDurationFrames(chunk: ScriptChunk): number {
  return Math.round(chunk.approxDurationSec * 30);
}
