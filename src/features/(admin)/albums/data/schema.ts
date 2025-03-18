import { z } from 'zod'

const albumsStatusSchema = z.union([z.literal(true), z.literal(false)])

const albumsSchema = z.object({
  id: z.number().int().optional(),
  nameVi: z.string().min(1, { message: 'albums.errors.nameViRequired' }),
  nameEn: z.string().optional().default(''),
  details: z.array(
    z.object({
      id: z.number().int().optional(),
      filePath: z.string(),
      fileName: z.string(),
      originalName: z.string(),
      url: z.string(),
      isActive: albumsStatusSchema,
    })
  ),
  thumbnail: z.any().optional(),
  thumbnailTitleVi: z
    .string()
    .min(1, { message: 'albums.errors.thumbnailTitleViRequired' }),
  thumbnailTitleEn: z.string().optional().default(''),
  isActive: albumsStatusSchema,
})

const albumDetailSchema = z.object({
  id: z.number().int().optional(),
  filePath: z.string(),
  fileName: z.string(),
  originalName: z.string(),
  url: z.string(),
  isActive: albumsStatusSchema,
})

const albumsListSchema = z.array(albumsSchema)

type AlbumsDataType = z.infer<typeof albumsSchema>
type AlbumsDetailDataType = z.infer<typeof albumDetailSchema>
type AlbumsStatusType = z.infer<typeof albumsStatusSchema>

export type { AlbumsDataType, AlbumsStatusType, AlbumsDetailDataType }

export { albumsSchema, albumDetailSchema, albumsListSchema }
