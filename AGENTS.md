## The goal

your task is to create a intuitive , engaging, interesting and eye grabbing youtube videos.
The videos shouldnt feel like static, there should always be something going on on the screen.
our main goal is to create long form content of 7-8 minutes.
our goal is to make sure video is 100% accurate. Engaging. eyegrabbing. understandable. easy, simple and complete language. and simple explaination.

## reasearch

when you get the title of the video, think about it. What the video is about. Then start searching about it.
Search for all the info you can get, search atleast 20-25 sources and make sure info is accurate.
search everything about the topicc, think of what can be subtopics for the video think of how the video should move from the intro to the outro.
properly research about the whole content you are planning to put in the video.
then think of every single asset you will be needing in the video like Character images, real life persons images, logos of companies, brands , or any entity. Do not hold back on assets use as much as needed and as much as what would feel human to the audience. 
when adding assets to the video make sure you properly know there measurements of the assets you are using to make sure  that the gap between elements is perfect and nothing overlaps.

## environment

this machine is just a normal 10year old 4gb machine, generating tts and rendering videos is not even thinkable.
you have the gh cli access. use it to create the video's repository on shrynexnetwork github account. Keep the repo open source.
The making of tts audio files and the rendering of the video will happen on the github actions.

## Scripting, audio generation and Planning the sync

as youve gathered all the info on the topic and all the assets and stuff needed this is the time to create the script of the video.
the script of the video should be as human , simple and complete as possible. when explaining a concept use examples, everything should feel like a human. 
Make sure you use full of your story telling abilities, psychological techniques, humour and more while creating the script.
when creating the script make sure to use spellings and language for everything. for example, when you want to say '200' write "two hundred", when you wanna write '2.5' write 2 point. Use language for numbers and stuff.
in a video, audio-video sync and timing is the most important think. since you do not have AV abilities and if you have its not as efficient we will use something like chunking, making the audio using chunks of audio divided as small sentences audio.
but wait, how will you generate the audio well here is the thing, in the github repo of the video youll create a workflow for audiogeneration and use github.com/marketplace/actions/shrynetts for generating tts and getting the audio files.  
while generating the audio you will generate lots of audio clips, the full script will be divided into small sentences of audio. 
Now why are we even doing this lets discuss about this in the next section:

imp note: when you are done scripting run an agent to verify everything in the script is accurate.
## Video Generation

why do the audio chunking, well here is the thing. In a good video the video should be in sync with the audio, by chunking the sript into small sentences that during the duration of the chunk of the audiofile we are talking and visualising about that chunk only.

## CRITICAL — REMOTION v4 FREEZE BUG

`<Freeze>` does NOT work in Remotion v4. It captures the frame at the top level but child components calling `useCurrentFrame()` still see the real clock frame, not the frozen one. This means elements will be invisible (stuck at opacity 0, pre-animation). NEVER use `Freeze`. Instead, add a `forcedFrame?: number` prop to SceneRenderer and pass it down directly:

```tsx
const currentFrame = useCurrentFrame();
const frame = forcedFrame ?? currentFrame;
```

This approach guarantees all children render at the same frozen frame for still/snapshot rendering.

## VISUAL DEBUGGING WITH SCENE STILLS

Since the local machine cannot render full videos, use SceneCapture — a dedicated composition that maps each scene chunk to a frame index and renders it at `forcedFrame={60}`:

1. Create `SceneCapture.tsx` that iterates `scriptChunks` and renders each with `<SceneRenderer forcedFrame={60} />`
2. Register it in `Main.tsx` with `durationInFrames={scriptChunks.length}`
3. Run: `npx remotion render src/Root.tsx SceneCapture out/capture --sequence`
4. Rename output files: `for f in element-*.jpeg; do num=$(echo "$f" | sed 's/element-0*//' | sed 's/\.jpeg//'); printf -v padded "%02d" "$num"; mv "$f" "s${padded}.jpeg"; done`

Frame 60 is used because all spring animations settle by ~32 frames. This captures the fully settled, post-animation state of every element.

## STILL VERIFICATION PROTOCOL

After making visual changes, always re-render stills and inspect them:

1. Re-render: `npx remotion render src/Root.tsx SceneCapture out/capture --sequence` (replaces previous)
2. Rename as above
3. Open in browser: `xdg-open out/capture/sNN.jpeg`
4. Check: spacing, overlap, font sizes, logo proportions, color contrast, animation entrance states
5. If anything is off, fix `visualConfig.ts` or `SceneRenderer.tsx` and repeat

## SCENE CAPTURE IS TEMPORARY — DELETE BEFORE FINAL PUSH

After visual inspection is complete:
- Delete `SceneCapture.tsx`
- Delete `SceneGrid.tsx` (if exists — broken Freeze approach)
- Remove their imports and `<Composition>` registrations from `Main.tsx`
- Remove the `--sequence` output directory (`out/capture/`)
- Revert `audioAssets.ts` and `MainVideo.tsx` changes if they were only needed for capture

## CODE ARCHITECTURE

### File Structure
- `video/src/scenes/SceneRenderer.tsx` — Main rendering engine. Holds SCALE constant, all animation components, Ken Burns background, rendering logic.
- `video/src/scenes/visualConfig.ts` — Per-scene configuration. Every scene's text overlays, elements, backgrounds, animation types. Single source of truth for what appears in each scene.
- `video/src/scenes/ChunkScene.tsx` — Thin wrapper connecting a script chunk to its SceneRenderer.
- `video/src/MainVideo.tsx` — Orchestrates all chunks as Remotion Sequences. Loads timing overrides and audio assets.
- `video/src/Main.tsx` — Composition registration. Must list every composition used.
- `video/src/audioAssets.ts` — Static imports of WAV files from `video/public/`. These are resolved at bundle time, not runtime.

