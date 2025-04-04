import { z } from 'zod'

const contactsSchema = z.object({
    name: z.string().min(1, { message: 'guest.contact.errors.name.empty' }),
    phone: z.string().min(1, { message: 'guest.contact.errors.phone.inValid' }).max(10),
    email: z.string().min(1, { message: 'guest.contact.errors.email.inValid' }).email(),
    address: z.string().optional().default(''),
    topic: z.string().min(1, { message: "guest.contact.errors.topic.empty" }),
    content: z.string().min(1, { message: "guest.contact.errors.address.empty" }),
})


type ContactDataType = z.infer<typeof contactsSchema>

export type { ContactDataType }

export { contactsSchema }
