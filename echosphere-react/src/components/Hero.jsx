import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()

  return (
    <section className='hero'>
      <div className='hero-media service-orbit' aria-hidden='true'>
        <img className='hero-photo hero-photo-one' src='/assets/hero-service-1.jpg' alt='' onError={(event) => { event.currentTarget.style.display = 'none' }} />
        <img className='hero-photo hero-photo-two' src='/assets/hero-service-2.jpg' alt='' onError={(event) => { event.currentTarget.style.display = 'none' }} />
        <div className='service-orbit__card card-health'>Healthcare</div>
        <div className='service-orbit__card card-hotel'>Hotels</div>
        <div className='service-orbit__card card-grocery'>Grocery</div>
        <div className='service-orbit__card card-gym'>Gym</div>
        <div className='service-orbit__center'>Daily Needs</div>
      </div>

      <motion.div
        className='hero-content'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <span className='eyebrow'>Local services for everyday life</span>
        <h1>
          Find Trusted Services Near You With <span className='gradient-text'>Echosphere</span>
        </h1>
        <p>
          Discover healthcare support, hotels, grocery stores, daily needs, fitness services, and more from verified
          local providers in one simple place.
        </p>
        <div className='hero-actions'>
          <button onClick={() => navigate('/services')} className='neon-button'>
            Explore Services
          </button>
          <button onClick={() => navigate('/contact')} className='outline-button'>
            Contact Us
          </button>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
