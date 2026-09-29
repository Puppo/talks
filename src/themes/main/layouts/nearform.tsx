import { Svg, cleanCssClasses, useSlide, type SlideProps } from '@perseveranza-pets/freya/client'
import { type VNode } from 'preact'
import { type Slide } from '../../common/models.ts'
import { SlideWrapper } from '../components/common.js'

const stats = [
  ['10+', 'Years experience'],
  ['400+', 'Nearformers'],
  ['28', 'Countries'],
  ['700+', 'Engagements'],
  ['380+', 'Customers']
]

const openSource = [
  ['15m+', 'Downloads', 'Over 15 million downloads every week'],
  ['1192k+', 'Contributions', 'Thousands of contributions every year'],
  ['166+', 'Packages', 'We maintain many popular packages for the community']
]

export default function NearformLayout({ className, style }: SlideProps): VNode {
  const { slide, index } = useSlide<Slide>()

  if (typeof slide.decorations.logo === 'undefined') {
    slide.decorations.logo = 'white'
  }

  return (
    <SlideWrapper
      slide={slide}
      index={index}
      className={cleanCssClasses('theme@nearform', className, slide.className?.root)}
      style={style}
    >
      <main className={cleanCssClasses('theme@nearform__contents')}>
        <section className={cleanCssClasses('theme@nearform__about')}>
          <h4 className={cleanCssClasses('theme@nearform__description')}>
            We’re an independent team of engineers, designers and strategists who build digital solutions and enhanced
            capability at pace for ambitious enterprises seeking enduring business impact.
          </h4>

          <dl className={cleanCssClasses('theme@nearform__stats')}>
            {stats.map(([number, name]) => (
              <div key={name} className={cleanCssClasses('theme@nearform__stats__stat')}>
                <dt className={cleanCssClasses('theme@nearform__stats__number')}>{number}</dt>
                <dd className={cleanCssClasses('theme@nearform__stats__name')}>{name}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Svg src="@theme/world.svg" className={cleanCssClasses('theme@nearform__globe')} />

        <aside className={cleanCssClasses('theme@nearform__open-source')}>
          <h4 className={cleanCssClasses('theme@nearform__open-source__title')}>
            Nearform’s commitment to Open Source
          </h4>

          <ul className={cleanCssClasses('theme@nearform__open-source__entries')}>
            {openSource.map(([number, name, description]) => (
              <li key={name} className={cleanCssClasses('theme@nearform__open-source__entry')}>
                <div className={cleanCssClasses('theme@nearform__open-source__card')}>
                  <strong className={cleanCssClasses('theme@nearform__open-source__number')}>{number}</strong>
                  <span className={cleanCssClasses('theme@nearform__open-source__name')}>{name}</span>
                </div>
                <p
                  className={cleanCssClasses(
                    'theme@nearform__open-source__card',
                    'theme@nearform__open-source__description'
                  )}
                >
                  {description}
                </p>
              </li>
            ))}
          </ul>

          <p className={cleanCssClasses('theme@nearform__hiring')}>
            We’re hiring! <a href="https://www.nearform.com/careers/">nearform.com/careers</a>
          </p>

          <Svg src="@theme/logo-with-text-white.svg" className={cleanCssClasses('theme@nearform__logo')} />
        </aside>
      </main>
    </SlideWrapper>
  )
}
