import { Code, Image, cleanCssClasses, useClient, useSlide, type SlideProps } from '@perseveranza-pets/freya/client'
import { type VNode } from 'preact'
import { ComplexContent, Text } from '../../common/components/common.js'
import { Grids, Items } from '../../common/components/item.js'
import { type Slide } from '../../common/models.js'
import { Accent, SlideWrapper } from '../components/common.js'

export default function DefaultLayout({ className, style }: SlideProps): VNode {
  const {
    talk: { id },
    resolveImage
  } = useClient()
  const { slide, index } = useSlide<Slide>()

  const {
    title,
    content,
    grids,
    image,
    items,
    code,
    className: { root: rootClassName, title: titleClassName, subtitle: subtitleClassName }
  } = slide

  const imageUrl = resolveImage('nearform', id, image?.url)

  return (
    <SlideWrapper slide={slide} index={index} className={cleanCssClasses(className, rootClassName)} style={style}>
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
          <h4 key={key} className={cleanCssClasses('theme@default__subtitle', subtitleClassName)}>
            <Text text={c} />
          </h4>
        )
      })}

      {image && (
        <div className={cleanCssClasses('theme@default__image-wrapper')}>
          <Image
            src={imageUrl}
            className={cleanCssClasses(
              'theme@default__image',
              `theme@default__image--${content?.length ? 'with' : 'no'}-content`,
              image.className
            )}
          />
        </div>
      )}

      {!image && items && <Items items={items} />}
      {!image && !items && grids && <Grids grids={grids} />}

      {!image && !items && !grids && code && (
        <div className={cleanCssClasses('theme@default__code')}>
          <Code {...code} />
        </div>
      )}
    </SlideWrapper>
  )
}
