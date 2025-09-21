import {
  Image,
  QRCode,
  Svg,
  cleanCssClasses,
  useClient,
  useSlide,
  type SlideProps
} from '@perseveranza-pets/freya/client'
import { type VNode } from 'preact'
import { Text } from '../../common/components/common.js'
import { SvgIcon } from '../../common/components/icons.js'
import { type Slide } from '../../common/models.js'
import { SlideWrapper } from '../components/common.js'

export default function CoverLayout({ className, style }: SlideProps): VNode {
  const {
    isProduction,
    talk: {
      id,
      document: { author, title, titleFormatted }
    },
    theme: { urls },
    resolveImage
  } = useClient()
  const { slide, index } = useSlide<Slide>()

  const {
    className: { root: rootClassName, qr: qrClassName, title: titleClassName }
  } = slide

  slide.decorations.logo = 'total-white'
  slide.decorations.permalink = false

  const backgroundImage = resolveImage('nearform', id, '@theme/bg-green.webp')

  return (
    <SlideWrapper
      slide={slide}
      index={index}
      className={cleanCssClasses('theme@cover', className, rootClassName)}
      style={style}
    >
      <Image src={backgroundImage} className={cleanCssClasses('theme@cover__background')} />
      <div className={cleanCssClasses('theme@cover__contents')}>
        <Svg src="@theme/logo-with-text-total-white.svg" className={cleanCssClasses('theme@cover__logo')} />

        <main className={cleanCssClasses('theme@cover__header')}>
          <h1 className={cleanCssClasses('theme@cover__header__title', titleClassName)}>
            <Text text={titleFormatted ?? title} />
          </h1>

          <h2 className={cleanCssClasses('theme@cover__header__author')}>
            <strong className={cleanCssClasses('theme@cover__header__author__name')}>
              <Text text={author.name} />
            </strong>

            <span className={cleanCssClasses('theme@cover__header__author__description')}>
              <Text text={author.descriptionShort ?? author.description} />
            </span>
          </h2>
        </main>

        {/* <h3 className={cleanCssClasses('theme@cover__copyright')}>
          &#169; Copyright {new Date().getFullYear()} Nearform_ Ltd. All Rights Reserved.
        </h3> */}

        <aside className={cleanCssClasses('theme@cover__qrs')}>
          <QRCode
            data={`${urls[isProduction ? 'production' : 'development']}/${id}`}
            image={<SvgIcon name="desktop" className={cleanCssClasses('theme@cover__qrs__qr__image')} />}
            imageRatio={1}
            label="View online"
            className={{
              root: cleanCssClasses('theme@cover__qrs__qr', qrClassName),
              code: cleanCssClasses('theme@cover__qrs__qr__code'),
              label: cleanCssClasses('theme@cover__qrs__qr__label')
            }}
          />
          <QRCode
            data={`${urls[isProduction ? 'production' : 'development']}/pdfs/${id}.pdf`}
            image={<SvgIcon name="file-pdf" className={cleanCssClasses('theme@cover__qrs__qr__image')} />}
            imageRatio={1}
            label="Download PDF"
            className={{
              root: cleanCssClasses('theme@cover__qrs__qr', qrClassName),
              code: cleanCssClasses('theme@cover__qrs__qr__code'),
              label: cleanCssClasses('theme@cover__qrs__qr__label')
            }}
          />
        </aside>
      </div>
    </SlideWrapper>
  )
}
