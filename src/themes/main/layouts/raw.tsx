import { cleanCssClasses, useSlide, type SlideProps } from '@perseveranza-pets/freya/client'
import { type VNode } from 'preact'
import { Text } from '../../common/components/common.tsx'
import { type Slide } from '../../common/models.ts'
import { SlideWrapper } from '../components/common.tsx'

export default function RawLayout({ className, style }: SlideProps): VNode {
  const { slide, index } = useSlide<Slide>()

  const {
    content,
    className: { root: rootClassName, raw: rawClassName }
  } = slide

  return (
    <SlideWrapper slide={slide} index={index} className={cleanCssClasses(className, rootClassName)} style={style}>
      <div className={cleanCssClasses(rawClassName)}>
        <Text text={content.join('')} />
      </div>
    </SlideWrapper>
  )
}
