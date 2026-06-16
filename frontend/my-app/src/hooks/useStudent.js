import { useQuery } from '@tanstack/react-query'
import {
  getStudentByRoll,
  getStudentsByBranch,
  getStudentsBySection,
  getStudentsByBranchAndSection,
} from '../api/students.api'

export function useStudentByRoll(roll_no) {
  return useQuery({
    queryKey: ['student', roll_no],
    queryFn: () => getStudentByRoll(roll_no),
    enabled: !!roll_no,
  })
}

export function useStudentsByBranch(branch_code) {
  return useQuery({
    queryKey: ['students', 'branch', branch_code],
    queryFn: () => getStudentsByBranch(branch_code),
    enabled: !!branch_code,
  })
}

export function useStudentsBySection(section) {
  return useQuery({
    queryKey: ['students', 'section', section],
    queryFn: () => getStudentsBySection(section),
    enabled: !!section,
  })
}

export function useStudentsByBranchAndSection(branch_code, section) {
  return useQuery({
    queryKey: ['students', 'branch', branch_code, 'section', section],
    queryFn: () => getStudentsByBranchAndSection(branch_code, section),
    enabled: !!branch_code && !!section,
  })
}