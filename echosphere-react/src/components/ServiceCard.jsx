import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { formatImageUrl } from '../api/apiService'
import { useRef } from 'react'

function ServiceCard({ item, onClick }) {
  const ref = useRef(null)

  // 3D Tilt Effect Setup
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="perspective-wrapper" style={{ height: '100%' }}>
      <motion.div
        ref={ref}
        className='service-card'
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-3d)' }}
        whileTap={{ scale: 0.95 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ duration: 0.4 }}
      >
        <div style={{ transform: "translateZ(30px)", display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="service-icon-wrapper">
            <i className="fa-solid fa-layer-group"></i>
          </div>

          {item.image && (
            <div className='image-card' style={{ height: '160px', marginBottom: '1.5rem', transform: "translateZ(40px)" }}>
              <img
                src={formatImageUrl(item.image)}
                alt={item.name}
              />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, transform: "translateZ(20px)" }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem' }}>
              {item.name}
            </h3>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {item.description || 'Tap to explore subservices and view top providers in your area.'}
            </p>

            <div style={{ marginTop: 'auto' }}>
              <span style={{ 
                color: '#fff', 
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                padding: '8px 16px',
                borderRadius: '20px',
                fontWeight: '700', 
                fontSize: '0.9rem',
                boxShadow: '0 4px 10px rgba(199,154,47,0.28)',
                display: 'inline-block'
              }}>
                Explore &rarr;
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ServiceCard
