export type ContactType = {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  subject: string
  content: string
  status: number
}

export type ContactFilterParams = {
  page: number
  take: number
  order?: 'ASC' | 'DESC'
}

export type ContactExportParams = {
  content?: string
  status?: number
}
