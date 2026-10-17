# Your Next User Is an AI Agent — speaker notes

Revised 2026-10-16 around Conference Companion. English slides; 30 minutes excluding Q&A. Main narrative: slides 1–26. Slides 27–35: contacts and optional appendix.

## Source and evidence boundary

- Demo repository: https://github.com/Puppo/your-next-user-is-an-ai-agent
- Reviewed commit: `8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505`.
- Event: DevFest Venezia 2026, 24 October 2026, Europe/Rome. Dataset `2026-10-12.1`: 29 sessions / 33 speakers, reviewed snapshot captured 12 October. Editorial topics/summaries are labelled in the app.
- Current live presentation path: external ChatGPT app + browser connection; no embedded chat in Conference Companion. A successful ChatGPT rehearsal on the presentation machine is still required. Native repository evidence uses Chrome DevTools MCP, not ChatGPT.
- Captures in this deck were made locally from this checkout on 16 October with Chromium 156.0.8078.4. Programme: human UI reset. Proposal: preserve captured replay awaiting approval. Saved agenda: same replay after explicit approval and reload. These are real app UI captures, not fabricated mockups or evidence of model inference.
- Code slides are presentation excerpts, not complete standalone programs. Whitespace is reflowed and omissions identified in notes. The displayed lines use escaped `code.rendered` so Freya preserves source punctuation. `code.content` retains the displayed text.
- Historical fixture result 18/18 belongs to 12 October, dataset 2026-10-12.1 and build 4b1418af9d6b60eb99fc7402f9256ba0a5d72212. It is not a current model benchmark.

## Why this revision

The old deck was dominated by integration placeholders, treated an embedded assistant as the main path, and lacked the actual programme, proposal and saved outcome. This version follows one attendee request through the actual production tools and page controls. The abstract and shared opening/closing remain intact. Declarative forms, fixture evaluation and the separate loop are appendix material.

## Timed slides

| Slide | Title                                        | Seconds |
| ----- | -------------------------------------------- | ------: |
| 1     | cover                                        |      20 |
| 2     | hello                                        |      20 |
| 3     | nearform                                     |      20 |
| 4     | A familiar job: plan your conference day     |      55 |
| 5     | The request                                  |      45 |
| 6     | A useful answer must respect my day          |      50 |
| 7     | One application. Two ways to act.            |      60 |
| 8     | Demo 1 · Use the screen                      |     180 |
| 9     | The agent keeps taking the next step         |      65 |
| 10    | Expose the actions this journey needs        |      70 |
| 11    | A proposal needs IDs and a known revision    |      55 |
| 12    | Register capabilities, reuse the application |      65 |
| 13    | Different entry points. The same rules.      |      55 |
| 14    | Demo 2 · Propose my day                      |     310 |
| 15    | This is a draft, not my saved day            |      40 |
| 16    | The tool returns a handoff                   |      45 |
| 17    | There is no approve_agenda tool              |      40 |
| 18    | An old approval must not apply a new change  |      50 |
| 19    | Demo 3 · Say no, then try a conflict         |     240 |
| 20    | Both talks start at 12:35                    |      50 |
| 21    | Unknown is a valid answer                    |      45 |
| 22    | “Done” means the saved state agrees          |      90 |
| 23    | Test the state. Then test the agent.         |      60 |
| 24    | Design one journey an agent can complete     |      45 |
| 25    | Try the Conference Companion                 |      15 |
| 26    | end                                          |      10 |

Total: 1800 seconds. Demo windows total 730 seconds (12m10s), including handoffs. Shorter cut: reduce Demo 1 to 90s, omit the approval-check code excerpt, and show conflict rather than the full reject/revise run. Keep human review and saved-state verification.

## 1. cover

**Takeaway:** Design a journey an agent can actually complete.

**Time:** 20 seconds.

Open with the promise: we will plan a real conference day, keep an existing choice, and check what was saved. Slides remain in English, as in the accepted talk; commentary and preparation can be in Italian.

