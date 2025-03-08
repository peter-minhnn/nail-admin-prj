import { z } from 'zod'

const bannersSchema = z.object({
  id: z.number().int().optional(),
  title: z.string().min(1, { message: 'banners.errors.titleRequired' }),
  fileName: z.string().optional().default(''),
  filePath: z.string().optional().default(''),
  url: z.string().optional().default(''),
})

type BannersType = z.infer<typeof bannersSchema>

export type { BannersType }

export { bannersSchema }
