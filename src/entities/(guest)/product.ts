import { z } from 'zod'

export type ProductFilterParams = {
  productType: number
  page: number
  take: number
  order?: 'ASC' | 'DESC'
}

const GuestProductTypeSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  desc: z.string().optional(),
})

const GuestProductTypeListSchema = z.array(GuestProductTypeSchema)

type GuestProductTypeType = z.infer<typeof GuestProductTypeSchema>

const GuestProductDetailTypeSchema = z.object({
  productName: z.string(),
  description: z.string(),
  id: z.number(),
  productType: z.number(),
  sortOrder: z.number(),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
  createdAt: z.string().datetime(),
  createdBy: z.string(),
  updatedAt: z.string().datetime(),
  updatedBy: z.string(),
  thumbnail: z.string().url(),
})

const GuestProductDetailListSchema = z.array(GuestProductDetailTypeSchema)
type GuestProductDetailType = z.infer<typeof GuestProductDetailTypeSchema>

export type { GuestProductTypeType, GuestProductDetailType }

export {
  GuestProductTypeSchema,
  GuestProductTypeListSchema,
  GuestProductDetailListSchema,
  GuestProductDetailTypeSchema,
}