**Transition:** Introduce yourself.

## 2. hello

**Takeaway:** Luca Del Puppo.

**Time:** 20 seconds.

Keep the introduction brief; connect your web-development background to the new interaction model.

**Transition:** Introduce Nearform.

## 3. nearform

**Takeaway:** Nearform.

**Time:** 20 seconds.

Use the shared company slide.

**Transition:** Show the application before introducing APIs.

## 4. A familiar job: plan your conference day

**Takeaway:** A familiar job: plan your conference day

**Time:** 55 seconds.

This is the real React + TypeScript app. It contains a reviewed snapshot: 29 sessions and 33 speakers, event date 24 October 2026, Europe/Rome. Search and save work for a person. One talk is already saved: Your Next User Is an AI Agent. This screenshot is a local UI capture, not an external-agent run.

**Transition:** Give the new user a goal.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/runbook.md

## 5. The request

**Takeaway:** A goal contains constraints, not just keywords.

**Time:** 45 seconds.

Use the exact ASCII prompt in the runbook when pasting into ChatGPT. Emphasize preserve and avoid overlaps. The goal is a feasible proposal, not a claim of an optimal timetable.

**Transition:** Make the success conditions visible.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/runbook.md

## 6. A useful answer must respect my day

**Takeaway:** A useful answer must respect my day

**Time:** 50 seconds.

The same constraints will be used in every demo. A polished answer is insufficient if the selected talk disappears or the saved schedule overlaps.

**Transition:** Compare the two ways an agent can act.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agenda/proposals.ts

## 7. One application. Two ways to act.

**Takeaway:** One application. Two ways to act.

**Time:** 60 seconds.

The live model runs in the external ChatGPT app, not inside Conference Companion. For a browser-driven path, verify actual DOM interactions in that client. WebMCP provides a structured entry point in a compatible browser/client; it does not supply the model or make any external client automatically compatible.

**Transition:** Start with the interface.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/README.md
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/browser-support.md

## 8. Demo 1 · Use the screen

**Takeaway:** Demo 1 · Use the screen

**Time:** 180 seconds.

Open the preserve scenario and press Start selected scenario. Use the browser-driven client only if rehearsed; otherwise demonstrate the human workflow explicitly. Search AI, open details, and show the existing saved talk. An agent must stop before the person’s approval. Do not suggest this screenshot or Playwright capture demonstrates ChatGPT reasoning. Cut off an unproductive stall at 20 seconds and switch to the labelled replay.

**Transition:** Explain the mechanism behind the interaction.

## 9. The agent keeps taking the next step

**Takeaway:** The agent keeps taking the next step

**Time:** 65 seconds.

This is the agent loop. The app returns facts and errors; the client decides what to do next. The live client owns the loop. A separate AgentLoop implementation exists in the repository for fixture checks; it is not mounted as an embedded chat in the current UI.

**Transition:** Replace interface guessing with explicit actions.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/loop.ts
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/app/EventPage.tsx

## 10. Expose the actions this journey needs

**Takeaway:** Expose the actions this journey needs

**Time:** 70 seconds.

These are the four production tools. Search changes visible filters, so it is not marked read-only. Agenda and details are read-only. A fifth tool, report_capability_gap, is registered only after explicit local permission; it is optional and not part of the happy path. Production exposes one imperative search tool. The declarative form is a separate teaching spike.

**Transition:** Look at the proposal contract.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/schemas.ts

## 11. A proposal needs IDs and a known revision

**Takeaway:** A proposal needs IDs and a known revision

**Time:** 55 seconds.

Presentation excerpt of schemas.ts, with whitespace changed and the optional replacement field omitted. The description is split into concatenated strings for projection. Explain concrete IDs and optimistic revision checks. No approve flag is accepted. The schema is not the business rule; runtime validation and ProposalStore enforce it.

**Transition:** Register the same contract with the browser.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/schemas.ts

## 12. Register capabilities, reuse the application

**Takeaway:** Register capabilities, reuse the application

