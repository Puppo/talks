<div align="center">

# 🎙️✨ Luca Del Puppo — Public Tech Talks ✨🎙️

[![Website](https://img.shields.io/badge/🌐_Live_Decks-talks.delpuppo.net-FF6B6B?style=for-the-badge)](https://talks.delpuppo.net)
[![Powered by Freya](https://img.shields.io/badge/⚡_Powered_by-Freya-7C3AED?style=for-the-badge)](https://github.com/perseveranza-pets/freya)
[![TypeScript](https://img.shields.io/badge/🔷_TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/📜_License-Apache_2.0-10B981?style=for-the-badge)](http://www.apache.org/licenses/LICENSE-2.0)

**🚀 Interactive slide decks, workshops, and conference presentations built with code, YAML & love ❤️**

[🌐 Browse Live Decks](https://talks.delpuppo.net) • [👨‍💻 About the Speaker](#-about-the-speaker) • [🎬 Talk Catalog](#-featured-talks--decks) • [🛠️ Quick Start](#️-quick-start--commands) • [🤖 AI Agent Ready](#-ai-agent--skills-workflow)

</div>

---

## 🌟 Overview

Welcome to the official repository for **Luca Del Puppo's** public tech talks! 🎉

Every presentation in this repository is a self-contained, version-controlled slide deck powered by [**Freya**](https://github.com/perseveranza-pets/freya) ⚡ and rendered with **Preact + TypeScript + SWC** 🎨. Slides are authored declaratively in YAML (`slides.yml`), styled with a shared custom design system (`src/themes/main/`), and automatically deployed to [**talks.delpuppo.net**](https://talks.delpuppo.net) 🌍.

---

## 🎬 Featured Talks & Decks

| 🎤 Talk Title | 📝 Topic & Abstract | 🔗 Deck & Source |
| :--- | :--- | :---: |
| 🤖 **Your Next User Is an AI Agent** | How AI agents operate in the browser, the agent loop, browser tools, and **WebMCP** with practical TypeScript examples. | [🌐 Live](https://talks.delpuppo.net/your-next-user-is-an-ai-agent) · [📂 Code](src/talks/your-next-user-is-an-ai-agent) |
| 🛡️ **Don't Trust Your Types: Type Testing with TSTyche** | Protecting TypeScript public contracts, route inference, invalid usage, and version compatibility using **TSTyche**. | [🌐 Live](https://talks.delpuppo.net/dont-trust-your-types) · [📂 Code](src/talks/dont-trust-your-types) |
| 🧠 **AI Agents Made Simple** | Exploring the capabilities of AI agents and building effective agentic workflows with **LangChain**. | [🌐 Live](https://talks.delpuppo.net/ai-agents-made-simple) · [📂 Code](src/talks/ai-agents-made-simple) |
| 🌐 **AI in the Browser: Am I Still Waiting for It?** | The current state of client-side AI in the browser—are we truly leveraging its potential yet? | [🌐 Live](https://talks.delpuppo.net/ai-in-the-browser-am-i-still-waiting-for-it) · [📂 Code](src/talks/ai-in-the-browser-am-i-still-waiting-for-it) |
| 🧩 **Costruiamo agenti con ADK-js** *(🇮🇹 Workshop)* | Esploriamo le basi e le potenzialità di **ADK-js** per costruire agenti intelligenti. | [🌐 Live](https://talks.delpuppo.net/costruiamo-agenti-con-adk-js) · [📂 Code](src/talks/costruiamo-agenti-con-adk-js) |
| ⚛️ **React Compiler, how can you help me?** | Deep dive into the **React Compiler** and how automatic memoization supercharges your development workflow. | [🌐 Live](https://talks.delpuppo.net/react-compiler-how-can-you-help-me) · [📂 Code](src/talks/react-compiler-how-can-you-help-me) |
| 🌊 **Vibe Coding: Let’s Follow the Flow** | Embracing flow state, collaborative team culture, and modern AI-assisted coding for rapid problem-solving. | [🌐 Live](https://talks.delpuppo.net/vibe-coding-let-s-follow-the-flow) · [📂 Code](src/talks/vibe-coding-let-s-follow-the-flow) |
| 🔍 **ChromeDevTools—are you confident in your expertise?** | Mastering **Chrome DevTools** to level up debugging, performance profiling, and developer productivity. | [🌐 Live](https://talks.delpuppo.net/chromedevtools-are-you-confident-in-your-expertise) · [📂 Code](src/talks/chromedevtools-are-you-confident-in-your-expertise) |
| 🚀 **Chrome DevTools, for super fast SSR applications!** | Optimizing Server-Side Rendered (SSR) apps with Chrome DevTools for peak performance and accessibility. | [🌐 Live](https://talks.delpuppo.net/chromedevtools-for-super-fast-ssr-applications) · [📂 Code](src/talks/chromedevtools-for-super-fast-ssr-applications) |

> 💡 **Tip:** Looking for a reference of every available slide layout? Check out [`src/talks/__master/`](src/talks/__master/) 🧪 — the canonical layout showcase!

---

## 🗂️ Repository Architecture

```text
📦 talks/
├── 📁 src/
│   ├── 📁 talks/                  # 🎤 Individual slide decks (one folder per talk slug)
│   │   ├── 📁 __master/           # 📐 Canonical layout reference & master template
│   │   ├── 📁 <talk-slug>/        # 🎯 info.yml, slides.yml, talk.css & WebP assets
│   │   └── 📄 common.yml          # 🤝 Shared author, company & deck configuration
│   ├── 📁 themes/
│   │   ├── 📁 main/               # 🎨 Core Freya theme (layouts, components, fonts, styles)
│   │   └── 📁 common/             # 🧩 Shared theme assets & utilities
│   ├── 📁 build/                  # ⚙️ Custom Freya CLI extensions (verify, generate-cfp)
│   └── 📁 scripts/                # 🖼️ Image conversion & asset helper scripts
├── 📁 skills/                     # 🤖 Reusable AI Agent skills (build-talk, review-talk)
├── 📄 cfp-abstracts.json          # 📋 Auto-generated CFP abstracts catalog
├── 📄 cfp-generic.json            # 🪪 Curated speaker bio & links for CFPs
└── 📄 AGENTS.md                   # 🧭 Onboarding guide for AI coding assistants
```

---

## 🛠️ Quick Start & Commands

### 📦 Prerequisites & Installation

Make sure you have **Node.js** installed, then install dependencies:

```bash
npm install
```

### 🚀 Common Workflows

| 🎯 Action | 💻 Command | 📝 Description |
| :--- | :--- | :--- |
| **🔥 Start Dev Server (All)** | `npm run dev` | Launches local hot-reloading server for all decks |
| **🎯 Start Dev Server (Single)** | `npm run dev -- --only <slug>` | Preview a single talk at `http://delpuppo.local:4200/<slug>` |
| **🏗️ Production Build** | `npm run build` | Builds static decks + runs ESLint, Stylelint & TypeScript checks |
| **📄 Export to PDF** | `npm run pdf` | Renders slide decks into portable PDF files |
| **📊 Export to PowerPoint** | `npm run pptx` | Exports presentations to `.pptx` format (in `pptx/`) |
| **🎭 Playwright Verification** | `npm run verify -- --only <slug>` | Walks through slides in a headless browser to verify rendering |
| **🖼️ Convert Images to WebP** | `npm run convert-images` | Converts source JPG/PNG in `assets/__originals/` to `.webp` |
| **📋 Sync CFP Abstracts** | `npm run generate-cfp` | Regenerates `cfp-abstracts.json` from each talk's `info.yml` |
| **🧹 Format Codebase** | `npm run format` | Formats YAML, CSS, and TypeScript across `src/` with Prettier |
| **🔍 Lint & Typecheck** | `npm run lint && npm run lint:css && npm run typecheck` | Runs ESLint, Stylelint, and `tsc --noEmit` |

---

## 🎨 Creating a New Talk

Adding a new presentation is super straightforward! 🪄

1. 📁 **Create a folder** under `src/talks/<your-kebab-case-slug>/`.
2. 📝 **Add `info.yml`** referencing `common.config`, `common.author`, and `common.company`.
3. 🎞️ **Compose `slides.yml`** starting with `cover` ➡️ `hello` ➡️ `nearform` layouts and closing with `end` ➡️ `byebye` ➡️ `cover`.
4. 🖼️ **Optimize images** by placing originals in `assets/__originals/` and running `npm run convert-images`.
5. 📋 **Update CFP metadata** via `npm run generate-cfp`.
6. ✅ **Verify everything** with `npm run build` and `npm run verify -- --only <slug>`.

---

## 🤖 AI Agent & Skills Workflow

This repository is **first-class AI-agent friendly**! 🧠✨

- 📖 **[`AGENTS.md`](AGENTS.md)** — Complete repository conventions, layout rules, and quality gates.
- 🛠️ **[`skills/build-talk/SKILL.md`](skills/build-talk/SKILL.md)** — Step-by-step skill for scaffolding and authoring new slide decks.
- 🔎 **[`skills/review-talk/SKILL.md`](skills/review-talk/SKILL.md)** — Automated editorial and structural review workflow for existing talks.

---

## 👨‍💻 About the Speaker

<div align="center">

<img src="https://avatars.githubusercontent.com/u/2527849?v=4" width="120" height="120" style="border-radius: 50%;" alt="Luca Del Puppo" />

### **Luca Del Puppo** 🇮🇹
**AI Native Engineer @ [Nearform](https://nearform.com)**  
🏆 *Google Developer Expert (Web Technologies) • Former Microsoft MVP • Codemotion & GitKraken Ambassador*

[![Website](https://img.shields.io/badge/🌐_Website-delpuppo.net-2563EB?style=flat-square)](https://delpuppo.net)
[![GitHub](https://img.shields.io/badge/🐙_GitHub-@Puppo-181717?style=flat-square)](https://github.com/Puppo)
[![Twitter / X](https://img.shields.io/badge/🐦_Twitter-@puppo92-1DA1F2?style=flat-square)](https://twitter.com/puppo92)
[![LinkedIn](https://img.shields.io/badge/💼_LinkedIn-lucadelpuppo-0A66C2?style=flat-square)](https://www.linkedin.com/in/lucadelpuppo/)
[![YouTube](https://img.shields.io/badge/📺_YouTube-@Puppo__92-FF0000?style=flat-square)](https://www.youtube.com/@Puppo_92)

</div>

---

<div align="center">

📜 Licensed under the **[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)** • Made with ☕, 💻, and ✨ by **[Luca Del Puppo](https://delpuppo.net)**

</div>
