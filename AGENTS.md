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

## BIG WARNING — REMOTION'S FREEZE IS BROKEN

Remotion's Freeze feature does NOT work properly. When you use it, the background appears but everything else (text, logos, animations) stays invisible because they think its still frame zero. NEVER use Freeze. Instead, we pass a fixed frame number directly to each scene so all elements render correctly for thumbnails or stills.

## HOW TO CHECK IF THE VIDEO LOOKS GOOD (since you cant render locally)

The local machine is too weak to render the full video. So heres how you check your work:

1. Create a temporary checker tool that renders each scene one by one as a still image at frame 60. Frame 60 is used because by then all animations have finished settling.
2. Run this command to generate all scene images: `npx remotion render src/Root.tsx SceneCapture out/capture --sequence`
3. Rename the output files from element-01.jpeg to s01.jpeg etc so they are easy to identify
4. Open each image in your browser and look closely at:
   - Are things overlapping?
   - Are fonts big enough?
   - Are the logo sizes right?
   - Colors clashing?
   - Anything not sitting right?
5. If something is off, fix the scene config file and re-render
6. Once everything looks good, DELETE the temporary checker files before pushing

## WHAT EACH SCENE NEEDS TO HAVE

Every single scene must have these visual treatments applied:

- **Ken Burns effect** on the background — it slowly zooms in and shifts during the scene so its never a static picture
- **Dark vignette** overlay — darkens the edges to focus attention on the center
- **Background blur** — a soft 3px blur on background images so foreground text pops
- **Drop shadows** on everything in front — text, logos, cards all get a shadow so they look 3D and separate from the background
- **White background under logos** — logos that dont have white in them get a small white rounded box behind them so theyre readable
- **Hard cuts between scenes** — no fancy transitions, just cut straight to the next scene. Only use crossfades when moving between big chapters.

## LAYOUT RULES

- Positions are percentages from 0 to 100. The center of the screen is 50 on both X and Y
- If you place multiple items in a group, make sure the group is centered. For example three cards at 24, 50, 76 are perfectly centered because (24+76)/2 = 50
- Big logos need more space from text above them so they dont overlap
- Font sizes and logo sizes are all multiplied by a global scale factor. If everything feels too small or too big, change the scale factor once and everything adjusts. Only tweak individual sizes for special cases.

## COLORS TO USE

- Main text: pure white
- Highlights and emphasis: gold (#f0c040)
- Good news or success: green (#40f0a0)
- Information or links: blue (#4080f0)
- Warnings or bad news: red (#f04040)
- Secondary or subtle text: muted purple (#8888aa)
- Background base: very dark navy (#0a0a1a)

## THINGS TO NEVER DO

- Never use Freeze — it is broken and will make your elements invisible
- Never try to render the full video on this machine — it will crash. Use the scene image trick above instead
- Never commit the temporary checker files or their output folder
- Never do word-by-word subtitles. Instead flash big bold text for key phrases
- Never put all your code in one file. Keep scenes, config, and logic separate
- Never use emojis in the video unless specifically asked to

## HOW TO GET THE FINAL VIDEO

Two things run on GitHub Actions:

**First — Generate TTS Audio:**
- Pushes to main with script changes trigger this automatically, or you can run it manually
- It splits your script into 4 groups and generates speech audio in parallel
- It measures the actual length of each audio clip and creates a timing file
- The audio files and timing file are saved as temporary downloads

**Second — Render the Video:**
- This runs automatically after TTS finishes, or you can run it manually
- It grabs the audio files from the TTS step, puts them in the right place
- It installs a browser, runs the renderer with 4x speed
- Outputs the final mp4 and saves it as a downloadable file (stays for 90 days)

**When testing, do it in this order:**
1. Make your changes and push to main
2. Go to GitHub Actions and manually run "Generate TTS Audio"
3. After that finishes, manually run "Render Video"
4. Download the mp4 from the Render Video run

## CHECKLIST BEFORE PUSHING

- [ ] Delete the temporary scene checker tool files
- [ ] Delete the output folder with all the still images
- [ ] Remove any dead code from old experiments
- [ ] Run a quick build check to make sure nothing is broken
- [ ] Look at every scene image one last time
- [ ] Make sure nothing overlaps anywhere
- [ ] Commit the workflow files too
