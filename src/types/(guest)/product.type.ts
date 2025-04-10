type ProductFilterParams = {
  productType: number
  page: number
  take: number
  order?: 'ASC' | 'DESC'
}

type GuestProductTypeType = {
  id: number
  name: string
  desc: string
}

type GuestProductDetailType = {
  productName: string
  description: string
  content: string
  id: number
  productType: number
  sortOrder: number
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
  thumbnail: string
  slugId?: string
}

export type {
  ProductFilterParams,
  GuestProductTypeType,
  GuestProductDetailType,
}
