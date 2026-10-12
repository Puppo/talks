# Your Next User Is an AI Agent — speaker materials

Status: **Awaiting companion-app integration; not rehearsal-ready.**

English · developer audience · 30 minutes, excluding Q&A · 11.5 minutes of planned live interaction.
The main sequence is slides 1–20. Slides 21–22 are the thanks/contact tail, included in slide 20's closing time. Appendix: 23–35; closing cover: 36.

The same per-slide notes are embedded in Freya's supported `notes` field (confirmed in the installed 0.74.2 package). This Markdown file also holds the runbook and integration checklist. Keep the two copies of per-slide notes synchronized when editing.

## Timing and cuts

| Slides | Focus | Target |
| --- | --- | --- |
| 1–5 | People, request, interaction modes | 2:40 |
| 6–7 | Browser run and interface | 3:50 |
| 8–10 | Loop and embedded run | 5:30 |
| 11–15 | Visiting agent and WebMCP | 7:50 |
| 16–17 | Approval and recovery | 4:30 |
| 18–19 | Verification and feedback | 4:00 |
| 20–22 | Takeaways and thanks | 1:40 |
| Total | Q&A is separate | 30:00 |

For a 25-minute version, omit slide 13 (0:50), shorten Demo B by 1:30 and Demo C by 1:30, shorten slide 19 by 0:40, and trim the opening by 0:30. Preserve rejection, approval, and final-state verification. Appendix slides are always optional.

## Event and environment record

- Target event: DevFest Venezia 2026. No event branding asset supplied; use the existing theme.
- Dataset edition: **pending review**. Use a reviewed 2026 snapshot when available, otherwise a conspicuously labelled 2025 rehearsal snapshot.
- Snapshot date, dataset revision, time zone, reviewed session IDs: **pending integration**.
- Companion repository, app commit, local URL, reset command: **pending integration**.
- Browser version/channel, visiting client and version, model identifier/settings, WebMCP flag or origin-trial configuration: **pending rehearsal**.
- Source documentation checked: 2026-10-12. This date is not a demo-validation date.
- Do not put provider credentials into slides, screenshots, traces, or frontend code.

## Recurring prompt

> Help me plan my day at this conference. I'm interested in web development and AI. Avoid overlapping sessions, preserve the sessions I've already selected, and explain the trade-offs.

## Demonstration runbook

All four demonstrations are **pending integration**. No recording or captured replay is available yet. Until integrated, stay on the slide and describe intended behaviour as an acceptance criterion. Never label a walkthrough as a live run.

### Shared preparation and reset

1. Start the companion app from a pinned source revision with a reviewed local dataset. Do not depend on the official event site during the demo.
2. Record browser, client, model, application and dataset revisions above. Verify discovered tools and their actual API shape in that environment.
3. Choose and record two non-overlapping starting sessions and a real candidate that conflicts with one of them. Keep the initial agenda identical across modes.
4. Implement and document the app's exact reset command/control before rehearsal. Reset agenda, proposals, filters, conversation, and activity log; reload and read back the starting agenda. Do not guess session IDs here.
5. Open the application and deck in adjacent tabs. Keep the dataset edition visible. Use an isolated demo profile and hide unrelated accounts/tabs.
6. Set a stage cutoff of **20 seconds without observable progress**, or the demo's time allowance, whichever arrives first. Use the stop control, read current state, then switch to the verified fallback. Do not retry repeatedly on stage.
7. Record each successful rehearsal. Label playback “Recorded rehearsal — [date], [dataset edition], [app revision]”; label captured traces “Captured replay”. If none exists, explain that the result is pending and return to the specified slide.

### Demo A — browser interaction (slide 6; 150 seconds live)

- Setup: browser agent capable of visible UI interaction; app reset to the shared starting state.
- Prompt: recurring prompt verbatim.
- Expected observable outcome: filtering and session inspection, with existing choices visible; stop before committing a replacement.
- Narration: identify the labels, navigation, language, time and overlap information required for each action. Describe calls and visible state, never private reasoning.
- Stop/fallback: shared 20-second cutoff; browser-run recording and annotated programme still pending.
- Return: slide 7. Capture the visible outcome for the PDF.

