import { Progress, QRCode, Svg, cleanCssClasses, useClient, useSlide } from '@perseveranza-pets/freya/client'
import { type ComponentChildren, type JSX, type VNode } from 'preact'
import { Text } from '../../common/components/common.js'
import { SvgIcon } from '../../common/components/icons.js'
import { type Slide } from '../../common/models.js'

interface SlideWrapperProps {
  slide: Slide
  index: number
  defaultLogoColor?: 'black' | 'white'
  className?: string
  style?: JSX.CSSProperties
  children: ComponentChildren | ComponentChildren[]
}

interface AccentProps {
  className?: string
}

type DecorationProps = Pick<SlideWrapperProps, 'defaultLogoColor'>

export function Accent({ className }: AccentProps): VNode {
  return <span className={cleanCssClasses('theme@accent', className)} />
}

export function Decorations({ defaultLogoColor }: DecorationProps): VNode {
  const {
    isProduction,
    talk: { id, slidesPadding },
    theme: { urls }
  } = useClient()
  const { slide, index } = useSlide<Slide>()

  const {
    number,
    icon,
    logo,
    permalink,
    className: { icon: iconClassName, number: numberClassName, permalink: permalinkClassName }
  } = slide.decorations ?? {}

  return (
    <>
      {number && (
        <h2 className={cleanCssClasses('theme@number', numberClassName)}>
          <Text text={number} />
        </h2>
      )}
      {!number && icon && <SvgIcon name={icon} className={cleanCssClasses('theme@slide-icon', iconClassName)} />}
      {permalink !== false && (
        <QRCode
          data={`${urls[isProduction ? 'production' : 'development']}/${id}/${index
            .toString()
            .padStart(slidesPadding, '0')}.pdf`}
          className={{
            root: cleanCssClasses(
              'theme@permalink',
              typeof permalink === 'string' && `theme@permalink--${permalink}`,
              permalinkClassName
            ),
            code: cleanCssClasses('theme@permalink__code'),
            image: cleanCssClasses('theme@permalink__image')
          }}
        />
      )}
      {logo !== false && (
        <Svg src={`@theme/logo-${logo ?? defaultLogoColor}.svg`} className={cleanCssClasses('theme@logo')} />
      )}
    </>
  )
}

export function SlideWrapper({ slide, index, style, className, defaultLogoColor, children }: SlideWrapperProps): VNode {
  const { foreground, background, decorations } = slide.options

  // These two should be moved to the SlideWrapper component
  const foregroundClass = foreground ? `theme@fg-${foreground}` : ''
  const backgroundClass = background ? `theme@bg-${background}` : ''

  if (!defaultLogoColor) {
    defaultLogoColor = 'black'
  }

  // If you want to show QR again, remove this
  slide.decorations.permalink = false

  return (
    <article className={cleanCssClasses('freya@slide', foregroundClass, backgroundClass, className)} style={style}>
      {children}
      <Progress current={index} />
      {decorations !== false && <Decorations defaultLogoColor={defaultLogoColor} />}
    </article>
  )
}
