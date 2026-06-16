import axiosInstance from './axiosInstance'

export const getStudentByRoll = (roll_no) =>
  axiosInstance.get(`/students/${roll_no}`).then((r) => r.data)

export const getStudentsByBranch = (branch_code) =>
  axiosInstance.get(`/students/branch/${branch_code}`).then((r) => r.data)

export const getStudentsBySection = (section) =>
  axiosInstance.get(`/students/section/${section}`).then((r) => r.data)

export const getStudentsByBranchAndSection = (branch_code, section) =>
  axiosInstance
    .get(`/students/branch/${branch_code}/section/${section}`)
    .then((r) => r.data)