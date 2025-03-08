import { CommonType } from '@/types/base.type.ts'

export type BannersListType = {
  id: number
  title: string
  filePath: string
} & CommonType

export type BannersRequestType = {
  title: string
  file: File
}
