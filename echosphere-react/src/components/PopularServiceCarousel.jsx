import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { formatImageUrl } from '../api/apiService'

function PopularServiceCarousel({ services }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    if (!services || services.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [services])

  if (!services || services.length === 0) {
    return (
      <div className='popular-empty'>
        Popular services will appear here once they are added.
      </div>
    )
  }

  const service = services[currentIndex]
  const imageSrc = formatImageUrl(service.image)

  return (
    <section className='popular-showcase'>
      <AnimatePresence mode='wait'>
        <motion.article
          key={service.id}
          className='popular-feature'
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.35 }}
          onClick={() => navigate(`/services/${service.id}`)}
        >
          <div className='popular-feature__media'>
            {imageSrc ? (
              <img src={imageSrc} alt={service.name} />
            ) : (
              <div className='popular-feature__placeholder'>{service.name?.charAt(0) || 'E'}</div>
            )}
          </div>

          <div className='popular-feature__content'>
            <span className='eyebrow'>Most requested</span>
            <h3>{service.name}</h3>
            <p>{service.description || 'Explore trusted local providers, discounts, and nearby options for this service.'}</p>
            <button className='neon-button' type='button'>
              View Service
            </button>
          </div>
        </motion.article>
      </AnimatePresence>

      <div className='popular-list' aria-label='Popular service list'>
        {services.slice(0, 5).map((item, index) => (
          <button
            className={`popular-pill ${index === currentIndex ? 'active' : ''}`}
            key={item.id}
            type='button'
            onClick={() => setCurrentIndex(index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {item.name}
          </button>
        ))}
      </div>
    </section>
  )
}

export default PopularServiceCarousel
