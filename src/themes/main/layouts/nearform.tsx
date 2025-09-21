import { Svg, cleanCssClasses, useSlide, type SlideProps } from '@perseveranza-pets/freya/client'
import { type VNode } from 'preact'
import { type Slide } from '../../common/models.ts'
import { Accent, SlideWrapper } from '../components/common.js'

export default function NearformLayout({ className, style }: SlideProps): VNode {
  const { slide, index } = useSlide<Slide>()

  slide.decorations.logo = false
  slide.decorations.permalink = 'white'

  return (
    <SlideWrapper
      slide={slide}
      index={index}
      className={cleanCssClasses('theme@nearform', className, slide.className?.root)}
      style={style}
    >
      <main className={cleanCssClasses('theme@nearform__contents')}>
        <h1 className={cleanCssClasses('theme@nearform__title')}>
          Introducing <span>Nearform</span>
          <Accent />
        </h1>

        <h4 className={cleanCssClasses('theme@nearform__subtitle')}>
          We’re a global consultancy of experienced engineers working in lean teams, designing and building high quality
          digital products at speed and scale to realise business and end user value.
        </h4>

        <aside className={cleanCssClasses('theme@nearform__cta')}>
          <div className={cleanCssClasses('theme@nearform__cta__description')}>
            <dl>
              <dt className={cleanCssClasses('theme@nearform__cta__description__number')}>10+ </dt>
              <dd className={cleanCssClasses('theme@nearform__cta__description__name')}>Years experience</dd>
              <dt className={cleanCssClasses('theme@nearform__cta__description__number')}>400+</dt>
              <dd className={cleanCssClasses('theme@nearform__cta__description__name')}>Nearformers</dd>
              <dt className={cleanCssClasses('theme@nearform__cta__description__number')}>
                28<span className={cleanCssClasses('theme@nearform__cta__description__number__spacer')}>+</span>
              </dt>
              <dd className={cleanCssClasses('theme@nearform__cta__description__name')}>Countries</dd>
              <dt className={cleanCssClasses('theme@nearform__cta__description__number')}>700+</dt>
              <dd className={cleanCssClasses('theme@nearform__cta__description__name')}>Engagements</dd>
              <dt className={cleanCssClasses('theme@nearform__cta__description__number')}>380+</dt>
              <dd className={cleanCssClasses('theme@nearform__cta__description__name')}>Customers</dd>
            </dl>
          </div>

          <h3 className={cleanCssClasses('theme@nearform__cta__hiring')}>We are hiring!</h3>
        </aside>

        <Svg src="@theme/world.svg" className={cleanCssClasses('theme@nearform__globe')} />
      </main>

      <footer className={cleanCssClasses('theme@nearform__categories')}>
        <h4
          className={cleanCssClasses(
            'theme@nearform__categories__category',
            'theme@nearform__categories__category--with-border'
          )}
        >
          Product Solutions
        </h4>
        <h4
          className={cleanCssClasses(
            'theme@nearform__categories__category',
            'theme@nearform__categories__category--with-border'
          )}
        >
          Modern Platforms
        </h4>
        <h4
          className={cleanCssClasses(
            'theme@nearform__categories__category',
            'theme@nearform__categories__category--with-border'
          )}
        >
          Data & AI Solutions
        </h4>
        <h4 className={cleanCssClasses('theme@nearform__categories__category')}>Enhanced Capability</h4>
      </footer>
    </SlideWrapper>
  )
}
