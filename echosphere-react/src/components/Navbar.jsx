import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/back_removed.png'

function Navbar() {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <motion.header
      className='site-header'
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 22 }}
    >
      <div className='top-strip'>
        <div className='top-strip__inner'>
          <span>Contact: 8308251866</span>
          <span>WhatsApp: 9272031602</span>
          <span>Email: echospherensk2024@gmail.com</span>
          <span>Office: Shop No.26, Sai Kuber Complex, Kopargaon</span>
        </div>
      </div>

      <nav className='navbar'>
        <Link to='/' className='brand' aria-label='Echosphere home'>
          <span className='brand-logo-frame'>
            <img src={logo} alt='Echosphere Multi Services Pvt. Ltd.' />
          </span>
        </Link>

        <div className='nav-links'>
          <Link to='/' className={isActive('/') ? 'active' : ''}>Home</Link>
          <Link to='/services' className={isActive('/services') ? 'active' : ''}>Services</Link>
          <Link to='/providers' className={isActive('/providers') ? 'active' : ''}>Providers</Link>
          <Link to='/about' className={isActive('/about') ? 'active' : ''}>About Us</Link>
          <Link to='/contact' className={isActive('/contact') ? 'active' : ''}>Contact</Link>
        </div>
      </nav>
    </motion.header>
  )
}

export default Navbar
