import { type BaseSlide, type CodeDefinition } from '@perseveranza-pets/freya'

export interface ItemClasses {
  root?: string
  index?: string
  icon?: string
  image?: string
  title?: string
  text?: string
  contents?: string
  qr?: string
  code?: string
}

export interface DecorationsClasses {
  number?: string
  icon?: string
  permalink?: string
}

export interface SlideClasses {
  root?: string
  title?: string
  subtitle?: string
  contents?: string
  qr?: string
  raw?: string
}

export interface Item {
  index?: string
  icon?: string
  image?: string
  title?: string
  text?: string
  qr?: string
  code?: CodeDefinition
  className?: ItemClasses
}

export interface Items {
  entries: Item[]
  className?: string
  horizontal?: boolean
  sequence?: boolean
  spacer?: boolean
  gap?: boolean
  defaultClasses?: boolean
}

export interface Grid {
  entries: Item[]
  sequence?: boolean
  className?: string
}

export interface Image {
  url: string
  className?: string
}

export interface Highlight {
  text: string
  className?: string
}

export interface Quote {
  sentence?: string
  author?: string
  light?: boolean
  icons?: boolean
  primaryIcon?: string | false
  secondaryIcon?: string | false
  primaryIconClassName?: string
  secondaryIconClassName?: string
}

export interface Decorations {
  number?: string
  icon?: string
  logo?: boolean | string
  permalink?: boolean | string
  // The following are optional in the YAML but defined in the className
  className: DecorationsClasses
}

export interface Options {
  foreground?: string
  background?: string
  accent?: string
  author?: Record<string, string> // Used by the main.hello layout
  decorations?: boolean
}

export interface Slide extends BaseSlide {
  layout?: string
  subtitle?: string
  content: string[]
  items?: Items
  grids?: Grid[]
  image?: Image
  code?: CodeDefinition
  highlight?: Highlight
  quote: Quote
  // The following are optional in the YAML but defined in the className
  decorations: Decorations
  options: Options
  className: SlideClasses
}
