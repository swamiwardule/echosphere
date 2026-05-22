import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ContactPage() {
  const contacts = [
    {
      label: 'Office Phone',
      value: '8308251866',
      href: 'tel:8308251866',
      action: 'Call Office',
    },
    {
      label: 'WhatsApp',
      value: '9272031602',
      href: 'https://wa.me/919272031602',
      action: 'Open WhatsApp',
    },
    {
      label: 'Email',
      value: 'echospherensk2024@gmail.com',
      href: 'mailto:echospherensk2024@gmail.com',
      action: 'Send Email',
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Navbar />

      <main className='contact-page'>
        <section className='container contact-hero-panel'>
          <div>
            <span className='eyebrow'>Contact Echosphere</span>
            <h1>Let’s Help You Find the Right Service</h1>
            <p>
              Reach out for healthcare, hotels, grocery, daily needs, gym, discount card, provider listing, or app-related support.
            </p>
          </div>
          <div className='contact-quick-panel'>
            <strong>Office Address</strong>
            <span>Shop No.26, Sai Kuber Complex, Sai Kuber City, Yeola Road, Kopargaon (Ahilyanagar)</span>
            <a
              href='https://www.google.com/maps/search/?api=1&query=Shop%20No.26%20Sai%20Kuber%20Complex%20Sai%20Kuber%20City%20Yeola%20Road%20Kopargaon'
              target='_blank'
              rel='noreferrer'
            >
              Open Location
            </a>
          </div>
        </section>

        <section className='container contact-card-grid'>
          {contacts.map((item) => (
            <a
              className='contact-card'
              href={item.href}
              key={item.label}
              target={item.label === 'WhatsApp' ? '_blank' : undefined}
              rel='noreferrer'
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <em>{item.action}</em>
            </a>
          ))}
        </section>

        <section className='container contact-support-strip'>
          <div>
            <h2>Business Listing and Service Support</h2>
            <p>For joining Echosphere as a provider, call us or message directly on WhatsApp.</p>
          </div>
          <a className='outline-button' href='https://wa.me/919272031602' target='_blank' rel='noreferrer'>Message on WhatsApp</a>
        </section>
      </main>

      <Footer />
    </motion.div>
  )
}

export default ContactPage
