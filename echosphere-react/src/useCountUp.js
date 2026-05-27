import { useEffect, useRef } from 'react'
import { useMotionValue, useTransform, animate } from 'framer-motion'
import { useScrollAnimation } from './useScrollAnimation'

export const useCountUp = (endValue) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)
  const { ref, isInView } = useScrollAnimation({ triggerOnce: true, threshold: 0.5 })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      animate(count, endValue, {
        duration: 2,
        ease: 'easeOut',
      })
    }
  }, [isInView, endValue, count])

  return { ref, rounded }
}
