import { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../api/auth.api'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const navigate = useNavigate()

  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('srkr_user')) } catch { return null }
  })
  const [token, setToken] = useState(() => localStorage.getItem('srkr_token') || null)
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (credentials) => {
    setLoading(true)
    try {
      const data = await loginUser(credentials)
      const { access_token, role } = data
      localStorage.setItem('srkr_token', access_token)
      const userData = {
        role,
        roll_no: credentials.roll_no
       }
      localStorage.setItem('srkr_user', JSON.stringify(userData))
      setToken(access_token)
      setUser(userData)
      toast.success('Logged in successfully')
      if (role === 'admin') navigate('/admin')
      else navigate('/student')
    } catch (err) {
  console.log("LOGIN ERROR:", err);
  console.log("RESPONSE:", err.response);
  console.log("DATA:", err.response?.data);

  toast.error(
    err.response?.data?.detail ||
    err.response?.data?.error ||
    'Login failed'
  )
}
    finally {
      setLoading(false)
    }
  }, [navigate])

  const register = useCallback(async (formData) => {
    setLoading(true)
    try {
      await registerUser(formData)
      toast.success('Registered successfully! Please log in.')
      navigate('/login')
    } catch (err) {
      toast.error(
  err.response?.data?.error ||
  err.response?.data?.detail?.[0]?.msg ||
  'Registration failed'
)
    } finally {
      setLoading(false)
    }
  }, [navigate])

  const logout = useCallback(() => {
    localStorage.removeItem('srkr_token')
    localStorage.removeItem('srkr_user')
    setToken(null)
    setUser(null)
    navigate('/login')
    toast.success('Logged out')
  }, [navigate])

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, register, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider')
  return ctx
}