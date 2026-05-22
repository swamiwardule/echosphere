import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getServices } from '../api/apiService'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ServicesPage() {
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    filterServices()
  }, [services, searchTerm])

  const fetchServices = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await getServices()
      const allServices = response.data?.data || []
      setServices(allServices)
      setFilteredServices(allServices)
    } catch (err) {
      console.error('Failed to load services:', err)
      setError('Unable to load services. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const filterServices = () => {
    let filtered = services

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredServices(filtered)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Navbar />

      <div style={{ marginTop: '100px', textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="section-title">Explore All Services</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
            Find healthcare, hotels, grocery, daily needs, gym, and other trusted local services.
          </p>
        </motion.div>
      </div>

      <div className='container'>
        <motion.div
          className='glass-panel'
          style={{ padding: 'var(--space-md)', marginBottom: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: '15px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div style={{ display: 'flex', gap: '15px' }}>
            <input
              type='text'
              style={{ flex: 1, padding: '12px 20px', fontSize: '1rem', outline: 'none' }}
              placeholder='Search services by name or description...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <motion.button className='neon-button' style={{ padding: '12px 24px' }} whileHover={{ scale: 1.05 }}>
              Search
            </motion.button>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'right' }}>
            Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='loading'>
            <div className='spinner'></div>
            <p>Loading services...</p>
          </motion.div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='error'>
            {error}
          </motion.div>
        )}

        {!loading && !error && (
          <motion.div className='grid' variants={containerVariants} initial='hidden' animate='visible'>
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  className='service-card glass-panel'
                  variants={itemVariants}
                  onClick={() => navigate(`/services/${service.id}`)}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div className='service-icon-wrapper' style={{ marginBottom: 0 }}>
                      <i className="fa-solid fa-leaf"></i>
                    </div>
                    <motion.div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                      #{index + 1}
                    </motion.div>
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem' }}>{service.name}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                      {service.description || 'Click to explore subservices'}
                    </p>
                  </div>

                  <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Explore Subservices
                    </span>
                    <motion.span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }} animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      &rarr;
                    </motion.span>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div className='no-results' variants={itemVariants}>
                <p>No services found matching your search.</p>
                <motion.button className='reset-btn' onClick={() => setSearchTerm('')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Clear Search
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      <Footer />
    </motion.div>
  )
}

export default ServicesPage
