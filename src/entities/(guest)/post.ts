import { z } from 'zod'

const GuestPostsPublishStatusSchema = z.union([z.literal(true), z.literal(false)])

const GuestPostsTypeSchema = z.union([
  z.literal('news'),
  z.literal('activity'),
  z.literal('service'),
  z.literal('training'),
  z.literal('product'),
])

const GuestPostsSchema = z.object({
  id: z.number().int().optional(),
  title: z.string().min(1, { message: 'GuestPosts.errors.titleViRequired' }),
  content: z.string().min(1, { message: 'GuestPosts.errors.contentViRequired' }),
  thumbnail: z.any().optional(),
  postType: GuestPostsTypeSchema,
  isPublish: GuestPostsPublishStatusSchema,
  sortOrder: z.number().optional(),
})

const GuestPostsListSchema = z.array(GuestPostsSchema)

type GuestPostDataType = z.infer<typeof GuestPostsSchema>
type GuestPostsPublishType = z.infer<typeof GuestPostsPublishStatusSchema>
type GuestPostsStatusType = z.infer<typeof GuestPostsTypeSchema>

export type { GuestPostDataType, GuestPostsStatusType, GuestPostsPublishType }

export { GuestPostsSchema, GuestPostsListSchema }
