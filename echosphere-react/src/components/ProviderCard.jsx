import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

function ProviderCard({ item }) {
  const navigate = useNavigate()
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
        onClick={() => navigate(`/provider/${item.id}`)}
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
          <div className='image-card' style={{ height: '220px', marginBottom: '1.5rem', borderRadius: '16px', transform: "translateZ(40px)" }}>
            <img
              src={`data:image/png;base64,${item.image}`}
              alt={item.name}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, transform: "translateZ(20px)" }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.6rem' }}>
              {item.name}
            </h3>

            <p style={{ fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--accent-primary)', marginRight: '5px' }}>📍</span>
              {item.address}
            </p>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ 
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))', 
                color: '#fff', 
                padding: '6px 16px', 
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '800',
                boxShadow: '0 4px 12px rgba(199,154,47,0.28)'
              }}>
                {parseInt(item.discount)}% OFF
              </span>
              <span style={{ color: 'var(--accent-tertiary)', fontSize: '0.9rem', fontWeight: '700' }}>
                View Details &rarr;
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProviderCard
