# Your Next User Is an AI Agent — speaker notes

Revised 2026-10-19. English slides; 30 minutes excluding Q&A. Slides 1–20 build the story from human interface design to delegated interaction. Slide 21 holds one continuous twelve-minute demo. Return once to slides 22–24 for conclusions and closing. Slides 25–41 are contacts and optional appendix.

## Narrative and stage direction

Begin with the work behind a useful UI: understanding people, making actions discoverable, providing feedback and recovery. Use the conference attendee as the recurring example. Move from choosing each step to delegating a constrained goal, then explain external agents, embedded agents and WebMCP as distinct concepts. End the explanation before opening the app. The existing scenarios run together at the end. Code excerpts, fixture details and captured outcome references stay in the appendix.

The embedded-agent section describes an architectural option; the actual Conference Companion demo uses an external client. No new demo or embedded chat implementation is promised. Preserve the original title and abstract.

## Source and evidence boundary

- Demo repository: https://github.com/Puppo/your-next-user-is-an-ai-agent
- Reviewed commit: `8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505`.
- Event: DevFest Venezia 2026, 24 October 2026, Europe/Rome. Dataset `2026-10-12.1`: 29 sessions / 33 speakers, reviewed snapshot captured 12 October. Editorial topics/summaries are labelled in the app.
- Current live presentation path: external ChatGPT app + browser connection; no embedded chat in Conference Companion. A successful ChatGPT rehearsal on the presentation machine is still required. Native repository evidence uses Chrome DevTools MCP, not ChatGPT.
- Captures in this deck were made locally from this checkout on 16 October with Chromium 156.0.8078.4. Programme: human UI reset. Proposal: preserve captured replay awaiting approval. Saved agenda: same replay after explicit approval and reload. These are real app UI captures, not fabricated mockups or evidence of model inference.
- Code slides are presentation excerpts, not complete standalone programs. Whitespace is reflowed and omissions identified in notes. The displayed lines use escaped `code.rendered` so Freya preserves source punctuation. `code.content` retains the displayed text.
- Historical fixture result 18/18 belongs to 12 October, dataset 2026-10-12.1 and build 4b1418af9d6b60eb99fc7402f9256ba0a5d72212. It is not a current model benchmark.


## Timed slides

| Slide | Title | Seconds |
| --- | --- | ---: |
| 1 | cover | 20 |
| 2 | hello | 20 |
| 3 | nearform | 20 |
| 4 | We learned to meet people halfway | 55 |
| 5 | A screen starts with a person | 55 |
| 6 | Good UI makes the next step clear | 55 |
| 7 | A good UI still asks me to do the work | 55 |
| 8 | The goal behind all those clicks | 45 |
| 9 | From steps to intent | 35 |
| 10 | An agent needs a feedback loop | 60 |
| 11 | An agent can arrive from outside | 60 |
| 12 | Or live inside your application | 60 |
| 13 | Two separate design decisions | 50 |
| 14 | WebMCP: the page offers actions | 70 |
| 15 | Two entrances. One application. | 55 |
| 16 | The UI becomes a place to review | 50 |
| 17 | Control is part of the interaction | 55 |
| 18 | “Done” needs evidence | 55 |
| 19 | More ways in. One human goal. | 40 |
| 20 | One day, from request to saved agenda | 50 |
| 21 | Demo · Plan my conference day | 720 |
| 22 | Design for intent. Keep people in control. | 70 |
| 23 | Try the Conference Companion | 25 |
| 24 | end | 20 |

Total: 1800 seconds. Theory and setup: 16m05s; continuous demo: 12m; conclusion/resources/end: 1m55s.

## 1. cover

Takeaway: cover

Time: 20 seconds.

Open with the title, then promise a story about how interaction changes. We will first build the mental model, then spend twelve uninterrupted minutes in the existing application. Keep the slides in English.

Transition: Introduce yourself.

## 2. hello

Takeaway: hello

Time: 20 seconds.

Brief personal introduction; connect your web-development experience to interface design.

Transition: Introduce Nearform.

## 3. nearform

Takeaway: nearform

Time: 20 seconds.

Use the shared company slide.

Transition: Start with the relationship between people and software.

## 4. We learned to meet people halfway

Takeaway: We learned to meet people halfway

Time: 55 seconds.

Use this as a conceptual progression, not a dated history or a claim that one interface replaced another. Commands, graphical controls and web journeys coexist. Tell the story through the burden placed on the person: remembering syntax, recognizing an action, navigating a task. The design question gradually becomes how to make the user’s job understandable. Avoid suggesting that accessibility began only after graphical interfaces.

Transition: To design that journey, we first have to understand the person.

Sources:
- https://www.nngroup.com/articles/ten-usability-heuristics/

## 5. A screen starts with a person

Takeaway: A screen starts with a person

Time: 55 seconds.

Describe the work before pixels: observe a task, learn the user’s vocabulary and mental model, prototype, and watch someone try it. Use an attendee choosing talks as the example. They want a useful day, not a tutorial on the filtering controls. This is the design practice we carry forward into agent interaction.

Transition: What did that work teach us about good interfaces?

Sources:
- https://www.nngroup.com/articles/ten-usability-heuristics/

## 6. Good UI makes the next step clear

Takeaway: Good UI makes the next step clear

Time: 55 seconds.

Use the conference example: a Search label, a visible saved count, and a remove or cancel action. These are practical ways to reduce uncertainty. Accessibility adds another essential perspective: people use different input and output methods. Semantic controls remain necessary for people; potential agent benefits never substitute for accessibility testing.

Transition: Even a well-designed interface leaves some work with the person.

Sources:
- https://www.nngroup.com/articles/ten-usability-heuristics/
- https://www.w3.org/WAI/fundamentals/accessibility-intro/

## 7. A good UI still asks me to do the work

Takeaway: A good UI still asks me to do the work

Time: 55 seconds.

Show the existing programme capture without opening the app. Walk verbally through the work: search topics, compare parallel sessions, remember a saved choice, check time conflicts, save the result. This is a real local capture of the reviewed DevFest Venezia 2026 snapshot, not a model run. The interface can be good while the coordination remains demanding.

Transition: What would the person ask if they could delegate that coordination?

Sources:
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/runbook.md

## 8. The goal behind all those clicks

Takeaway: The goal behind all those clicks

Time: 45 seconds.

Read only the opening phrase; let the audience scan the constraints. Keep the full planning request because it will be the exact same request in the final demo. Highlight preserve my selections and avoid overlaps. We now have an intent and success criteria, not merely a sequence of clicks.

Transition: That changes the unit of interaction.

Sources:
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/runbook.md

## 9. From steps to intent

Takeaway: From steps to intent

Time: 35 seconds.

Pause on the shift. A person may still choose to act directly. Delegation adds a way to interact: state the goal and constraints, then inspect the proposed outcome. This is a product design direction, not a prediction that screens disappear.

Transition: An agent needs a loop to turn that intention into actions.

## 10. An agent needs a feedback loop

Takeaway: An agent needs a feedback loop

Time: 60 seconds.

Explain the loop with the same day-planning task: read my agenda, search sessions, propose a day, inspect the result. A model answer alone does not establish success. The application supplies observations and action results. The loop needs cancellation, a budget and a stopping condition; the repository’s optional loop illustrates bounded execution, but it is not the implementation of external ChatGPT.

Transition: First consider an agent that arrives from outside the application.

Sources:
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/loop.ts

## 11. An agent can arrive from outside

Takeaway: An agent can arrive from outside

Time: 60 seconds.

Describe the external assistant acting through browser tools. It can encounter a site that was built for people. Labels, state and feedback help make the journey understandable, but a particular client must be tested. This is the existing demo’s intended client arrangement. No embedded assistant is required for this path.

Transition: Alternatively, the product can provide the assistant itself.

Sources:
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/README.md

## 12. Or live inside your application

Takeaway: Or live inside your application

Time: 60 seconds.

Present an architectural option, clearly distinct from the current live demo: the application can own the orchestration and the assistant UI. The model can be remote or local; embedded means integrated into the product, not necessarily running inference in the browser. A chat box alone is not an agent. The product still needs tools, state, cancellation and review. Conference Companion has no embedded chat UI; do not promise a second implementation during the demo.

Transition: Location and action interface are two different design decisions.

Sources:
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/app/EventPage.tsx
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/loop.ts

## 13. Two separate design decisions

Takeaway: Two separate design decisions

Time: 50 seconds.

Make the two axes explicit. An embedded agent can call application functions directly. An external browser agent may use human controls or discover tools through a compatible browser integration. WebMCP belongs to the action-interface discussion; it is not a model, a chat product, or an orchestration loop.

Transition: Now introduce the page’s explicit tool interface.

Sources:
- https://developer.chrome.com/docs/ai/webmcp

## 14. WebMCP: the page offers actions

Takeaway: WebMCP: the page offers actions

Time: 70 seconds.

Use the demo vocabulary: search_sessions, get_session_details, get_agenda and propose_agenda. The imperative implementation registers tools on document.modelContext and delegates execution to the existing shared tools. Declarative forms are another approach in WebMCP, explored only in the repository’s separate teaching spike. Explain the contract without reading API syntax aloud. Browser/client availability is experimental and must be rehearsed; registration alone does not prove a connected client. Documentation checked 2026-10-19; pinned app evidence is separate.

Transition: Tools must lead to the same application rules as the UI.

Sources:
- https://developer.chrome.com/docs/ai/webmcp
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/webmcp.ts

## 15. Two entrances. One application.

Takeaway: Two entrances. One application.

Time: 55 seconds.

Follow both entrances to the same domain logic. Structured tools reduce the need to infer an action from pixels, but validation still belongs in application code. Search also updates the visible filters in this demo; it is not described as a purely read-only tool. The full schema and registration excerpts are available in the appendix for questions.

Transition: The person needs a useful place to receive the agent’s work.

Sources:
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/schemas.ts
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/tools.ts

## 16. The UI becomes a place to review

Takeaway: The UI becomes a place to review

Time: 50 seconds.

This is a static capture before the demo, used to explain the interaction model. Point to Keep/Add/Remove and the actual approval controls. A proposal is not the saved agenda. The interface lets the person understand the change without reconstructing every tool call. Caption the capture as a local scripted-replay outcome, not live client evidence.

Transition: Review needs a meaningful decision, not a decorative confirmation.

Sources:
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/runbook.md

## 17. Control is part of the interaction

Takeaway: Control is part of the interaction

Time: 55 seconds.

Relate this to familiar UI control and feedback. The tool can propose; the page owns the review flow. The production registry has no approve_agenda tool. A browser agent could still click the human control, so the presentation explicitly hands control to the person; this is not physical-human authentication. Approval validates that the proposal is still current. Rejection must leave the agenda unchanged.

Transition: The final answer needs evidence in the application state.

Sources:
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/schemas.ts
- https://www.nngroup.com/articles/ten-usability-heuristics/

## 18. “Done” needs evidence

Takeaway: “Done” needs evidence

Time: 55 seconds.

Separate intent from verified outcome. The demo checks all agenda pages, overlap and protected-selection counts, and persistence after reload. For recording information the app returns null rather than inventing an answer. Deterministic domain tests support these rules; fixture outcomes do not measure an external model’s reliability. Those distinctions belong in our definition of done.

Transition: What kind of web experience does this make possible?

Sources:
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/runbook.md
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/evaluation-report.md

## 19. More ways in. One human goal.

Takeaway: More ways in. One human goal.

Time: 40 seconds.

Offer a design thesis, not a guaranteed roadmap: people can switch between acting directly and delegating work while the page keeps the result understandable. The accumulated work on usability remains useful. The new design work includes describing capabilities, expressing constraints and creating a good handoff back to the person.

Transition: We have the whole model. Now stay in the app and exercise it.

## 20. One day, from request to saved agenda

Takeaway: One day, from request to saved agenda

Time: 50 seconds.

Preview the continuous demo sequence. Tell the audience that we will leave the deck once and come back only after the checks. Same application, same scenarios, same planning request. The final block includes the missing-recording question if the client responds within the time budget. Do not open the application yet; advance to the holding slide.

Transition: Advance once, then switch to the app for the entire block.

Sources:
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/runbook.md

## 21. Demo · Plan my conference day

Takeaway: Demo · Plan my conference day

Time: 720 seconds.

ONE APPLICATION WINDOW: leave the slides here for the full twelve minutes. 0:00–1:30 browser UI search/details; 1:30–5:00 preserve planning, full diff, human approval and readback; 5:00–7:30 reject/revise; 7:30–9:00 conflict; 9:00–9:45 missing recordings; 9:45–12:00 final verification and reload. Reset scenarios explicitly inside the app; say when a reset starts a new test. Start the verify scenario only if the current state does not match its preconditions, and disclose its seeded state. Never claim a seeded reset persisted the earlier run. In preserve, verify and reload its approved state before resetting. Use a 20-second stall cutoff and announce Captured replay — scripted shared tools, no model inference. All fallback operations remain in the app; use the appendix captures only if the app itself is unavailable. Return to slide 22 only when the whole block is complete. Full prompts and checks are in the runbook below.

Transition: Return once, to the conclusion on slide 22.

Sources:
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/runbook.md

## 22. Design for intent. Keep people in control.

Takeaway: Design for intent. Keep people in control.

Time: 70 seconds.

Return from the app once. Tie each outcome to the opening story: studying the task gave us the constraints; explicit actions made delegation possible; review and feedback let us keep control. Mention only outcomes actually observed in the demo. If replay was used, name it again. Close with the title: your next user may be an agent, but the purpose of the product still belongs to a person.

Transition: Share the demo and source.

## 23. Try the Conference Companion

Takeaway: Try the Conference Companion

Time: 25 seconds.

Share the existing application and repository QR links. The sources and implementation excerpts are in the appendix for Q&A.

Transition: Thank the audience.

## 24. end

Takeaway: end

Time: 20 seconds.

Use the shared closing slide. This ends the timed 30-minute talk.

Transition: Contacts and optional questions.

## 25. byebye

Takeaway: byebye

Time: Optional / outside the main narrative.

Shared contacts.

Transition: Open the appendix only for a question or a complete app failure.

## 26. Appendix

Takeaway: Appendix

Time: Optional / outside the main narrative.

Optional material only. No planned live demos or slide/app switching here. The main talk ends before this section.

Transition: Choose the relevant reference slide.

## 27. A proposal needs IDs and a known revision

Takeaway: A proposal needs IDs and a known revision

Time: Optional / outside the main narrative.

Presentation excerpt of schemas.ts, with whitespace changed and the optional replacement field omitted. The description is split into concatenated strings for projection. Explain concrete IDs and optimistic revision checks. No approve flag is accepted. The schema is not the business rule; runtime validation and ProposalStore enforce it.

Transition: Return to the question or closing slide; no scheduled app switch.

Sources (reviewed 2026-10-16):
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/schemas.ts

## 28. Register capabilities, reuse the application

Takeaway: Register capabilities, reuse the application

Time: Optional / outside the main narrative.

Presentation excerpt of registerNative: formatting changed; feature detection, try/catch and optional report registration omitted. execute forwards the call to the existing application tools. The callback signal cancels execution; registrationSignal removes registrations when the page/event lifetime ends. This is browser-native WebMCP, not a backend MCP server. The API remains experimental; verify the presentation environment.

Transition: Return to the question or closing slide; no scheduled app switch.

Sources (reviewed 2026-10-16):
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/webmcp.ts
- https://github.com/webmachinelearning/webmcp

## 29. The tool returns a handoff

Takeaway: The tool returns a handoff

Time: Optional / outside the main narrative.

Selected fields from the committed preserve capture’s propose_agenda result. Proposal ID, revision and individual IDs are omitted. Six suggestions do not mean six saved writes. The agent should direct the person to the complete page diff.

Transition: Return to the question or closing slide; no scheduled app switch.

Sources (reviewed 2026-10-16):
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/events/devfest-venezia-2026/captures.json
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/tools.ts

## 30. An old approval must not apply a new change

Takeaway: An old approval must not apply a new change

Time: Optional / outside the main narrative.

Excerpt of approveFromHuman, reflowed for projection. Subsequent preservation check and write omitted. Recheck identity, status, saved revision and planning context, then schedule and preservation rules before writing. Approval is bound to this proposal and current state.

Transition: Return to the question or closing slide; no scheduled app switch.

Sources (reviewed 2026-10-16):
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agenda/proposals.ts

## 31. Both talks start at 12:35

Takeaway: Both talks start at 12:35

Time: Optional / outside the main narrative.

Both intervals are in the 24 October 2026 snapshot, Europe/Rome. The conflict is an actual scripted capture result, not a hypothetical failure. Offer a choice to the person instead of relaxing preservation. The full tool error and before/after IDs are in the captured trace.

