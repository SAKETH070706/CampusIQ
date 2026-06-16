import { useQuery } from '@tanstack/react-query'
import {
  getTopper,
  getRankings,
  getBranchAverage,
  getFailures,
  getSubjectStats,
} from '../api/analytics.api'

export function useTopper() {
  return useQuery({ queryKey: ['analytics', 'topper'], queryFn: getTopper })
}

export function useRankings() {
  return useQuery({ queryKey: ['analytics', 'rankings'], queryFn: getRankings })
}

export function useBranchAverage(branch) {
  return useQuery({
    queryKey: ['analytics', 'branch', branch],
    queryFn: () => getBranchAverage(branch),
    enabled: !!branch,
  })
}

export function useFailures() {
  return useQuery({ queryKey: ['analytics', 'failures'], queryFn: getFailures })
}

export function useSubjectStats(subject_code) {
  return useQuery({
    queryKey: ['analytics', 'subject', subject_code],
    queryFn: () => getSubjectStats(subject_code),
    enabled: !!subject_code,
  })
}