**Time:** 65 seconds.

Presentation excerpt of registerNative: formatting changed; feature detection, try/catch and optional report registration omitted. execute forwards the call to the existing application tools. The callback signal cancels execution; registrationSignal removes registrations when the page/event lifetime ends. This is browser-native WebMCP, not a backend MCP server. The API remains experimental; verify the presentation environment.

**Transition:** Show where both entry points converge.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/webmcp.ts
- https://github.com/webmachinelearning/webmcp

## 13. Different entry points. The same rules.

**Takeaway:** Different entry points. The same rules.

**Time:** 55 seconds.

The concrete flow is Human UI → ProposalStore and Visiting client → WebMCP → createTools → ProposalStore. Agenda state is localStorage, scoped by event and dataset version. There is no reservation server or model credential in this static Pages app. Shared rules prevent the tool path from bypassing schedule constraints.

**Transition:** Run the structured journey.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agenda/store.ts
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/tools.ts

## 14. Demo 2 · Propose my day

**Takeaway:** Demo 2 · Propose my day

**Time:** 310 seconds.

Reset preserve. In the external ChatGPT app, paste the exact planning prompt. Inspect discovered tools before the run. The expected path reads get_agenda, explores/paginates search, then calls propose_agenda with real IDs and the current revision. Show Keep/Add/Remove while the saved agenda still contains the original talk. Pause here, and use the actual page approval button as the presenter. If the client connection stalls beyond 20 seconds, announce Captured replay and reset preserve; execute its three initial calls. Do not claim replay is native invocation or inference.

**Transition:** Freeze the important moment: a visible draft.

## 15. This is a draft, not my saved day

**Takeaway:** Inspect the full diff before applying it.

**Time:** 40 seconds.

Actual local capture of the preserve replay, awaiting approval. The replay uses shared tools, no model inference. It proposes seven total sessions, keeping the selected talk and adding six. The full list is in the page; bounded tool output includes counts and only the first two IDs per diff section.

**Transition:** Compare the UI with the returned result.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/events/devfest-venezia-2026/captures.json

## 16. The tool returns a handoff

**Takeaway:** The tool returns a handoff

**Time:** 45 seconds.

Selected fields from the committed preserve capture’s propose_agenda result. Proposal ID, revision and individual IDs are omitted. Six suggestions do not mean six saved writes. The agent should direct the person to the complete page diff.

**Transition:** Make the approval boundary explicit.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/events/devfest-venezia-2026/captures.json
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/tools.ts

## 17. There is no approve_agenda tool

**Takeaway:** There is no approve_agenda tool

**Time:** 40 seconds.

Approval is a page action, not a tool exposed to the visiting agent. This is a designed handoff, not proof of physical human identity: a browser-automation agent can click controls. The client must pause and let the person decide; a static page cannot authenticate that intent.

**Transition:** Show the checks that remain at approval.

## 18. An old approval must not apply a new change

**Takeaway:** An old approval must not apply a new change

**Time:** 50 seconds.

Excerpt of approveFromHuman, reflowed for projection. Subsequent preservation check and write omitted. Recheck identity, status, saved revision and planning context, then schedule and preservation rules before writing. Approval is bound to this proposal and current state.

**Transition:** Exercise rejection and an impossible request.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agenda/proposals.ts

## 19. Demo 3 · Say no, then try a conflict

**Takeaway:** Demo 3 · Say no, then try a conflict

**Time:** 240 seconds.

Use reject-revise from a clean scenario start. Reject the first draft; verify the saved list is unchanged. Ask the exact revision prompt in the runbook, inspect the replacement and approve only after review. If short on time, show conflict instead: add A web for anyone, anywhere, anytime while preserving selections. Both talks start at 12:35 in the reviewed snapshot; show the explicit CONFLICT and unchanged agenda. Do not silently remove the selected talk. For fallback use the corresponding labelled replay.

**Transition:** Keep failure grounded in the real timetable.

## 20. Both talks start at 12:35

