import { z } from 'zod'

const GuestAlbumStatusSchema = z.union([z.literal(true), z.literal(false)])

const GuestAlbumSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  details: z.array(
    z.object({
      id: z.number().int().optional(),
      filePath: z.string(),
      fileName: z.string(),
      originalName: z.string(),
      url: z.string(),
      isActive: GuestAlbumStatusSchema,
    })
  ),
  thumbnail: z.any().optional(),
  isActive: GuestAlbumStatusSchema,
})

const GuestAlbumDetailSchema = z.object({
  id: z.number().int().optional(),
  filePath: z.string(),
  fileName: z.string(),
  originalName: z.string(),
  url: z.string(),
  isActive: GuestAlbumStatusSchema,
})

const GuestAlbumListSchema = z.array(GuestAlbumSchema)

type GuestAlbumDataType = z.infer<typeof GuestAlbumSchema>
type GuestAlbumDetailDataType = z.infer<typeof GuestAlbumDetailSchema>
type GuestAlbumStatusType = z.infer<typeof GuestAlbumStatusSchema>

export type {
  GuestAlbumDataType,
  GuestAlbumDetailDataType,
  GuestAlbumStatusType,
}

export { GuestAlbumSchema, GuestAlbumDetailSchema, GuestAlbumListSchema }