### Demo B — embedded loop (slide 10; 180 seconds live)

- Setup: embedded agent with its model connection configured privately; reset again; show activity panel and agenda together.
- Prompt: recurring prompt verbatim.
- Expected observable outcome: call/result entries and a visible proposal synchronized with application state; saved agenda still unchanged pending approval.
- Narration: point to the loop's next decision and the corresponding UI update. Distinguish a proposal from a committed change.
- Stop/fallback: shared cutoff; embedded-run recording, loop excerpt and activity screenshot pending.
- Return: slide 11.

### Demo C — visiting agent (slide 15; 210 seconds live)

- Setup: rehearsed WebMCP-capable client, correct feature settings, and the same initial agenda. Confirm tools are discoverable before going on stage.
- Prompt: recurring prompt verbatim.
- Expected observable outcome: structured tool calls with real arguments/results and an inspectable proposed agenda. Do not infer universal client support from this run.
- Narration: compare the information crossing the tool boundary with the earlier UI interaction; make no unmeasured performance comparison.
- Stop/fallback: shared cutoff; visiting-run recording and trace pending.
- Return: slide 16, preserving the pending proposal if successful. If Demo C failed, restore a separately captured/rehearsed proposal state and label it explicitly.

### Demo D — control and verification (slide 16; 150 seconds live)

- Setup: proposal from Demo C or the explicitly labelled rehearsal starting state. Saved agenda matches the initial snapshot.
- Prompt sequence: “Explain what would change and what would stay.” Reject through the human control. Then: “Revise the proposal while preserving my selected sessions.” Inspect the new diff and approve through the human control.
- Expected observable outcome: rejection leaves the saved agenda unchanged; revision is visible; approval commits only that proposal. Reload and compare persisted state with the approved diff.
- Narration: the application enforces approval. A model statement, annotation or direct tool call cannot supply the person's decision.
- Stop/fallback: shared cutoff; rejection/approval/persistence recording pending. If there is no successful evidence, do not say the agenda was saved.
- Return: slide 17; revisit the persisted-state capture on slide 18.

## Integration checklist

All entries below are pending. Store committed images as WebP and reference them through `@talk/`. Original source captures belong in `assets/__originals/`; keep recordings outside the image-only asset directory and record their real location here.

| Slide(s) | Required integration | Acceptance |
| --- | --- | --- |
| 4, 6, 7 | Programme + annotated interface captures | Edition visible; real sessions and labels |
| 9 | 8–15-line TypeScript loop excerpt | App path/commit; bounded execution and paired results |
| 10 | Activity panel and proposal capture | UI and tool results agree |
| 13 | Actual declarative form | Verified browser behaviour; replace illustrative route |
| 14, 24 | Tool registration + full schema | Actual app contract, handler, result, source commit |
| 15 | Visiting-agent trace and capture | Client/browser versions; observable calls/results |
| 16, 29 | Proposal, rejection and approval captures | Exact diff; no write on rejection; stale-state protection |
| 17 | Conflict or unavailable-information capture | Scenario justified by the reviewed dataset |
| 18, 30 | Persisted agenda + evaluation output | Expected assertions separated from measured results |
| 19 | Local capability report + repeated evaluation | Minimal context; no sensitive conversation data |
| 25 | Rehearsed environment | Exact browser/client/model/build and feature setup |
| 28 | Dataset provenance | Reviewed edition, snapshot date, source URLs |
| 31 | Demo recordings / captured replays | Explicit labels and verified fallback locations |
| 35 | Companion source/demo URL | Real, reachable links only |

Once captures are available, place readable outcome screenshots on their main slides or add clearly numbered evidence appendix slides; update notes and slide references. Keep useful captions so the exported PDF stands alone.

## Per-slide notes

## 1. Your Next User Is an AI Agent

