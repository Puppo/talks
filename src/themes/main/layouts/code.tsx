import { Code, cleanCssClasses, useSlide, type SlideProps } from '@perseveranza-pets/freya/client'
import { type VNode } from 'preact'
import { Text } from '../../common/components/common.js'
import { type Slide } from '../../common/models.ts'
import { Accent, SlideWrapper } from '../components/common.js'

export default function CodeLayout({ className, style }: SlideProps): VNode {
  const { slide, index } = useSlide<Slide>()

  const {
    title,
    code,
    className: { root: rootClassName, title: titleClassName }
  } = slide

  return (
    <SlideWrapper slide={slide} index={index} className={cleanCssClasses(className, rootClassName)} style={style}>
      {title && (
        <h1 className={cleanCssClasses(titleClassName)}>
          <Text text={title} />
          <Accent />
        </h1>
      )}

      <div className={cleanCssClasses('theme@code__wrapper')}>
        <Code {...code!} />
      </div>
    </SlideWrapper>
  )
}
