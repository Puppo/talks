import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'
import { type BuildContext } from '@perseveranza-pets/dante'
import {
  filterWhitelistedTalks,
  getAllTalks,
  getTalk,
  getTheme,
  setWhitelistedTalks,
  type Command,
  type SetupCLI
} from '@perseveranza-pets/freya'
import { type Logger } from 'pino'
import { chromium, type Browser, type BrowserContext, type Page } from 'playwright'

type BrowserEnvironment = [Browser, BrowserContext, Page]

interface GenerateCFPOptions {
  only: string
  output: string
}

interface VerifyOptions {
  only: string
  compare: boolean
  remote: boolean
  delay: number
}

async function selectedTalks(only: string): Promise<Set<string>> {
  setWhitelistedTalks(only)
  return filterWhitelistedTalks({ isProduction: false } as unknown as BuildContext, await getAllTalks())
}

async function generateCFP(talks: Set<string>, output: string): Promise<void> {
  const json = []

  let i = 0
  for (const id of talks) {
    const talk = await getTalk(id)

    json.push({
      name: talk.document.title,
      keyword: `cfp§${++i}`,
      text:
        talk.document.title +
        '\n\n' +
        talk.document.abstract
          .replaceAll(/[ ]+$/gm, '')
          .replaceAll('\n\n', '\u{0001}')
          .replaceAll('\n', '')
          .replaceAll('\u{0001}', '\n\n')
    })
  }

  await writeFile(resolve(process.cwd(), output), JSON.stringify(json, null, 2) + '\n')
}

async function findScreenResolution(): Promise<[number, number]> {
  const browser = await chromium.launch({ args: ['--start-maximized'] })
  const context = await browser.newContext({ ignoreHTTPSErrors: true, viewport: null })
  const page = await context.newPage()

  const [width, height] = await page.evaluate(() => {
    return [window.screen.availWidth, window.screen.availHeight]
  })
  await browser.close()

  return [width, height]
}

async function createBrowser(url: string, count: number, width: number, height: number): Promise<BrowserEnvironment> {
  const windowWidth = Math.floor(width)
  const positionX = count * windowWidth

  const browser = await chromium.launch({
    headless: false,
    args: [`--window-position=${positionX},0`, `--window-size=${windowWidth},${height}`]
  })
  const context = await browser.newContext({ ignoreHTTPSErrors: true, viewport: null })
  const page = await context.newPage()

  await page.goto(url)
  await page.waitForLoadState('load')
  await page.waitForSelector('[data-freya-id="loading"]', { state: 'detached' })

  return [browser, context, page]
}

async function advance(page?: Page): Promise<void> {
  if (!page) {
    return
  }

  await page.press('body', 'ArrowRight')
}

async function verify(id: string, compare: boolean, remote: boolean, delay: number): Promise<void> {
  const talk = await getTalk(id)
  const slidesCount = talk.slides.length

  const theme = await getTheme(talk.config.theme)
  const localUrl = `${theme.urls.development}/${talk.id}`
  const remoteUrl = `${theme.urls.production}/${talk.id}`
  const currentUrl = compare || !remote ? localUrl : remoteUrl

  const [width, height] = await findScreenResolution()

  const [currentBrowser, referenceBrowser] = await Promise.all([
    createBrowser(currentUrl, 0, width / (compare ? 2 : 1), height),
    compare ? createBrowser(remoteUrl, 1, width / 2, height) : Promise.resolve([] as unknown as BrowserEnvironment)
  ])

  await sleep(delay)

  for (let i = 0; i < slidesCount; i++) {
    await Promise.all([advance(currentBrowser[2]), advance(referenceBrowser[2])])
    await sleep(delay)
  }

  await currentBrowser[0].close()
  await referenceBrowser[0]?.close()
}

export const setupCLI: SetupCLI = (program: Command, logger: Logger) => {
  program
    .command('generate-cfp')
    .description('Generates CFP abstracts for the selected talks')
    .option('-O, --output <path>', 'The output JSON file, relative to the working directory.', 'cfp-abstracts.json')
    .action(async function (this: Command): Promise<void> {
      try {
        const { only, output }: GenerateCFPOptions = this.optsWithGlobals()
        await generateCFP(await selectedTalks(only), output)
      } catch (error) {
        logger.error(error)
        process.exitCode = 1
      }
    })

  program
    .command('verify')
    .description('Opens the selected talks in a browser and advances through all slides')
    .option('-c, --compare', 'If to compare local and remote version')
    .option('-r, --remote', 'If to check remote version when not comparing')
    .option(
      '-d, --delay <duration>',
      'How much to wait before advancing to the next slide',
      (v: string) => Number.parseInt(v, 10),
      1500
    )
    .action(async function (this: Command): Promise<void> {
      try {
        const { compare, remote, delay, only }: VerifyOptions = this.optsWithGlobals()

        for (const talk of await selectedTalks(only)) {
          await verify(talk, compare, remote, delay)
        }
      } catch (error) {
        logger.error(error)
        process.exitCode = 1
      }
    })
}
