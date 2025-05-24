import { useQuery } from '@tanstack/react-query'
import { getSubscribes } from '@/services/contact.service.ts'
import { PopupFilterParams } from '@/types'
import get from 'lodash/get'

export const useGetSubscribes = (params: PopupFilterParams) => {
  return useQuery({
    queryKey: ['subscribes', params],
    queryFn: async () => await getSubscribes(params),
    select: (response) =>
      get(response, ['result', 'data'], {
        list: [],
        meta: {
          page: 1,
          take: 10,
        },
      }),
    refetchOnWindowFocus: false,
  })
}
