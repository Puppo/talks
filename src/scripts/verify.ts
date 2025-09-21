import { type BuildContext } from '@perseveranza-pets/dante'
import { filterWhitelistedTalks, getAllTalks, getTalk, getTheme, setWhitelistedTalks } from '@perseveranza-pets/freya'
import { program, type Command } from 'commander'
import { chromium, type Browser, type BrowserContext, type Page } from 'playwright'
import { setTimeout as sleep } from 'timers/promises'

type BrowserEnvironment = [Browser, BrowserContext, Page]

interface Options {
  only: string
  compare: boolean
  remote: boolean
  delay: number
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

  // Open the URL
  await page.goto(url)
  await Promise.all([page.waitForLoadState('load')])
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
  // Get the talk and its dimensions
  const talk = await getTalk(id)
  const slidesCount = talk.slides.length

  // Calculate URLs
  const theme = await getTheme(talk.config.theme)
  const localUrl = `${theme.urls.development}/${talk.id}`
  const remoteUrl = `${theme.urls.production}/${talk.id}`
  const currentUrl = compare || !remote ? localUrl : remoteUrl

  // Compute the size of the browser
  const [width, height] = await findScreenResolution()

  // Create the browsers
  const [currentBrowser, referenceBrowser] = await Promise.all([
    await createBrowser(currentUrl, 0, width / (compare ? 2 : 1), height),
    compare ? await createBrowser(remoteUrl, 1, width / 2, height) : []
  ])

  // Advance all the slides
  await sleep(delay)

  for (let i = 0; i < slidesCount; i++) {
    await Promise.all([advance(currentBrowser[2]), advance(referenceBrowser?.[2])])
    await sleep(delay)
  }

  await currentBrowser[0].close()
  await referenceBrowser[0]?.close()
}

program
  .name('verify')
  .option('-o, --only <string>', 'A comma separated list of talks to build.', '')
  .option('-c, --compare', 'If to compare local and remote version')
  .option('-r, --remote', 'If to check remote version when not comparing')
  .option(
    '-d, --delay <duration>',
    'How much to wait before advancing to the next slide',
    (v: string) => Number.parseInt(v, 10),
    1500
  )
  .addHelpCommand(false)
  .showSuggestionAfterError(true)
  .allowUnknownOption(false)
  .action(async function verifyAction(this: Command): Promise<void> {
    try {
      // Determine window dimension
      const { compare, remote, delay, only }: Options = this.optsWithGlobals()
      setWhitelistedTalks(only)

      for (const talk of filterWhitelistedTalks(
        { isProduction: false } as unknown as BuildContext,
        await getAllTalks()
      )) {
        await verify(talk, compare, remote, delay)
      }
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  })

program.parse()
