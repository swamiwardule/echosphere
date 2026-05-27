import { useRef, useEffect, useState } from 'react'

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        // Optionally stop observing after animation
        if (options.triggerOnce) {
          observer.unobserve(entry.target)
        }
      } else if (!options.triggerOnce) {
        setIsInView(false)
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
      ...options.observerOptions,
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options])

  return { ref, isInView }
}
