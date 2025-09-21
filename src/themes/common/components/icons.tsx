import { cleanCssClasses, generateSVGId, useClient } from '@perseveranza-pets/freya/client'
import { type VNode } from 'preact'
import { render } from 'preact-render-to-string'

interface SvgIconProps {
  name: string
  className?: string
}

export function resolveIcon(icon: string): Record<string, string> {
  // Parse the icon name - Syntax: [alias@][package/][section:]<icon>
  let groups = icon.match(/^(?:(?<alias>.+)@)?(?:(?<package>.+)\/)?(?:(?<section>.+):)?(?<name>[^:@/]+)$/)?.groups

  if (!groups) {
    groups = { name: icon }
  }

  const { package: pkg, alias, name, section } = groups

  return { package: pkg ?? 'pro', alias, name, section: section ?? 'light' }
}

export function SvgIcon({ name: icon, className }: SvgIconProps): VNode {
  const { assets, serverData } = useClient()

  const { alias, name } = resolveIcon(icon)
  const key = `icon:${alias ?? name}`

  if (!assets.svgs[key]) {
    const loadedKey = alias ?? icon
    if (!serverData) {
      throw new Error('Missing icon on the client: ' + loadedKey)
    } else if (!serverData.theme.icons[icon]) {
      throw new Error('Missing icon on the server: ' + loadedKey)
    }

    const pathProperties = [
      { className: cleanCssClasses('theme@icon__path--primary') },
      { className: cleanCssClasses('theme@icon__path--secondary') }
    ]

    const id = generateSVGId(assets.svgsDefinitions.length)
    const { width, height, svgPathData } = serverData.theme.icons[loadedKey]

    // Generate the ID
    assets.svgs[key] = [id, `0 0 ${width} ${height}`]
    assets.svgsDefinitions.push(
      render(
        <svg id={id} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
          {[svgPathData].flat(1).map((p, i) => (
            <path key={i} d={p} {...pathProperties.shift()} />
          ))}
        </svg>
      )
    )
  }

  const [id, viewBox] = assets.svgs[key]

  return (
    <svg className={cleanCssClasses('freya@svg', 'theme@icon', className)} viewBox={viewBox}>
      <use xlinkHref={`#${id}`} />
    </svg>
  )
}
