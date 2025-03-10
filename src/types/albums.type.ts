import { FileType, CommonType } from '@/types'

export type AlbumsType = {
  id: number
  nameVi: string
  nameEn: string
  details: FileType[]
} & CommonType

export type AlbumsRequestType = {
  id?: number
  thumbnail: File | null
  thumbnailTitleVi: string
  thumbnailTitleEn: string
  albumType: string
  nameVi: string
  nameEn: string
  files: File[]
  deleteDetailIds?: number[]
}
