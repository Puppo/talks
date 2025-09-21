import { Svg, cleanCssClasses, useClient, useSlide, type SlideProps } from '@perseveranza-pets/freya/client'
import { type VNode } from 'preact'
import { Text } from '../../common/components/common.js'
import { type Slide } from '../../common/models.js'
import { SlideWrapper } from '../components/common.js'

export default function EndLayout({ className, style }: SlideProps): VNode {
  const {
    talk: {
      id,
      document: { author }
    },
    resolveImage
  } = useClient()
  const { slide, index } = useSlide<Slide>()

  slide.decorations.logo = false
  if (typeof slide.decorations.permalink === 'undefined') {
    slide.decorations.permalink = 'white'
  }

  const {
    title,
    subtitle,
    image,
    className: { root: rootClassName, title: titleClassName, subtitle: subtitleClassName }
  } = slide

  const pandaImageUrl = resolveImage('nearform', id, image?.url ?? '@theme/panda.webp')

  return (
    <SlideWrapper
      slide={slide}
      index={index}
      className={cleanCssClasses('theme@end', className, rootClassName)}
      style={{ ...style, backgroundImage: `url(${pandaImageUrl})` }}
    >
      <main className={cleanCssClasses('theme@end__contents')}>
        <h1 className={cleanCssClasses('theme@callout theme@end__title', titleClassName)}>
          {title ?? 'Thank you!'}
          {subtitle && <Text className={cleanCssClasses('theme@end__subtitle', subtitleClassName)} text={subtitle} />}
        </h1>
      </main>

      <footer className={cleanCssClasses('theme@end__footer')}>
        <strong
          className={cleanCssClasses('theme@end__social', 'theme@end__social--highlight', 'theme@end__social__author')}
        >
          {author.name}
        </strong>

        <a
          className={cleanCssClasses('theme@end__social', 'theme@end__social__twitter')}
          href={`https://twitter.com/${author.twitter}`}
        >
          @{author.twitter}
        </a>

        <span
          className={cleanCssClasses(
            'theme@end__social',
            'theme@end__social--highlight',
            'theme@end__social__description'
          )}
        >
          {author.description}
        </span>

        <a className={cleanCssClasses('theme@end__social', 'theme@end__social__email')} href={`mailto:${author.email}`}>
          {author.email}
        </a>

        <aside className={cleanCssClasses('theme@end__logo--wrapper')}>
          <Svg src="@theme/logo-with-text-white.svg" className={cleanCssClasses('theme@end__logo')} />
        </aside>
      </footer>
    </SlideWrapper>
  )
}
