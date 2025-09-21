import { cleanCssClasses, useClient, useSlide, type SlideProps } from '@perseveranza-pets/freya/client'
import { type VNode } from 'preact'
import { Text } from '../../common/components/common.js'
import { type Slide } from '../../common/models.ts'
import { SlideWrapper } from '../components/common.js'

export default function ImageLayout({ className, style }: SlideProps): VNode {
  const {
    talk: { id },
    resolveImage
  } = useClient()
  const { slide, index } = useSlide<Slide>()

  const {
    title,
    subtitle,
    image,
    className: { root: rootClassName, title: titleClassName, subtitle: subtitleClassName },
    decorations: { logo }
  } = slide

  const imageUrl = resolveImage('nearform', id, image?.url)

  if (typeof slide.decorations.permalink === 'undefined' && (logo === 'white' || logo === 'total-white')) {
    slide.decorations.permalink = 'white'
  }

  return (
    <SlideWrapper
      slide={slide}
      index={index}
      className={cleanCssClasses('theme@image', className, rootClassName)}
      style={{ ...style, backgroundImage: `url(${imageUrl})` }}
    >
      <main className={cleanCssClasses('theme@image__contents')}>
        {(title || subtitle) && (
          <h1 className={cleanCssClasses('theme@callout theme@image__title', titleClassName)}>
            <Text text={title} />
            {subtitle && (
              <Text className={cleanCssClasses('theme@image__subtitle', subtitleClassName)} text={subtitle} />
            )}
          </h1>
        )}
      </main>
    </SlideWrapper>
  )
}
