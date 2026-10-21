export const topics = ['AI & Agents', 'Web Platform', 'React', 'TypeScript', 'Developer Tools'] as const
export type Topic = (typeof topics)[number]

interface Editorial {
  topics: Topic[]
  summary: string
  poster: string
  color: string
  artwork?: string
  featured?: boolean
}

export const catalog: Record<string, Editorial> = {
  'your-next-user-is-an-ai-agent': {
    topics: ['AI & Agents', 'Web Platform'],
    summary:
      'From interfaces for people to applications that agents can use. Meet browser tools, WebMCP and the human in control.',
    poster: 'Human.\nAgent.\nTogether.',
    color: 'mint',
    artwork: 'human_agent.webp',
    featured: true
  },
  'dont-trust-your-types': {
    topics: ['TypeScript', 'Developer Tools'],
    summary: 'Your runtime tests pass. What about your types? Put your TypeScript contracts to the test with TSTyche.',
    poster: 'Trust your\ntypes?',
    color: 'peach'
  },
  'vibe-coding-let-s-follow-the-flow': {
    topics: ['AI & Agents', 'Developer Tools'],
    summary: 'Explore the space between AI assistance, rapid prototypes and software you can actually maintain.',
    poster: 'Find\nyour flow.',
    color: 'lavender',
    artwork: 'developer_wall.webp'
  },
  'react-compiler-how-can-you-help-me': {
    topics: ['React', 'Web Platform'],
    summary: 'A closer look at React Compiler: what it optimizes, how it works and what changes in your everyday code.',
    poster: 'React.\nCompile.\nRepeat.',
    color: 'blue'
  },
  'ai-in-the-browser-am-i-still-waiting-for-it': {
    topics: ['AI & Agents', 'Web Platform'],
    summary: 'Bring AI closer to the user. Explore what models and browser APIs make possible on the client.',
    poster: 'AI meets\nthe browser.',
    color: 'yellow'
  },
  'costruiamo-agenti-con-adk-js': {
    topics: ['AI & Agents', 'TypeScript'],
    summary: 'Dagli strumenti al ciclo di esecuzione: costruiamo agenti con ADK-js, un passo alla volta.',
    poster: 'Agenti.\nIn pratica.',
    color: 'mint'
  },
  'ai-agents-made-simple': {
    topics: ['AI & Agents'],
    summary: 'Understand the building blocks of an AI agent, from its first tool call to a useful workflow.',
    poster: 'Think.\nAct.\nRepeat.',
    color: 'lavender'
  },
  'chromedevtools-are-you-confident-in-your-expertise': {
    topics: ['Developer Tools', 'Web Platform'],
    summary: 'Go beyond the console and discover the Chrome DevTools features that make debugging click.',
    poster: 'Inspect\nthe unexpected.',
    color: 'peach'
  },
  'chromedevtools-for-super-fast-ssr-applications': {
    topics: ['Developer Tools', 'Web Platform'],
    summary: 'Find the bottlenecks in server-rendered applications and turn browser evidence into faster experiences.',
    poster: 'Less wait.\nMore web.',
    color: 'blue'
  }
}
