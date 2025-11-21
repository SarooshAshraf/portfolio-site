'use client'

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import gsap from 'gsap'

export interface CardSwapProps {
  width?: number | string
  height?: number | string
  cardDistance?: number
  verticalDistance?: number
  delay?: number
  pauseOnHover?: boolean
  scrollControlled?: boolean
  scrollSwapDuration?: number
  clickToFront?: boolean
  onCardClick?: (idx: number) => void
  skewAmount?: number
  easing?: 'linear' | 'elastic'
  children: ReactNode
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  />
))
Card.displayName = 'Card'

type CardRef = RefObject<HTMLDivElement | null>
interface Slot {
  x: number
  y: number
  z: number
  zIndex: number
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
})

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  })

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  scrollControlled = false,
  scrollSwapDuration = 0.5,
  clickToFront = true,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children,
}) => {
  let config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6, 0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        }

  if (scrollControlled) {
    const dur = Math.max(0.25, scrollSwapDuration)
    config = {
      ease: 'power1.out',
      durDrop: Math.max(0.22, dur * 0.85),
      durMove: Math.max(0.22, dur * 0.85),
      durReturn: Math.max(0.22, dur * 0.85),
      promoteOverlap: 0.2,
      returnDelay: 0.02,
    }
  }

  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children])
  const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length])

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i))

  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const intervalRef = useRef<number>(0)
  const container = useRef<HTMLDivElement>(null)
  const isSwapping = useRef(false)
  const promoteRef = useRef<(idx: number) => void>(() => {})

  useEffect(() => {
    const total = refs.length
    refs.forEach((r, i) => placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount))

    const resetStack = () => {
      const totalCards = refs.length
      order.current.forEach((idx, i) => {
        const el = refs[idx].current
        if (el) placeNow(el, makeSlot(i, cardDistance, verticalDistance, totalCards), skewAmount)
      })
    }

    const finish = () => {
      isSwapping.current = false
    }

    const animateToOrder = (newOrder: number[], popIdx?: number) => {
      if (!newOrder.length) return
      const tl = gsap.timeline({ onComplete: finish })
      tlRef.current = tl

      newOrder.forEach((idx, i) => {
        const el = refs[idx].current!
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length)
        tl.set(el, { zIndex: slot.zIndex }, 0)
        const isPop = idx === popIdx
        const lift = isPop ? -80 : 0
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y + lift,
            z: slot.z,
            duration: config.durMove * (isPop ? 0.75 : 1),
            ease: config.ease,
          },
          i * 0.06,
        )
        if (isPop) {
          tl.to(
            el,
            {
              y: slot.y,
              duration: config.durMove * 0.35,
              ease: config.ease,
            },
            `>-=${config.durMove * 0.35}`,
          )
        }
      })

      tl.call(() => {
        order.current = newOrder
      })
    }

    const swap = () => {
      if (isSwapping.current) return
      if (order.current.length < 2) return

      isSwapping.current = true
      const [front, ...rest] = order.current
      const promotedOrder = [...rest, front]
      const tl = gsap.timeline({ onComplete: finish })
      tlRef.current = tl

      const elFront = refs[front].current!
      tl.to(elFront, {
        y: '+=460',
        duration: config.durDrop,
        ease: config.ease,
      })

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`)
      rest.forEach((idx, i) => {
        const el = refs[idx].current!
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length)
        tl.set(el, { zIndex: slot.zIndex }, 'promote')
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.12}`,
        )
      })

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length)
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`)
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex })
        },
        undefined,
        'return',
      )
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        'return',
      )

      tl.call(() => {
        order.current = promotedOrder
      })
    }

    const bringToFront = (idx: number) => {
      if (!clickToFront) return
      if (isSwapping.current) return
      if (order.current[0] === idx) {
        onCardClick?.(idx)
        return
      }

      const newOrder = [idx, ...order.current.filter((i) => i !== idx)]
      if (tlRef.current) {
        tlRef.current.kill()
        tlRef.current = null
        isSwapping.current = false
        resetStack()
      }
      isSwapping.current = true
      animateToOrder(newOrder, idx)
      onCardClick?.(idx)
    }

    promoteRef.current = bringToFront

    if (scrollControlled) {
      const node = container.current!
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault()
        if (isSwapping.current) return
        swap()
      }
      node.addEventListener('wheel', handleWheel, { passive: false })
      return () => {
        node.removeEventListener('wheel', handleWheel)
      }
    }

    swap()
    if (!scrollControlled) {
      intervalRef.current = window.setInterval(swap, delay)
    }

    if (pauseOnHover) {
      const node = container.current!
      const pause = () => {
        tlRef.current?.pause()
        clearInterval(intervalRef.current)
      }
      const resume = () => {
        tlRef.current?.play()
        if (!scrollControlled) {
          intervalRef.current = window.setInterval(swap, delay)
        }
      }
      node.addEventListener('mouseenter', pause)
      node.addEventListener('mouseleave', resume)
      return () => {
        node.removeEventListener('mouseenter', pause)
        node.removeEventListener('mouseleave', resume)
        clearInterval(intervalRef.current)
      }
    }

    return () => clearInterval(intervalRef.current)
  }, [
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    easing,
    scrollControlled,
    scrollSwapDuration,
    refs,
    clickToFront,
    onCardClick,
  ])

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>)
            if (clickToFront) {
              promoteRef.current ? promoteRef.current(i) : onCardClick?.(i)
            } else {
              onCardClick?.(i)
            }
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child,
  )

  return (
    <div
      ref={container}
      className="absolute bottom-0 right-0 translate-y-[12%] origin-bottom-right overflow-visible perspective-[900px] max-[768px]:translate-y-[18%] max-[768px]:scale-[0.75] max-[480px]:translate-y-[18%] max-[480px]:scale-[0.55]"
      style={{ width, height }}
    >
      {rendered}
    </div>
  )
}

export default CardSwap
