import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',          
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT on every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('srkr_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {

    if (
      error.response?.status === 401 &&
      localStorage.getItem('srkr_token')
    ) {
      localStorage.removeItem('srkr_token')
      localStorage.removeItem('srkr_user')

      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default axiosInstance