### The SCALE Constant
`SceneRenderer.tsx` defines a `SCALE = 1.8` that multiplies every font size, logo width, card padding, and spacing. This keeps proportions consistent while making elements large enough for YouTube. If everything is too small or too large, change SCALE — do not tweak individual values.

For scenes that need special treatment, override values in `visualConfig.ts` directly (e.g., a logo that needs to be extra large gets `width: 120` despite the general scale).

### visualConfig.ts Conventions
- `x` and `y` are percentage positions (0–100). Center is x=50.
- Text `fontSize` is the base value — it gets multiplied by SCALE at render time.
- `delay` is in frames at 30fps. Elements with delay=0 appear immediately; staggered delays (5, 10, 15…) create the animated reveal.
- `animation` types: `"fade"` (opacity), `"spring-up"` (slide up + spring), `"spring-scale"` (grow + spring), `"elastic-pop"` (strong overshoot).
- Scene `sceneType` controls special components: `"chart-revenue"`, `"process-diagram"`, `"power-web"`, `"split-tension"`, `"journey"`, `"shutdown"`.
- Logo elements get automatic white background pill if no `color` is set (handled in SceneRenderer).

### Spacing and Centering Rules
- Groups of elements must be centered around 50%. For 3 cards at positions 24, 50, 76: center = (24+76)/2 = 50 ✓.
- For 2 items at 68 and 86: center = (68+86)/2 = 77 — skewed right by design (left side has other content).
- Logos with large widths need more vertical separation from adjacent text to prevent overlap.

### Required Visual Effects (Applied in SceneRenderer)
- **Ken Burns** — Slow background scale (1 → 1.08) + translateY over scene duration via `interpolate()`.
- **Vignette** — Dark radial gradient overlay on entire scene for depth.
- **Background blur** — `blur(3px) brightness(0.65) saturate(1.15)` on background images to soften them (not on gradient overlays).
- **Drop shadows** — All foreground elements get `drop-shadow(0px 10px 20px rgba(0,0,0,0.5))` for 3D separation.
- **White logo background** — Logos without inherent white fill get a small white pill (`borderRadius: 12px`, `background: white`) behind them for readability.
- **Hard cuts** — Between scenes (no crossfade). Crossfades only between major chapters.

## Color Palette
- Primary text: `#ffffff`
- Accent (gold): `#f0c040`
- Accent (green/success): `#40f0a0`
- Accent (blue/info): `#4080f0`
- Error/alert: `#f04040`
- Subtle text: `#8888aa`
- Background base: `#0a0a1a`

## THINGS TO AVOID
- Do NOT use `<Freeze>` — it's broken in Remotion v4. Use `forcedFrame` prop.
- Do NOT render full video locally — always use SceneCapture + stills, then push to GitHub Actions for final render.
- Do NOT commit temporary SceneCapture files or output directories.
- Do NOT add word-by-word subtitles — use selective massive text overlays for key phrases only.
- Do NOT put all code in one file — split into reusable components.
- Do NOT use emojis in the video (unless explicitly requested).

## CI/CD — GitHub Actions Workflows

Two workflows in `.github/workflows/`:

### 1. `tts-generate.yml` — Generate TTS Audio
- Triggered on push to main (if `script.json` changes) or manually.
- Splits script chunks into 4 groups for parallel TTS generation via `shrynetts` action.
- Merges audio, measures actual durations with ffprobe, builds `timings.json`.
- Uploads artifacts: `tts-audio` (WAV files) and `timing-config` (timings.json).

### 2. `render-video.yml` — Render Final Video
- Triggered manually or automatically after `tts-generate.yml` completes (`workflow_run`).
- Downloads `tts-audio` and `timing-config` artifacts from the TTS run.
- Places WAV files in `video/public/` (where `audioAssets.ts` imports them at bundle time).
- Installs Chrome, runs `npx remotion render src/Root.tsx Main out/anthropic-story.mp4 --concurrency=4`.
- Uploads final MP4 as artifact (90 day retention).

When testing, use `workflow_dispatch` on both workflows in sequence: first generate TTS, then render.

## Push Protocol
1. Commit visual changes + cleanup (delete capture files)
2. Push to main
3. Go to GitHub Actions, manually run "Generate TTS Audio" workflow
4. After it completes, manually run "Render Video" workflow (or wait for automatic `workflow_run` trigger)
5. Download the rendered MP4 from the Render Video workflow artifacts

## Final Checklist Before Push
- [ ] Deleted temporary capture files (SceneCapture.tsx, SceneGrid.tsx)
- [ ] Removed temporary compositions from Main.tsx
- [ ] Removed dead components (CrownGlow, unused scene types)
- [ ] Removed unused types from visualConfig.ts
- [ ] TypeScript compiles (`npx tsc --noEmit` — pre-existing errors like timings.json schema mismatch are OK)
- [ ] Remotion still builds (`npx remotion still src/Root.tsx Main out/verify.png`)
- [ ] All scene stills have been visually inspected
- [ ] No overlapping elements in any scene
- [ ] Workflows committed and pushed
