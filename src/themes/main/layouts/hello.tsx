import { Image, cleanCssClasses, useClient, useSlide, type SlideProps } from '@perseveranza-pets/freya/client'
import { Fragment, type VNode } from 'preact'
import { Text } from '../../common/components/common.js'
import { Item } from '../../common/components/item.js'
import { type Slide } from '../../common/models.ts'
import { Accent, SlideWrapper } from '../components/common.js'

export default function HelloLayout({ className, style }: SlideProps): VNode {
  const {
    talk: {
      id,
      document: { author: documentAuthor }
    },
    resolveImage
  } = useClient()
  const { slide, index } = useSlide<Slide>()

  const author = slide.options.author ?? documentAuthor

  const name = author.name.split(' ')[0]
  const hobbiesImage = resolveImage('nearform', id, '@theme/hobbies.webp')
  const avatarImage = resolveImage('nearform', id, '@theme/avatar-with-shadow.webp')

  slide.decorations.permalink = 'white'

  return (
    <SlideWrapper
      slide={slide}
      index={index}
      className={cleanCssClasses('theme@hello', className, slide.className.root)}
      style={style}
      defaultLogoColor="white"
    >
      <h1 className={cleanCssClasses('theme@hello__title')}>
        Hi 👋, I'm <span className={cleanCssClasses('theme@hello__title__name')}>{name}</span>!<Accent />
      </h1>

      <aside className={cleanCssClasses('theme@hello__hobbies-wrapper')}>
        <Image src={hobbiesImage} className={cleanCssClasses('theme@hello__hobbies')} />
      </aside>

      <main className={cleanCssClasses('theme@hello__contents')}>
        <section className={cleanCssClasses('theme@hello__description')}>
          <Image src={avatarImage} className={cleanCssClasses('theme@hello__logo')} />

          <Item
            className={{
              root: cleanCssClasses('theme@hello__roles-wrapper', 'theme@hello__roles__item'),
              text: cleanCssClasses('theme@hello__roles__text')
            }}
          >
            <strong className={cleanCssClasses('theme@hello__roles')}>
              {author.roles.map(({ what, where, url }: Record<string, string>, index: number) => {
                return (
                  <Fragment key={`role:${index}`}>
                    <a href={url} className={cleanCssClasses('theme@hello__role__company')}>
                      {where}
                    </a>
                    <span className={cleanCssClasses('theme@hello__role__description')}>{what}</span>
                    <br />
                  </Fragment>
                )
              })}
            </strong>
          </Item>
        </section>

        <Item
          qr={author.website}
          className={{
            root: cleanCssClasses('theme@hello__social', 'theme@hello__social__website'),
            qr: cleanCssClasses('theme@hello__social__qr'),
            contents: cleanCssClasses('theme@hello__social__text')
          }}
          horizontal={true}
        >
          <a href={author.website} className={cleanCssClasses('theme@hello__social__link')}>
            <Text text={author.website.replace('https://', '')} />
          </a>
        </Item>

        <Item
          icon="github"
          className={{
            root: cleanCssClasses('theme@hello__social', 'theme@hello__social__github'),
            icon: cleanCssClasses('theme@hello__social__icon'),
            contents: cleanCssClasses('theme@hello__social__text')
          }}
          horizontal={true}
        >
          <a href={`https://github.com/${author.github}`} className={cleanCssClasses('theme@hello__social__link')}>
            <Text text={author.github} />
          </a>
        </Item>

        <Item
          icon="twitter"
          className={{
            root: cleanCssClasses('theme@hello__social', 'theme@hello__social__twitter'),
            icon: cleanCssClasses('theme@hello__social__icon'),
            contents: cleanCssClasses('theme@hello__social__text')
          }}
          horizontal={true}
        >
          <a href={`https://twitter.com/${author.twitter}`} className={cleanCssClasses('theme@hello__social__link')}>
            <Text text={author.twitter} />
          </a>
        </Item>

        <Item
          icon="linkedin"
          className={{
            root: cleanCssClasses('theme@hello__social', 'theme@hello__social__linkedin'),
            icon: cleanCssClasses('theme@hello__social__icon'),
            contents: cleanCssClasses('theme@hello__social__text')
          }}
          horizontal={true}
        >
          <a
            href={`https://linkedin.com/in/${author.linkedin}`}
            className={cleanCssClasses('theme@hello__social__link')}
          >
            <Text text={author.linkedin} />
          </a>
        </Item>
      </main>
    </SlideWrapper>
  )
}
