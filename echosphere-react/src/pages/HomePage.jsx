import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getPopularServices, getOtherServices, getBanners } from '../api/apiService'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import BannerSlider from '../components/BannerSlider'
import PopularServiceCarousel from '../components/PopularServiceCarousel'
import ServiceCard from '../components/ServiceCard'

function HomePage() {
  const [banners, setBanners] = useState([])
  const [popularServices, setPopularServices] = useState([])
  const [otherServices, setOtherServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)
    setError(null)

    try {
      const [bannerRes, popular, other] = await Promise.all([
        getBanners().catch(() => ({ data: { data: [] } })),
        getPopularServices(),
        getOtherServices()
      ])

      setBanners(bannerRes.data?.data || [])
      setPopularServices(popular.data?.data || [])
      setOtherServices(other.data?.data || [])
    } catch (err) {
      console.error('Failed to load home data:', err)
      setError('Unable to load page data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Navbar />
      <Hero />

      {/* Banners Section */}
      {banners.length > 0 && (
        <motion.div
          style={{ maxWidth: '1200px', margin: 'var(--space-xl) auto', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-panel"
        >
          <BannerSlider banners={banners} />
        </motion.div>
      )}

      <div className='container'>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="loading"
          >
            <div className="spinner"></div>
            <p style={{ color: 'var(--text-secondary)' }}>Curating premium services...</p>
          </motion.div>
        )}
        {error && (
          <div style={{ textAlign: 'center', padding: 'var(--space-lg)' }}>
             <p style={{ color: '#ff5252' }}>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className='section-title'>Popular Services</h2>
              <PopularServiceCarousel services={popularServices} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className='section-title'>Explore Everyday Categories</h2>
              <motion.div
                className='grid'
                variants={containerVariants}
              >
                {otherServices.length > 0 ? (
                  otherServices.map((item) => (
                    <motion.div key={item.id} variants={itemVariants}>
                      <ServiceCard item={item} onClick={() => navigate(`/services/${item.id}`)} />
                    </motion.div>
                  ))
                ) : (
                  <motion.p variants={itemVariants} style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No other services available right now.
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>

      <Footer />
    </motion.div>
  )
}

export default HomePage
