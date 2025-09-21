import { type BuildContext } from '@perseveranza-pets/dante'
import { filterWhitelistedTalks, getAllTalks, getTalk, setWhitelistedTalks } from '@perseveranza-pets/freya'
import { program, type Command } from 'commander'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

interface Options {
  only: string
  output: string
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

  await writeFile(resolve(process.cwd(), output), JSON.stringify(json, null, 2))
}

program
  .name('generate-cfp')
  .option('-o, --only <string>', 'A comma separated list of talks to build.', '')
  .option('-O, --output', 'If to compare local and remote version', '../cfp-abstracts.json')
  .addHelpCommand(false)
  .showSuggestionAfterError(true)
  .allowUnknownOption(false)
  .action(async function verifyAction(this: Command): Promise<void> {
    try {
      // Determine window dimension
      const { only, output }: Options = this.optsWithGlobals()
      setWhitelistedTalks(only)

      const talks = filterWhitelistedTalks({ isProduction: false } as unknown as BuildContext, await getAllTalks())

      await generateCFP(talks, output)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  })

program.parse()
