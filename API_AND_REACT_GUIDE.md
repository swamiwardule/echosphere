# echosphere - Backend API & React Integration Guide

## 📋 Backend Odoo API Endpoints

### Authentication
- **POST** `/api/login`
  - Body: `{ login, password }`
  - Returns: `user_id`, `name`, `login`, `session_id`

### Services (Main)
- **GET** `/api/services` - Get all services
  - Returns: `id`, `name`, `description`
  
- **POST** `/api/create_service`
  - Body: `{ name, description }`
  - Returns: `service_id`

- **GET** `/api/popular_services` - Get services marked as popular
  - Returns: `id`, `name`, `description`, `image` (base64)

- **GET** `/api/other_services` - Get non-popular services
  - Returns: `id`, `name`, `description`, `image` (base64)

### Subservices
- **GET** `/api/subservices?service_id={id}` - Get subservices for a service
  - Returns: `id`, `name`, `service_id`, `service_name`

- **POST** `/api/create_subservice`
  - Body: `{ name, service_id }`
  - Returns: `subservice_id`

### Service Details (Providers/Listings)
- **GET** `/api/service_details?subservice_id={id}` - Get providers for a subservice
  - Returns: `id`, `name`, `address`, `phone`, `discount`, `subservice_id`, `subservice_name`, `image`

- **POST** `/api/create_service_detail`
  - Body: `{ name, address, phone, discount, subservice_id, image }`
  - Returns: `detail_id`

### Talukas (Regions)
- **GET** `/api/talukas` - Get all talukas/regions
  - Returns: `id`, `name`

### Customer Registration
- **POST** `/api/register_customer`
  - Body: `{ name, phone, taluka_id, is_card_holder }`
  - Returns: `customer_id`

### Service Requests
- **POST** `/api/create_service_request`
  - Body: `{ service, subservice, name, address, phone, discount, image }`
  - Returns: `request_id`

- **POST** `/api/approve_request` (requires authentication)
  - Body: `{ request_id }`

---

## 🗂️ Database Models

### service.service (Main Services)
```
- name (required)
- description
- subservice_ids (One2many)
- is_popular (Boolean)
- icon (Image)
- banner (Image)
- sequence (Integer)
- is_featured (Boolean)
- active (Boolean)
```

### service.subservice (Sub Services)
```
- name (required)
- service_id (Many2one → service.service)
- detail_ids (One2many)
- icon (Image)
- banner (Image)
- sequence (Integer)
- active (Boolean)
```

### service.detail (Provider Listings)
```
- name (required)
- address
- phone
- discount (Float %)
- image (Image)
- subservice_id (Many2one → service.subservice, required)
- whatsapp
- email
- website
- rating (Float)
- review_count (Integer)
- latitude, longitude (Float)
- open_24_hours (Boolean)
- is_featured (Boolean)
- is_verified (Boolean)
- sequence (Integer)
- active (Boolean)
- taluka, district, state, pincode (Char)
- gallery_ids (One2many → provider.gallery)
```

### service.customer (Customers)
```
- name (required)
- photo (Image)
- phone (required)
- card_number
- dob, age
- address
- taluka_id (Many2one → service.taluka)
- district, state
- active (Boolean)
- is_card_holder (Boolean)
```

### service.taluka (Regions)
```
- name (required)
- active (Boolean)
```

### service.banner (Banners)
```
- title
- image (required)
- sequence (Integer)
- active (Boolean)
```

### service.news (News)
```
- title (required)
- description
- image
- date
- active (Boolean)
```

### service.request (Service Requests)
```
- service_id (Many2one)
- new_service (Char - if new service)
- subservice_id (Many2one)
- new_subservice (Char - if new subservice)
- name, address, phone, discount, image
```

### provider.gallery (Provider Gallery)
```
- Stores images for each service.detail
```

---

## 🎨 React Pages - Current Status & Integration Needed

### ✅ HomePage.jsx - PARTIALLY IMPLEMENTED
**Current:**
- Calls `/popular_services` and `/other_services` ✅
- Displays PopularServiceCarousel ✅

**Status:** ~60% Complete

---

### ✅ ServicesPage.jsx - PARTIALLY IMPLEMENTED
**Current:**
- Fetches `/services` ✅
- Shows all services in grid ✅
- Has search/filter logic ✅

**Status:** ~70% Complete

---

### ✅ SubservicesPage.jsx - WORKING
**Current:**
- Fetches `/subservices?service_id={id}` ✅
- Displays subservices grid ✅
- Routes to service details ✅

**Status:** 100% Complete

---

### ❌ SubserviceDetailPage.jsx - NOT IMPLEMENTED
**Needs to:**
- Fetch `/service_details?subservice_id={id}` (get providers)
- Display provider listings with images, ratings, discount
- Route to provider detail page or call action

