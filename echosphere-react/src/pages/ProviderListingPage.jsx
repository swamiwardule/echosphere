import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatImageUrl, getProvidersByTaluka, getTalukas } from '../api/apiService'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ProviderListingPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [talukas, setTalukas] = useState([])
  const [providers, setProviders] = useState([])
  const [selectedTaluka, setSelectedTaluka] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchProvidersByTaluka()
    } else {
      fetchTalukas()
    }
  }, [id])

  const fetchTalukas = async () => {
    setLoading(true)
    setError(null)
    setProviders([])
    setSelectedTaluka(null)

    try {
      const response = await getTalukas()
      setTalukas(response.data?.data || [])
    } catch (err) {
      console.error('Failed to load talukas:', err)
      setError('Unable to load regions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fetchProvidersByTaluka = async () => {
    setLoading(true)
    setError(null)

    try {
      const [talukaRes, providerRes] = await Promise.all([
        getTalukas().catch(() => ({ data: { data: [] } })),
        getProvidersByTaluka(id),
      ])
      const regions = talukaRes.data?.data || []

      setTalukas(regions)
      setSelectedTaluka(regions.find((taluka) => String(taluka.id) === String(id)) || null)
      setProviders(providerRes.data?.data || [])
    } catch (err) {
      console.error('Failed to load providers:', err)
      setError('Unable to load providers for this region. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Navbar />

      <main className='container listing-page'>
        {id && <button className='back-button' onClick={() => navigate('/providers')}>Back to Regions</button>}

        <section className='listing-hero'>
          <span className='eyebrow'>{id ? 'Region providers' : 'Provider regions'}</span>
          <h1>{id ? `Providers in ${selectedTaluka?.name || 'Selected Region'}` : 'Find Providers by Region'}</h1>
          <p>{id ? 'Browse available providers and contact them directly.' : 'Choose your region to explore local service providers.'}</p>
        </section>

        {loading && (
          <div className='loading'>
            <div className='spinner'></div>
            <p>{id ? 'Loading providers...' : 'Loading regions...'}</p>
          </div>
        )}

        {error && <div className='error'>{error}</div>}

        {!loading && !error && !id && (
          <div className='subservice-grid'>
            {talukas.length > 0 ? (
              talukas.map((taluka) => (
                <motion.article
                  key={taluka.id}
                  className='region-card'
                  onClick={() => navigate(`/taluka/${taluka.id}`)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className='service-icon-wrapper'>
                    <i className='fa-solid fa-map-location-dot'></i>
                  </div>
                  <h3>{taluka.name}</h3>
                  <p>View available providers in this region.</p>
                  <span>Browse Providers</span>
                </motion.article>
              ))
            ) : (
              <div className='empty-state'>No regions available at the moment.</div>
            )}
          </div>
        )}

        {!loading && !error && id && (
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
              <div className='empty-state'>No providers found in this region yet.</div>
            )}
          </div>
        )}

        {!id && (
          <section className='how-it-works'>
            <h2>How It Works</h2>
            <div className='steps-grid'>
              <span>Select your region</span>
              <span>Browse providers</span>
              <span>Open provider details</span>
              <span>Call or WhatsApp directly</span>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </motion.div>
  )
}

export default ProviderListingPage
