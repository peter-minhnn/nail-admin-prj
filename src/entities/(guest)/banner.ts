import { z } from 'zod'

export enum BannerPosition {
  HOME = 0,
  ABOUT = 1,
  SERVICE = 2,
  TRAINING = 3,
  PRODUCT = 4,
  ACTIVITY = 5,
  CONTACT = 6,
}
const bannerPublishStatusSchema = z.union([z.literal(true), z.literal(false)])

const bannerTypeSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
])

const bannerSchema = z.object({
  id: z.number().int().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  url: z.any().optional(),
  type: bannerTypeSchema,
})

const bannersListSchema = z.array(bannerSchema)

type BannerDataType = z.infer<typeof bannerSchema>
type BannerPublishType = z.infer<typeof bannerPublishStatusSchema>
type BannerStatusType = z.infer<typeof bannerTypeSchema>

type BannerFilterParams = {
  type?: number
  page: number
  take: number
}


export type { BannerDataType, BannerPublishType, BannerStatusType, BannerFilterParams }

export { bannerSchema, bannersListSchema }
