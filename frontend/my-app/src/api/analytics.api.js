import axiosInstance from './axiosInstance'

export const getTopper = () =>
  axiosInstance.get('/analytics/topper').then((r) => r.data)

export const getRankings = () =>
  axiosInstance.get('/analytics/ranking').then((r) => r.data)

export const getBranchAverage = (branch) =>
  axiosInstance.get(`/analytics/branch/${branch}`).then((r) => r.data)

export const getFailures = () =>
  axiosInstance.get('/analytics/failures').then((r) => r.data)

export const getSubjectStats = (subject_code) =>
  axiosInstance.get(`/analytics/subject/${subject_code}`).then((r) => r.data)