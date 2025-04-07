type BannerPublicDataType = {
  id: number
  title: string
  content: string
  url: string
}
type BannerPublicFilterParams = {
  type?: number
  page: number
  take: number
}

export type { BannerPublicDataType, BannerPublicFilterParams }
