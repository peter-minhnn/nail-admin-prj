import { z } from 'zod'

const subscribeSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'subscribe.errors.email.inValid' })
    .email(),
})

type SubscribeDataType = z.infer<typeof subscribeSchema>

export default SubscribeDataType

export { subscribeSchema }
