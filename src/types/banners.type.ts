import { CommonType } from '@/types/base.type.ts'

export type BannersListType = {
  id: number
  title: string
  filePath: string
} & CommonType

export type BannersRequestType = {
  title: string
  type: number
  file: File
}

export type BannersFilterParams = {
  page: number
  take: number
}
