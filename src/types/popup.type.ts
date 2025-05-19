import { CommonType } from '@/types/base.type.ts'

export type PopupType = 'image' | 'content' | ''

export type Popup = {
  id: number
  url: string
  title: string
  image: string
  content: string
  type: PopupType
  isPublished: boolean
} & CommonType

export type PopupFilterParams = {
  type?: PopupType
  page: number
  take: number
  order?: 'ASC' | 'DESC'
}