Takeaway: A new kind of user still serves a person.

Time: 20 seconds.

Open with the title. This DevFest talk follows one journey: planning a conference day. This edition is awaiting companion-app integration. The default publication QR codes are hidden until a public deck exists.

Transition: Introduce yourself.

## 2. Hello, I’m Luca

Takeaway: The examples come from a web developer’s perspective.

Time: 20 seconds.

Use the shared biography. Keep the introduction brief; the audience needs basic TypeScript, not agent-framework experience.

Transition: Acknowledge Nearform.

## 3. Nearform

Takeaway: Building usable software remains the job.

Time: 20 seconds.

Use the existing company slide without extending the introduction.

Transition: Start with a task everyone in the room recognizes.

## 4. A familiar request

Takeaway: Start with a user journey, not a model.

Time: 45 seconds.

Read the complete recurring prompt: “Help me plan my day at this conference. I'm interested in web development and AI. Avoid overlapping sessions, preserve the sessions I've already selected, and explain the trade-offs.” Introduce the DevFest Venezia companion. The programme capture is pending; no session names or edition-specific facts are asserted here.

Transition: Who can carry out that request?

## 5. One application, different ways to act

Takeaway: Agent location and interaction method are separate choices.

Time: 55 seconds.

These modes can coexist. An embedded agent can use WebMCP too; browser UI interaction is not an obsolete first step. Our route: interface → loop → tools → control → evidence. Colours and explicit labels identify the person, agent, and application throughout.

Transition: First, try the interface we already have.

Sources (checked 2026-10-12):
- https://www.kulikowski.me/blog/the-spectrum-of-agentic-interactions
- https://www.kulikowski.me/blog/bring-your-own-agent

## 6. The agent starts with the interface

Takeaway: An agent must interpret the interface before acting.

Time: 180 seconds.

Demo A: 30-second setup plus 150-second browser run. Use the recurring prompt and the reviewed starting agenda. Point out the information the agent needs: time, language, track, and existing selections. Stop before applying a replacement. If no real capture is integrated, explain the intended checks rather than pretending to run the application.

Transition: Return to slide 7: what did it need to understand?

## 7. What did the agent need to understand?

Takeaway: Clear interfaces help people and make actions interpretable.

Time: 50 seconds.

Reserve the real screenshot for these three annotations. Accessibility is a human requirement, not an agent feature, and does not guarantee an agent will succeed. Show observable actions rather than hidden model reasoning.

Transition: The browser actions came from a repeated decision process.

Sources (checked 2026-10-12):
- https://www.kulikowski.me/blog/accessibility-the-agentic-webs-most-overlooked-gain

## 8. Inside the agent loop

Takeaway: The result becomes input to the next decision.

Time: 60 seconds.

The application dispatches tool calls and retains their results with call identifiers. A final answer ends the run. A bounded budget and cancellation stop it safely. The location of this loop does not determine whether model inference runs locally or remotely.

Transition: Connect each step to the actual TypeScript implementation.

Sources (checked 2026-10-12):
- https://bandarra.me/posts/bringing-the-agent-loop-to-the-web

## 9. The loop in TypeScript

Takeaway: A short loop connects model decisions to application actions.

Time: 60 seconds.

This is an excerpt slot, not a claimed implementation. Replace these steps with 8–15 lines from the actual app and record the source commit. Preserve call/result pairing and terminal conditions. Do not paste an invented SDK interface or an unbounded while(true) loop. The optional appendix explains limits.

Transition: Watch those handlers update the same application.

Sources (checked 2026-10-12):
- https://bandarra.me/posts/bringing-the-agent-loop-to-the-web

## 10. Actions change the application

Takeaway: Tools and the UI must agree about application state.

Time: 210 seconds.

Demo B: 30-second setup plus 180-second embedded run. Keep the agenda and activity panel visible. Compare the selected-session state with tool results. A proposal may be visible without replacing the saved agenda. The pending screenshot must show that distinction.

Transition: Return to slide 11: what if the assistant belongs to the user?

