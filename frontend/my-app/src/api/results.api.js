import axiosInstance from './axiosInstance'

export const getStudentResults = (roll_no) =>
  axiosInstance.get(`/results/${roll_no}`).then((r) => r.data)