**Takeaway:** Both talks start at 12:35

**Time:** 50 seconds.

Both intervals are in the 24 October 2026 snapshot, Europe/Rome. The conflict is an actual scripted capture result, not a hypothetical failure. Offer a choice to the person instead of relaxing preservation. The full tool error and before/after IDs are in the captured trace.

**Transition:** Missing information needs the same honesty.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/events/devfest-venezia-2026/package.json
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/events/devfest-venezia-2026/captures.json

## 21. Unknown is a valid answer

**Takeaway:** Unknown is a valid answer

**Time:** 45 seconds.

Selected fields from the recording scenario’s get_session_details result. Ask: Will this talk be recorded? The snapshot has no published answer; null is unknown, not false. The real response also supplies provenance. If showing reporting, enable local reports explicitly, record a sanitized recording-information gap, then disable it. This is not a message to the organizer.

**Transition:** Now verify the successful path.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/events/devfest-venezia-2026/captures.json

## 22. “Done” means the saved state agrees

**Takeaway:** Verify saved choices, not a persuasive completion message.

**Time:** 90 seconds.

Actual local screenshot after the preserve replay was approved and the page reloaded. Seven saved sessions remain. Show get_agenda total_pages and visit each page: production responses contain at most two sessions. Verify overlap_count = 0, protected_missing_count = 0, and the original selected ID remains. A seven-session fixture outcome is not a guarantee that a live model chooses the same seven.

**Transition:** Separate application guarantees from model behavior.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/tools.ts
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/tests/replay.browser.test.mjs

## 23. Test the state. Then test the agent.

**Takeaway:** Test the state. Then test the agent.

**Time:** 60 seconds.

Repository evidence records 18/18 scripted fixture trials without inference. That checks deterministic paths, not model quality. Native integration was tested with Chrome DevTools MCP. The current repository still requires rehearsal of external ChatGPT on the presentation machine. Record failures and final constraints, not just calls or prose.

**Transition:** Return to what the audience can change.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/evidence/evaluation-fixture.json
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/browser-support.md
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/runbook.md

## 24. Design one journey an agent can complete

**Takeaway:** Design one journey an agent can complete

**Time:** 45 seconds.

Recap the same conference request: preserve a choice, inspect alternatives, approve a proposal, verify the saved agenda. WebMCP is useful because it exposes those existing actions in a structured way. Keep accessible human controls as part of the journey.

**Transition:** Share the actual companion repository.

## 25. Try the Conference Companion

**Takeaway:** The code and data behind the talk are available.

**Time:** 15 seconds.

Use the repository README for setup, docs/runbook.md for exact scenarios, and docs/browser-support.md for native compatibility. This is an independent companion with a reviewed snapshot, not the organizer’s live agenda or a reservation service.

**Transition:** Thank the audience.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent

## 26. end

**Takeaway:** Thank you.

**Time:** 10 seconds.

End the 30-minute narrative. Q&A is outside the timed slot.

**Transition:** Contact details.

## 27. byebye

**Takeaway:** Continue the conversation.

**Time:** Optional / outside the main narrative.

Use the shared contact slide. Open appendix material only when relevant to questions.

**Transition:** Optional appendix.

## 28. Appendix

**Takeaway:** Appendix

**Time:** Optional / outside the main narrative.

The main talk has ended. These slides support questions and rehearsal.

**Transition:** Choose a relevant topic.

## 29. Registration is not a connected agent

**Takeaway:** Registration is not a connected agent

**Time:** Optional / outside the main narrative.

These exact versions are repository evidence from 12 October 2026. They are not a claim about the current presentation machine or general browser support. The app feature-detects document.modelContext and the registry. Registration only proves the page registered tools; it does not prove ChatGPT connected or reasoned correctly. Consult the experimental browser documentation before each rehearsal.

**Transition:** Return to the native demo.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/browser-support.md
- https://developer.chrome.com/docs/ai/webmcp

## 30. A fallback that still exercises the rules

**Takeaway:** A fallback that still exercises the rules

