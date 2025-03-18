import { AxiosResponse } from 'axios'
import { format } from 'date-fns'
import { useMutation, useQuery } from '@tanstack/react-query'
import { exportExcel, getContacts } from '@/services/contact.service.ts'
import { ContactFilterParams, ContactExportParams } from '@/types'
import { downloadExcelFile } from '@/utils'
import get from 'lodash/get'
import { IntlShape } from 'react-intl'
import { toast } from 'sonner'

export const useGetContacts = (params: ContactFilterParams) => {
  return useQuery({
    queryKey: ['contacts', params],
    queryFn: async () => await getContacts(params),
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

export const useContactsExport = (intl: IntlShape) => {
  return useMutation({
    mutationFn: async (params: ContactExportParams) =>
      (await exportExcel(params)) as AxiosResponse,
    onSuccess: (response: AxiosResponse) => {
      if (!response?.data) {
        toast.error(
          intl.formatMessage({ id: 'common.messages.exportExcelError' })
        )
        return
      }
      downloadExcelFile(
        response.data,
        `contacts-${format(new Date(), 'yyyyMMddHHmmss')}`
      )
    },
    onError: () =>
      toast.error(
        intl.formatMessage({ id: 'common.messages.exportExcelError' })
      ),
  })
}
