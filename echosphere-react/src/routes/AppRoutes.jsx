import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import ServicesPage from '../pages/ServicesPage'
import SubservicesPage from '../pages/SubservicesPage'
import SubserviceDetailPage from '../pages/SubserviceDetailPage'
import ProviderListingPage from '../pages/ProviderListingPage'
import ProviderDetailPage from '../pages/ProviderDetailPage'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/services' element={<ServicesPage />} />
        <Route path='/services/:id' element={<SubservicesPage />} />
        <Route path='/service-details/:id' element={<SubserviceDetailPage />} />
        <Route path='/providers' element={<ProviderListingPage />} />
        <Route path='/taluka/:id' element={<ProviderListingPage />} />
        <Route path='/subservices/:id' element={<ProviderListingPage />} />
        <Route path='/provider/:id' element={<ProviderDetailPage />} />
        <Route path='/provider-details/:id' element={<ProviderDetailPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
