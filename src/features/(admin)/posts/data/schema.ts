import { z } from 'zod'

const postsPublishStatusSchema = z.union([z.literal(true), z.literal(false)])
const postsTypeSchema = z.union([
  z.literal('news'),
  z.literal('activity'),
  z.literal('service'),
  z.literal('training'),
  z.literal('product'),
])

const postsSchema = z.object({
  id: z.number().int().optional(),
  titleVi: z.string().min(1, { message: 'posts.errors.titleViRequired' }),
  titleEn: z.string().optional().default(''),
  contentVi: z.string().min(1, { message: 'posts.errors.contentViRequired' }),
  contentEn: z.string().optional().default(''),
  thumbnail: z.any().optional(),
  postType: postsTypeSchema,
  isPublish: postsPublishStatusSchema,
  sortOrder: z.number().optional(),
})

const postsListSchema = z.array(postsSchema)

type PostsDataType = z.infer<typeof postsSchema>
type PostsPublishType = z.infer<typeof postsPublishStatusSchema>
type PostsStatusType = z.infer<typeof postsTypeSchema>

export type { PostsDataType, PostsStatusType, PostsPublishType }

export { postsSchema, postsListSchema }
