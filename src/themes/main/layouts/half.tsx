import { cleanCssClasses, useClient, useSlide, type SlideProps } from '@perseveranza-pets/freya/client'
import { type VNode } from 'preact'
import { ComplexContent, Text } from '../../common/components/common.js'
import { Items } from '../../common/components/item.js'
import { type Slide } from '../../common/models.js'
import { Accent, SlideWrapper } from '../components/common.js'

export default function HalfLayout({ className, style }: SlideProps): VNode {
  const { talk, resolveImage } = useClient()
  const { slide, index } = useSlide<Slide>()

  const {
    title,
    content,
    image,
    items,
    className: { root: rootClassName, title: titleClassName, subtitle: subtitleClassName }
  } = slide

  const imageUrl = resolveImage('nearform', talk.id, image?.url)

  if (
    typeof slide.decorations.permalink === 'undefined' &&
    (slide.decorations.logo === 'white' || slide.decorations.logo === 'total-white')
  ) {
    slide.decorations.permalink = 'white'
  }

  return (
    <SlideWrapper
      slide={slide}
      index={index}
      className={cleanCssClasses('theme@half', className, rootClassName)}
      style={style}
      defaultLogoColor="black"
    >
      <div className={cleanCssClasses('theme@half__contents')}>
        {title && (
          <h1 className={cleanCssClasses(titleClassName)}>
            <Text text={title} />
            <Accent />
          </h1>
        )}

        {content?.filter(Boolean).map((c: string | object, contentIndex: number) => {
          const key = `content:${index}:${contentIndex}`

          if (typeof c === 'object') {
            return <ComplexContent key={key} raw={c} slide={slide} />
          }

          return (
            <h4 key={key} className={cleanCssClasses('theme@half__subtitle', subtitleClassName)}>
              <Text text={c} />
            </h4>
          )
        })}

        {items && <Items items={items} />}
      </div>

      {image && (
        <div className={cleanCssClasses('theme@half__image')} style={{ backgroundImage: `url(${imageUrl})` }} />
      )}
    </SlideWrapper>
  )
}
