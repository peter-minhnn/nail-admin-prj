import { CommonType } from '@/types'

export type FileType = {
  id: number
  originalName: string
  fileName: string
  filePath: string
  url: string
} & CommonType