## 11. What if the user brings their own agent?

Takeaway: A site-specific chatbot is not the only integration.

Time: 40 seconds.

The visiting assistant can have the user’s broader context. The site should expose useful, bounded actions and return evidence; it does not need to own that assistant. Do not imply every visiting client supports the same APIs.

Transition: Make the application’s actions explicit.

Sources (checked 2026-10-12):
- https://www.kulikowski.me/blog/bring-your-own-agent

## 12. Make capabilities explicit

Takeaway: Expose useful intentions backed by existing application rules.

Time: 70 seconds.

This is the proposed capability map, not a registered tool listing. Both UI handlers and tools should use the same business logic. A description and schema help interpretation; runtime validation and authorization still belong to the application. Actual names and schemas are pending.

Transition: A form can be an entry point.

Sources (checked 2026-10-12):
- https://developer.chrome.com/docs/ai/webmcp/build-tools
- https://developer.chrome.com/docs/ai/webmcp/imperative-api

## 13. Start with a form

Takeaway: Form annotations can describe an existing interaction.

Time: 50 seconds.

This original illustrative example uses the documented form attributes; /sessions is illustrative, not an implemented route. Without toolautosubmit, the documented flow leaves submission to the person. Replace this with the app’s actual form and confirm browser/client behaviour before rehearsal. Search submission is separate from approval to replace an agenda.

Transition: For application actions, use an imperative handler.

Sources (checked 2026-10-12):
- https://developer.chrome.com/docs/ai/webmcp/declarative-api

## 14. Expose an application action

Takeaway: A tool is an application boundary, not permission to skip rules.

Time: 70 seconds.

Reserve this slot for the app’s actual registration, schema, execute handler, and result. Keep the projected excerpt at 8–15 lines and move the full schema into the appendix. Current API documentation uses document.modelContext. Annotations describe behaviour; they are not our approval enforcement.

Transition: Use the same request through that contract.

Sources (checked 2026-10-12):
- https://developer.chrome.com/docs/ai/webmcp/imperative-api

## 15. Same request, structured tools

Takeaway: A tool contract connects the visiting agent to the same journey.

Time: 240 seconds.

Demo C: 30-second setup plus 210-second run. Reset to the same initial agenda used in Demo A. Read the recurring prompt unchanged. Show discovered tools, arguments, results, and the resulting proposal. Do not claim a speed or reliability improvement without measured, comparable runs.

Transition: Return to slide 16 with the proposal awaiting a decision.

## 16. Who gets to decide?

Takeaway: Approval must govern the actual state change.

Time: 180 seconds.

Demo D: 30-second explanation plus 150-second control sequence. Reject once: the saved agenda must remain unchanged. Revise, inspect, then approve. The app must verify approval against the specific proposal and current agenda, even if a tool description is misleading. If the UI changes while approval is pending, require a refreshed proposal.

Transition: What happens when the request cannot be completed?

## 17. Failure should help the next step

Takeaway: Explain constraints without inventing facts.

Time: 90 seconds.

Choose the failure from the reviewed event snapshot. Do not assume recording availability is missing, or invent capacity, prices, or reservations. A proposed conflict scenario is acceptable planning material; it is not an observed result. After a failed write, verify whether any state changed before retrying.

Transition: Even a successful-looking run needs an outcome check.

Sources (checked 2026-10-12):
- https://developer.chrome.com/docs/ai/webmcp/build-tools

## 18. “Done” is a claim

Takeaway: Verify the saved outcome, not just the call log.

Time: 140 seconds.

Read back the agenda after reloading. All session IDs must exist in the reviewed dataset; selected times must not overlap; original selections must survive unless an explicitly approved replacement permits a change. Rejection must preserve the original agenda. Report expected assertions separately from actual results; no scores exist yet.

Transition: Then look for journeys the call log never captured.

Sources (checked 2026-10-12):
- https://developer.chrome.com/docs/ai/webmcp/evals

## 19. Learn from journeys that fail

