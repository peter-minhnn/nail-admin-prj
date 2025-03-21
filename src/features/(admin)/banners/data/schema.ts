import { z } from 'zod'

const bannersTypeSchema = z.union([z.literal(0), z.literal(1)])

const bannersSchema = z.object({
  id: z.number().int().optional(),
  title: z.string().min(1, { message: 'banners.errors.titleRequired' }),
  originalName: z.string().optional().default(''),
  fileName: z.string().optional().default(''),
  filePath: z.string().optional().default(''),
  type: bannersTypeSchema,
  url: z.string().optional().default(''),
})

const bannersListSchema = z.array(bannersSchema)

type BannersType = z.infer<typeof bannersSchema>
type BannersSlideType = z.infer<typeof bannersTypeSchema>

export type { BannersType, BannersSlideType }

export { bannersSchema, bannersListSchema }