**Suggested Implementation:**
```javascript
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/apiService'

function SubserviceDetailPage() {
  const { id } = useParams()
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
      const response = await api.get('/service_details', {
        params: { subservice_id: id }
      })
      setProviders(response.data?.data || [])
    } catch (err) {
      console.error('Failed to load providers:', err)
      setError('Unable to load providers.')
    } finally {
      setLoading(false)
    }
  }

  return (
    // Display providers in a grid/list
  )
}

export default SubserviceDetailPage
```

---

### ❌ ProviderListingPage.jsx - NOT IMPLEMENTED
**Needs to:**
- Display a list of all providers (can paginate)
- Filter by subservice, rating, distance
- Show provider cards with image, rating, discount

---

### ❌ ProviderDetailPage.jsx - NOT IMPLEMENTED
**Needs to:**
- Fetch single provider detail from `/service_details?subservice_id={id}`
- Display full provider information:
  - Name, address, contact info, website, whatsapp
  - Rating, review count
  - Gallery images
  - Discount
  - Location (latitude/longitude - show on map?)
  - Hours (24 hours or custom)
- Action buttons: Call, WhatsApp, Website, Request Service

---

### ❌ AboutPage.jsx - EMPTY
**Needs to:**
- Static page or fetch some info

---

### ❌ ContactPage.jsx - EMPTY
**Needs to:**
- Form to create service request via `/api/create_service_request`
- Capture: service name, subservice name, name, address, phone, discount, image
- Show success/error message

---

### ❌ NewsPage.jsx - NOT IMPLEMENTED
**Needs to:**
- Fetch news from backend (needs API endpoint - not yet created)
- Display news articles with image, title, description, date

---

---

## 🚀 React API Service Updates

### Current [apiService.js](apiService.js)
```javascript
import axios from 'axios'

const defaultConfig = {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
}

const api = axios.create({
  baseURL: '/api',
  ...defaultConfig,
})

const authApi = axios.create({
  baseURL: '/',
  ...defaultConfig,
})

export async function authenticate(login, password) {
  const body = { login, password }
  return authApi.post('api/login', body)
}

export default api
```

### Additional API Functions Needed
```javascript
// Services
export async function getServices() {
  return api.get('/services')
}

export async function getPopularServices() {
  return api.get('/popular_services')
}

export async function getOtherServices() {
  return api.get('/other_services')
}

// Subservices
export async function getSubservices(serviceId) {
  return api.get('/subservices', { params: { service_id: serviceId } })
}

// Service Details (Providers)
export async function getServiceDetails(subserviceId) {
  return api.get('/service_details', { params: { subservice_id: subserviceId } })
}

// Talukas
export async function getTalukas() {
  return api.get('/talukas')
}

// Customer
export async function registerCustomer(name, phone, talukaId, isCardHolder) {
  return api.post('/register_customer', {
    name, phone, taluka_id: talukaId, is_card_holder: isCardHolder
  })
}

// Service Request
export async function createServiceRequest(data) {
  return api.post('/create_service_request', data)
}
```

---

## 📊 Flow Diagram

```
HomePage
  ├── /popular_services ✅
  ├── /other_services ✅
  └── Routes to: ServicesPage, ProviderDetailPage

ServicesPage ✅
  ├── /services
  └── Routes to: SubservicesPage

SubservicesPage ✅
  ├── /subservices?service_id={id}
  └── Routes to: SubserviceDetailPage

SubserviceDetailPage (NEED TO IMPLEMENT)
  ├── /service_details?subservice_id={id}
  └── Routes to: ProviderDetailPage

ProviderDetailPage (NEED TO IMPLEMENT)
  ├── Display full provider info
  └── Actions: Call, WhatsApp, Website, Book Service

ProviderListingPage (NEED TO IMPLEMENT)
  ├── Display all providers
  └── Filter & search

ContactPage (NEED TO IMPLEMENT)
  ├── /create_service_request (POST)
  └── Service request form

NewsPage (NEED TO IMPLEMENT)
  ├── /news (API endpoint MISSING in backend)
  └── Display news articles

AboutPage
  └── Static content
```

---

## 🛠️ Next Steps

1. **Update apiService.js** - Add helper functions for all API calls
2. **Implement SubserviceDetailPage** - Show providers for a subservice
3. **Implement ProviderDetailPage** - Show full provider details with contact options
4. **Implement ProviderListingPage** - List and filter all providers
5. **Implement ContactPage** - Service request form
6. **Implement NewsPage** - Need to create `/api/news` endpoint in backend first
7. **Add routing** - Ensure all routes are set up in AppRoutes.jsx
8. **Test with backend** - Verify all API calls work with Odoo

---

## 📝 Important Notes

- Authentication via `/api/login` returns session_id
- All image fields from backend come as base64 encoded strings
- Use `data:image/png;base64,{imageString}` for img src
- Error handling needed for network failures and validation
- Loading states should be shown during API calls
- Consider pagination for large data sets
