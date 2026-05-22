import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getServiceDetails, formatImageUrl } from '../api/apiService'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function SubserviceDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    fetchProviders()
  }, [id])

  const fetchProviders = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await getServiceDetails(id)
      setProviders(response.data?.data || [])
    } catch (err) {
      console.error('Failed to load providers:', err)
      setError('Unable to load providers. Please try again.')
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
          <span className='eyebrow'>Provider directory</span>
          <h1>Available Providers</h1>
          <p>Compare providers, offers, contact details, and service areas before choosing.</p>
        </section>

        {loading && (
          <div className='loading'>
            <div className='spinner'></div>
            <p>Loading providers...</p>
          </div>
        )}

        {error && <div className='error'>{error}</div>}

        {!loading && !error && (
          <div className='provider-list-grid'>
            {providers.length > 0 ? (
              providers.map((provider) => (
                <motion.article
                  key={provider.id}
                  className='provider-list-card'
                  onClick={() => navigate(`/provider/${provider.id}`, { state: { provider } })}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -6 }}
                >
                  {provider.image ? (
                    <div className='provider-list-card__image'>
                      <img src={formatImageUrl(provider.image)} alt={provider.name} />
                    </div>
                  ) : (
                    <div className='provider-list-card__placeholder'>{provider.name?.charAt(0) || 'P'}</div>
                  )}

                  <div className='provider-list-card__body'>
                    {provider.discount > 0 && <span className='discount-badge'>{provider.discount}% OFF</span>}
                    <h3>{provider.name}</h3>
                    {provider.subservice_name && <p className='subservice'>{provider.subservice_name}</p>}
                    {provider.address && <p><strong>Location:</strong> {provider.address}</p>}
                    {provider.phone && <p><strong>Phone:</strong> {provider.phone}</p>}
                    <span className='provider-card-link'>View Details</span>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className='empty-state'>No providers found for this subservice.</div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </motion.div>
  )
}

export default SubserviceDetailPage
