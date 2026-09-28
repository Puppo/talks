import { Image, cleanCssClasses, useClient, useSlide, type SlideProps } from '@perseveranza-pets/freya/client'
import { type VNode } from 'preact'
import { Text } from '../../common/components/common.js'
import { type BreakerVariant, type Slide } from '../../common/models.ts'
import { Accent, SlideWrapper } from '../components/common.js'

const backgrounds: Record<BreakerVariant, string> = {
  green: '@theme/bg-wave-green.webp',
  purple: '@theme/bg-wave-purple.webp',
  particles: '@theme/bg-cover.webp'
}

export default function BreakerLayout({ className, style }: SlideProps): VNode {
  const {
    talk: { id },
    resolveImage
  } = useClient()
  const { slide, index } = useSlide<Slide>()

  const {
    title,
    subtitle,
    image,
    options: { variant = 'green' },
    className: { root: rootClassName, contents: contentsClassName, title: titleClassName, subtitle: subtitleClassName }
  } = slide

  if (typeof slide.decorations.permalink === 'undefined') {
    slide.decorations.permalink = 'white'
  }

  const backgroundImage = resolveImage('main', id, image?.url ?? backgrounds[variant] ?? backgrounds.green)

  return (
    <SlideWrapper
      slide={slide}
      index={index}
      className={cleanCssClasses('theme@breaker', `theme@breaker--${variant}`, className, rootClassName)}
      style={style}
      defaultLogoColor="white"
    >
      <Image src={backgroundImage} className={cleanCssClasses('theme@breaker__background', image?.className)} />

      <main className={cleanCssClasses('theme@breaker__contents', contentsClassName)}>
        {title && (
          <h1 className={cleanCssClasses('theme@breaker__title', titleClassName)}>
            <Text text={title} />
            <Accent />
          </h1>
        )}

        {subtitle && (
          <h4 className={cleanCssClasses('theme@breaker__subtitle', subtitleClassName)}>
            <Text text={subtitle} />
          </h4>
        )}
      </main>
    </SlideWrapper>
  )
}
