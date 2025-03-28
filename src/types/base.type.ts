export type LocalStorageStateType<T> = {
  state: T
  version: number
}

export type BaseResponseType<T = any> = {
  message: string
  success: boolean
  errors?: string[]
  data: T
}

export type ListResponseType<T> = {
  data: T[]
  meta: MetaType
}

export type ResultType<T = any> = {
  type: 'success' | 'error'
  result: BaseResponseType<T>
}

export type PaginationState = {
  pageIndex: number
  pageSize: number
}

export type MetaType = {
  page: number
  take: number
  itemCount?: number
  pageCount?: number
  hasPreviousPage?: boolean
  hasNextPage?: boolean
}

export type CommonType = {
  createdBy?: string
  createdAt?: string
  updatedBy?: string
  updatedAt?: string
  isActive?: boolean
  isDeleted?: boolean
}

export type CommonCodeType = {
  code: string
  name: string
  isActive: boolean
}

export type ActionType =
  | 'add'
  | 'edit'
  | 'delete'
  | 'updatePrice'
  | 'approve'
  | 'search'
  | 'update-status'
  | 'update-password'
  | 'reset-password'
  | ''

export type ExportExcelType = 'page' | 'all'

export type DialogType =
  | 'create'
  | 'update'
  | 'delete'
  | 'import'
  | 'carousel'
  | 'preview'
  | ''

export type QueryType = {
  onSuccess?: (response: ResultType) => Promise<void>
  onError?: (error: Error) => void
}

export type SortDataType<T> = {
  isDragEnd: boolean
  newRows: T[]
}

export type CommonSelectType = {
  label: string
  value: string | number
}
