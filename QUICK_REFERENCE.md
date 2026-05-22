# Quick Reference - API Integration Examples

## 🚀 How to Use the Updated API Service

### Import and Use in Your Components

```javascript
// In any React component
import { 
  getServices, 
  getPopularServices, 
  getSubservices,
  getServiceDetails,
  authenticate 
} from '../api/apiService'
```

---

## 📚 API Usage Examples

### 1. Authentication

```javascript
// Login and create session
try {
  const response = await authenticate('admin', 'Dreams')
  console.log('User:', response.data.user_id, response.data.name)
} catch (error) {
  console.error('Login failed:', error)
}
```

### 2. Get All Services

```javascript
// Fetch all main services
try {
  const response = await getServices()
  const services = response.data?.data || []
  console.log('Services:', services)
  // Returns: [{ id, name, description }, ...]
} catch (error) {
  console.error('Failed to fetch services:', error)
}
```

### 3. Get Popular Services

```javascript
// Fetch only popular services
try {
  const response = await getPopularServices()
  const popular = response.data?.data || []
  console.log('Popular Services:', popular)
  // Returns: [{ id, name, description, image (base64) }, ...]
} catch (error) {
  console.error('Failed to fetch popular services:', error)
}
```

### 4. Get Other Services

```javascript
// Fetch non-popular services
try {
  const response = await getOtherServices()
  const other = response.data?.data || []
  console.log('Other Services:', other)
} catch (error) {
  console.error('Failed to fetch other services:', error)
}
```

### 5. Get Subservices for a Service

```javascript
// Get subservices for a specific service ID
const serviceId = 5
try {
  const response = await getSubservices(serviceId)
  const subservices = response.data?.data || []
  // Returns: [{ id, name, service_id, service_name }, ...]
  subservices.forEach(sub => {
    console.log(`${sub.name} (under ${sub.service_name})`)
  })
} catch (error) {
  console.error('Failed to fetch subservices:', error)
}
```

### 6. Get Providers (Service Details)

```javascript
// Get all providers for a specific subservice
const subserviceId = 12
try {
  const response = await getServiceDetails(subserviceId)
  const providers = response.data?.data || []
  // Returns: [{ id, name, address, phone, discount, image (base64), ... }, ...]
  providers.forEach(provider => {
    console.log(`${provider.name} - ${provider.phone} - ${provider.discount}% off`)
  })
} catch (error) {
  console.error('Failed to fetch providers:', error)
}
```

### 7. Display Image from Base64

```javascript
// Images from backend come as base64 encoded strings
const provider = providers[0]
if (provider.image) {
  // In JSX:
  <img 
    src={`data:image/png;base64,${provider.image}`}
    alt={provider.name}
  />
}
```

### 8. Get Talukas (Regions)

```javascript
// Fetch all regions/talukas
try {
  const response = await getTalukas()
  const talukas = response.data?.data || []
  // Returns: [{ id, name }, ...]
  talukas.forEach(taluka => {
    console.log(taluka.name)
  })
} catch (error) {
  console.error('Failed to fetch talukas:', error)
}
```

### 9. Register Customer

```javascript
// Register a new customer
try {
  const response = await registerCustomer(
    name = 'John Doe',
    phone = '9876543210',
    talukaId = 1,
    isCardHolder = true
  )
  if (response.data?.status === 'SUCCESS') {
    console.log('Customer registered:', response.data.customer_id)
  }
} catch (error) {
  console.error('Failed to register customer:', error)
}
```

### 10. Create Service Request

```javascript
// Submit a service request
try {
  const response = await createServiceRequest({
    service: 'Plumbing',
    subservice: 'Pipe Repair',
    name: 'John Doe',
    address: '123 Main St',
    phone: '9876543210',
    discount: '15',
    image: '' // base64 image or empty
  })
  if (response.data?.status === 'SUCCESS') {
    console.log('Request submitted:', response.data.request_id)
  }
} catch (error) {
  console.error('Failed to create request:', error)
}
```

---

## ⚙️ Common Patterns

### Pattern 1: Fetch Data on Component Load

```javascript
import { useEffect, useState } from 'react'
import { getServices } from '../api/apiService'

function MyComponent() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await getServices()
        setServices(response.data?.data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  
  return (
    <div>
      {services.map(service => (
        <div key={service.id}>{service.name}</div>
      ))}
    </div>
  )
}
```

### Pattern 2: Handle Form Submission

```javascript
import { createServiceRequest } from '../api/apiService'

function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await createServiceRequest({
        service: 'Electrical',
        subservice: 'Wiring',
        name: 'John',
        phone: '9876543210',
        address: 'Street 1',
        discount: '0',
        image: ''
      })

      if (response.data?.status === 'SUCCESS') {
        setSuccess(true)
        // Clear form or redirect
      } else {
        setError(response.data?.message || 'Failed to submit')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <p className='error'>{error}</p>}
      {success && <p className='success'>Submitted!</p>}
    </form>
  )
}
```

### Pattern 3: Fetch Based on URL Parameter

```javascript
import { useParams } from 'react-router-dom'
import { getSubservices } from '../api/apiService'

function SubservicesPage() {
  const { serviceId } = useParams()
  const [subservices, setSubservices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!serviceId) return

    const fetchData = async () => {
      try {
        const response = await getSubservices(serviceId)
        setSubservices(response.data?.data || [])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [serviceId])

  // Render UI
}
```

---

## 🔧 Error Handling

### Common Error Scenarios

```javascript
// Network Error
try {
  const response = await getServices()
} catch (error) {
  if (error.response?.status === 404) {
    console.error('Not found')
  } else if (error.response?.status === 500) {
    console.error('Server error')
  } else if (error.message === 'Network Error') {
    console.error('Check your connection')
  }
}

// Response Error (from backend)
const response = await getServices()
if (response.data?.status === 'ERROR') {
  console.error('API Error:', response.data.message)
}

// Null/Empty Response
const response = await getServices()
const data = response.data?.data || []
if (data.length === 0) {
  console.log('No data returned')
}
```

---

## 📊 Response Data Structure Examples

### Services Response
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "id": 1,
      "name": "Plumbing",
      "description": "Plumbing services"
    },
    {
      "id": 2,
      "name": "Electrical",
      "description": "Electrical services"
    }
  ]
}
```

### Subservices Response
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "id": 5,
      "name": "Pipe Repair",
      "service_id": 1,
      "service_name": "Plumbing"
    }
  ]
}
```

### Service Details (Providers) Response
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "id": 10,
      "name": "Expert Plumbing Co",
      "address": "123 Main St",
      "phone": "9876543210",
      "discount": 15.5,
      "subservice_id": 5,
      "subservice_name": "Pipe Repair",
      "image": "base64encodedstring..."
    }
  ]
}
```

### Create Request Response
```json
{
  "status": "SUCCESS",
  "message": "Request Submitted Successfully",
  "request_id": 42
}
```

---

## 🎯 Key Points

1. **Always use the helper functions** from apiService.js
2. **Always handle loading states** for better UX
3. **Always handle errors** with try-catch
4. **Always validate responses** before accessing nested properties
5. **Image handling** - Convert base64 to `data:image/png;base64,{base64string}`
6. **Authentication** - Call authenticate() before fetching protected resources
7. **Null safety** - Use optional chaining `?.` and nullish coalescing `??`

---

## 🔗 API Service File Location

[src/api/apiService.js](../echosphere-react/src/api/apiService.js)

## 📖 Full API Documentation

[API_AND_REACT_GUIDE.md](../API_AND_REACT_GUIDE.md)
