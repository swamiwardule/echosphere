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

function unwrapData(response) {
  return response.data?.data || []
}

// ============================================
// AUTHENTICATION
// ============================================
export async function authenticate(login, password) {
  const body = {
    login,
    password,
  }

  return authApi.post('api/login', body)
}

// ============================================
// SERVICES (Main)
// ============================================
export async function getServices() {
  return api.get('/services')
}

export async function getPopularServices() {
  return api.get('/popular_services')
}

export async function getOtherServices() {
  return api.get('/other_services')
}

export async function createService(name, description) {
  return api.post('/create_service', { name, description })
}

// ============================================
// SUBSERVICES
// ============================================
export async function getSubservices(serviceId) {
  return api.get('/subservices', { params: { service_id: serviceId } })
}

export async function createSubservice(name, serviceId) {
  return api.post('/create_subservice', { name, service_id: serviceId })
}

// ============================================
// SERVICE DETAILS (Providers/Listings)
// ============================================
export async function getServiceDetails(subserviceId) {
  return api.get('/service_details', { params: { subservice_id: subserviceId } })
}

export async function getProvidersByTaluka(talukaId) {
  return api.get('/service_details', { params: { taluka_id: talukaId } })
}

export async function createServiceDetail(data) {
  return api.post('/create_service_detail', {
    name: data.name,
    address: data.address,
    phone: data.phone,
    discount: data.discount,
    subservice_id: data.subservice_id,
    image: data.image,
  })
}

// ============================================
// TALUKAS (Regions)
// ============================================
export async function getTalukas() {
  return api.get('/talukas')
}

// ============================================
// CUSTOMERS
// ============================================
export async function registerCustomer(name, phone, talukaId, isCardHolder) {
  return api.post('/register_customer', {
    name,
    phone,
    taluka_id: talukaId,
    is_card_holder: isCardHolder,
  })
}

// ============================================
// BANNERS
// ============================================
export async function getBanners() {
  return api.get('/banners')
}

// ============================================
// PROVIDERS/SERVICE DETAILS EXTENDED
// ============================================
export async function getServiceDetailById(detailId) {
  const response = await api.get('/service_details', { params: { detail_id: detailId } })
  const records = unwrapData(response)

  return {
    ...response,
    data: {
      ...response.data,
      data: records[0] || null,
    },
  }
}

export async function searchProviders({ subserviceId, talukaId } = {}) {
  return api.get('/service_details', { 
    params: { 
      subservice_id: subserviceId || undefined,
      taluka_id: talukaId || undefined,
    } 
  })
}

// ============================================
// HELPER FUNCTIONS
// ============================================
export function formatImageUrl(base64String) {
  if (!base64String) return null
  if (base64String.startsWith('data:image')) return base64String
  return `data:image/png;base64,${base64String}`
}

export default api
