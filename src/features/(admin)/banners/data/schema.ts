import { z } from 'zod'

const bannersTypeSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
])

const bannersSchema = z.object({
  id: z.number().int().optional(),
  title: z.string().min(1, { message: 'banners.errors.titleRequired' }),
  originalName: z.string().optional().default(''),
  fileName: z.string().optional().default(''),
  filePath: z.string().optional().default(''),
  type: bannersTypeSchema,
  url: z.string().optional().default(''),
  originalNameMobile: z.string().optional().default(''),
  fileNameMobile: z.string().optional().default(''),
  filePathMobile: z.string().optional().default(''),
  urlMobile: z.string().optional().default(''),
})

const bannersListSchema = z.array(bannersSchema)

type BannersType = z.infer<typeof bannersSchema>
type BannersSlideType = z.infer<typeof bannersTypeSchema>

export type { BannersType, BannersSlideType }

export { bannersSchema, bannersListSchema }
