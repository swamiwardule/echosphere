import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/back_removed.png'

function Footer() {
  return (
    <motion.footer
      className='footer'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className='container footer-grid'>
        <div>
          <div className='footer-brand'>
            <span className='brand-logo-frame'>
              <img src={logo} alt='Echosphere Multi Services Pvt. Ltd.' />
            </span>
          </div>
          <h3>ABOUT COMPANY</h3>
          <p>
            Echosphere helps people find trusted local services for healthcare, hotels, groceries, daily needs, gyms,
            and other essential categories from one convenient platform.
          </p>
        </div>

        <div>
          <h3>QUICK LINKS</h3>
          <Link to='/'>Home</Link>
          <Link to='/services'>Services</Link>
          <Link to='/about'>About Us</Link>
          <Link to='/contact'>Contact Us</Link>
        </div>

        <div>
          <h3>CONTACT NOW</h3>
          <p>Contact: 8308251866</p>
          <p>WhatsApp: 9272031602</p>
          <p>echospherensk2024@gmail.com</p>
          <p>Shop No.26, Sai Kuber Complex, Sai Kuber City, Yeola Road, Kopargaon (Ahilyanagar)</p>
        </div>
      </div>
      <div className='footer-bottom'>Copyright 2026 Echosphere India. All rights reserved.</div>
    </motion.footer>
  )
}

export default Footer
