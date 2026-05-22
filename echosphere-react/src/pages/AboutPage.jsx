import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ownerImage from '../assets/owner.jpeg'

function AboutPage() {
  const stats = [
    ['10,000+', 'Discount cards distributed'],
    ['20,000+', 'Adventure pass customers'],
    ['4,000+', 'Freelancer network goal'],
    ['380', 'Taluka service agencies'],
  ]

  const strengths = [
    'Healthcare, hotels, grocery, gym, daily needs, and more in one place',
    'Discount card model for genuine local offers',
    'Support for small businesses and local entrepreneurs',
    'Service discovery planned across district and taluka levels',
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Navbar />

      <main className='about-page'>
        <section className='container about-hero-panel'>
          <div>
            <span className='eyebrow'>About Echosphere</span>
            <h1>Every Service on a Single Click</h1>
            <p>
              EchoSphere Multi Services Pvt. Ltd. helps customers discover trusted local services while giving small
              businesses a stronger platform to reach people in their area.
            </p>
          </div>
          <div className='about-hero-card'>
            <strong>Built For Local Markets</strong>
            <span>Healthcare, hotels, grocery, daily needs, gym, discount cards, business listings, and app-based discovery.</span>
          </div>
        </section>

        <section className='container about-stat-grid'>
          {stats.map(([value, label]) => (
            <div className='about-stat-card' key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section className='container about-card-grid'>
          <article className='about-info-card'>
            <span className='eyebrow'>Vision</span>
            <h2>Empowering Local Businesses</h2>
            <p>
              Our vision is to connect people with useful local services and help small businesses grow through better
              visibility, customer trust, and practical discount-led engagement.
            </p>
            <ul>
              <li>Customer-friendly service discovery</li>
              <li>Better reach for local businesses</li>
              <li>Useful discounts on everyday needs</li>
            </ul>
          </article>

          <article className='about-info-card about-info-card--gold'>
            <span className='eyebrow'>Mission</span>
            <h2>Services, Offers, and Opportunity</h2>
            <p>
              We are building a platform where customers can find nearby services and local partners can create more
              business, employment, and earning opportunities across Maharashtra.
            </p>
            <ul>
              <li>Discount cards for customers</li>
              <li>Business listing support</li>
              <li>Freelancer and agency network growth</li>
            </ul>
          </article>
        </section>

        <section className='container founder-section'>
          <div className='owner-photo-card'>
            <img src={ownerImage} alt='Satish Patil, Founder and CEO' />
            <strong>Satish Patil</strong>
            <span>Founder & CEO</span>
          </div>
          <div className='founder-message'>
            <span className='eyebrow'>Founder Message</span>
            <h2>Creating a Platform for People, Shops, and Service Providers</h2>
            <p>
              EchoSphere Multi Services Pvt. Ltd. was started to bring local services closer to customers and to help
              shop owners, sellers, and providers create more opportunities through digital discovery.
            </p>
            <p>
              With projects like Adventure Pass and our service-search platform, we aim to make needed services visible
              at district and taluka levels while supporting local markets and employment.
            </p>
            <p className='founder-signature'>Your Thankful, Satish Patil</p>
          </div>
        </section>

        <section className='container why-section'>
          <div>
            <span className='eyebrow'>Why Choose Us</span>
            <h2>A Practical Platform for Everyday Services</h2>
          </div>
          <div className='why-list'>
            {strengths.map((item) => (
              <div className='why-item' key={item}>{item}</div>
            ))}
          </div>
        </section>

        <section className='container about-cta'>
          <h2>Want to Connect With Echosphere?</h2>
          <p>Contact us for service support, business listing, discount card information, or partnership enquiries.</p>
          <a className='neon-button' href='/contact'>Contact Us</a>
        </section>
      </main>

      <Footer />
    </motion.div>
  )
}

export default AboutPage