Transition: Return to the question or closing slide; no scheduled app switch.

Sources (reviewed 2026-10-16):
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/events/devfest-venezia-2026/package.json
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/events/devfest-venezia-2026/captures.json

## 32. Unknown is a valid answer

Takeaway: Unknown is a valid answer

Time: Optional / outside the main narrative.

Selected fields from the recording scenario’s get_session_details result. Ask: Will this talk be recorded? The snapshot has no published answer; null is unknown, not false. The real response also supplies provenance. If showing reporting, enable local reports explicitly, record a sanitized recording-information gap, then disable it. This is not a message to the organizer.

Transition: Return to the question or closing slide; no scheduled app switch.

Sources (reviewed 2026-10-16):
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/events/devfest-venezia-2026/captures.json

## 33. “Done” means the saved state agrees

Takeaway: Verify saved choices, not a persuasive completion message.

Time: Optional / outside the main narrative.

Actual local screenshot after the preserve replay was approved and the page reloaded. Seven saved sessions remain. Show get_agenda total_pages and visit each page: production responses contain at most two sessions. Verify overlap_count = 0, protected_missing_count = 0, and the original selected ID remains. A seven-session fixture outcome is not a guarantee that a live model chooses the same seven.

Transition: Return to the question or closing slide; no scheduled app switch.

Sources (reviewed 2026-10-16):
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/tools.ts
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/tests/replay.browser.test.mjs

## 34. Test the state. Then test the agent.

Takeaway: Test the state. Then test the agent.

Time: Optional / outside the main narrative.

Repository evidence records 18/18 scripted fixture trials without inference. That checks deterministic paths, not model quality. Native integration was tested with Chrome DevTools MCP. The current repository still requires rehearsal of external ChatGPT on the presentation machine. Record failures and final constraints, not just calls or prose.

Transition: Return to the question or closing slide; no scheduled app switch.

Sources (reviewed 2026-10-16):
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/evidence/evaluation-fixture.json
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/browser-support.md
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/runbook.md

## 35. Registration is not a connected agent

Takeaway: Registration is not a connected agent

Time: Optional / outside the main narrative.

These exact versions are repository evidence from 12 October 2026. They are not a claim about the current presentation machine or general browser support. The app feature-detects document.modelContext and the registry. Registration only proves the page registered tools; it does not prove ChatGPT connected or reasoned correctly. Consult the experimental browser documentation before each rehearsal.

Transition: Return to the question or closing slide; no scheduled app switch.

Sources (reviewed 2026-10-16):
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/browser-support.md
- https://developer.chrome.com/docs/ai/webmcp

## 36. A fallback that still exercises the rules

Takeaway: A fallback that still exercises the rules

Time: Optional / outside the main narrative.

The five captures are preserve, conflict, reject-revise, recording and verify. They contain no model inference and make no native-client claim. Label every switch. Captures are versioned public data; replay preserves the review boundary. Loaded assets are needed: the app has no service worker and does not promise fresh offline navigation.

Transition: Return to the question or closing slide; no scheduled app switch.

Sources (reviewed 2026-10-16):
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/presenter/replay.ts
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/runbook.md

## 37. The repository also contains a bounded loop

Takeaway: The repository also contains a bounded loop

Time: Optional / outside the main narrative.

The current React UI uses external ChatGPT rather than an embedded assistant. Do not demonstrate loop.ts as the ChatGPT implementation. In that optional loop, cancellation and context changes stop work; call/result IDs are retained; proposal review is awaited. This is teaching and fixture material, not proof of a cloud-model run.

Transition: Return to the question or closing slide; no scheduled app switch.

Sources (reviewed 2026-10-16):
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/agents/loop.ts
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/src/app/EventPage.tsx

## 38. 18/18 is a fixture result

Takeaway: 18/18 is a fixture result

Time: Optional / outside the main narrative.

Historical evidence: dataset 2026-10-12.1, build commit 4b1418af9d6b60eb99fc7402f9256ba0a5d72212. The recorded result predates the current React/Vite commit. Do not relabel it as a benchmark for a model or the current checkout. New execution results belong in the validation record with their own commit and date.

Transition: Return to the question or closing slide; no scheduled app switch.

Sources (reviewed 2026-10-16):
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/evidence/evaluation-fixture.json

