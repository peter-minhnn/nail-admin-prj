import { z } from 'zod'

const popupPublishStatusSchema = z.union([z.literal(true), z.literal(false)])
const popupTypeSchema = z.union([z.literal('image'), z.literal('content')])

const popupSchema = z
  .object({
    id: z.number().int().optional(),
    title: z.string().or(z.null()).optional(),
    content: z.string().or(z.null()).optional(),
    url: z.string().optional(),
    image: z.any().optional(),
    type: popupTypeSchema,
    isPublished: popupPublishStatusSchema,
  })
  .superRefine((data, ctx) => {
    if (data.type === 'image') {
      if (!data.image) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['image'],
          message: 'popup.image.required',
        })
      }
      if (!data.url) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['url'],
          message: 'popup.url.required',
        })
      }
      if (data.url) {
        try {
          new URL(data.url)
        } catch {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['url'],
            message: 'popup.url.invalid',
          })
        }
      }
    }
    if (data.type === 'content') {
      if (!data.title) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['title'],
          message: 'popup.title.required',
        })
      }
      if (!data.content) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['content'],
          message: 'popup.content.required',
        })
      }
    }
  })

const popupListSchema = z.array(popupSchema)

type PopupDataType = z.infer<typeof popupSchema>
type PopupPublishType = z.infer<typeof popupPublishStatusSchema>
type PopupStatusType = z.infer<typeof popupTypeSchema>

export type { PopupDataType, PopupPublishType, PopupStatusType }

export { popupSchema, popupListSchema }
