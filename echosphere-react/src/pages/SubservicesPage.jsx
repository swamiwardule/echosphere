import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatImageUrl, getSubservices } from '../api/apiService'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function SubservicesPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [subservices, setSubservices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    fetchSubservices()
  }, [id])

  const fetchSubservices = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await getSubservices(id)
      setSubservices(response.data?.data || [])
    } catch (err) {
      console.error('Failed to load subservices:', err)
      setError('Unable to load subservices. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Navbar />

      <main className='container listing-page'>
        <button className='back-button' onClick={() => navigate(-1)}>Back</button>

        <section className='listing-hero'>
          <span className='eyebrow'>Choose a service type</span>
          <h1>Available Subservices</h1>
          <p>Select the exact service you need and browse trusted providers near you.</p>
        </section>

        {loading && (
          <div className='loading'>
            <div className='spinner'></div>
            <p>Loading subservices...</p>
          </div>
        )}

        {error && <div className='error'>{error}</div>}

        {!loading && !error && (
          <div className='subservice-grid'>
            {subservices.length > 0 ? (
              subservices.map((item) => (
                <motion.article
                  key={item.id}
                  className='subservice-card'
                  onClick={() => navigate(`/service-details/${item.id}`)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {item.image ? (
                    <div className='subservice-card__image'>
                      <img src={formatImageUrl(item.image)} alt={item.name} />
                    </div>
                  ) : (
                    <div className='subservice-card__placeholder'>{item.name?.charAt(0) || 'E'}</div>
                  )}
                  <div className='subservice-card__body'>
                    <span>{item.service_name || 'Echosphere Service'}</span>
                    <h3>{item.name}</h3>
                    <p>{item.description || 'Tap to view available providers and service details.'}</p>
                    <strong>View Providers</strong>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className='empty-state'>No subservices found for this service.</div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </motion.div>
  )
}

export default SubservicesPage
