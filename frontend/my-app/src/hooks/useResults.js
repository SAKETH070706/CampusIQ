import { useQuery } from '@tanstack/react-query'
import { getStudentResults } from '../api/results.api'

export function useStudentResults(roll_no) {
  return useQuery({
    queryKey: ['results', roll_no],
    queryFn: () => getStudentResults(roll_no),
    enabled: !!roll_no,
  })
}