Takeaway: Invocation logs do not capture every unmet need.

Time: 100 seconds.

Our intended report is local and reviewed, not an automatic external support ticket. Include the goal, available capabilities, and failure category; omit secrets and unrelated conversation history. A report is evidence to investigate, not a mandate to implement whatever an agent requests. This is an application design inspired by feedback-loop experiments, not a standard WebMCP reporting API.

Transition: Close with a change the audience can try on Monday.

Sources (checked 2026-10-12):
- https://bandarra.me/posts/webmcp-feedback-loop

## 20. Design for the agent. Keep the person in control.

Takeaway: Understandable capabilities, controllable actions, verifiable outcomes.

Time: 100 seconds.

Return to the conference-day request. The success criterion is a useful, conflict-free, approved agenda—not a persuasive answer. Point to the reference appendix and repository. Integration remains pending; do not advertise an unavailable live demo. The final thanks/contact slides fit within this closing allocation.

Transition: Thank the audience; Q&A is outside the 30-minute slot.

## 21. Thank you

Takeaway: Thank you.

Time: Optional / outside the 30-minute narrative.

Pause briefly. This slide is included in the preceding closing time.

Transition: Show contact details.

## 22. Stay in touch

Takeaway: Continue the conversation.

Time: Optional / outside the 30-minute narrative.

Use the shared contact slide. The appendix follows for questions, not as part of the timed narrative.

Transition: Open the relevant backup slide only if useful.

## 23. Appendix

Takeaway: The main talk ends before this section.

Time: Optional / outside the 30-minute narrative.

Keep the following material out of the timed run.

Transition: Choose a topic.

## 24. A full schema needs the full contract

Takeaway: Schemas must match the implementation.

Time: Optional / outside the 30-minute narrative.

This slot holds the full registered schema once the app exists. Check runtime input validation, authorization, and side effects against each exposed operation. A read-only hint must describe actual behaviour. Avoid a generic execute-anything tool.

Transition: Return to slide 14.

Sources (checked 2026-10-12):
- https://developer.chrome.com/docs/ai/webmcp/imperative-api

## 25. WebMCP setup is part of the demo

Takeaway: Documented availability is not evidence of a rehearsed integration.

Time: Optional / outside the 30-minute narrative.

The Chrome overview was updated 2026-10-07. This deck records a documentation check, not a successful WebMCP run. Record the exact environment, feature availability, origin-trial/flag settings, model identifier, and successful client integration before rehearsal. If unsupported, retain the human UI and use a clearly labelled recorded fallback only once it exists.

Transition: Return to slide 15.

Sources (checked 2026-10-12):
- https://developer.chrome.com/docs/ai/webmcp

## 26. A loop needs an exit

Takeaway: Stopping orchestration and reverting state are different operations.

Time: Optional / outside the 30-minute narrative.

The app must retain the correct call/result association and expose a stop control. A timeout should produce a visible state, not an endless spinner. After interruption, read the actual agenda before retrying. Budget values belong to the real app; the stage runbook uses an independent stall cutoff.

Transition: Return to slide 9.

## 27. The loop and the model can live apart

Takeaway: Client-side orchestration does not imply local inference.

Time: Optional / outside the 30-minute narrative.

This is one possible architecture. A server-side loop can also coordinate browser tools; choose based on the journey. Never embed provider secrets in shipped frontend code. Mark the implemented architecture after app integration.

Transition: Return to slide 8.

Sources (checked 2026-10-12):
- https://bandarra.me/posts/bringing-the-agent-loop-to-the-web

## 28. Keep the dataset honest

Takeaway: Real data needs provenance and an edition label.

Time: Optional / outside the 30-minute narrative.

The supplied event URLs could not all be retrieved during preparation; do not infer that the 2026 programme is absent. A human-reviewed local dataset is still required. Rehearsal should not depend on the official website being reachable. Check simultaneous tracks, multi-speaker sessions, and time interpretation.

Transition: Return to slide 4.

## 29. Approval belongs to the application

