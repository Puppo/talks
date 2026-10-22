import { resolve } from 'node:path'
import { type BuildContext } from '@perseveranza-pets/dante'
import { build as buildSlides } from '@perseveranza-pets/freya'
import { writeHomepage } from '../homepage/build.ts'

export async function build(context: BuildContext): Promise<Awaited<ReturnType<typeof buildSlides>>> {
  const result = await buildSlides(context)
  const directory = context.extensions.freya.netlify ? resolve(context.root, 'html') : resolve('dist/html')
  await writeHomepage(directory, context.version)
  return {
    ...result,
    css: async pageContext =>
      pageContext.currentPage?.endsWith('/index.html')
        ? ''
        : typeof result.css === 'function'
          ? result.css(pageContext)
          : (result.css ?? '')
  }
}