**Time:** Optional / outside the main narrative.

The five captures are preserve, conflict, reject-revise, recording and verify. They contain no model inference and make no native-client claim. Label every switch. Captures are versioned public data; replay preserves the review boundary. Loaded assets are needed: the app has no service worker and does not promise fresh offline navigation.

**Transition:** Return to the live path if the connection recovers.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/presenter/replay.ts
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/runbook.md

## 31. The repository also contains a bounded loop

**Takeaway:** The repository also contains a bounded loop

**Time:** Optional / outside the main narrative.

The current React UI uses external ChatGPT rather than an embedded assistant. Do not demonstrate loop.ts as the ChatGPT implementation. In that optional loop, cancellation and context changes stop work; call/result IDs are retained; proposal review is awaited. This is teaching and fixture material, not proof of a cloud-model run.

**Transition:** Distinguish the evidence categories.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/loop.ts
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/app/EventPage.tsx

## 32. 18/18 is a fixture result

**Takeaway:** 18/18 is a fixture result

**Time:** Optional / outside the main narrative.

Historical evidence: dataset 2026-10-12.1, build commit 4b1418af9d6b60eb99fc7402f9256ba0a5d72212. The recorded result predates the current React/Vite commit. Do not relabel it as a benchmark for a model or the current checkout. New execution results belong in the validation record with their own commit and date.

**Transition:** Use evidence to explain the limit of each claim.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/evidence/evaluation-fixture.json

## 33. Declarative forms live in the teaching spike

**Takeaway:** Declarative forms live in the teaching spike

**Time:** Optional / outside the main narrative.

The isolated spike checks browser compatibility; direct add_to_agenda is only a fixture. Do not present it as the production agenda policy. Production search is registered once through the imperative API so it carries the appropriate annotations. For a shorter talk omit this appendix entirely.

**Transition:** Return to the production contract.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/experiments/webmcp/main.ts
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/browser-support.md

## 34. Sources behind this demo

**Takeaway:** Sources behind this demo

**Time:** Optional / outside the main narrative.

Application reviewed at commit 8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505. Technical excerpts and UI captures are tied to this revision; sources and capture methods are recorded in speaker-notes.md. Current registration/cancellation docs checked via Context7 on 16 October 2026. Event facts come from the reviewed event package, not the older synthetic journey-design document.

**Transition:** Return to the cover.

Sources:

- https://github.com/Puppo/your-next-user-is-an-ai-agent
- https://github.com/webmachinelearning/webmcp
- https://developer.chrome.com/docs/ai/webmcp

## 35. cover

**Takeaway:** Your next user is an AI agent.

**Time:** Optional / outside the main narrative.

Closing placeholder for your-next-user-is-an-ai-agent.

**Transition:** End.

## Demo runbook

Use the companion repository's [runbook](https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/runbook.md) for full operating details.

### Setup and reset

In the demo checkout: install its lockfile with `npm ci`, run `npm run check`, `npm run build`, then `npm run preview`. Open `http://127.0.0.1:4173/?event=devfest-venezia-2026&presenter=1&scenario=preserve`. Use production preview for rehearsal: development refresh cancels work and expires pending proposals. Select a prepared scenario, then click **Start selected scenario**; changing the selector alone does not reset. For replay use **Start captured replay**, which resets independently. Do not let the model click the approval button. This is a client handoff convention, not physical-human authentication enforced by the static page.

Check the exact browser build, native feature support, actual discovered tools, external ChatGPT connection, app commit, dataset and projector zoom on the presentation machine. Browser registration status does not mean a client is connected. No API keys belong in the static site.

### Exact prompts

**Planning (preserve and first reject/revise turn):**

> Help me plan my day at this conference. I'm interested in web development and AI. Avoid overlapping sessions, preserve the sessions I've already selected, and explain the trade-offs.

**Revision after rejection:**

> Revise the rejected draft: keep my selected talk and remove the first morning suggestion. Show a new proposal for review.

**Conflict:**

