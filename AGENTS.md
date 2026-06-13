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

you can follow some of these instructions for design:

```markdown

### 1. VISUAL COMPOSITION & MIXED MEDIA LAYERING
Do not just put a full-screen stock video on screen. Build depth using layers within `<AbsoluteFill>`:
*   **The Background:** Use subtle, textured backgrounds (e.g., dark grid patterns, vintage paper textures, or heavily blurred stock video).
*   **The Subject (Foreground):** Use isolated elements like cut-out PNGs, document screenshots, or charts. 
*   **Depth & Lighting:** Apply heavy CSS drop shadows (`drop-shadow(0px 10px 20px rgba(0,0,0,0.5))`) to all foreground elements to create a 3D parallax effect against the background.

### 2. REQUIRED ANIMATIONS (NO STATIC FRAMES)
Absolutely nothing on screen should be perfectly still. Implement these specific Remotion animations:
*   **The Ken Burns Effect:** Every background image or foreground subject must have a continuous, micro-movement using Remotion's `interpolate()`. Apply a slow scale (e.g., `1` to `1.05` over the sequence duration) and a subtle pan (`translateX` or `translateY`).
*   **Spring-Based Entrances:** When new elements (photos, text, UI cards) enter the screen, do not just fade them in. Use Remotion's `spring()` function for smooth, organic pop-ins, slides, or flips.
*   **The "Document Highlighter" Effect:** When referencing facts or quotes, display the text like a newspaper or document. Animate a yellow or neon-green `<div>` behind the text scaling from `scaleX(0)` to `scaleX(1)` with a `transformOrigin: 'left'` to simulate a highlighter pen reading along with the audio.

### 3. TYPOGRAPHY & DATA VISUALIZATION
*   **Selective Emphasis:** Do not use word-by-word vlog subtitles. Instead, flash massive, bold text overlays for crucial numbers, percentages, company names, or dates exactly when the TTS mentions them.
*   **Dynamic Charts:** If the audio mentions growth or decline, build simple animated charts. Use `div` elements representing bar charts that grow vertically using `spring()`, synced to the audio's climax.
*   **Styling:** Use clean, premium sans-serif fonts (e.g., Inter, Helvetica, Roboto Black). Ensure high contrast (e.g., stark white or yellow text on dark, vignetted backgrounds).

### 4. REMOTION CODE ARCHITECTURE
Write clean, highly modular React code tailored for rendering:
*   **Component Modularity:** Create reusable components for your visual effects (e.g., `<KenBurnsImage>`, `<HighlighterText>`, `<SpringEntryCard>`). Do not put all the code in one massive file.
*   **Audio-Driven Timing:** Use the `<Audio />` component to load the TTS track. Calculate sequence `from` and `durationInFrames` precisely. Visual cuts and pop-ins must happen exactly on the beat of the spoken words.
*   **Seamless Transitions:** Default to hard cuts between different visual scenes to maintain high energy. Use `opacity` crossfades or slide transitions only when shifting to a completely new chapter or topic.
*   **Composition Settings:** Set the resolution to `1920x1080` (16:9). Set the framerate strictly to `30 fps`.

Output the complete, bug-free Remotion React code using these exact animation principles, ensuring all royalty-free assets are properly imported and animated. 
```
if you want also i wnt the video to be very intuitive and moving. 
Like the video has visuals of whats going on in the audio.

Like a visual representation of what the audio is talking abourt. 

download the generated tts files and measure them and make the video accoringly in sync.

You can use visual diagrams, clean and formatted real charts, siple visual graphics and more of the creativity to show whats being spoken about and help viewers understand the topic/narrative/theory or anything thats being discussed.

use all the assets like royalty free stock images videos. 
logos of companies, brand, or product you can take them form the internet no need to hold back.

make sure that the video doesnt look like a simple slideshow and is actually engaging and fun to watch.


when you are done with the code.
recheck make sure you did everything correctly.
everything is under fair use and stuff.
also check if spacing and stuff is perfectnothing overlaps and everythings looks good.

after you are sure all is done, simply push and then write a workflow to render the video at 4x concurrency.