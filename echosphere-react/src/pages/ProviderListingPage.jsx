import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatImageUrl, getProvidersByTaluka, getTalukas } from '../api/apiService'
import { useScrollAnimation } from '../useScrollAnimation'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ProviderListingPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [talukas, setTalukas] = useState([])
  const [filteredTalukas, setFilteredTalukas] = useState([])
  const [providers, setProviders] = useState([])
  const [filteredProviders, setFilteredProviders] = useState([])
  const [selectedTaluka, setSelectedTaluka] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const { ref: regionsRef, isInView: regionsInView } = useScrollAnimation({ triggerOnce: true, threshold: 0.1 })
  const { ref: providersRef, isInView: providersInView } = useScrollAnimation({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (id) {
      fetchProvidersByTaluka()
    } else {
      fetchTalukas()
    }
  }, [id])

  useEffect(() => {
    if (id) {
      filterProviders()
    } else {
      filterTalukas()
    }
  }, [providers, talukas, searchTerm, id])

  const fetchTalukas = async () => {
    setLoading(true)
    setError(null)
    setProviders([])
    setSelectedTaluka(null)
    setSearchTerm('')

    try {
      const response = await getTalukas()
      setTalukas(response.data?.data || [])
      setFilteredTalukas(response.data?.data || [])
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
    setSearchTerm('')

    try {
      const [talukaRes, providerRes] = await Promise.all([
        getTalukas().catch(() => ({ data: { data: [] } })),
        getProvidersByTaluka(id),
      ])
      const regions = talukaRes.data?.data || []

      setTalukas(regions)
      setSelectedTaluka(regions.find((taluka) => String(taluka.id) === String(id)) || null)
      setProviders(providerRes.data?.data || [])
      setFilteredProviders(providerRes.data?.data || [])
    } catch (err) {
      console.error('Failed to load providers:', err)
      setError('Unable to load providers for this region. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filterTalukas = () => {
    let filtered = talukas

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (taluka) =>
          taluka.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredTalukas(filtered)
  }

  const filterProviders = () => {
    let filtered = providers

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (provider) =>
          provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.subservice_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProviders(filtered)
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
          <>
            <motion.div
              className='search-panel'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className='search-row'>
                <input
                  type='text'
                  placeholder='Search regions by name...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <motion.button className='neon-button' whileHover={{ scale: 1.05 }}>
                  Search
                </motion.button>
              </div>
              <p className='result-count'>
                Showing {filteredTalukas.length} region{filteredTalukas.length !== 1 ? 's' : ''}
              </p>
            </motion.div>

            <div ref={regionsRef} className='subservice-grid'>
              {filteredTalukas.length > 0 ? (
                filteredTalukas.map((taluka) => (
                  <motion.article
                    key={taluka.id}
                    className='region-card'
                    onClick={() => navigate(`/taluka/${taluka.id}`)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={regionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className='service-icon-wrapper'>
                      <span className='service-icon-letter'>{taluka.name?.charAt(0) || 'R'}</span>
                    </div>
                    <h3>{taluka.name}</h3>
                    <p>View available providers in this region.</p>
                    <span>Browse Providers</span>
                  </motion.article>
                ))
              ) : (
                <motion.div className='no-results' style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                  <p>No regions found matching your search.</p>
                  <motion.button className='reset-btn' onClick={() => setSearchTerm('')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Clear Search
                  </motion.button>
                </motion.div>
              )}
            </div>
          </>
        )}

        {!loading && !error && id && (
          <>
            <motion.div
              className='search-panel'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className='search-row'>
                <input
                  type='text'
                  placeholder='Search providers by name, location or service...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <motion.button className='neon-button' whileHover={{ scale: 1.05 }}>
                  Search
                </motion.button>
              </div>
              <p className='result-count'>
                Showing {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''}
              </p>
            </motion.div>

            <div ref={providersRef} className='provider-list-grid'>
              {filteredProviders.length > 0 ? (
                filteredProviders.map((provider) => (
                  <motion.article
                    key={provider.id}
                    className='provider-list-card'
                    onClick={() => navigate(`/provider/${provider.id}`, { state: { provider } })}
                    initial={{ opacity: 0, y: 20 }}
                    animate={providersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                <motion.div className='no-results' style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                  <p>No providers found matching your search.</p>
                  <motion.button className='reset-btn' onClick={() => setSearchTerm('')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Clear Search
                  </motion.button>
                </motion.div>
              )}
            </div>
          </>
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
