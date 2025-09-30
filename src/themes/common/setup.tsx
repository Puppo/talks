import { type BuildContext } from '@perseveranza-pets/dante'
import { ensureRenderedCode, resolveImageUrl, type Talk, type Theme } from '@perseveranza-pets/freya'
import { resolve } from 'node:path'
import { wrapTalkClasses } from './components/common.js'
import { resolveIcon } from './components/icons.js'
import { type DecorationsClasses, type ItemClasses, type Slide, type SlideClasses } from './models.ts'

interface Icon {
  width: number
  height: number
  svgPathData: string
}

function camelCase(source: any): string {
  if (typeof source !== 'string' || !source.length) {
    return source
  }

  return source
    .toLowerCase()
    .replaceAll(/[^\d\sa-z]/g, ' ')
    .replaceAll(/(^.|\s.)/g, (...t) => t[1].toUpperCase())
}

const baseIcons = [
  'desktop@free/solid:desktop',
  'file-pdf@free/solid:file-pdf',
  'lightbulb@free/solid:lightbulb',
  'puzzle-piece@free/solid:puzzle-piece',
  'network-wired@free/solid:network-wired',
  'chart-network@free/regular:chart-network',
  'chevron-left@free/solid:chevron-left',
  'chevron-right@free/solid:chevron-right',
  'chevron-up@free/solid:chevron-up',
  'minus@free/solid:minus',
  'poo@free/solid:poo',
  'user@free/regular:user',
  'face-meh@free/regular:face-meh',
  'face-frown@free/regular:face-frown',

  'bolt@free/solid:bolt',
  'google@free/brands:google',
  'linkedin@free/brands:linkedin',
  'twitter@free/brands:x-twitter',
  'github@free/brands:github',
  'youtube@free/brands:youtube',
  'facebook@free/brands:facebook'
]

export async function setupServer(context: BuildContext, theme: Theme, talk: Talk): Promise<object> {
  const loadedIcons: Record<string, Icon> = {}
  const iconsToLoad: string[] = [...baseIcons]
  const images = new Set<string>()

  for (const slide of talk.slides as Slide[]) {
    // Sanitize some options
    slide.options ??= {}
    slide.decorations ??= { className: {} }
    slide.decorations.className ??= {}
    slide.className ??= {}

    for (const item of slide.items?.entries ?? []) {
      if (item.code) {
        await ensureRenderedCode(item.code)
      }

      if (item.icon) {
        iconsToLoad.push(item.icon)
      }

      if (item.image) {
        images.add(resolveImageUrl({}, theme.id, talk.id, item.image))
      }

      if (item.className) {
        for (const [key, value] of Object.entries(item.className as Record<string, string | undefined>)) {
          item.className[key as keyof ItemClasses] = wrapTalkClasses(value)
        }
      }
    }

    for (const grid of slide.grids ?? []) {
      for (const item of grid.entries ?? []) {
        if (item.code) {
          await ensureRenderedCode(item.code)
        }

        if (item.icon) {
          iconsToLoad.push(item.icon)
        }

        if (item.image) {
          images.add(resolveImageUrl({}, theme.id, talk.id, item.image))
        }

        if (item.className) {
          for (const [key, value] of Object.entries(item.className as Record<string, string | undefined>)) {
            item.className[key as keyof ItemClasses] = wrapTalkClasses(value)
          }
        }
      }

      if (grid.className) {
        grid.className = wrapTalkClasses(grid.className)
      }
    }

    if (slide.image) {
      images.add(resolveImageUrl({}, theme.id, talk.id, slide.image.url))

      if (slide.image.className) {
        slide.image.className = wrapTalkClasses(slide.image.className)
      }
    }

    if (slide.code) {
      if (slide.code.className) {
        for (const [key, value] of Object.entries(slide.code.className)) {
          slide.code.className[key] = wrapTalkClasses(value)
        }
      }

      await ensureRenderedCode(slide.code)
    }

    if (slide.highlight?.className) {
      slide.highlight.className = wrapTalkClasses(slide.highlight.className)
    }

    if (slide.quote) {
      if (slide.quote.primaryIconClassName) {
        slide.quote.primaryIconClassName = wrapTalkClasses(slide.quote.primaryIconClassName)
      }

      if (slide.quote.secondaryIconClassName) {
        slide.quote.secondaryIconClassName = wrapTalkClasses(slide.quote.secondaryIconClassName)
      }

      if (slide.quote.primaryIcon) {
        iconsToLoad.push(slide.quote.primaryIcon)
      }

      if (slide.quote.secondaryIcon) {
        iconsToLoad.push(slide.quote.secondaryIcon)
      }
    }

    if (slide.decorations) {
      if (slide.decorations.icon) {
        iconsToLoad.push(slide.decorations.icon)
      }

      if (slide.decorations.className) {
        for (const [key, value] of Object.entries(slide.decorations.className as Record<string, string | undefined>)) {
          slide.decorations.className[key as keyof DecorationsClasses] = wrapTalkClasses(value)
        }
      }
    }

    if (slide.className) {
      for (const [key, value] of Object.entries(slide.className as Record<string, string | undefined>)) {
        slide.className[key as keyof SlideClasses] = wrapTalkClasses(value)
      }
    }
  }

  // Load all icons
  for (const icon of iconsToLoad) {
    const { package: pkg, alias, name, section } = resolveIcon(icon)

    const fileName = `fa${camelCase(`${name}`).replaceAll(/\s/g, '')}.js`
    const path = `node_modules/@fortawesome/${pkg}-${section}-svg-icons/${fileName}`

    if (!loadedIcons[icon]) {
      try {
        const { width, height, svgPathData }: Icon = await import(resolve(process.cwd(), path))

        loadedIcons[alias ?? icon] = { width, height, svgPathData }
      } catch (e) {
        context.logger.error(`Invalid icon: \x1b[1m${icon}\x1b[22m, ignoring it.`)
        loadedIcons[alias ?? icon] = { width: 0, height: 0, svgPathData: '' }
      }
    }
  }

  talk.images = Array.from(images)

  return { icons: loadedIcons }
}
