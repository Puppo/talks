import {
  QRCode,
  cleanCssClasses,
  tokenizeCssClasses,
  useClient,
  type CSSClassToken
} from '@perseveranza-pets/freya/client'
import { type VNode } from 'preact'
import { type Slide } from '../../common/models.js'

interface TextProps {
  text: string
  className?: string
}

interface ComplexContentProps {
  slide: Slide
  raw: Record<string, any>
}

export function wrapTalkClasses(...klasses: (CSSClassToken | CSSClassToken[])[]): string {
  return (
    tokenizeCssClasses(...klasses)
      // .map(klass => (klass.includes('@') ? klass : `talk@${klass}`))
      .join(' ')
  )
}

export function Text({ text, className }: TextProps): VNode {
  const { parseContent } = useClient()

  text = parseContent(text).replaceAll(
    / class(?:(?:Name)?)="([^"]+)"/g,
    (_: string, className: string) => ` class="${cleanCssClasses(wrapTalkClasses(className))}"`
  )

  return (
    <span className={className ? cleanCssClasses(className) : undefined} dangerouslySetInnerHTML={{ __html: text }} />
  )
}

export function ComplexContent({ raw, slide }: ComplexContentProps): VNode {
  if (raw.qr) {
    return <QRCode data={raw.qr} className={{ code: cleanCssClasses(slide.className.qr) }} />
  }

  return <></>
}