Takeaway: A tool cannot approve its own meaningful change.

Time: Optional / outside the 30-minute narrative.

Test direct tool calls that attempt to skip approval. Rejection, cancellation, and stale-state detection must not accidentally persist a proposal. Show revision rather than silently applying a different change. These are intended acceptance criteria until the app is available.

Transition: Return to slide 16.

## 30. Evaluate constraints, not a preferred sentence

Takeaway: An evaluation needs a start state, assertions, and repeatable conditions.

Time: Optional / outside the 30-minute narrative.

Include invalid IDs, duplicate calls, stale proposals, impossible requests, client discovery failure, and a tool result that disagrees with the UI. Distinguish deterministic rule tests, repeated model journeys, and real client/browser integration. Record model, prompts, dataset, app revision, number of runs, and failures.

Transition: Return to slide 18.

Sources (checked 2026-10-12):
- https://developer.chrome.com/docs/ai/webmcp/evals

## 31. Evidence to add before rehearsal

Takeaway: The PDF must show demo outcomes once captures exist.

Time: Optional / outside the 30-minute narrative.

Use this checklist alongside speaker-notes.md. Replace slots with real captures and retain edition labels. Capture both rejection and approved persistence. Never render an invented screenshot that looks like the real application. Until then, share this PDF as a draft awaiting integration.

Transition: Open the source references.

## 32. References · APIs and evaluation

Takeaway: Use current primary sources for API details.

Time: Optional / outside the 30-minute narrative.

The imperative page was updated 2026-09-21, declarative page 2026-09-25, and evals page 2026-05-28. Recheck before replacing pending app excerpts. The full source register includes inaccessible supplied references.

Transition: Continue to design references.

## 33. References · journeys and feedback

Takeaway: Tools should serve the journey.

Time: Optional / outside the 30-minute narrative.

These sources informed the narrative; the companion application has not been captured or evaluated. The feedback proposal is experimental and does not define a standard reporting API.

Transition: Continue to interaction references.

## 34. References · interaction and accessibility

Takeaway: Different interaction modes can coexist.

Time: Optional / outside the 30-minute narrative.

Treat these as design perspectives. Do not repeat unconditional claims that accessibility solves agent interaction or structured tools guarantee success.

Transition: Share the deck repository.

## 35. Source and integration status

Takeaway: The deck is reusable; demonstration evidence remains pending.

Time: Optional / outside the 30-minute narrative.

The repository link is real; the new deck has not been published. Do not add an invented companion repository or a public deck URL until available. All app integration items are listed in the speaker materials.

Transition: Return to the cover.

## 36. Your Next User Is an AI Agent

Takeaway: Your next user is an AI agent.

Time: Optional / outside the 30-minute narrative.

Closing placeholder for your-next-user-is-an-ai-agent.

Transition: End.

## Source register

Checked 2026-10-12. Links below are references, not claims that the pending app implements them.

