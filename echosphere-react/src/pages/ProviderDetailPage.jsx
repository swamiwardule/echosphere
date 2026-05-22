import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatImageUrl, getServiceDetailById } from '../api/apiService'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ProviderDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [provider, setProvider] = useState(location.state?.provider || null)
  const [loading, setLoading] = useState(!provider)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (location.state?.provider) {
      setProvider(location.state.provider)
      setLoading(false)
      return
    }

    if (id) fetchProvider()
  }, [id, location.state])

  const fetchProvider = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await getServiceDetailById(id)
      if (response.data?.data) {
        setProvider(response.data.data)
      } else {
        setError('Provider not found.')
      }
    } catch (err) {
      console.error('Failed to load provider details:', err)
      setError('Unable to load provider details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const openExternal = (value, fallbackPrefix = '') => {
    if (!value) return
    const url = value.startsWith('http') ? value : `${fallbackPrefix}${value}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleCall = (phone) => {
    if (phone) window.location.href = `tel:${phone}`
  }

  const handleWhatsApp = (phone) => {
    if (phone) window.open(`https://wa.me/${phone.replace(/\D/g, '')}`, '_blank', 'noopener,noreferrer')
  }

  const handleEmail = (email) => {
    if (email) window.location.href = `mailto:${email}`
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Navbar />

      <main className='container listing-page'>
        <button className='back-button' onClick={() => navigate(-1)}>Back</button>

        {loading && (
          <div className='loading'>
            <div className='spinner'></div>
            <p>Loading provider details...</p>
          </div>
        )}

        {error && (
          <div className='empty-state'>
            <p>{error}</p>
            <button className='outline-button' onClick={() => navigate(-1)}>Go Back</button>
          </div>
        )}

        {!loading && !error && provider && (
          <motion.section
            className='provider-detail-shell'
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className='provider-detail-hero'>
              <div className='provider-detail-image'>
                {provider.image ? (
                  <img src={formatImageUrl(provider.image)} alt={provider.name} />
                ) : (
                  <span>{provider.name?.charAt(0) || 'P'}</span>
                )}
              </div>

              <div className='provider-detail-summary'>
                <span className='eyebrow'>{provider.subservice_name || 'Service Provider'}</span>
                <h1>{provider.name}</h1>
                {(provider.taluka_name || provider.district) && (
                  <p>{[provider.taluka_name, provider.district].filter(Boolean).join(', ')}</p>
                )}
                {provider.discount > 0 && <strong className='detail-discount'>{provider.discount}% OFF</strong>}
              </div>
            </div>

            <div className='provider-detail-grid'>
              {provider.address && (
                <article className='detail-card'>
                  <span>Address</span>
                  <p>{provider.address}</p>
                </article>
              )}

              {(provider.taluka_name || provider.district || provider.state || provider.pincode) && (
                <article className='detail-card'>
                  <span>Service Area</span>
                  <p>{[provider.taluka_name, provider.district, provider.state, provider.pincode].filter(Boolean).join(', ')}</p>
                </article>
              )}

              {provider.phone && (
                <article className='detail-card'>
                  <span>Phone</span>
                  <p>{provider.phone}</p>
                </article>
              )}

              {provider.email && (
                <article className='detail-card'>
                  <span>Email</span>
                  <p>{provider.email}</p>
                </article>
              )}

              {provider.owner_id && (
                <article className='detail-card'>
                  <span>Owner</span>
                  <p>{provider.owner_id}</p>
                </article>
              )}
            </div>

            <div className='provider-actions'>
              {provider.phone && <button className='neon-button' onClick={() => handleCall(provider.phone)}>Call Now</button>}
              {(provider.whatsapp || provider.phone) && (
                <button className='outline-button' onClick={() => handleWhatsApp(provider.whatsapp || provider.phone)}>WhatsApp</button>
              )}
              {provider.website && <button className='outline-button' onClick={() => openExternal(provider.website, 'https://')}>Website</button>}
              {provider.email && <button className='outline-button' onClick={() => handleEmail(provider.email)}>Email</button>}
            </div>

            {(provider.facebook_link || provider.instagram_link || provider.youtube_link) && (
              <div className='social-links'>
                <h3>Follow Provider</h3>
                <div className='social-buttons'>
                  {provider.facebook_link && <button onClick={() => openExternal(provider.facebook_link, 'https://facebook.com/')}>Facebook</button>}
                  {provider.instagram_link && <button onClick={() => openExternal(provider.instagram_link, 'https://instagram.com/')}>Instagram</button>}
                  {provider.youtube_link && <button onClick={() => openExternal(provider.youtube_link, 'https://youtube.com/')}>YouTube</button>}
                </div>
              </div>
            )}
          </motion.section>
        )}
      </main>

      <Footer />
    </motion.div>
  )
}

export default ProviderDetailPage