## 39. Declarative forms live in the teaching spike

Takeaway: Declarative forms live in the teaching spike

Time: Optional / outside the main narrative.

The isolated spike checks browser compatibility; direct add_to_agenda is only a fixture. Do not present it as the production agenda policy. Production search is registered once through the imperative API so it carries the appropriate annotations. For a shorter talk omit this appendix entirely.

Transition: Return to the question or closing slide; no scheduled app switch.

Sources (reviewed 2026-10-16):
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/experiments/webmcp/main.ts
- https://github.com/Puppo/your-next-user-is-an-ai-agent/blob/8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505/docs/browser-support.md

## 40. Sources behind this demo

Takeaway: Sources behind this demo

Time: Optional / outside the main narrative.

Application reviewed at commit 8f6f7ebcf1a5ab2e18fee7ea00ba03c95dd35505. Technical excerpts and UI captures are tied to this revision; sources and capture methods are recorded in speaker-notes.md. Current registration/cancellation docs checked via Context7 on 16 October 2026. Event facts come from the reviewed event package, not the older synthetic journey-design document.

Transition: Return to the question or closing slide; no scheduled app switch.

Sources (reviewed 2026-10-16):
- https://github.com/Puppo/your-next-user-is-an-ai-agent
- https://github.com/webmachinelearning/webmcp
- https://developer.chrome.com/docs/ai/webmcp

## 41. cover

Takeaway: cover

Time: Optional / outside the main narrative.

Closing cover.

Transition: End.

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

### One continuous demo block — slide 21 → slide 22

Leave the deck once at slide 21. Stay in the application through every scene, including resets and replay. Return only to slide 22 after verification. No theory slides between scenarios.

| Elapsed | Scene | Start and observable check |
| --- | --- | --- |
| 0:00–1:30 | Use the screen | Preserve reset; search and details; original saved talk remains. |
| 1:30–5:00 | Plan and approve | Preserve reset; discover tools; planning prompt; inspect full diff; saved count stays one until the person approves. Read back and reload this result BEFORE any reset. |
| 5:00–7:30 | Reject and revise | Announce reject-revise reset. Reject first draft; confirm saved state unchanged; request revision; replacement still needs review. |
| 7:30–9:00 | Conflict | Announce conflict reset. Request the competing 12:35 talk; inspect overlap; original choice remains. |
| 9:00–9:45 | Missing information | Ask the recording question; show unknown/null and the source. No invented availability. |
| 9:45–12:00 | Verify | Inspect every agenda page, preserved choice, overlap count and reload. If using the verify scenario, explicitly disclose its seeded seven-session starting state. |

A scenario reset is a new test case, not continuity evidence. The preserve scene proves persistence of its own approved result before a reset. The final verify scenario checks its declared starting state.

At any 20-second stall, announce **Captured replay — scripted shared tools, no model inference**, then use the same scene inside the app. If the app itself cannot run, disclose that and show the appendix captures as a fallback; they are not live results. Keep the deck parked on slide 21 during normal operation.

For a 20-minute cut: trim the theory to 12 minutes by skipping slides 5, 12, 13 and shortening 4–6 and 15–18; use an 8-minute demo by shortening UI exploration, omitting reject/revise and the recording question, retaining preserve/approval, conflict and verification. Never cut the human handoff or the saved-state check.

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

The 16 October app captures and historical fixture evidence retain their original provenance; this narrative rewrite does not constitute a new external-client rehearsal. On 2026-10-19 the production build, ESLint, CSS lint and TypeScript checks passed. All 41 slides have notes and valid bookends; referenced assets exist and displayed code matches its source. Chromium 156.0.8078.4 traversed all 41 slides after decoding images, with no page errors, failed requests or detected text overflow. All browser captures were visually reviewed. The demo is scheduled only on slide 21, returning to slide 22; timed slides total 1,800 seconds. The built-in headed verifier was not rerun; this check used the local server and a complete headless traversal.

PDF validation on 2026-10-19: Freya logged successful export of all 41 slides; pdfinfo confirms 41 pages and all pages rasterize successfully. All PDF pages were visually inspected. The local export used a temporary 180-second navigation allowance. The command wrapper returned 143 after the completion log; the generated artifact was independently checked rather than treating that wrapper status as a clean exit. No repository toolchain configuration was changed.
