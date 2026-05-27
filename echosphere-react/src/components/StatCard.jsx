import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

function StatCard({ value, label }) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)
  const containerRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          animate(count, numericValue, {
            duration: 2.5,
            ease: 'easeOut',
          })
        }
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [count, numericValue])

  return (
    <motion.div 
      ref={containerRef}
      className='about-stat-card'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <strong>
        <motion.span>{rounded}</motion.span>
        {value.includes('+') ? '+' : ''}
      </strong>
      <span>{label}</span>
    </motion.div>
  )
}

export default StatCard
