export type ProductListType = {
  id?: number
  productNameVi: string
  productNameEn: string
  descriptionVi: string
  descriptionEn: string
  contentVi: string
  contentEn: string
  thumbnail?: File | null
  productType?: number
  price: number
  sortOrder?: number
}

export type ProductFilterParams = {
  productType?: number
  content?: string
  page: number
  take: number
  order?: 'ASC' | 'DESC'
}

export type ProductType = {
  id?: number
  nameVi: string
  nameEn: string
  descVi: string
  descEn: string
}
