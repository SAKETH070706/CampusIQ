import axiosInstance from './axiosInstance'

export const loginUser = (credentials) =>
  axiosInstance.post('/auth/login', credentials).then((r) => r.data)

export const registerUser = (data) =>
  axiosInstance.post('/auth/register', data).then((r) => r.data)