> Add A web for anyone, anywhere, anytime while preserving my selections and avoiding overlaps.

**Missing information:**

> Will Your Next User Is an AI Agent be recorded?

**Verification:**

> Check that my saved agenda preserves Your Next User Is an AI Agent, has no overlaps, and includes web and AI topics.

### Stage transitions

| Demo / return          | Start                                    | Expected visible outcome                                                                           | Stop / fallback                                                              |
| ---------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Demo 1, slide 8 → 9    | preserve reset; one talk saved           | Search and details work; original choice stays visible                                             | 20s stall: disclose unavailable browser-client path; show human controls     |
| Demo 2, slide 14 → 15  | preserve reset; tools discovered         | Read/search/propose; full diff; one saved selection until human approval                           | 20s stall: announce preserve Captured replay; three tool steps reach review  |
| Demo 3, slide 19 → 20  | reject-revise reset, then conflict reset | Rejection leaves agenda unchanged; fresh proposal needs review; conflict preserves original choice | 20s stall: corresponding labelled replay; use conflict only if time is short |
| Outcome, slide 22 → 23 | approved preserve run                    | Read every get_agenda page; zero overlaps/missing protected choices; reload persists               | Screenshot is an observed replay outcome, not a live-client result           |

The recording question can be shown after conflict if time permits. Unknown fields stay null. Optional reporting requires local permission; it sends nothing to organizers.

### Replay steps

Announce **Captured replay — scripted shared tools, no model inference**. Pick the scenario and start replay. Advance **Next captured step** until review. In preserve, the first three calls are get_agenda, search_sessions, propose_agenda. The replay pauses; use the real Approve/Reject button. Continue until the expected saved agenda is verified. For preserve, approve then advance the two verification calls; reload the page. The captured seven-session choice is one feasible fixture outcome, not a live-model expectation.

## Capture register

| Asset             | Method                                                | What it proves                                       |
| ----------------- | ----------------------------------------------------- | ---------------------------------------------------- |
| programme.webp    | Scenario reset; full viewport, 1440×1000 at 2×        | Real programme and existing saved choice             |
| proposal.webp     | Preserve replay, responsive 840px viewport, #proposal before approval | Full Keep/Add/Remove diff and actual review controls |
| saved_agenda.webp | Same replay, approve, finish, reload; responsive 840px viewport, #agenda crop    | Seven persisted selections in this local run         |

Source PNGs live in assets/__originals; deck assets are WebP. Captures need no model credentials. A separate conflict diagnostic PNG was used only during verification and is not part of the slide assets.

## Remaining rehearsal work

- Exercise the actual external ChatGPT/browser connection on the presentation machine; record exact versions and failures. No successful rehearsal is inferred from these UI captures.
- Recheck native discovery and execution on the intended deployed origin. The historical native test used a loopback origin and DevTools MCP.
- Choose which of reject/revise and conflict fits the actual pace; rehearse the 20s fallback switch.
- Check the event snapshot and official programme before the event; keep the edition and snapshot label if the live schedule changes.
- If recording the external-client run, obtain an actual capture; this deck contains no invented client transcript, model score or recording.

## Revision validation

On the reviewed companion checkout: production build and TypeScript checks pass; all 26 deterministic data/domain tests pass. A local replay preserved the selected talk, required explicit approval, and retained seven saved sessions after reload. This verifies the shared-tool/UI path; it does not establish external ChatGPT compatibility. Deck rendering checks are recorded separately after export.

Deck checks on 2026-10-16: 35 non-empty YAML slides with presenter notes, required opening and closing, all referenced assets present, and displayed code matching its source. Build, ESLint, CSS lint and typecheck pass. Chromium 156.0.8078.4 traversed all 35 slides with decoded images, no page exceptions, failed requests or detected text overflow. Native external-client rehearsal remains a separate check.

The final native PDF export contains 35 pages. All pages were visually inspected; the corrected programme capture was checked again in the final PDF. Screenshots and code panels preserve their full content.
