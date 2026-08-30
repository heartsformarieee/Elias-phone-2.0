# Elias OS 5 — One Elias

## Product rule
There is one Elias identity. Messages, voice messages, audio calls, video calls and the phone shell share one AI conversation, mood, affection state and history.

## Merge phases

### Phase 1 — foundation (started)
- Move the existing OpenAI chat endpoint into Elias-phone.
- Add `elias-ai.js` as the shared client state/API bridge.
- Preserve the existing Elias OS UI and feature scripts while the merge is built.
- Migrate legacy `eliasMood`, `eliasAffection` and `eliasConversation` data into the shared state.

### Phase 2 — Messages
- Replace canned Elias replies with `EliasAI.ask()`.
- Keep one persistent conversation across communication modes.
- Add voice-message recording/transcription and Elias voice replies.

### Phase 3 — Calls
- Connect existing incoming/outgoing call UI to the AI.
- Add microphone speech input and Elias speech output.
- Persist incoming/outgoing/missed call history and duration.
- Add video-call mode using Elias mood sprites/images as the camera feed.

### Phase 4 — living OS
- Apply Elias mood globally to wallpaper/phone atmosphere.
- Allow AI structured output to request natural call/voice behavior.
- Keep time and affection context shared across the OS.

### Phase 5 — apps
- Integrate the shared AppStore and installed-app state.
- Internal ecosystem apps launch inside Elias OS where compatible.
- Custom external icons (YouTube, Netflix, Spotify, etc.) use normal links to open the real service rather than iframe embedding.

## Current AI contract
`POST /api/chat` accepts message, history, affection, hour and mode (`text`, `voice-message`, `audio-call`, `video-call`). It returns `reply`, `reaction`, `mood`, `responseType`, and `wantsToCall`.

## Safety / migration rule
Build on `elias-merge-2-0`; do not replace `main` until the merged app is tested.