- **overview**: https://developer.chrome.com/docs/ai/webmcp — retrieved; used in the corresponding slide notes.
- **imperative**: https://developer.chrome.com/docs/ai/webmcp/imperative-api — retrieved; used in the corresponding slide notes.
- **declarative**: https://developer.chrome.com/docs/ai/webmcp/declarative-api — retrieved; used in the corresponding slide notes.
- **tools**: https://developer.chrome.com/docs/ai/webmcp/build-tools — retrieved; used in the corresponding slide notes.
- **evals**: https://developer.chrome.com/docs/ai/webmcp/evals — retrieved; used in the corresponding slide notes.
- **loop**: https://bandarra.me/posts/bringing-the-agent-loop-to-the-web — retrieved; used in the corresponding slide notes.
- **feedback**: https://bandarra.me/posts/webmcp-feedback-loop — retrieved; used in the corresponding slide notes.
- **spectrum**: https://www.kulikowski.me/blog/the-spectrum-of-agentic-interactions — retrieved; used in the corresponding slide notes.
- **byo**: https://www.kulikowski.me/blog/bring-your-own-agent — retrieved; used in the corresponding slide notes.
- **a11y**: https://www.kulikowski.me/blog/accessibility-the-agentic-webs-most-overlooked-gain — retrieved; used in the corresponding slide notes.
- https://www.youtube.com/watch?v=HdCc-KezQPk&t=747s — retrieval throttled; video content not used as evidence.
- https://bandarra.me/review/019f2733-cfda-7961-8198-cdc75228f67b — inaccessible through the research tool; content not inferred.
- https://www.linkedin.com/feed/update/urn:li:activity:7507761064797868032/ — public experiment description retrieved; optional background, not evidence for this app.
- https://www.npmjs.com/package/webmcp-evals?activeTab=readme — retrieval failed; no CLI syntax inferred. Use Chrome's retrieved evals guide for the conceptual distinction.
- https://devfest26.gdgvenezia.it/agenda/ — retrieval failed; programme availability remains unverified.
- https://devfest25.gdgvenezia.it/agenda/ — retrieval failed; dataset contents remain unverified in this checkout.
- Event source links supplied for dataset integration: https://devfest26.gdgvenezia.it/ ; https://devfest26.gdgvenezia.it/speakers/ ; https://devfest25.gdgvenezia.it/speakers/ . Check them when preparing the reviewed dataset.

Context7 resolved WebMCP to `/webmachinelearning/webmcp` and confirmed the current registration/form vocabulary. Its Freya result was the unrelated Rust GUI library; ignored. Freya export and speaker notes were checked against installed `@perseveranza-pets/freya@0.74.2` source instead.

## Preview and export

Preview interactively: `npm run dev -- --only your-next-user-is-an-ai-agent`, then open http://delpuppo.local:4200/your-next-user-is-an-ai-agent .

The repository's `npm run pdf` invokes the obsolete `freya pdf` subcommand. The installed package provides `npx freya export --only your-next-user-is-an-ai-agent` instead; no npm script was changed. Export requires Chromium and ImageMagick. The PDF is generated under `dist/pdf/` and stays outside tracked source. Freya also exports speaker notes as HTML.

## Rendering note

The declarative HTML example retains its original source in `code.content`. Its `code.rendered` field contains an escaped display of that same source because the installed syntax highlighter interpolates HTML token text without escaping closing tags. This supported Freya field avoids changing the shared theme or dependency. Keep the rendered display synchronized if the example is replaced.

## Validation record

Validated on 2026-10-12:

- YAML structure: 36 non-empty documents; required opening and closing; every slide has notes; the abstract matches the supplied text; CFP catalog contains the new entry.
- `npm run build -- --only your-next-user-is-an-ai-agent` succeeded. Its postbuild lint, CSS lint, and typecheck passed. Lint reports three existing React Hook dependency warnings in the shared theme; the build also reports an existing unavailable `chart-network` icon.
- Chromium 153.0.8010.12 traversed all 36 slides at 2000 × 1120: no page exceptions, failed requests, or detected text overflow. The displayed form was compared with its original source. This validates the deck renderer, not the pending WebMCP companion app.
- The repository verifier passed with a temporary 180-second navigation timeout, using the same verification script and assertions. Its default 30-second load timeout failed on this host. No repository test or dependency was edited.
- Browser verification used a temporary static server matching the generated asset routes. `npm run server` currently fails in the installed dependency with `FST_ERR_LOG_INVALID_LOGGER_CONFIG`.
- PDF export uses the supported `freya export` command. This host provides ImageMagick 6, so export used a temporary `magick` → `convert` compatibility wrapper and PDF-writing policy. These are host setup details, not committed changes. Normal export requires the utilities expected by Freya.

The deck remains **awaiting integration**: real application excerpts, event data, screenshots, demo recordings, exact WebMCP rehearsal environment, and evaluation results must be supplied before conference rehearsal.

Final artifact: `dist/pdf/your-next-user-is-an-ai-agent.pdf` (36 pages). The export includes an HTML version of the embedded speaker notes beside the PDF.
