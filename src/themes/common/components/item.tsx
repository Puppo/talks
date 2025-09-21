import { cleanCssClasses, Code, Image, QRCode, useClient, useSlide } from '@perseveranza-pets/freya/client'
import { Fragment, type ComponentChildren, type VNode } from 'preact'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { type Grid, type Item as ItemDefinition, type Items as ItemsDefinition } from '../models.js'
import { Text } from './common.js'
import { SvgIcon } from './icons.js'

interface ItemProps extends ItemDefinition {
  horizontal?: boolean
  children?: ComponentChildren | ComponentChildren[]
}

interface ItemsProps {
  items: ItemsDefinition
}

interface GridsProps {
  grids: Grid[]
}

export function Item(props: ItemProps): VNode {
  const { talk, resolveImage } = useClient()

  const { horizontal, index, icon, image, title, text, qr, code, className, children } = props

  const {
    root: rootClassName,
    index: indexClassName,
    icon: iconClassName,
    image: imageClassName,
    title: titleClassName,
    text: textClassName,
    contents: contentsClassName,
    qr: qrClassName,
    code: codeClassName
  } = className ?? {}

  const imageUrl = image ? resolveImage('nearform', talk.id, image) : undefined

  if (code && codeClassName) {
    code.className ??= {}
    code.className.root = cleanCssClasses(code.className.root, codeClassName)
  }

  return (
    <section className={cleanCssClasses('theme@item', horizontal && 'theme@item--horizontal', rootClassName)}>
      {index && (
        <h5
          className={cleanCssClasses(
            'theme@item__index',
            horizontal && 'theme@item__index--horizontal',
            indexClassName
          )}
        >
          <Text text={index} />
        </h5>
      )}
      {imageUrl && (
        <Image
          src={imageUrl}
          className={cleanCssClasses(
            'theme@item__image',
            horizontal && 'theme@item__image--horizontal',
            imageClassName
          )}
        />
      )}
      {!imageUrl && icon && (
        <SvgIcon
          name={icon}
          className={cleanCssClasses('theme@item__icon', horizontal && 'theme@item__icon--horizontal', iconClassName)}
        />
      )}
      {!imageUrl && !icon && qr && (
        <QRCode
          label=""
          data={qr}
          className={{
            code: cleanCssClasses('theme@item__qr', horizontal && 'theme@item__qr--horizontal', qrClassName)
          }}
        />
      )}

      {!imageUrl && !icon && !qr && code && <Code {...code} />}

      {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
      {!code && (title || text || children) && (
        <div
          className={cleanCssClasses('theme@item__text', horizontal && 'theme@item__text--horizontal', textClassName)}
        >
          {title && (
            <h4
              className={cleanCssClasses(
                'theme@item__title',
                horizontal && 'theme@item__title--horizontal',
                titleClassName
              )}
            >
              <Text text={title} />
            </h4>
          )}
          {text && (
            <p className={cleanCssClasses('theme@item__contents', contentsClassName)}>
              <Text text={text} />
            </p>
          )}
          {!text && <p className={cleanCssClasses('theme@item__contents', contentsClassName)}>{children}</p>}
        </div>
      )}
    </section>
  )
}

export function Items({
  items: { entries, horizontal, gap, defaultClasses, spacer, className, sequence }
}: ItemsProps): VNode {
  const { index, previousIndex, navigator, presenter } = useSlide()
  const [step, setStep] = useState<number>(0)

  const gapClass = gap === false ? 'no-gap' : 'with-gap'
  const dispositionClasses = horizontal
    ? `theme@items--horizontal theme@items--horizontal--${gapClass}`
    : `theme@items--vertical theme@items--vertical--${gapClass}`

  const validEntries = useMemo(() => entries.filter(Boolean), [entries])
  const visibleEntries = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (sequence !== true || navigator || typeof window === 'undefined') {
      return validEntries
    }

    if (presenter && index === previousIndex + 1) {
      return validEntries.slice(0, 1)
    }

    // Going backwards, start from the end
    return validEntries.slice(0, step + 1)
  }, [sequence, navigator, presenter, validEntries, index, previousIndex, step])

  const handleNavigation = useCallback(
    (event: Event) => {
      const messageEvent = event as MessageEvent

      const delta = messageEvent.data.index - index
      if (Math.abs(delta) !== 1 || (delta === -1 && step === 0) || (delta === 1 && step === validEntries.length - 1)) {
        // Jump via navigator, or at the edge of the entries, allow it
        return
      }

      messageEvent.data.cancel = true
      setStep(step + delta)
    },
    [step, validEntries, setStep]
  )

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (sequence !== true || navigator || presenter || typeof window === 'undefined') {
      return
    }

    window.addEventListener('freya:slide:changed', handleNavigation)

    return () => {
      window.removeEventListener('freya:slide:changed', handleNavigation)
    }
  }, [handleNavigation])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (sequence !== true || navigator || presenter || typeof window === 'undefined') {
      return
    }

    setStep(index === previousIndex - 1 ? validEntries.length - 1 : 0)
  }, [index, previousIndex, setStep])

  return (
    <div
      className={cleanCssClasses(
        defaultClasses !== false && 'theme@items',
        defaultClasses !== false && dispositionClasses,
        className
      )}
    >
      {visibleEntries.map((item: ItemDefinition, index: number) => {
        return (
          <Fragment key={`item:${index}`}>
            {spacer !== false && horizontal && index > 0 && <div className={cleanCssClasses('theme@item__spacer')} />}
            <Item horizontal={horizontal} {...item} />
          </Fragment>
        )
      })}
    </div>
  )
}

export function Grids({ grids }: GridsProps): VNode {
  if (!Array.isArray(grids)) {
    grids = [grids]
  }

  return (
    <div className={cleanCssClasses('theme@items--grid__wrapper')}>
      {grids.map((grid: Grid, index: number) => {
        return (
          <Fragment key={`item:${index}`}>
            {index > 0 && <div className={cleanCssClasses('theme@item__spacer')} />}
            <Items
              items={{
                entries: grid.entries,
                horizontal: true,
                spacer: false,
                defaultClasses: false,
                sequence: grid.sequence,
                className: cleanCssClasses(
                  'theme@items--grid',
                  'theme@items--grid--default-template',
                  'theme@items--grid--default-gap',
                  grid.className
                )
              }}
            />
          </Fragment>
        )
      })}
    </div>
  )
}
